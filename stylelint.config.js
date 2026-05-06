/**
 * stylelint-config-prettier is not compatible with Stylelint 17+ (it nulls removed
 * rules → "Unknown rule"). stylelint-config-standard v40+ omits stylistic rules
 * that Prettier owns; Prettier remains authoritative for formatting.
 *
 * @type {import('stylelint').Config}
 */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  ignoreFiles: ['**/node_modules/**', '**/dist/**'],
  rules: {
    /** BEM (__ / --), PhotoSwipe (.pswp__), and legacy helpers — not strict kebab-case. */
    'selector-class-pattern': null,
    /** Private/tunnel vars (--_, --map--*) used across partials. */
    'custom-property-pattern': null,
  },
};
