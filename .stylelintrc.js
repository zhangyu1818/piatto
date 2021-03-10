module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/stylelint')],
  ignoreFiles: ['src/styles/utils/{bezierEasing,colorPalette,tinyColor}.less'],
}
