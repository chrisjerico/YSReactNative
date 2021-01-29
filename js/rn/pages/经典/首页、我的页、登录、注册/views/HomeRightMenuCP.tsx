import { scale } from "chroma-js"
import React, { useState, useRef, useEffect } from "react"
import { View, Text, Image, Animated, Easing } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MenuModalComponent from "../../../../public/components/tars/MenuModalComponent"
import PushHelper, { UGLinkPositionType } from "../../../../public/define/PushHelper"
import { api } from "../../../../public/network/NetworkRequest1/NetworkRequest1"
import { skin1 } from "../../../../public/theme/UGSkinManagers"
import { UGColor } from "../../../../public/theme/UGThemeColor"
import { sc } from "../../../../public/tools/Scale"
import { goToUserCenterType } from "../../../../public/tools/tars"
import List from "../../../../public/views/tars/List"
import { UGUserCenterType } from "../../../../redux/model/全局/UGSysConfModel"
import { UGStore } from "../../../../redux/store/UGStore"
import { img_assets, img_images } from "../../../../Res/icon"
import { FastImagePlaceholder, ImagePlaceholder } from "../../tools/ImagePlaceholder"


export interface HomeRightMenuCP {
  showRightMenuCP: () => void
  refreshBalance: () => void
}

interface HomeRightMenuProps {
  menus: Object[]
  appVersion: string,
  showDepositAndWithdrawalBtn: boolean
  c_ref: HomeRightMenuCP
}

export const HomeRightMenuCP = (props: HomeRightMenuProps) => {
  const { menus, appVersion, showDepositAndWithdrawalBtn, c_ref } = props
  const { unsettleAmount, todayWinAmount } = UGStore.globalProps?.userInfo
  const menuModalComponent = useRef(null)

  useEffect(() => {
    // 打开时刷新余额
    c_ref && (c_ref.showRightMenuCP = () => {
      menuModalComponent?.current?.open()
      c_ref?.refreshBalance && c_ref?.refreshBalance()
    })
  }, [c_ref])

  return <MenuModalComponent
    ref={menuModalComponent}
    renderMenu={() => {
      const [state, setState] = useState(0)
      const [balance, setBalance] = useState(UGStore.globalProps?.userInfo?.balance)
      const { current: v } = useRef({
        rotateZ: new Animated.Value(0),
        inAnimated: false,
      })
      const { usr } = UGStore.globalProps?.userInfo

      //旋转方法
      function refreshBalance() {
        if (v.inAnimated) return
        v.inAnimated = true;

        v.rotateZ = new Animated.Value(0)
        setState(state + 1)
        Animated.timing(v.rotateZ, {
          toValue: 12.5, // 最终值 为1，这里表示最大旋转 360度
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          v.inAnimated = false;
        })

        api.user.balance().useSuccess((res) => {
          UGStore.dispatch({ type: 'merge', userInfo: { balance: res?.data?.balance } }, false)
          setBalance(res?.data?.balance)
        })
      }
      c_ref && (c_ref.refreshBalance = refreshBalance)

      return (
        <View style={{ height: '100%', backgroundColor: '#fff' }}>
          <LinearGradient colors={skin1.menuHeadViewColor} start={{ x: 0, y: 0 }} end={{ x: 2, y: 0 }} style={{ height: sc(260), paddingLeft: sc(10) }}>
            <Text style={{ marginTop: sc(115), color: 'white', textAlign: 'center', fontSize: sc(24.5) }}>欢迎您！</Text>
            <Text style={{ marginTop: sc(42), color: 'white', textAlign: 'center', fontSize: sc(21.5) }}>{usr}</Text>
            <Text style={{ marginTop: sc(8), color: 'white', textAlign: 'center', fontSize: sc(21.5) }}>{'¥' + balance}</Text>
            <Button style={{ marginTop: -sc(44), marginLeft: sc(175) }} buttonStyle={{ backgroundColor: 'transparent' }} onPress={refreshBalance} icon={(
              <Animated.View style={{ transform: [{ rotateZ: v.rotateZ }] }}>
                <MaterialCommunityIcons name={'refresh'} size={sc(42)} color={'white'} />
              </Animated.View>
            )} />
          </LinearGradient>
          {showDepositAndWithdrawalBtn && <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: sc(14), paddingHorizontal: sc(6) }}>
            <Button
              icon={<Image source={{ uri: img_assets('chongzhi@2x') }} style={{ height: sc(34), aspectRatio: 1, tintColor: '#fff' }} />}
              buttonStyle={{ paddingVertical: sc(7.5), paddingHorizontal: sc(16), backgroundColor: skin1.themeColor, borderRadius: sc(8) }}
              titleStyle={{ marginLeft: sc(7), fontSize: sc(20) }}
              title='充值'
              onPress={() => {
                menuModalComponent?.current?.close()
                PushHelper.pushUserCenterType(UGUserCenterType.存款)
              }}
            />
            <Button
              icon={<Image source={{ uri: img_assets('tixian@2x') }} style={{ height: sc(34), aspectRatio: 1, tintColor: '#fff' }} />}
              buttonStyle={{ paddingVertical: sc(7.5), paddingHorizontal: sc(16), backgroundColor: skin1.themeColor, borderRadius: sc(8) }}
              titleStyle={{ marginLeft: sc(7), fontSize: sc(20) }}
              title='提现'
              onPress={() => {
                menuModalComponent?.current?.close()
                PushHelper.pushUserCenterType(UGUserCenterType.取款)
              }}
            />
          </View>}
          <View style={{ height: 1, width: '100%', backgroundColor: '#eee' }} />
          <List uniqueKey={'MenuModalComponent'} style={{ flex: 1 }} data={menus} scrollEnabled ListFooterComponent={<View style={{ height: sc(60) }} ><View style={{ height: 1, width: '100%', backgroundColor: '#e9e9e9' }} /></View>} renderItem={({ item }) => {
            const { name, title, icon, logo, subId, isHot } = item

            let text = name ?? title
            subId == UGLinkPositionType.即时注单 && (text = `${text}(${unsettleAmount})`)
            subId == UGLinkPositionType.今日输赢 && (text = `${text}(${todayWinAmount})`)
            subId == UGLinkPositionType.当前版本号 && (text = `${text}(${appVersion})`)

            return (
              <TouchableOpacity style={{ flexDirection: 'row', height: sc(63), alignItems: 'center' }} onPress={() => {
                menuModalComponent?.current?.close()
                PushHelper.pushLinkPositionType(subId)
              }}>
                <ImagePlaceholder source={{ uri: icon ?? logo }} style={{ marginLeft: sc(20), width: sc(37), aspectRatio: 1, tintColor: skin1.themeColor }} />
                <Text style={{ marginLeft: sc(15), flex: 1, fontSize: sc(20) }}>{text}</Text>
                {isHot ? <FastImage source={{ uri: img_images('hot2x') }} style={{ height: '100%', aspectRatio: 1 }} /> : <Entypo name='chevron-thin-right' color={UGColor.LineColor2} size={sc(29)} style={{ marginRight: sc(10) }} />}
                <View style={{ position: 'absolute', top: sc(63), marginLeft: sc(70), width: '100%', height: 1, backgroundColor: '#e9e9e9' }} />
              </TouchableOpacity>
            )
          }} />
        </View>
      )
    }}
  />
}