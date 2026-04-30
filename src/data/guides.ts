// Index of editorial guides. Each guide is its own .astro page under
// src/pages/guides/<slug>.astro. This file is the source of truth for
// metadata that the index page and homepage need to render.

export interface GuideMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  lead: string;
  datePublished: string; // YYYY-MM-DD
  dateModified: string;
  topics: string[];
  // Optional: a featured YouTube video ID embedded in the guide
  videoId?: string;
}

export const guides: GuideMeta[] = [
  {
    slug: 'agentrouter-250',
    title: 'Как получить $250 на Claude Opus и GPT через agentrouter.org (Kilo Code, VS Code, Cursor)',
    shortTitle: 'agentrouter.org $250 — пошаговая инструкция',
    description:
      'Пошаговый гайд по акции от agentrouter.org: $250 на топовые модели Claude Opus 4.7 и GPT 5.5 для кодинга. Подключение к Kilo Code, Cline в VS Code и Cursor.',
    lead: 'Свежая акция (апрель 2026): провайдер agentrouter.org раздаёт до $250 кредитов на API-ключ — этого хватает на сотни диалогов с Claude Opus 4.7, GPT 5.5 и Sonnet через любой кодинг-агент.',
    datePublished: '2026-04-30',
    dateModified: '2026-04-30',
    topics: ['agentrouter', 'Claude Opus', 'GPT 5.5', 'Kilo Code', 'Cline', 'Cursor', 'API кредиты'],
    videoId: '2ATm91oB1oI',
  },
  {
    slug: 'claude-opus-besplatno',
    title: 'Claude Opus 4.7 и GPT 5.5 бесплатно: все рабочие способы (апрель 2026)',
    shortTitle: 'Все способы получить Claude Opus / GPT 5.5 бесплатно',
    description:
      'Обзор всех актуальных способов получить бесплатный или почти бесплатный доступ к Claude Opus 4.7, GPT 5.5, Sonnet и другим топовым моделям через провайдеров API, акции и партнёрские программы.',
    lead: 'Чтобы регулярно пользоваться Claude Opus 4.7 и GPT 5.5, не обязательно платить за подписки. Есть как минимум 5 рабочих схем — от партнёрских кредитов до бонусов разработчикам. Разбираем все по порядку.',
    datePublished: '2026-04-29',
    dateModified: '2026-04-30',
    topics: ['Claude Opus', 'GPT 5.5', 'бесплатно', 'халява', 'API ключи', 'agentrouter', 'CodeRabbit'],
  },
  {
    slug: 'qwen-cli-alternativy',
    title: 'Qwen Code CLI закрылся (15.04.2026) — 5 рабочих альтернатив для вайбкодеров',
    shortTitle: 'Qwen CLI закрылся — что делать',
    description:
      '15 апреля 2026 Qwen прикрыл бесплатный OAuth в официальном CLI. Разбираем 5 альтернатив, которые работают сейчас: Cline, Kilo Code, Claude Code, Codex CLI, Roo Code.',
    lead: '15 апреля 2026 Qwen внезапно прикрыл бесплатный OAuth в официальном CLI. Если ты вайбкодил через qwen-code — пора мигрировать. Собрал 5 рабочих альтернатив с инструкциями по подключению.',
    datePublished: '2026-04-16',
    dateModified: '2026-04-30',
    topics: ['Qwen Code CLI', 'альтернативы', 'Cline', 'Kilo Code', 'Claude Code', 'Codex CLI', 'Roo Code'],
  },
];
