import {Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native"
import React from 'react'
import SafeAreaHeader from "../../../public/views/tars/SafeAreaHeader";
import {HJThemeColor} from "../../../public/theme/colors/HJThemeColor";
import {scale} from "../../../public/tools/Scale";
import CommStyles from "../../base/CommStyles";
import PushHelper from "../../../public/define/PushHelper";
import {UGUserCenterType} from "../../../redux/model/全局/UGSysConfModel";
import FastImage from "react-native-fast-image";
import AntDesign from "react-native-vector-icons/AntDesign";
import {UGStore} from "../../../redux/store/UGStore";
import {pop} from "../../../public/navigation/RootNavigation";

/**
 * 所有分类
 * @constructor
 */
const HJAllCategoryPage = () => {

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
          headerColor={HJThemeColor.黑金.themeColor}
        >
        </SafeAreaHeader> : null
      }

      <ZLHeader/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: HJThemeColor.黑金.homeContentSubColor,
        }} >

      <Text>AFJKDSLJFDLSKAJ</Text>

      </ScrollView>

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
        <View style={_styles.top_bt}>
          <AntDesign
            name={'left'}
            color={'#ffffff'}
            size={scale(25)}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={CommStyles.flex}/>
      <Text style={_styles.title}> 个人中心 </Text>
      <View style={CommStyles.flex}/>
      <TouchableOpacity onPress={() => {
        PushHelper.pushUserCenterType(UGUserCenterType.站内信)
      }} >
        <FastImage style={_styles.top_bt}
                   source={{uri: "http://test10.6yc.com/views/mobileTemplate/16/images/notice.png"}}/>
        {
          unreadMsg > 0 ? <View style={_styles.read_flag}>
              <Text style={{color: 'white', fontSize: scale(16)}}>{unreadMsg}</Text>
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
    borderLeftColor: HJThemeColor.黑金.textColor3,
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


export default HJAllCategoryPage
