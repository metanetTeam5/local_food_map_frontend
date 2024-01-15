const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['vue-awesome'],

  devServer: {
    port: 8090,
    proxy: {
      '/restaurant': {
        target: process.env.VUE_APP_BACKEND_URL,
        changeOrigin: true
      }
    }
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
      ],
    },
  },
});
