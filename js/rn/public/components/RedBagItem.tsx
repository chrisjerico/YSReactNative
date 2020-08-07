import { RedBagDetailActivityModel } from "../network/Model/RedBagDetailActivityModel"
import { IGlobalState, UGStore } from "../../redux/store/UGStore"
import { useState, useEffect } from "react"
import { Alert, Image, TouchableWithoutFeedback } from "react-native"
import { navigate } from "../navigation/RootNavigation"
import { PageName } from "../navigation/Navigation"
import PushHelper from "../define/PushHelper"
import FastImage from "react-native-fast-image"
import React from 'react'
import { useDimensions } from '@react-native-community/hooks'
const RedBagItem = ({ redBag, loginPage }: { redBag: RedBagDetailActivityModel, loginPage?: PageName }) => {
  const { width, height } = useDimensions().screen
  const { isTest = false, uid = "" } = UGStore.globalProps.userInfo
  const [redBagVisiable, setRedBagVisiable] = useState(false)
  useEffect(() => {
    if (redBag) {
      setRedBagVisiable(true)
    }
  }, [redBag])
  if (redBagVisiable) {
    return (

      <TouchableWithoutFeedback onPress={() => {
        if (uid == "") {
          Alert.alert("温馨提示", "该贴注册会员才能阅读，请登录后查看。", [
            { text: "已取消", onPress: () => { }, style: "cancel" },
            {
              text: "马上登录", onPress: () => {
                loginPage ? navigate(loginPage, {}) : PushHelper.pushLogin()
              },
            }
          ])
        } else if (isTest) {
          Alert.alert("温馨提示", "请登录正式账号", [
            { text: "已取消", onPress: () => { }, style: "cancel" },
            {
              text: "马上登录", onPress: () => {
                loginPage ? navigate(loginPage, {}) : PushHelper.pushLogin()
              },
            }
          ])
        } else {
          PushHelper.pushRedBag(redBag)
        }
      }}>
        <FastImage style={{ width: 70, height: 70, position: 'absolute', top: height * 0.4, right: 30, zIndex: 100 }} source={{ uri: redBag?.data?.redBagLogo }} >
          <TouchableWithoutFeedback onPress={() => {
            setRedBagVisiable(false)
          }}>
            <Image style={{ width: 20, height: 20, right: 0, top: 0, position: 'absolute' }} source={{ uri: "dialog_close" }} />
          </TouchableWithoutFeedback>
        </FastImage>
      </TouchableWithoutFeedback>)
  } else {
    return null
  }

}
export default RedBagItem
