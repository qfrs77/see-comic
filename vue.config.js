const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
const BASE_URL = process.env.NODE_ENV === "production" ? "/demo2/" : "./";
module.exports = {
  publicPath: BASE_URL,
}