import * as React from 'react'
import { useEffect, useState } from 'react'
import { Res } from '../../../Res/icon/Res'
import { UGStore } from '../../../redux/store/UGStore'
import SelectedLotteryModel from '../../../redux/model/game/SelectedLotteryModel'
import { anyEmpty } from '../../../public/tools/Ext'
import { Toast } from '../../../public/tools/ToastUtils'
import { checkBetCount } from '../board/tools/BetUtil'
import { LotteryResultData } from '../../../public/network/Model/lottery/result/LotteryResultModel'
import AppDefine from '../../../public/define/AppDefine'
import { ANHelper } from '../../../public/define/ANHelper/ANHelper'
import { CMD } from '../../../public/define/ANHelper/hp/CmdDefine'
import { ugLog } from '../../../public/tools/UgLog'
import APIRouter from '../../../public/network/APIRouter'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { Platform } from 'react-native'
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes'
import { GameTab } from '../const/LotteryConst'


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
        break;
      case 'android':
        ANHelper.callAsync(CMD.ENCRYPTION_PARAMS, { params: {} }).then((res) => {
          const chatUrl = `${AppDefine.host}${systemInfo?.chatLink}?from=app&back=hide&hideHead=true&roomId=0&color=${Skin1.themeColor.slice(1)}&endColor=&logintoken=${res?.apiToken}&loginsessid=${res?.apiSid}`
          ugLog('chatUrl = ', chatUrl)
          setChatUrl(chatUrl)
        })
        break;
    }
  }, [])

  /**
   * 处理消息交互
   * @param event
   */
  const handleMessage = (event: WebViewMessageEvent) => {
    ugLog('web chat = ', event?.nativeEvent?.data)
    switch (event?.nativeEvent?.data) {
      case 'return_lottery':
        UGStore.dispatch({type: 'reset', gameTabIndex: GameTab.LOTTERY})
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

export default UseWebChat
