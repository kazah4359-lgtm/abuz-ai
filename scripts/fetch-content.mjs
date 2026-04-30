// Build-time fetcher: pulls latest YouTube videos and Telegram posts
// and writes them to src/data/feed.json. Runs in CI before `astro build`.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';
import { parse as parseHtml } from 'node-html-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'src/data/feed.json');

const YT_CHANNEL_ID = 'UC15FjPfHK0F6TpUHJpCfINA';
const YT_RSS = `https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`;
const TG_USERNAME = 'abuz_ai';
const TG_PREVIEW = `https://t.me/s/${TG_USERNAME}`;

const UA = 'Mozilla/5.0 (compatible; abuz-ai-site-builder/1.0; +https://kazah4359-lgtm.github.io/abuz-ai)';

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'ru,en;q=0.9' } });
  if (!res.ok) throw new Error(`Fetch ${url} failed: ${res.status}`);
  return res.text();
}

function slugify(s) {
  return (s || '')
    .toString()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9а-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

async function fetchYouTube() {
  const xml = await fetchText(YT_RSS);
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    isArray: (name) => name === 'entry',
  });
  const data = parser.parse(xml);
  const feed = data.feed || {};
  const entries = feed.entry || [];
  const videos = entries.map((e) => {
    const id = e['yt:videoId'];
    const title = e.title;
    const published = e.published;
    const updated = e.updated;
    const link = (Array.isArray(e.link) ? e.link[0] : e.link)?.['@_href'] || `https://www.youtube.com/watch?v=${id}`;
    const author = e.author?.name || 'Вайб Кодер';
    const media = e['media:group'] || {};
    const description = (media['media:description'] || '').toString();
    const thumb = media['media:thumbnail']?.['@_url'] || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    return {
      id,
      title,
      slug: slugify(title) || id,
      url: link,
      embedUrl: `https://www.youtube.com/embed/${id}`,
      published,
      updated,
      author,
      description,
      thumbnail: thumb,
    };
  });
  return videos;
}

function textFromHtml(node) {
  if (!node) return '';
  // Replace <br> with newline so post structure survives
  node.querySelectorAll('br').forEach((br) => br.replaceWith('\n'));
  return node.text.replace(/\s+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

async function fetchTelegram() {
  const html = await fetchText(TG_PREVIEW);
  const root = parseHtml(html);
  const messages = root.querySelectorAll('.tgme_widget_message');
  const posts = [];
  for (const m of messages) {
    const dataPost = m.getAttribute('data-post') || '';
    const id = dataPost.split('/').pop();
    if (!id) continue;
    const link = `https://t.me/${TG_USERNAME}/${id}`;
    const textNode = m.querySelector('.tgme_widget_message_text');
    const text = textNode ? textFromHtml(textNode) : '';
    const timeEl = m.querySelector('.tgme_widget_message_date time');
    const datetime = timeEl?.getAttribute('datetime') || null;

    // Photo (background-image url) and video thumb
    const photoEl = m.querySelector('.tgme_widget_message_photo_wrap');
    let photo = null;
    if (photoEl) {
      const style = photoEl.getAttribute('style') || '';
      const match = style.match(/background-image:url\(['"]?([^'")]+)['"]?\)/);
      if (match) photo = match[1];
    }
    const videoThumbEl = m.querySelector('.tgme_widget_message_video_thumb');
    let videoThumb = null;
    if (videoThumbEl) {
      const style = videoThumbEl.getAttribute('style') || '';
      const match = style.match(/background-image:url\(['"]?([^'")]+)['"]?\)/);
      if (match) videoThumb = match[1];
    }

    // Skip empty service messages
    if (!text && !photo && !videoThumb) continue;

    const firstLine = text.split('\n').find((l) => l.trim()) || `Пост #${id}`;
    const title = firstLine.length > 80 ? firstLine.slice(0, 80).trim() + '…' : firstLine;

    posts.push({
      id,
      url: link,
      title,
      slug: id, // Telegram message ids are stable, use them as slug
      text,
      datetime,
      photo,
      videoThumb,
    });
  }
  // Sort newest first
  posts.sort((a, b) => (b.datetime || '').localeCompare(a.datetime || ''));
  return posts;
}

async function main() {
  const errors = [];
  let videos = [];
  let posts = [];

  try {
    videos = await fetchYouTube();
    console.log(`[fetch] YouTube: ${videos.length} videos`);
  } catch (e) {
    console.error('[fetch] YouTube failed:', e.message);
    errors.push({ source: 'youtube', message: e.message });
  }

  try {
    posts = await fetchTelegram();
    console.log(`[fetch] Telegram: ${posts.length} posts`);
  } catch (e) {
    console.error('[fetch] Telegram failed:', e.message);
    errors.push({ source: 'telegram', message: e.message });
  }

  const payload = {
    fetchedAt: new Date().toISOString(),
    videos,
    posts,
    errors,
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`[fetch] Wrote ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
