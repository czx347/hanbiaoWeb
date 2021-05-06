module.exports = {
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置后自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: { //配置多个代理
      "/testIp": {
        target: "http://197.0.0.1:8088",
        changeOrigin: true,
        ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/testIp": "/"
        }
      },
      "/elseIp": {
        target: "http://197.0.0.2:8088",
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/elseIp": "/"
        }
      },
    }
  },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // 公共样式文件地址
                    resources: 'src/assets/scss/base.scss',

                    // 地址也可以是数组
                    // resources: ['./path/to/vars.scss', './path/to/mixins.scss', './path/to/functions.scss']
                })
                .end()
        })
    },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
      }
    }
  },
  lintOnSave: false,
}
