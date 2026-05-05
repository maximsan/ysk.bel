/**
 * Top-of-site announcement banner (see `components/info-banner.liquid`).
 *
 * `variant`:
 *   • `strip` (default) — narrow bar directly under the header; animates open on first show.
 *     Suited to routine notices (stocking, offers).
 *   • `modal` — blocks the viewport with a dimmed overlay + dialog semantics (focus trap, Escape).
 *     Use only for uncommon, high-impact news (e.g. season closure, urgent changes).
 *
 * Each message may set optional `date` (ISO string or readable label).
 * Liquid renders `date` as a compact chip ahead of the message text.
 */
export default {
  variant: 'strip',
  intro: 'Приглашаем к нам на рыбалку!',
  messages: [
    {
      text: 'Свежее зарыбление водоёма — 14 апреля 2026г!',
      href: '#stocking-2026-04-14',
    },
    {
      text: 'Запустили карпа размером от 700г до 2кг, более 300кг.',
    },
  ],
};
