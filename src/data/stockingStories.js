/**
 * Stocking / fish-release stories for the home section (`stocking-with-fish-carousel.liquid`).
 *
 *   • `stories[].id` becomes the fragment target for in-page links (e.g. from the info banner).
 *   • Two or more stories → each shows `storyTitle`; a single story hides that secondary heading.
 *   • `lead.intro` / `lead.highlight` / `lead.outro` map to typographic emphasis in the template.
 *   • `images: []` skips the photo carousel for that story only.
 */
export default {
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
