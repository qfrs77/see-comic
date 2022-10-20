const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/seeComic-show' : '/',
  chainWebpack: (config) => {
    config.module.rule("svg")
    .exclude.add(resolve("src/icons"))
    .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
})