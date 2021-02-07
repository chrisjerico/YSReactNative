import { UGStore } from '../../../../../redux/store/UGStore'
import { arrayLength, dicNull } from '../../../../../public/tools/Ext'
import { ugLog } from '../../../../../public/tools/UgLog'

//当前聊天室ID
const currentChatRoomId = () => {
  const chatRoomIndex = UGStore.globalProps?.chatRoomIndex//当前聊天室索引
  const chatRoomData = UGStore.globalProps?.chatRoomData//聊天室
  return dicNull(chatRoomData) && chatRoomIndex < arrayLength(chatRoomData?.chatAry) ?
    null :
    chatRoomData?.chatAry[chatRoomIndex]?.roomId
}

//当前聊天室名字
const currentChatRoomName = () => {
  const chatRoomIndex = UGStore.globalProps?.chatRoomIndex//当前聊天室索引
  const chatRoomData = UGStore.globalProps?.chatRoomData//聊天室
  return dicNull(chatRoomData) && chatRoomIndex < arrayLength(chatRoomData?.chatAry) ?
    null :
    chatRoomData?.chatAry[chatRoomIndex]?.roomName
}


export {
  currentChatRoomId,
  currentChatRoomName,
}
