import {View, TouchableOpacity, Text, ScrollView, FlatList, Image, Platform, StyleSheet} from "react-native"
import React, {useCallback, useEffect, useState} from 'react'
import {useSafeArea} from "react-native-safe-area-context"
import {IGlobalState, UGStore} from "../../redux/store/UGStore"
import FastImage from "react-native-fast-image"
import {colorEnum} from "./enum/colorEnum"
import {Icon} from "react-native-elements"
import PushHelper from "../../public/define/PushHelper"
import UGSysConfModel, {UGUserCenterType} from "../../redux/model/全局/UGSysConfModel"
import LinearGradient from "react-native-linear-gradient"
import {TouchableWithoutFeedback} from "react-native-gesture-handler"
import APIRouter from "../../public/network/APIRouter"
import UGUserModel from "../../redux/model/全局/UGUserModel"
import useMemberItems from "../../public/hooks/useMemberItems"
import useLoginOut from "../../public/hooks/useLoginOut"
import {useDimensions} from "@react-native-community/hooks"
import {PageName} from "../../public/navigation/Navigation"
import {OCHelper} from "../../public/define/OCHelper/OCHelper"
import {IGlobalStateHelper} from "../../redux/store/IGlobalStateHelper"
import Axios from "axios"
import {httpClient} from "../../public/network/httpClient"
import {YueBaoStatModel} from "../../public/network/Model/YueBaoStatModel"
import {navigationRef, pop} from "../../public/navigation/RootNavigation"
import {UGBasePageProps} from "../base/UGPage"
import {hideLoading, showLoading, UGLoadingType} from "../../public/widget/UGLoadingCP";
import {Toast} from "../../public/tools/ToastUtils";
import {useHtml5Image} from "../../public/tools/tars";
import useMinePage from "../../public/hooks/tars/useMinePage";
import config from "../BZH/config";
import SafeAreaHeader from "../../public/views/tars/SafeAreaHeader";
import {BZHThemeColor} from "../../public/theme/colors/BZHThemeColor";
import MineHeaderComponent from "../../public/components/tars/MineHeaderComponent";
import {ugLog} from "../../public/tools/UgLog";
import GameButton from "../../public/views/tars/GameButton";
import {scale} from "../../public/tools/Scale";
import UserCenterItem from "../../public/views/tars/UserCenterItem";
import Button from "../../public/views/tars/Button";
import BottomGap from "../../public/views/tars/BottomGap";
import PickAvatarComponent from "../../public/components/tars/PickAvatarComponent";
import ProfileBlock from "./view/ProfileBlock";
import {HJThemeColor} from "../../public/theme/colors/HJThemeColor";

const HJMinePage = () => {
  const {getHtml5Image} = useHtml5Image()
  const {
    pickAvatarComponentRef,
    onPressAvatar,
    onSaveAvatarSuccess,
    value,
    sign,
  } = useMinePage({
    homePage: PageName.BZHHomePage,
    defaultUserCenterLogos: config?.defaultUserCenterLogos,
  })

  const {
    balance,
    userCenterItems,
    curLevelGrade,
    usr,
    isTest,
    avatar,
    unreadMsg,
  } = value

  const {signOut} = sign

  // data handle
  const profileUserCenterItems = userCenterItems?.slice(0, 4) ?? []
  const listUserCenterItems = userCenterItems?.slice(4, userCenterItems?.length) ?? []

  return (
    <>
      {
        //安卓原生处理过完全区域
        Platform.OS == 'ios' ? <SafeAreaHeader
          containerStyle={{
            aspectRatio: 540 / 50,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
          headerColor={BZHThemeColor.宝石红.themeColor}
        >
        </SafeAreaHeader> : null
      }

      <ZLHeader/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: HJThemeColor.黑金.homeContentSubColor,
        }}
        // refreshControl={<RefreshControlComponent onRefresh={() => { }} />} 暂时注释掉
      >
        <ProfileBlock
          balance={balance}
          onPressAvatar={onPressAvatar}
          level={curLevelGrade}
          avatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
          name={usr}
          features={profileUserCenterItems}
          renderFeature={(item, index) => {
            const {logo, name, code} = item

            return (
              <Button
                key={index}
                containerStyle={{width: '25%'}}
                titleStyle={{
                  fontSize: scale(22),
                  fontWeight: '300',
                  color: 'white'
                }}
                title={name + " "}
                onPress={() => PushHelper.pushUserCenterType(code)}
              />
            )
          }}
        />
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0.5, y: 2.0}} colors={HJThemeColor.黑金.progressBgColor}
                        style={_styles.featureBlock}>
          {
            listUserCenterItems?.map((item, index) => {
              const {code, name, logo} = item
              return (
                <UserCenterItem
                  key={index}
                  containerStyle={{
                    aspectRatio: 490 / 68,
                    borderBottomColor: 'grey'
                  }}
                  arrowColor={'transparent'}
                  titleStyle={{
                    fontSize: scale(22),
                    color: 'white'
                  }}
                  title={name + " "}//必须要有空格
                  logo={logo}
                  unreadMsg={unreadMsg || 0}
                  showUnreadMsg={code == 9}
                  onPress={() => {
                    PushHelper.pushUserCenterType(code)
                  }}
                />
              )
            })
          }
        </LinearGradient>

        <Button
          title={'退出登录'}
          containerStyle={{
            backgroundColor: '#ffffff',
            marginHorizontal: scale(25),
            marginVertical: scale(15),
            borderRadius: scale(7),
            height: scale(70),
          }}
          titleStyle={{color: '#db6372', fontSize: scale(21)}}
          onPress={signOut}
        />
        <BottomGap/>
      </ScrollView>
      <PickAvatarComponent
        ref={pickAvatarComponentRef}
        color={BZHThemeColor.宝石红.themeColor}
        initAvatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
        onSaveAvatarSuccess={onSaveAvatarSuccess}
      />
    </>
  )

}

