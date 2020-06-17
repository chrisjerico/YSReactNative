import { useDimensions } from "@react-native-community/hooks"
import { RedBagDetailActivityModel } from "../network/Model/RedBagDetailActivityModel"
import { IGlobalState } from "../../redux/store/UGStore"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { Alert, Image, View, TouchableWithoutFeedback } from "react-native"
import { navigate } from "../navigation/RootNavigation"
import { PageName } from "../navigation/Navigation"
import PushHelper from "../define/PushHelper"
import FastImage from "react-native-fast-image"
import React from 'react'
const RedBagItem = ({ redBag, loginPage }: { redBag: RedBagDetailActivityModel, loginPage: PageName }) => {
  const { width } = useDimensions().screen
  const { isTest = false, uid = "" } = useSelector((state: IGlobalState) => state.UserInfoReducer)
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
          Alert.alert("温馨提示", "您还未登录", [
            { text: "取消", onPress: () => { }, style: "cancel" },
            {
              text: "马上登录", onPress: () => {
                navigate(loginPage, {})
              },
            }
          ])
        } else if (isTest) {
          Alert.alert("温馨提示", "请先登录您的正式帐号", [
            { text: "取消", onPress: () => { }, style: "cancel" },
            {
              text: "马上登录", onPress: () => {
                navigate(loginPage, {})
              },
            }
          ])
        } else {
          PushHelper.pushRedBag(redBag)
        }
      }}>
        <FastImage style={{ width: 95, height: 95, position: 'absolute', top: 80, right: 20, zIndex: 100 }} source={{ uri: redBag?.data?.redBagLogo }} >
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