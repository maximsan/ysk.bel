/**
 * Stories about fish stocking events (one or many).
 * Add a new object to `stories` for each event; order is display order (newest first is typical).
 *
 * Fields:
 * - id: stable anchor for links, e.g. #stocking-2026-04-14
 * - storyTitle: short heading shown when there are 2+ stories (hidden when only one story)
 * - badgeLabel / badgeTitleAttr: pill next to title
 * - lead.intro | lead.highlight | lead.outro: paragraph split for accent styling on highlight
 * - basePath + images: filename order in `images`; use `images: []` if there are no photos yet (carousel is hidden)
 */
module.exports = {
  sectionTitle: 'Зарыбление водоёма',
  stories: [
    {
      id: 'stocking-2026-04-14',
      storyTitle: 'Весеннее зарыбление 2026',
      badgeLabel: '14 апреля 2026',
      badgeTitleAttr: 'Дата зарыбления',
      lead: {
        intro:
          'Рыбу транспортируют в специальных ёмкостях, после чего постепенно адаптируют к температуре пруда и выпускают в водоём. Такой подход помогает сохранить здоровье рыбы и баланс экосистемы. ',
        highlight:
          '14 апреля 2026 г. был запущен карп массой от 700 г до 2 кг — всего более 300 кг,',
        outro: ' чтобы пруд оставался насыщенным, а клёв — разнообразным.',
      },
      basePath: 'assets/images/stocking-with-fish/14.04.2026',
      images: [
        { file: '1.JPG', width: 1600, height: 1200 },
        { file: '2.JPG', width: 1600, height: 1200 },
        { file: '3.JPG', width: 1600, height: 1200 },
      ],
    },
    {
      id: 'stocking-2025-05-12',
      storyTitle: 'Весеннее зарыбление 2025',
      badgeLabel: '12 мая 2025',
      badgeTitleAttr: 'Дата зарыбления',
      lead: {
        intro:
          'Зарыбление проходило по тому же бережному сценарию: рыбу адаптировали к температуре водоёма и выпускали в пруд. ',
        highlight:
          '12 мая 2025 г. в водоём был запущен карп массой от 500 г; общий объём партии — 300 кг.',
        outro:
          ' Эта партия поддержала баланс популяции и разнообразие клёва для гостей усадьбы.',
      },
      basePath: 'assets/images/stocking-with-fish/12.05.2025',
      images: [],
    },
  ],
};
