module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  ignoreFiles: ['components/styles/utils/{bezierEasing,colorPalette,tinyColor}.less'],
}
