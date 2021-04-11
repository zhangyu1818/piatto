import { defineConfig } from 'dumi'
import path from 'path'

export default defineConfig({
  title: 'piatto',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  publicPath: 'https://zhangyu1818.github.io/piatto/',
  base: '/piatto/',
  outputPath: 'docs-dist',
  exportStatic: {},
  alias: {
    piatto: path.resolve(__dirname, 'src'),
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'piatto',
        libraryDirectory: '',
        customStyleName: name => path.resolve(__dirname, `src/${name}/index.less`),
      },
    ],
  ],
  extraPostCSSPlugins: [
    require('postcss-plugin-px2rem')({
      rootValue: 35,
      minPixelValue: 3,
      exclude: /node_module/,
    }),
  ],
  styles: [
    `
    .__dumi-default-mobile-demo-layout{
      font-size: 0;
    }
    [class|='piatto'] {
      box-sizing: border-box;
    }
    [class|='piatto'] ::before,
    [class|='piatto'] ::after {
      box-sizing: border-box;
    }
    `,
  ],
})
