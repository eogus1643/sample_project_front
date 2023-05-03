const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    // proxy : 'http://localhost:8070/'
    proxy : 'https://port-0-sample-project-e9btb72mlh6e1vvi.sel4.cloudtype.app/'
  }
  
})

