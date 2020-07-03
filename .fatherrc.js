import LessPluginFunctions from 'less-plugin-functions';

const options = {
  esm: { type: 'babel', importLibToEs: true },
  extractCSS: true,
  lessInBabelMode: {
    javascriptEnabled: true,
    plugins: [new LessPluginFunctions()],
  },
};

export default options;
