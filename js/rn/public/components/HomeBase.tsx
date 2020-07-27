import React, { ReactElement, Children, useState, useEffect } from 'react'
import { View, ScrollView, Alert, ImageBackground, Image, Platform } from 'react-native'
import RedBagItem from './RedBagItem'
import useGetHomeInfo from '../hooks/useGetHomeInfo'
import FastImage, { FastImageSource } from 'react-native-fast-image'
import { useDimensions } from '@react-native-community/hooks'
import { useSelector } from 'react-redux'
import { IGlobalState, UGStore } from '../../redux/store/UGStore'
import { TurntableListModel } from '../network/Model/TurntableListModel'
import APIRouter from '../network/APIRouter'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { navigate } from '../navigation/RootNavigation'
import { PageName } from '../navigation/Navigation'
import PushHelper from '../define/PushHelper'
import { ImageSource } from 'react-native-vector-icons/Icon'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { NSValue } from '../define/OCHelper/OCBridge/OCCall'
import AppDefine from '../define/AppDefine'
const HomeBase = ({ header, children, backgroundSource, loginPage, backgroundColor, needPadding = true, paddingHorizontal, marginTop }:
  { header?: ReactElement, children: any, backgroundSource?: FastImageSource | ImageSource, loginPage: PageName, backgroundColor: string, needPadding: boolean, paddingHorizontal?: number, marginTop: number }) => {
  const { redBag } = useGetHomeInfo(['activity_redBagDetail'])
  const { width, height } = useDimensions().screen
  if (!backgroundSource) {
    return <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      {header}
      <ScrollView style={{ flex: 1, paddingHorizontal: needPadding ? paddingHorizontal ? paddingHorizontal : 10 : 0, marginTop: marginTop ? marginTop : 0 }}>
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
  const { isTest = false, uid = "" } = UGStore.globalProps.userInfo
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
          if (Platform.OS != 'ios') return;
          const turntableListModel = Object.assign({ clsName: 'DZPModel' }, turntableList?.[0]);
          OCHelper.call(({ vc }) => ({
            vc: {
              selectors: 'DZPMainView.alloc.initWithFrame:[setItem:]',
              args1: [NSValue.CGRectMake(100, 100, AppDefine.width - 60, AppDefine.height - 60),],
              args2: [turntableListModel]
            },
            ret: {
              selectors: 'SGBrowserView.showMoveView:yDistance:',
              args1: [vc, 100],
            },
          }));
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