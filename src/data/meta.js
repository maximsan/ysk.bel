const brandStory =
  'Тихая усадьба у воды недалеко от Минска — рыбалка, баня и тёплый отдых в духе загородного дома.';

const descriptionBody =
  '✓Рыбалка круглый год - карп, щука, окунь, амур. ✓Скидка зимой 50%. ✓Удобные ночлежки и бесплатные беседки. ✓Баня до 8 человек - 150BYN. Звоните: ☎ +375 (29) 149 59 89.';

const ogBody =
  '✓Рыбалка круглый год ✓карп, щука, окунь, амур ✓Скидка зимой ✓Парковка ✓Ночлежки ✓Беседки ✓Баня до 8 человек, 150BYN ☎ +375 (29) 149 59 89';

const PHONE_DIGITS = '+375291495989';
const PHONE_DISPLAY = '+375 (29) 149 59 89';

/**
 * Head tags, Open Graph, and hero copy defaults (`head.liquid`, `hero-section.liquid`, `base.liquid`).
 *
 * Key fields:
 *   • `brandStory` — single sentence reused in `<meta>` text and hero; update visual snapshots if it changes.
 *   • `themeColor` / `themeColorDark` — browser chrome tint; override per route via page front matter.
 *   • `heroCta` / `heroTrustStrip` — wired into the hero; keep trust lines short so the chip row does not wrap.
 */
export default {
  /** Same text as hero lede / meta description opener. */
  brandStory,
  title: 'Усадьба серебряный карась. Рыбалка. Баня. Минская Область',
  keywords:
    'рыбалка, рыбная ловля, рыбалка под минском, баня, баня под минском, усадьба',
  description: `${brandStory} ${descriptionBody}`,
  ogTitle: 'Усадьба серебряный карась. Рыбалка. Баня. Минская Область',
  ogDescription: `${brandStory} ${ogBody}`,
  author: 'maximsan.com',
  url: 'https://уск.бел',
  lang: 'ru',
  locale: 'ru_RU',
  /** Browser UI tint (`<meta name="theme-color">`).
   * Per-page override: set `themeColor` / `themeColorDark` in front matter — values flow through
   * `base.liquid` into `head.liquid`.
   */
  themeColor: '#5f6f6d',
  themeColorDark: '#1c2724',
  /** Accent line shown above the hero `h1`; leave empty to hide that row entirely. */
  heroEyebrow: 'Минская область · Логойский р-н',
  /**
   * Hero button pair (styles: `_cta.scss`).
   *   • `primary` — main conversion (usually `tel:`); label can be shortened if `ariaLabel` carries the rest.
   *   • `secondary` — soft anchor deeper on the page.
   */
  heroCta: {
    primary: {
      label: `Забронировать · ${PHONE_DISPLAY}`,
      href: `tel:${PHONE_DIGITS}`,
      ariaLabel: `Позвонить по номеру ${PHONE_DISPLAY} чтобы забронировать`,
    },
    secondary: {
      label: 'Посмотреть услуги',
      href: '#services',
      ariaLabel: 'Перейти к разделу услуг',
    },
  },
  /**
   * Three short captions beneath the CTAs.
   * Liquid renders them as compact hero chips; keep each phrase ≤28 characters.
   */
  heroTrustStrip: [
    '30 мин от Минска',
    'Рыбалка круглый год',
    'Баня до 8 человек',
  ],
};
