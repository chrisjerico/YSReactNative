import React, { useEffect, useRef } from 'react';
import WebView from 'react-native-webview';
import { View } from 'react-native';
import { UGBasePageProps } from '../UGPage';
import AppDefine from '../../../public/define/AppDefine';
import { UGStore } from '../../../redux/store/UGStore';
import { pop, replace } from '../../../public/navigation/RootNavigation';
import { UGNavigationBar } from '../../../public/widget/UGNavigationBar';
import { skin1 } from '../../../public/theme/UGSkinManagers';
import PushHelper from '../../../public/define/PushHelper';
import { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel';

export type H5Router = [string, string]
export const H5Router: { [x: string]: H5Router } = {
  路珠: ['路珠', 'lottery/luZhu/70',],
  虚拟币充值教程c084: ['虚拟币充值教程', 'bank/showXnb_transferC084',],
  个人中心: ['个人中心', 'ucenter/index',],
  个人资料: ['个人资料', 'ucenter/myinfo',],
  安全中心: ['安全中心', 'ucenter/myfpwd',],
  建议反馈: ['建议反馈', 'ucenter/feedback',],
  推荐收益: ['推荐收益', 'ucenter/myreco',],
  利息宝: ['利息宝', 'ucenter/yuebao',],
  额度转入转出: ['额度转入转出', 'ucenter/yuebao/in',],
  转入转出记录: ['转入转出记录', 'ucenter/yuebao/cash',],
  收益报表: ['收益报表', 'ucenter/yuebao/settle',],
  资金管理: ['资金管理', 'bank/deposit',],
  提款账户: ['提款账户', 'bank/bank',],
  额度转换: ['额度转换', 'bank/realtrans',],
  任务大厅: ['任务大厅', 'ucenter/task',],
  积分对换: ['积分对换', 'ucenter/taskExChange',],
  积分账变: ['积分账变', 'ucenter/taskChange',],
  等级: ['等级', 'ucenter/taskLevel',],
  优惠活动: ['优惠活动', 'promote',],
  活动彩金申请: ['活动彩金申请', 'ucenter/promote',],
  聊天室列表: ['聊天室列表', 'chat/chatList',],
  全民竞猜: ['全民竞猜', 'ucenter/guessing',],
  我的竞猜: ['我的竞猜', 'ucenter/guessing/myGuess',],
  彩票大厅: ['彩票大厅', 'lottery/list',],
  开奖走势: ['开奖走势', 'ucenter/lottoryTrend',],
  长龙助手: ['长龙助手', 'lottery/changLongBet',],
  今日已结: ['今日已结', 'lottery/settled',],
  彩票注单: ['彩票注单', 'lottery/week',],
  真人注单: ['真人注单', 'lottery/realBetReal',],
  捕鱼注单: ['捕鱼注单', 'lottery/realBetFish',],
  电竞注单: ['电竞注单', 'lottery/realBetEsport',],
  未结注单: ['未结注单', 'lottery/notcount',],
  UG注单: ['UG注单', 'lottery/ugGameList',],
  站内信: ['站内信', 'ucenter/message',],
}

interface H5WebVars {
  canGoBack: boolean
}

// H5页面 WebPgae
export const H5WebPage = ({ setProps, route }: UGBasePageProps<{}, { router?: H5Router }>) => {
  const { sessid, token, username } = UGStore?.globalProps?.userInfo
  const { router } = route?.params
  const { current: v } = useRef<H5WebVars>({ canGoBack: false })
  const webview = useRef<WebView>()

  useEffect(() => {
    setProps({
      backgroundColor: ['#fff', '#fff'],
      didFocus: ({ rpm = { vcName: undefined } }) => {
        const { vcName } = rpm
        if (vcName?.length) {
          route.params.router = H5Router[vcName]
        }
      }
    });
  }, [])

  return <View style={{ flex: 1 }}>
    <UGNavigationBar
      title={router?.[0]}
      gradientColor={skin1.navBarBgColor}
      back
      onBackPress={() => {
        // v.canGoBack ? webview?.current?.goBack() : pop()
        pop()
      }} />
    <WebView
      ref={webview}
      style={{ flex: 1, marginTop: -44 }}
      javaScriptEnabled
      onLoad={(e) => {
        v.canGoBack = e?.nativeEvent?.canGoBack
      }}
      onShouldStartLoadWithRequest={(e) => {
        console.log('onShouldStartLoadWithRequest', e?.url);
        // 若检测到h5首页、h5登录页，则去rn登录页
        const routers = [
          'mobile/#/login',
          'mobile/#/home',
        ]
        for (const i in routers) {
          if (e?.url?.indexOf(routers[i]) != -1) {
            PushHelper.pushUserCenterType(UGUserCenterType.登录页)
            return false
          }
        }
        return true
      }}
      injectedJavaScriptBeforeContentLoaded={sessid?.length ? `
      function setCookie(cookieName, value, expiresTime, path) {
        expiresTime = expiresTime || "Thu, 01-Jan-2030 00:00:01 GMT";
        path = path || "/";
        document.cookie = cookieName + "=" + encodeURIComponent(value) + "; expires=" + expiresTime + "; path=" + path;
      }
      function clearAllCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
          for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
      }
      clearAllCookie();
      setCookie('loginsessid', '${sessid}');
      setCookie('logintoken', '${token}');
      setCookie('username', '${username}');
      ` : undefined}
      source={{ uri: AppDefine.host + '/mobile/#/' + router?.[1] }}
    />
  </View>
}
