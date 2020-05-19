import axios from 'axios'
// import Qs from 'qs'
import {urls} from './urls'
import formatGet from './format/get'
import formatPost from './format/post'
// 那里需要引入即可，这里只是测试
import getEnvInfo from './getEnvInfo'
console.log(getEnvInfo)
// TODO 请写书环境吧
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    // TODO 后期token认真在这里做
    return config
  },
  error => {
    return Promise.reject(error.data.error.message)
  }
)
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    let method = res.config.method.toLowerCase()
    if (method === 'get') {
      let sendKey = res.config.params._sendKey
      if (formatGet[sendKey]) {
        return formatGet[sendKey](res.data)
      }
    } else if (method === 'post') {
      let sendKey = JSON.parse(res.config.data)._sendKey
      if (formatPost[sendKey]) {
        return formatPost[sendKey](res.data)
      }
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)
const https = {}
for (let [method, mapObj] of urls) {
  if (!https[method]) {
    https[method] = {}
  }
  for (let [key, url] of mapObj) {
    https[method][key] = function (params = {}) {
      params._sendKey = key
      if (method === 'get') {
        params._ = new Date().getTime()
        params = {params}
      }
      console.log(method, key, url, params)
      return axios[method](url, params)
    }
  }
}
window._https = https
