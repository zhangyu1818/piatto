const path = require('path');

module.exports = {
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [{ loader: require.resolve('ts-loader') }],
    });
    config.resolve.alias.piatto = path.resolve(__dirname, '../components');
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
};
