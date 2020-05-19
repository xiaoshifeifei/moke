/*
 * @Description: 
 * @Date: 2019-10-08 22:27:09
 * @LastEditors: 自己洗小红花
 * @LastEditTime: 2020-02-27 14:38:37
 */
import {
  util
} from '../util'

export const GET = {
  '/jeecg-boot/sys/login': (req, res) => {
    //    获得参数
    let url = req.url
    let userName = util.getQueryString(url, 'userName')
    console.log('userName', userName)
    let userPassword = util.getQueryString(url, 'userPassword')
    console.log('userPassword', userPassword)
    return {
      type: 'GET',
      status: 200,
      msg: 'ok'
    }
  }
}