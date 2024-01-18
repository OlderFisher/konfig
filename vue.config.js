const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: false,
  publicPath: process.env.NODE_ENV === 'development' ?  process.env.BASE_URL : ( process.env.BUILD_DEV === 'true' ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD),
});
