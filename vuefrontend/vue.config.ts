module.exports = {
  devServer: {                
      port: 8000,
      proxy: {                 
          '/api': {             
              target: 'http://localhost:8000/api/v1/',     //接口RestMapper(地址),或者你要写的模块的根地址
              changeOrigin: true,              //是否设置同源
              pathRewrite: {                   //路径重写
                  '/api/v1': ''                     //选择忽略拦截器里面的单词
              }
          }
      }
  }
}