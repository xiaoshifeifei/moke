/**
 * @fileOverview 时间的操作工具类
 * @author pc c
 * @version 0.1
 */
/** ********************以下所有的时间操作都支持，时间戳，时间字符串，时间对象的创建或者计算*******************/
/** ********************format为true，就是时间戳格式*******************/
/** ********************date不传或者为null，就是当前时间*******************/
export const _DateUtil = (function () {
  return {
    /**
         * 移除后三位
         * @param timestamp
         * @returns {number}
         */
    removeLastThree: function (timestamp) {
      timestamp = timestamp + ''
      return parseInt(timestamp.substr(0, timestamp.length - 3))
    },
    /**
         * 获得指定时间的时间对象实例    不传，默认返回当前时间的时间对象实例
         * @param {number|string|Object} date   时间---支持 （时间戳，时间字符串，Date对象实例）
         * @returns {Object} 时间对象实例
         */
    createDate: function (date) {
      if (date) {
        if (typeof date !== 'object') {
          // date=date.replace(/\-/g,'/');
          date = new Date(date)
        }
      } else {
        date = new Date()
      }
      return date
    },
    /**
         * 获得指定时间的时间戳    不传，默认返回当前时间的时间戳
         * @param {number|string|Object} date   时间---支持 （时间戳，时间字符串，Date对象实例）
         * @returns {number} 时间戳
         */
    getTimestampByDate: function (date) {
      return _DateUtil.createDate(date).getTime()
    },
    /**
         * 根据时间格式化成对应的格式
         * @param {number|string|Object} date  时间---支持 （时间戳，时间字符串，Date对象实例）
         * @param {string|boolean} format 格式化的字符串或者是否得到时间戳  例如:"yyyy-MM-dd hh:mm:ss"   或者 "yyyy年MM月dd日hh时mm分ss秒"
         * @returns {*|string} 返回格式化后的时间
         */
    formatByTime: function (date, format) {
      if (typeof format === 'boolean' && format) {
        return _DateUtil.getTimestampByDate(date)
      }
      format = format || 'yyyy-MM-dd hh:mm:ss'
      if (!date) {
        date = new Date()
      } else if (typeof date !== 'object') {
        date = date.replace(/-/g, '/')
        date = date.replace('.000+0000', '')
        date = new Date(date)
      }
      // 网上摘抄的
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) { format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      }
      return format
    },
    /**
         * 时间相差的天数
         * @param {number|string|Object} sT   时间---支持 （时间戳，时间字符串，Date对象实例）
         * @param {number|string|Object} eT   时间---支持 （时间戳，时间字符串，Date对象实例）
         * @param isPositive 是否一定返回正整数  默认false
         * @returns {number}
         */
    getTimeDiffDay: function (sT, eT, isPositive) {
      var dateDiff = _DateUtil.getTimeDiffMillisecond(sT, eT, isPositive)
      if (dateDiff > 0 || isPositive) {
        return Math.floor(dateDiff / 86400000) // 24 * 3600 * 1000
      } else {
        return Math.ceil(dateDiff / 86400000)
      }
    },
    /**
         * 时间相差的时数
         * @param {number|string|Object} sT   时间---支持 （时间戳，时间字符串，Date对象实例）
         * @param {number|string|Object} eT   时间---支持 （时间戳，时间字符串，Date对象实例）
         * @param isPositive 是否一定返回正整数  默认false
         * @returns {number}
         */
    getTimeDiffHour: function (sT, eT, isPositive) {
      var dateDiff = _DateUtil.getTimeDiffMillisecond(sT, eT, isPositive)
      if (dateDiff > 0 || isPositive) {
        return Math.floor(dateDiff / 3600000) // 3600 * 1000
      } else {
        return Math.ceil(dateDiff / 3600000)
      }
    },
    /**
         * 时间相差的毫秒数
         * @param {number|string|Object} sT   时间---支持 （时间戳，时间字符串，Date对象实例）
         * @param {number|string|Object} eT   时间---支持 （时间戳，时间字符串，Date对象实例）
         * @param isPositive 是否一定返回正整数  默认false
         * @returns {number}
         */
    getTimeDiffMillisecond: function (sT, eT, isPositive) { // 时间差的毫秒数
      sT = _DateUtil.getTimestampByDate(sT)
      eT = _DateUtil.getTimestampByDate(eT)
      var diff = eT - sT
      if (isPositive) {
        return diff > 0 ? diff : -diff
      }
      return diff
    },
    /**
         * 获得指定时间的间隔数年的时间
         * @param {number} diffDay 间隔的年数  可以设置正负值，分别获得其前后差的年数
         * @param {number|string|Object} date  时间---支持 （时间戳，时间字符串，Date对象实例） 默认当前时间
         * @param {string|boolean} format 格式化的字符串或者是否得到时间戳  例如:"yyyy-MM-dd hh:mm:ss" 或者true
         * @returns {*|string} 返回格式化后的时间
         */
    getTimeByDisYear: function (diffDay, date, format) {
      date = _DateUtil.createDate(date)
      date.setFullYear(date.getFullYear() + diffDay)
      return _DateUtil.formatByTime(date, format)
    },
    /**
         * 获得指定时间的间隔月数后的时间
         * @param {number} diffMonth 间隔的月数  可以设置正负值，分别获得其前后差的月数
         * @param {number|string|Object} date  时间---支持 （时间戳，时间字符串，Date对象实例） 默认当前时间
         * @param {string|boolean} format 格式化的字符串或者是否得到时间戳  例如:"yyyy-MM-dd hh:mm:ss" 或者true
         * @returns {*|string} 返回格式化后的时间
         */
    getTimeByDisMonth: function (diffMonth, date, format) {
      date = _DateUtil.createDate(date)
      date.setMonth(date.getMonth() + diffMonth)
      return _DateUtil.formatByTime(date, format)
    },
    /**
         * 获得指定时间的间隔周数后的时间
         * @param {number} diffWeek 间隔的周数  可以设置正负值，分别获得其前后差的周数
         * @param {number|string|Object} date  时间---支持 （时间戳，时间字符串，Date对象实例） 默认当前时间
         * @param {string|boolean} format 格式化的字符串或者是否得到时间戳  例如:"yyyy-MM-dd hh:mm:ss" 或者true
         * @returns {*|string} 返回格式化后的时间
         */
    getTimeByDisWeek: function (diffWeek, date, format) {
      date = _DateUtil.createDate(date)
      date.setDate(date.getDate() + diffWeek * 7)
      return _DateUtil.formatByTime(date, format)
    },
    /**
         * 获得指定时间的间隔天数后的时间
         * @param {number} diffDay 间隔的天数  可以设置正负值，分别获得其前后差的天数
         * @param {number|string|Object} date  时间---支持 （时间戳，时间字符串，Date对象实例） 默认当前时间
         * @param {string|boolean} format 格式化的字符串或者是否得到时间戳  例如:"yyyy-MM-dd hh:mm:ss" 或者true
         * @returns {*|string} 返回格式化后的时间
         */
    getTimeByDisDay: function (diffDay, date, format) {
      date = _DateUtil.createDate(date)
      date.setDate(date.getDate() + diffDay)
      return _DateUtil.formatByTime(date, format)
    },
    /**
         * 获得指定时间的间隔小时数后的时间
         * @param {number} diffHour 间隔的小时数  可以设置正负值，分别获得其前后差的时数
         * @param {number|string|Object} date  时间---支持 （时间戳，时间字符串，Date对象实例） 默认当前时间
         * @param {string|boolean} format 格式化的字符串或者是否得到时间戳  例如:"yyyy-MM-dd hh:mm:ss" 或者true
         * @returns {*|string} 返回格式化后的时间
         */
    getTimeByDisHour: function (diffHour, date, format) {
      date = _DateUtil.createDate(date)
      date.setHours(date.getHours() + diffHour)
      return _DateUtil.formatByTime(date, format)
    },
    /**
         * 获得指定时间的间隔分钟数后的时间
         * @param {number} diffHour 间隔的分钟  可以设置正负值，分别获得其前后差的分钟数
         * @param {number|string|Object} date  时间---支持 （时间戳，时间字符串，Date对象实例） 默认当前时间
         * @param {string|boolean} format 格式化的字符串或者是否得到时间戳  例如:"yyyy-MM-dd hh:mm:ss" 或者true
         * @returns {*|string} 返回格式化后的时间
         */
    getTimeByDisMinute: function (diffMinute, date, format) {
      date = _DateUtil.createDate(date)
      date.setMinutes(date.getMinutes() + diffMinute)
      return _DateUtil.formatByTime(date, format)
    },
    /**
         * 获得指定时间的间隔秒数后的时间
         * @param {number} diffSecond 间隔的秒数  可以设置正负值，分别获得其前后差的秒数
         * @param {number|string|Object} date  时间---支持 （时间戳，时间字符串，Date对象实例） 默认当前时间
         * @param {string|boolean} format 格式化的字符串或者是否得到时间戳  例如:"yyyy-MM-dd hh:mm:ss" 或者true
         * @returns {*|string} 返回格式化后的时间
         */
    getTimeByDisSecond: function (diffSecond, date, format) {
      date = _DateUtil.createDate(date)
      date.setSeconds(date.getSeconds() + diffSecond)
      return _DateUtil.formatByTime(date, format)
    },
    /**
         * 天-向上取整
         * @param {number|string|Object} date  时间---支持 （时间戳，时间字符串，Date对象实例） 默认当前时间
         * @param {string|boolean} format 格式化的字符串或者是否得到时间戳  例如:"yyyy-MM-dd hh:mm:ss" 或者true
         * @returns {*} 返回格式化后的时间
         */
    getCeilDay: function (date, format) {
      date = _DateUtil.createDate(date)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      date = _DateUtil.createDate(year + '/' + month + '/' + day)
      return _DateUtil.formatByTime(date, format)
    },
    /**
         * 小时-向上取整
         * @param {number|string|Object} date  时间---支持 （时间戳，时间字符串，Date对象实例） 默认当前时间
         * @param {string|boolean} format 格式化的字符串或者是否得到时间戳  例如:"yyyy-MM-dd hh:mm:ss" 或者true
         * @returns {*} 返回格式化后的时间
         */
    getCeilHour: function (date, format) {
      date = _DateUtil.createDate(date)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      date = _DateUtil.createDate(year + '/' + month + '/' + day + ' ' + hour + ':00:00')
      return _DateUtil.formatByTime(date, format)
    },
    /**
         * 分钟-向上取整
         * @param {number|string|Object} date  时间---支持 （时间戳，时间字符串，Date对象实例） 默认当前时间
         * @param {string|boolean} format 格式化的字符串或者是否得到时间戳  例如:"yyyy-MM-dd hh:mm:ss" 或者true
         * @returns {*} 返回格式化后的时间
         */
    getCeilMinute: function (date, format) {
      date = _DateUtil.createDate(date)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      date = _DateUtil.createDate(year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':00')
      return _DateUtil.formatByTime(date, format)
    }
  }
})()
/* 示例
console.log("当前时间戳", _DateUtil.getTimestampByDate())

console.log("2018.09.25的时间戳", _DateUtil.getTimestampByDate("2018.09.25"))
console.log("2018.09.25的时间格式化默认格式", _DateUtil.formatByTime("2018.09.25"))
console.log("当前时间格式化", _DateUtil.formatByTime(null, "yyyy年MM月dd日hh时mm分ss秒"))
console.log("两个时间相差的天数", _DateUtil.getTimeDiffDay(new Date(), "2019-1-02 11:12:36"))
console.log("两个时间相差的小时数", _DateUtil.getTimeDiffHour(new Date(), "2019-1-02 11:12:36"))
console.log("两个时间相差的秒数", _DateUtil.getTimeDiffMillisecond(new Date(), "1991-12-02 11:12:36"))

console.log("当前时间的1年后", _DateUtil.getTimeByDisYear(1));
console.log("当前时间的22个月后", _DateUtil.getTimeByDisMonth(22));
console.log("当前时间的一周前，并且转为时间戳", _DateUtil.getTimeByDisWeek(-1, null, true));//format为true，就是时间戳格式
console.log("2019-01-02 00:00:00五天后的时间", _DateUtil.getTimeByDisDay(5, "2019-01-02 00:00:00"));
console.log("当前时间的两个小时前", _DateUtil.getTimeByDisHour(-2));
console.log("当前时间的两个分钟前", _DateUtil.getTimeByDisMinute(-2));
console.log("当前时间的60s后", _DateUtil.getTimeByDisSecond(60));
console.log("当前时间的五天后的时间，并且转为时间戳", _DateUtil.getTimeByDisDay(5, null, true));//format为true，就是时间戳格式

*/
