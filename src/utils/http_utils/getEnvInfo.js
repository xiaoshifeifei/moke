const ENV_LIST = {
  'dongBu': {
    'production': {
      baseUrl: 'http://11.23.24.252:9217', // AJAX的baseUrl
      cityMakerServer: '11.23.25.232', // 三维服务地址
      arcgisServer: '11.23.2.100'
    },
    'development': {
      baseUrl: 'http://11.23.24.252:1000', // AJAX的baseUrl
      cityMakerServer: '11.23.54.2', // 三维服务地址
      arcgisServer: '11.23.2.10'
    }
  },
  'sanSheng': {
    'production': {
      baseUrl: 'a', // AJAX的baseUrl
      cityMakerServer: 'b', // 三维服务地址
      arcgisServer: 'c'// 二维服务地址
    },
    'development': {
      baseUrl: 'c', // AJAX的baseUrl
      cityMakerServer: 'c', // 三维服务地址
      arcgisServer: 'c'// 二维服务地址
    }
  }
}
let NODE_ENV = process.env.NODE_ENV
let HOST_ENV = process.env.HOST_ENV
if (HOST_ENV === '' || HOST_ENV === 'scriptsprependnodepathauto') {
  for (let key in ENV_LIST) {
    HOST_ENV = key
    console.error(`该模式运行没有附带正确的运行信息,将运行${HOST_ENV}的环境`)
    break
  }
}
if (!ENV_LIST[HOST_ENV]) {
  console.error(`环境列表中不存在该环境(${HOST_ENV})配置项的信息`, ENV_LIST)
}
const ENV_INFO = ENV_LIST[HOST_ENV][NODE_ENV]
if (!ENV_INFO) {
  console.error(`该环境配置项:${HOST_ENV}中不存在该环境(${NODE_ENV})的配置信息`, ENV_LIST[HOST_ENV])
}
// TODO 这里是如何使用不同环境下的不同变量了
console.log('当前环境:', NODE_ENV, HOST_ENV, ENV_INFO)

export default ENV_INFO
