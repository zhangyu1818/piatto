import px2rem from 'postcss-plugin-px2rem'

const options = {
  esm: { type: 'babel', importLibToEs: true },
  extractCSS: true,
  lessInBabelMode: {
    javascriptEnabled: true,
  },
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 35,
      minPixelValue: 3,
      exclude: /node_module/,
    }),
  ],
}

export default options
