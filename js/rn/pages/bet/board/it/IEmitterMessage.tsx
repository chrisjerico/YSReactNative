/**
 * 封盘消息
 */

interface IEmitterMessage {
  locked?: boolean //是否封盘
  hintText?: string //提醒文字
}

export {
  IEmitterMessage,
}
