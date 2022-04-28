module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  }
};
