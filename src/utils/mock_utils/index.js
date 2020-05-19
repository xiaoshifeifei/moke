// 引入mockjs
import {GET} from './types/get'
import {POST} from './types/post'

const Mock = require('mockjs')
Mock.setup({
  timeout: '200-600' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})

for (let api in GET) {
  // Mock.mock(api, 'get', GET[api])
  Mock.mock(RegExp(api + '\\?.*'), 'get', GET[api])
}
for (let api in POST) {
  Mock.mock(api, 'post', POST[api])
}

/** 详细请查看 https://github.com/nuysoft/Mock/wiki/Basic
 Type             Method
 Basic            boolean, natural, integer, float, character, string, range, date, time, datetime, now
 Image            image, dataImage
 Color            color
 Text             paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle
 Name             first, last, name, cfirst, clast, cname
 Web              url,domain, email, ip, tld
 Address          area, region
 Helper           capitalize, upper, lower, pick, shuffle
 Miscellaneous    guid, id
 */
