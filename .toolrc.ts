import { UserConfig } from 'lib-tool'

const compileJS: UserConfig = {
  entry: 'components/index.tsx',
  onlyDependencyFile: true,
}

const compileLess: UserConfig = {
  entry: 'components',
  fileFilter: (filePath) => filePath.endsWith('.less'),
}

export default [compileJS, compileLess]
