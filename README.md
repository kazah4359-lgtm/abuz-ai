# abuz-ai — сайт-агрегатор для Telegram-канала [@abuz_ai](https://t.me/abuz_ai) и YouTube «Вайб Кодер»

Статический сайт на [Astro](https://astro.build/), который автоматически подтягивает свежие посты из Telegram и видео с YouTube и публикует их на GitHub Pages. Заточен под цитирование нейросетями (Perplexity, ChatGPT, Claude, Google AI Overviews) — generative engine optimization.

**Live:** https://kazah4359-lgtm.github.io/abuz-ai/

## Что внутри

- **Источники контента:** YouTube RSS + парсинг публичной превью-страницы `t.me/s/abuz_ai`. Никакие API-ключи не требуются.
- **Автообновление:** GitHub Actions cron каждые ~2 часа пересобирает и деплоит сайт.
- **GEO-обвязка:**
  - `robots.txt` с явным `Allow` для PerplexityBot, GPTBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended и других LLM-краулеров.
  - `sitemap-index.xml` (автогенерация).
  - `llms.txt` в корне.
  - JSON-LD `Person` + `WebSite` + `FAQPage` + `VideoObject` + `SocialMediaPosting` со связкой `sameAs` Telegram ↔ YouTube ↔ сайт.
  - OpenGraph / Twitter Card.
  - Полностью статический HTML (контент в разметке, без CSR), что любят LLM-краулеры.

## Структура

```
src/
  data/
    site.ts          — entity-факты, FAQ, ссылки. Правьте здесь.
    feed.json        — кэш постов/видео (создаётся скриптом fetch).
  layouts/
    BaseLayout.astro — общий каркас + JSON-LD + OG.
  pages/
    index.astro      — главная (последние посты + видео + FAQ).
    about.astro      — entity-страница «о канале».
    posts/
      index.astro    — архив TG-постов.
      [id].astro     — страница одного TG-поста.
    videos/
      index.astro    — архив YT-видео.
      [id].astro     — страница одного видео с embed.
public/
  robots.txt
  llms.txt
scripts/
  fetch-content.mjs  — fetcher YouTube RSS + парсер t.me/s/abuz_ai.
.github/workflows/
  deploy.yml         — билд и деплой на GitHub Pages, cron каждые 2 часа.
```

## Локальная разработка

```bash
npm install
npm run fetch   # подтянуть свежий контент из TG + YouTube
npm run dev     # http://localhost:4321/abuz-ai/
npm run build   # сборка в dist/ (prebuild автоматически зовёт fetch)
```

## Деплой на GitHub Pages

1. Форкните или склонируйте репо себе на аккаунт под именем `abuz-ai`.
2. В **Settings → Pages** выберите **Build and deployment → Source: GitHub Actions**.
3. Запушьте на `main` или нажмите **Run workflow** в Actions — сайт автоматически соберётся и задеплоится.
4. Дальше cron будет пересобирать сайт каждые ~2 часа.

Если нужен кастомный домен — добавьте файл `public/CNAME` с доменом и настройте DNS, плюс поправьте `site` в `astro.config.mjs` и `src/data/site.ts`.

## Как править контент сайта

- **Тексты «о канале», FAQ, теги, описание** — в [`src/data/site.ts`](src/data/site.ts).
- **Стили** — в `src/layouts/BaseLayout.astro` (блок `<style is:global>`).
- **Главная страница** — `src/pages/index.astro`.

Контент с TG/YouTube подтягивается автоматически — править его на сайте напрямую не нужно, пишите как обычно в свои каналы.
