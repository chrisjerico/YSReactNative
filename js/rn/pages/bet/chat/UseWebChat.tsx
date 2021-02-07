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
import { BetLotteryData } from '../../../public/network/it/bet/IBetLotteryParams'

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
    switch (Platform.OS) {
      case 'ios':
        //TODO iOS 生成聊天室链接
        break
      case 'android':
        ANHelper.callAsync(CMD.ENCRYPTION_PARAMS, { params: {} }).then((res) => {
          const chatUrl = `${AppDefine.host}${systemInfo?.chatLink}?from=app&back=hide&hideHead=true&roomId=0&color=${Skin1.themeColor.slice(1)}&endColor=&logintoken=${res?.apiToken}&loginsessid=${res?.apiSid}`
          ugLog('chatUrl = ', chatUrl)
          setChatUrl(chatUrl)
        })
        break
    }
  }, [])

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
