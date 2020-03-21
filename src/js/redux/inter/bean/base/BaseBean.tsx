/**
 * 服务器返回的数据
 */
export default interface BaseBean<T> {
  code: number, //错误码
  msg: string,  //提示语
  data: T,  //对象
}
