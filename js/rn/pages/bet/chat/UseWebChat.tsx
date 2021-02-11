import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
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
import { BetLotteryData, ShareBetLotteryData } from '../../../public/network/it/bet/IBetLotteryParams'
import { anyEmpty } from '../../../public/tools/Ext'
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1'
import { ChatRoomModel } from '../../../public/network/Model/chat/ChatRoomModel'
import { currentChatRoomId } from '../board/tools/chat/ChatTools'
import { Toast } from '../../../public/tools/ToastUtils'
import { Share2ChatStatus } from '../../../public/network/Model/chat/ShareChatRoomModel'

/**
 * 彩票下注 功能面板
 * @constructor
 */
const UseWebChat = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息
  const gameTabIndex = UGStore.globalProps?.gameTabIndex//当前是 彩票Tab / 聊天Tab
  const shareChatModel = UGStore.globalProps?.shareChatModel//分享数据和聊天菜单

  const [chatUrl, setChatUrl] = useState<string>(null) //聊天链接
  const [sharable, setSharable] = useState(false) //当前聊天室可不可以分享
  const webChatRef = useRef(null)

  useEffect(() => {
    requestChatRoom().then((res) => {
      UGStore.dispatch({ type: 'reset', chatRoomIndex: 0, chatRoomData: res?.data })
    })
  }, [])

  /**
   * 切换了聊天室
   */
  useEffect(() => {

    if (anyEmpty(currentChatRoomId())) return

    switch (Platform.OS) {
      case 'ios':
        //TODO iOS 生成聊天室链接
        break
      case 'android':
        ANHelper.callAsync(CMD.ENCRYPTION_PARAMS, { params: {} }).then((res) => {
          const newUrl = `${AppDefine.host}${systemInfo?.chatLink}?from=app&back=hide&hideHead=true&roomId=${currentChatRoomId()}&color=${Skin1.themeColor.slice(1)}&endColor=&logintoken=${res?.apiToken}&loginsessid=${res?.apiSid}`
          ugLog('chatUrl = ', newUrl != chatUrl, newUrl)
          newUrl != chatUrl && setChatUrl(newUrl)
        })
        break
    }
  }, [currentChatRoomId()])

  useEffect(() => {
    if (shareChatModel?.shareStatus == Share2ChatStatus.STARTING) {
      if (sharable) {//开始分享
        const shareBet = shareChatModel?.betData?.betParams?.betBean?.map((item, index) => ({
          betMoney: item?.money,
          index: index.toString(),
          name: item?.name,
          odds: item?.odds,
        } as ShareBetLotteryData))

        const shareBetAllInfo = {
          ...shareChatModel?.betData?.betShareModel,
          roomId: currentChatRoomId(),
        } as BetShareModel

        const shareInfo = `shareBet(${JSON.stringify(shareBet)},${JSON.stringify(shareBetAllInfo)})`
        ugLog('shareInfo = ', shareInfo)
        webChatRef?.current?.injectJavaScript(shareInfo)
        UGStore.dispatch({
          type: 'reset', chatArray: [], shareChatModel: {},
        })

      } else {
        Toast('该聊天室不支持分享')
      }
    }
  }, [shareChatModel?.shareStatus])

  /**
   *
   * 请求聊天室列表
   */
  const requestChatRoom = async (): Promise<ChatRoomModel> => {

    const { data } = await api.chat.chatList().promise

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
      case 'bet'://聊天室加载完毕
        setTimeout(() => {
          //当前聊天室是否支持分享
          webChatRef?.current?.injectJavaScript('window.canShare')
        }, 1000)
        break
      case 'window.canShare'://是否可以分享
        const blShare = dataJson?.data == 'true'
        setSharable(blShare)
        // const shareInfo = `shareBet([{"betMoney":"10.00","index":"0","name":"01","odds":"48.8000"},{"betMoney":"10.00","index":"1","name":"02","odds":"48.8000"}],{"activeReturnCoinRatio":"0","betParams":[{"money":"10.00","name":"01","odds":"48.8000","playId":"7108938"},{"money":"10.00","name":"02","odds":"48.8000","playId":"7108939"}],"code":"TM","displayNumber":"2102100064","ftime":"1612961990","gameId":"129","gameName":"二十分六合彩","playNameArray":[{"playName1":"特码B-01","playName2":"01"},{"playName1":"特码B-02","playName2":"02"}],"specialPlay":false,"totalMoney":"20.00","totalNums":"2","turnNum":"2102100064","roomId":"0"})`
        // webChatRef?.current?.injectJavaScript(shareInfo)
        break
      case 'return_lottery'://返回下注
        UGStore.dispatch({ type: 'reset', gameTabIndex: GameTab.LOTTERY })
        break
      case 'bet_lottery'://跟注
        const betData = dataJson?.data as BetShareModel
        follow2Bet(betData)
        break
    }
  }

  return {
    sharable,
    webChatRef,
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
