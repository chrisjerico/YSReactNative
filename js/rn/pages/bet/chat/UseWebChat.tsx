import * as React from 'react'
import { useEffect, useState } from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import AppDefine from '../../../public/define/AppDefine'
import { ANHelper } from '../../../public/define/ANHelper/ANHelper'
import { CMD } from '../../../public/define/ANHelper/hp/CmdDefine'
import { ugLog } from '../../../public/tools/UgLog'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { Platform } from 'react-native'
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes'
import { GameTab } from '../const/LotteryConst'
import { BetShareModel, PlayNameArray } from '../../../redux/model/game/bet/BetShareModel'
import { BetLotteryData, IBetLotteryParams } from '../../../public/network/it/bet/IBetLotteryParams'
import { LotteryResultModel } from '../../../public/network/Model/lottery/result/LotteryResultModel'
import { numberToFloatString } from '../../../public/tools/StringUtil'
import { anyEmpty, arrayEmpty, arrayLength, dicNull } from '../../../public/tools/Ext'
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1'
import { syncUserInfo } from '../../../public/tools/user/UserTools'
import { hideLoading, showLoading } from '../../../public/widget/UGLoadingCP'
import { ChatRoomModel } from '../../../public/network/Model/chat/ChatRoomModel'
import { currentChatRoomId } from '../board/tools/chat/ChatTools'

/**
 * 彩票下注 功能面板
 * @constructor
 */
const UseWebChat = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息
  const gameTabIndex = UGStore.globalProps?.gameTabIndex//当前是 彩票Tab / 聊天Tab

  const [chatUrl, setChatUrl] = useState<string>(null) //聊天链接

  useEffect(() => {

    if(anyEmpty(currentChatRoomId())) return

    switch (Platform.OS) {
      case 'ios':
        //TODO iOS 生成聊天室链接
        break
      case 'android':
        ANHelper.callAsync(CMD.ENCRYPTION_PARAMS, { params: {} }).then((res) => {
          const chatUrl = `${AppDefine.host}${systemInfo?.chatLink}?from=app&back=hide&hideHead=true&roomId=${currentChatRoomId()}&color=${Skin1.themeColor.slice(1)}&endColor=&logintoken=${res?.apiToken}&loginsessid=${res?.apiSid}`
          ugLog('chatUrl = ', chatUrl)
          setChatUrl(chatUrl)
        })
        break
    }
  }, [currentChatRoomId()])

  useEffect(() => {
    showLoading()
    requestChatRoom().then((res) => {
      UGStore.dispatch({type: 'reset', chatRoomIndex: 0, chatRoomData: res?.data})
    })
  }, [])

  /**
   *
   * 请求聊天室列表
   */
  const requestChatRoom = async (): Promise<ChatRoomModel> => {

    const { data } = await api.chat.chatList().promise
    hideLoading()

    ugLog('requestChatRoom data = ', JSON.stringify(data))

    return data

  }

  /**
   * 下注数据转换为聊天数据
   * @param betData
   */
  const follow2Bet = (betData?: BetShareModel) => {
    const newData = {
      ...betData,
      playNameArray: betData?.playNameArray?.map((item, index) => (
        { ...item, exFlag: index.toString() } as PlayNameArray),
      ),
      betBean: betData?.betBean?.map((item, index) => (
        { ...item, exFlag: index.toString() } as BetLotteryData),
      ),
    } as BetShareModel

    UGStore.dispatch({ type: 'reset', betShareModel: newData })
  }

  /**
   * 处理Web消息交互
   * @param event
   */
  const handleMessage = (event: WebViewMessageEvent) => {
    ugLog('web chat = ', event?.nativeEvent?.data)
    const dataJson: IWebViewMessageEventData = JSON.parse(event?.nativeEvent?.data)
    switch (dataJson?.type) {
      case 'return_lottery':
        UGStore.dispatch({ type: 'reset', gameTabIndex: GameTab.LOTTERY })
        break
      case 'bet_lottery':
        const betData = dataJson?.data as BetShareModel
        follow2Bet(betData)
        break
    }
  }

  return {
    chatUrl,
    gameTabIndex,
    userInfo,
    systemInfo,
    handleMessage,
  }
}

interface IWebViewMessageEventData {
  type?: string, //类型 返回聊天室 或 跟注
  data?: string, //具体附带数据
}

export default UseWebChat
