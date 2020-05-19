/*
 * @Description:
 * @Version: 0.1
 * @Autor: Civet
 * @Date: 2019-10-14 10:38:41
 * @LastEditors: 自己洗小红花
 * @LastEditTime: 2020-02-27 14:44:14
 */
class Util {
  /**
   * 通过正则表达式获取url后的指定参数
   * @param url
   * @param name
   * @returns {*}
   * @constructor
   */
  getQueryString(url, name) {
    url = window.decodeURI(url)
    url = url.split('?')[1]
    url = '?' + url
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = url.substr(1).match(reg)
    if (r) return unescape(r[2])
    return null
  }
}
export const util = new Util()
