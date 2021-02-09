import { UGStore } from '../../../../../redux/store/UGStore'
import { arrayLength, dicNull } from '../../../../../public/tools/Ext'
import { ugLog } from '../../../../../public/tools/UgLog'
import { IMiddleMenuItem } from '../../../../../public/components/menu/MiddleMenu'

//当前聊天室ID
const currentChatRoomId = (): string => {
  const chatRoomIndex = UGStore.globalProps?.chatRoomIndex//当前聊天室索引
  const chatRoomData = UGStore.globalProps?.chatRoomData//聊天室
  return dicNull(chatRoomData) || chatRoomIndex >= arrayLength(chatRoomData?.chatAry) ?
    null :
    chatRoomData?.chatAry[chatRoomIndex]?.roomId
}

//当前聊天室名字
const currentChatRoomName = (): string => {
  const chatRoomIndex = UGStore.globalProps?.chatRoomIndex//当前聊天室索引
  const chatRoomData = UGStore.globalProps?.chatRoomData//聊天室
  return dicNull(chatRoomData) || chatRoomIndex >= arrayLength(chatRoomData?.chatAry) ?
    null :
    chatRoomData?.chatAry[chatRoomIndex]?.roomName
}

//聊天菜单选项
const chatMenuArray = (): Array<IMiddleMenuItem>  => {
  const newMenu = UGStore.globalProps?.chatRoomData?.chatAry?.map((item) => {
    return (({
      title: `${item?.roomName}`,
      id: item?.roomId,
    } as IMiddleMenuItem))
  })
  return newMenu
}


export {
  currentChatRoomId,
  currentChatRoomName,
  chatMenuArray,
}
