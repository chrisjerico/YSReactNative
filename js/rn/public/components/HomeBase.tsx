import React, { ReactElement, Children, useState, useEffect } from 'react'
import { View, ScrollView, Alert, ImageBackground, Image } from 'react-native'
import RedBagItem from './RedBagItem'
import useGetHomeInfo from '../hooks/useGetHomeInfo'
import FastImage, { FastImageSource } from 'react-native-fast-image'
import { useDimensions } from '@react-native-community/hooks'
import { useSelector } from 'react-redux'
import { IGlobalState } from '../../redux/store/UGStore'
import { TurntableListModel } from '../network/Model/TurntableListModel'
import APIRouter from '../network/APIRouter'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { navigate } from '../navigation/RootNavigation'
import { PageName } from '../navigation/Navigation'
import PushHelper from '../define/PushHelper'
import { ImageSource } from 'react-native-vector-icons/Icon'
const HomeBase = ({ header, children, backgroundSource, loginPage }: { header?: ReactElement, children: any, backgroundSource: FastImageSource | ImageSource, loginPage: PageName }) => {
  const { redBag } = useGetHomeInfo(['activity_redBagDetail'])
  const { width, height } = useDimensions().screen
  if (!backgroundSource) {
    return <View style={{ flex: 1 }}>
      {header}
      <ScrollView style={{ flex: 1, paddingHorizontal: 10, }}>
        {children}
      </ScrollView>
      <RedBagItem loginPage={loginPage} redBag={redBag} />
      <TurntableListItem />
    </View>
  } else {
    return <FastImage source={backgroundSource} style={{ width: width, height: height }}>
      {header}
      <ScrollView style={{ flex: 1, paddingHorizontal: 10, }}>
        {children}
      </ScrollView>
      <RedBagItem loginPage={loginPage} redBag={redBag} />
      <TurntableListItem />
    </FastImage>
  }

}
const TurntableListItem = () => {
  const { width, height } = useDimensions().screen
  const { isTest = false, uid = "" } = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const [turntableListVisiable, setTurntableListVisiable] = useState(false)
  const [turntableList, setTurntableList] = useState<TurntableListModel>()
  useEffect(() => {
    if (turntableList && turntableList != null) {
      setTurntableListVisiable(true)
    }
  }, [turntableList])
  const getTurntableList = async () => {
    try {
      const { data, status } = await APIRouter.activity_turntableList()
      setTurntableList(data.data)
    } catch (error) {

    }
  }
  useEffect(() => {
    if (uid != "") {
      getTurntableList()
    }
  }, [uid])
  if (turntableListVisiable) {
    return (
      <TouchableWithoutFeedback onPress={() => {
        if (uid == "") {
          Alert.alert("温馨提示", "您还未登录", [
            { text: "取消", onPress: () => { }, style: "cancel" },
            {
              text: "马上登录", onPress: () => {
                navigate(PageName.ZLLoginPage, {})
              },
            }
          ])
        } else if (isTest) {
          Alert.alert("温馨提示", "请先登录您的正式帐号", [
            { text: "取消", onPress: () => { }, style: "cancel" },
            {
              text: "马上登录", onPress: () => {
                navigate(PageName.ZLLoginPage, {})
              },
            }
          ])
        } else {
          PushHelper.pushWheel(turntableList)
        }
      }}>
        <ImageBackground style={{ width: 95, height: 95, position: 'absolute', top: height / 2, right: 20 }} source={{ uri: "dzp_btn" }} >
          <TouchableWithoutFeedback onPress={() => {
            setTurntableListVisiable(false)
          }}>
            <Image style={{ width: 20, height: 20, right: 0, top: 0, position: 'absolute' }} source={{ uri: "dialog_close" }} />
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>)
  } else {
    return null
  }

}
export default HomeBase