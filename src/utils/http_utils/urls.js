export const urls = new Map()
const GET = new Map()
const POST = new Map()
const PUT = new Map()
const DELETE = new Map()
urls.set('get', GET)
urls.set('post', POST)
urls.set('put', PUT)
urls.set('delete', DELETE)

/** ******************GET请求*******************************/
GET.set('userInfo', '/user/userinfo')// 测试get
// GET.set('getUserInfo', 'https://www.easy-mock.com/mock/5be624cce2b77406e39e363d/example/demo1')// 测试get

/** ******************POST请求*******************************/
POST.set('userInfo', '/user/userinfo')// 测试post

/** ******************PUT请求*******************************/
PUT.set('testPut', 'https://www.easy-mock.com/mock/5be624cce2b77406e39e363d/example/testPut')// 修改用户

/** ******************DELETE请求*******************************/
DELETE.set('testDelete', 'https://www.easy-mock.com/mock/5be624cce2b77406e39e363d/example/testDelete') // 删除用户