const ZLHeader = () => {
  const {width, height} = useDimensions().window
  const insets = useSafeArea();
  const {uid = "", unreadMsg} = UGStore.globalProps.userInfo;
  const [showBackBtn, setShowBackBtn] = useState(false);

  let topDistance = 0;
  switch (Platform.OS) {
    case 'ios':
      topDistance = insets.top;
      OCHelper.call('UGNavigationController.current.viewControllers.count').then((ocCount) => {
        const show = ocCount > 1 || navigationRef?.current?.getRootState().routes.length > 1;
        show != showBackBtn && setShowBackBtn(show);
      })
      break;
    case 'android':

      break;
  }

  return (
    <View style={{
      width, height: 68 + topDistance, paddingTop: topDistance, backgroundColor: '#1a1a1e',
      flexDirection: 'row', shadowColor: "white", borderBottomWidth: 0.5, alignItems: 'center',
      paddingHorizontal: 20
    }}>
      {showBackBtn && (<TouchableOpacity onPress={() => {
        if (!pop()) {
          switch (Platform.OS) {
            case 'ios':
              OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
              break;
            case 'android':

              break;
          }
        }
      }} style={{paddingRight: 5}}>
        <Image style={{width: 25, height: 25,}} source={{uri: "back_icon"}}/>
      </TouchableOpacity>)}
      {showBackBtn && <View style={{flex: 1}}/>}

      <TouchableOpacity onPress={() => {
        PushHelper.pushUserCenterType(UGUserCenterType.站内信)
      }} style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <FastImage style={{width: 27, height: 24, marginBottom: 5}}
                   source={{uri: "http://test10.6yc.com/views/mobileTemplate/16/images/notice.png"}}/>
        <Text style={{color: "white", fontSize: 14}}>消息</Text>
        {unreadMsg > 0 ? <View style={{
          position: 'absolute', right: 0, top: -5, backgroundColor: 'red',
          height: 15, width: 15,
          borderRadius: 7.5, justifyContent: 'center', alignItems: 'center'
        }}>
          <Text style={{color: 'white', fontSize: 10}}>{unreadMsg}</Text>
        </View> : null}

      </TouchableOpacity>
      {!showBackBtn && <View style={{flex: 1}}/>}
      <TouchableOpacity onPress={() => {
        PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
      }} style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 30}}>
        <FastImage style={{width: 27, height: 24, marginBottom: 5}}
                   source={{uri: "http://test10.6yc.com/views/mobileTemplate/16/images/service2.png"}}/>
        <Text style={{color: "white", fontSize: 14}}>客服</Text>
      </TouchableOpacity>
    </View>
  )
}

const _styles = {
  featureBlock: {
    marginHorizontal: 9,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
}


export default HJMinePage
