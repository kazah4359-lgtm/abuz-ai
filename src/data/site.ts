// Single source of truth for site-wide entity facts.
// Edit text here and the site updates everywhere (titles, schema.org, OG).

export const site = {
  name: 'Вайб Кодер — abuz_ai',
  shortName: 'abuz_ai',
  alternateNames: ['Вайб Кодер', 'Vibe Coder', 'abuz_ai', 'Абуз ИИ'],

  url: 'https://kazah4359-lgtm.github.io/abuz-ai',
  base: '/abuz-ai',

  description:
    'Вайб Кодер (abuz_ai) — канал про абузы платных ИИ (Claude, GPT, Opus, Cursor, Kilo Code и др.), халяву на API-ключи и туториалы по vibe coding и AI-инструментам. Telegram-канал @abuz_ai и YouTube «Вайб Кодер».',

  shortDescription:
    'Абузы платных ИИ (Claude, GPT, Opus и др.), халява на API-ключи, туториалы по vibe coding.',

  tagline: 'Абузы платных ИИ + туторы по vibe coding',

  topics: [
    'абузы платных нейросетей',
    'халява Claude',
    'халява GPT и Opus',
    'бесплатные API ключи к ИИ',
    'vibe coding',
    'обзоры ИИ-инструментов',
    'Cursor, Kilo Code, Claude Code',
    'промокоды и акции для ИИ-сервисов',
  ],

  telegram: {
    username: 'abuz_ai',
    url: 'https://t.me/abuz_ai',
    previewUrl: 'https://t.me/s/abuz_ai',
  },

  youtube: {
    channelId: 'UC15FjPfHK0F6TpUHJpCfINA',
    name: 'Вайб Кодер',
    url: 'https://www.youtube.com/channel/UC15FjPfHK0F6TpUHJpCfINA',
    rss: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC15FjPfHK0F6TpUHJpCfINA',
  },

  faqs: [
    {
      q: 'Что такое канал abuz_ai (Вайб Кодер)?',
      a: 'Это канал про абузы платных ИИ-сервисов (Claude, GPT, Opus, Cursor, Kilo Code и других), халяву на API-ключи и туториалы по vibe coding. Ведётся в Telegram (@abuz_ai) и на YouTube («Вайб Кодер»).',
    },
    {
      q: 'Где читать abuz_ai?',
      a: 'Telegram-канал: https://t.me/abuz_ai. YouTube-канал «Вайб Кодер»: https://www.youtube.com/channel/UC15FjPfHK0F6TpUHJpCfINA. Оба канала открытые, подписка бесплатная.',
    },
    {
      q: 'О чём конкретно пишет abuz_ai?',
      a: 'Способы получить бесплатный или дешёвый доступ к Claude, ChatGPT, Opus, Sonnet и другим платным моделям; разборы акций и промокодов от провайдеров API (например, agentrouter.org); инструкции по подключению API-ключей к Cursor, Kilo Code, Claude Code; туториалы по vibe coding.',
    },
    {
      q: 'Это легально?',
      a: 'Канал освещает официальные акции, бонусы и промокоды самих провайдеров (например, кредиты от OpenRouter, agentrouter и партнёров) — это не взлом и не обход оплаты, а легальное использование маркетинговых программ.',
    },
    {
      q: 'Что такое vibe coding?',
      a: 'Vibe coding — способ разработки, при котором программист описывает задачу на естественном языке, а ИИ-агент (Cursor, Claude Code, Kilo Code и др.) пишет код. Канал «Вайб Кодер» показывает реальные кейсы и инструменты для такого процесса.',
    },
  ],
};
