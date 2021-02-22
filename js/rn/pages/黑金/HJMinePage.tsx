import {Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native"
import React from 'react'
import {UGStore} from "../../redux/store/UGStore"
import FastImage from "react-native-fast-image"
import PushHelper from "../../public/define/PushHelper"
import {UGUserCenterType} from "../../redux/model/全局/UGSysConfModel"
import LinearGradient from "react-native-linear-gradient"
import {PageName} from "../../public/navigation/Navigation"
import {useHtml5Image} from "../../Res/icon";
import useMinePage from "../../public/hooks/temp/useMinePage";
import config from "../BZH/config";
import SafeAreaHeader from "../../public/views/tars/SafeAreaHeader";
import GameButton from "../../public/views/temp/GameButton";
import {scale} from "../../public/tools/Scale";
import UserCenterItem from "../../public/views/temp/UserCenterItem";
import Button from "../../public/views/temp/Button";
import BottomGap from "../../public/views/temp/BottomGap";
import PickAvatarComponent from "../../public/components/temp/PickAvatarComponent";
import ProfileBlock from "./view/ProfileBlock";
import AntDesign from "react-native-vector-icons/AntDesign";
import CommStyles from "../base/CommStyles";
import {pop} from "../../public/navigation/RootNavigation";
import { skinColors } from "../../public/theme/const/UGSkinColor"
import { UGText } from '../../../doy/public/Button之类的基础组件/DoyButton'

/**
 * 个人中心
 * @constructor
 */
const HJMinePage = () => {
  const {getHtml5Image} = useHtml5Image()
  const {
    pickAvatarComponentRef,
    onPressAvatar,
    onSaveAvatarSuccess,
    value,
    sign,
  } = useMinePage({
    homePage: PageName.HJHomePage,
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
          headerColor={skinColors.themeColor.黑金}
        >
        </SafeAreaHeader> : null
      }

      <ZLHeader/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: skinColors.homeContentSubColor.黑金,
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

            let featureDivider = index > 0 ? {} : {borderLeftColor: 'transparent'}

            return (
              <Button
                key={index}
                containerStyle={[_styles.feature_bt, featureDivider]}
                titleStyle={{
                  fontSize: scale(22),
                  fontWeight: '300',
                  color: skinColors.textColor3.黑金
                }}
                title={name}
                onPress={() => PushHelper.pushUserCenterType(code)}
              />
            )
          }}
        />

        <LinearGradient start={{x: 0, y: 0}} end={{x: 0.5, y: 2.0}} colors={skinColors.progressBgColor.黑金}
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
                    color: skinColors.textColor3.黑金
                  }}
                  title={name}
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

        <LinearGradient start={{x: 0, y: 0}} end={{x: 0.5, y: 2.0}} colors={skinColors.menuHeadViewColor.黑金}
                        style={_styles.log_out}
        >
          <Button
            title={'退出登录'}
            containerStyle={{
              height: '100%',
            }}
            titleStyle={{color: '#db6372',
              fontSize: scale(26)}}
            onPress={signOut}/>
        </LinearGradient>

        <BottomGap/>
      </ScrollView>
      <View style={_styles.server_container}>
        <GameButton
          showSubTitle={false}
          showSecondLevelIcon={false}
          containerStyle={_styles.server}
          imageContainerStyle={{width: '100%'}}
          circleColor={'transparent'}
          logo={'https://cdn01.bimwill.com/views/mobileTemplate/28/images/icon_support.png'}
          titleStyle={{
            fontSize: scale(20),
            fontWeight: '300',
            paddingTop: scale(5),
          }}
          titleContainerStyle={{aspectRatio: 5}}
          onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}/>
      </View>
      <PickAvatarComponent
        ref={pickAvatarComponentRef}
        color={skinColors.themeColor.黑金}
        initAvatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
        onSaveAvatarSuccess={onSaveAvatarSuccess}
      />
    </>
  )

}

const ZLHeader = () => {
  // const {width, height} = useDimensions().window
  // const insets = useSafeArea();
  const {uid = "", unreadMsg} = UGStore.globalProps.userInfo;
  // const [showBackBtn, setShowBackBtn] = useState(false);
  //
  // let topDistance = 0;
  // switch (Platform.OS) {
  //   case 'ios':
  //     topDistance = insets.top;
  //     OCHelper.call('UGNavigationController.current.viewControllers.count').then((ocCount) => {
  //       const show = ocCount > 1 || navigationRef?.current?.getRootState().routes.length > 1;
  //       show != showBackBtn && setShowBackBtn(show);
  //     })
  //     break;
  //   case 'android':
  //
  //     break;
  // }

  return (
    <View style={{
      // width,
      height: scale(76),
      backgroundColor: '#1a1a1e',
      flexDirection: 'row', shadowColor: "white", borderBottomWidth: 0.5, alignItems: 'center',
      paddingHorizontal: scale(20)
    }}>
      <TouchableWithoutFeedback onPress={() => pop()}>
        <View style={_styles.top_bt} >
          <AntDesign
            name={'left'}
            color={'#ffffff'}
            size={scale(25)}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={CommStyles.flex}/>
      <UGText style={_styles.title}>个人中心</UGText>
      <View style={CommStyles.flex}/>
      <TouchableOpacity onPress={() => {
        PushHelper.pushUserCenterType(UGUserCenterType.站内信)
      }} >
        <FastImage style={_styles.top_bt}
                   source={{uri: "http://test10.6yc.com/views/mobileTemplate/16/images/notice.png"}}/>
        {
          unreadMsg > 0 ? <View style={_styles.read_flag}>
              <UGText style={{color: 'white', fontSize: scale(16)}}>{unreadMsg}</UGText>
            </View>
            : null
        }

      </TouchableOpacity>
    </View>
  )
}

const _styles = StyleSheet.create({
  top_bt: {
    width: scale(36),
    height: scale(36)
  },
  title: {
    color: 'white',
    fontSize: scale(24),
  },
  read_flag: {
    position: 'absolute',
    top: -scale(8),
    right: -scale(8),
    backgroundColor: 'red',
    height: scale(24),
    width: scale(24),
    borderRadius: scale(99),
    justifyContent: 'center',
    alignItems: 'center'
  },
  featureBlock: {
    marginHorizontal: scale(16),
    paddingVertical: scale(16),
    paddingHorizontal: scale(50),
    borderRadius: scale(16),
  },
  server_container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute'
  },
  feature_bt: {
    width: '25%',
    borderLeftColor: skinColors.textColor3.黑金,
    borderLeftWidth: 1
  },
  server: {
    width: '25%',
    marginBottom: scale(140),
  },
  log_out: {
    height: scale(74),
    marginTop: scale(26),
    marginHorizontal: scale(16),
    borderRadius: scale(12),
  },
})


export default HJMinePage
