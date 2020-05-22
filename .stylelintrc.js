module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/stylelint')],
  ignoreFiles: ['components/styles/utils/{bezierEasing,colorPalette,tinyColor}.less'],
};
