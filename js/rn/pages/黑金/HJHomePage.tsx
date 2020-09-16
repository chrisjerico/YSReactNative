import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
  ImageBackground,
  Platform,
  RefreshControl,
  AppState,
  Linking
} from "react-native"
import React, {useEffect, useState, useCallback, useRef} from 'react'
import {useSafeArea} from 'react-native-safe-area-context'
import FastImage, {FastImageProperties} from "react-native-fast-image"
import {colorEnum,} from "./enum/colorEnum"
import LinearGradient from "react-native-linear-gradient"
import PushHelper from "../../public/define/PushHelper"
import {MarqueeHorizontal} from 'react-native-marquee-ab';
import {UGUserCenterType} from "../../redux/model/全局/UGSysConfModel"
import {PageName} from '../../public/navigation/Navigation';
import {IGlobalState, UGStore} from "../../redux/store/UGStore";
import APIRouter from '../../public/network/APIRouter';
import {BannerModel} from "../../public/network/Model/BannerModel"
import {Icon, Button} from 'react-native-elements';
import {httpClient} from "../../public/network/httpClient"
import Carousel from 'react-native-banner-carousel';
import usePopUpView from "../../public/hooks/usePopUpView"
import UGUserModel from "../../redux/model/全局/UGUserModel"
import {push, navigate} from "../../public/navigation/RootNavigation"
import AppDefine from "../../public/define/AppDefine"
import useGetHomeInfo from "../../public/hooks/useGetHomeInfo"
import {useDimensions} from '@react-native-community/hooks'
import useAutoRenewUserInfo from "../../public/hooks/useAutoReNewUserInfo"
import {RedBagDetailActivityModel} from "../../public/network/Model/RedBagDetailActivityModel"
import {OCHelper} from "../../public/define/OCHelper/OCHelper"
import {NSValue} from "../../public/define/OCHelper/OCBridge/OCCall"
import {TurntableListModel} from "../../public/network/Model/TurntableListModel"
import RedBagItem from "../../public/components/RedBagItem"
import {useNavigationState} from "@react-navigation/native"
import AutoHeightWebView from 'react-native-autoheight-webview'
import RankListCP from "../../public/widget/RankList";
import Banner from "./CP/Banner"
import {List} from "../../public/network/Model/PromotionsModel"
import {ugLog} from "../../public/tools/UgLog";
import {hideLoading, showLoading, UGLoadingType} from "../../public/widget/UGLoadingCP";
import {Toast} from "../../public/tools/ToastUtils";
import {ANHelper} from "../../public/define/ANHelper/ANHelper";
import {CMD} from "../../public/define/ANHelper/hp/CmdDefine";
import {anyEmpty} from "../../public/tools/Ext";
import {HomeGamesModel} from "../../public/network/Model/HomeGamesModel";
import GameRow from "./view/GameRow";
import {HJThemeColor} from "../../public/theme/colors/HJThemeColor";
import GameColumn from "./view/GameColumn";

/**
 *
 * @param param0     UGLotterySelectController * vc = [UGLotterySelectController new];
 vc.didSelectedItemBlock = ^(UGNextIssueModel *nextModel) {
        [NavController1 pushViewControllerWithNextIssueModel:nextModel];
    };
 UGNavigationController * nav = [[UGNavigationController alloc] initWithRootViewController:vc];
 [self presentViewController:nav animated:true completion:nil];
 */
const HJHomePage = ({navigation, setProps}) => {

  const {width,} = useDimensions().window
  const {onPopViewPress} = usePopUpView()
  const userStore = UGStore.globalProps.userInfo;
  const {uid = ""} = userStore
  const systemStore = UGStore.globalProps.sysConf;
  const [randomString, setRandomString] = useState(`¥ 2${(Math.random() * 100000).toFixed(2)}`)
  const {banner, notice, homeGames, couponListData, rankList, redBag, floatAds, onlineNum, loading, onRefresh, onlineSwitch} = useGetHomeInfo()
  const [originalNoticeString, setOriginalNoticeString] = useState<string>()
  const [noticeFormat, setnoticeFormat] = useState<{ label: string, value: string }[]>()
  const [selectId, setSelectedId] = useState(-1)
  const [show, setShow] = useState(false)
  const [content, setContent] = useState("")
  const onPromotionItemPress = (data: List, type: 'page' | 'popup' | 'slide', onPress?: () => void) => {
    if (data?.linkUrl != "") {
      Linking.openURL(data?.linkUrl)
    } else if (data.linkCategory == 0 && data.linkPosition == 0) {
      onPopViewPress(data, type, onPress ? onPress : () => {
      })
    } else {
      PushHelper.pushCategory(data.linkCategory, data.linkPosition)
    }

  }
  useEffect(() => {
    let string = ""
    const noticeData = notice?.data?.scroll?.map((res) => {
      string += res.content
      return {label: res.id, value: res.title}
    }) ?? []
    if (notice?.data?.popup) {
      openPopup(notice)
    }
    setnoticeFormat(noticeData)
    setOriginalNoticeString(string)
  }, [notice])

  const openPopup = (data: any) => {
    const dataModel = data.data?.popup.map((item, index) => {
      return Object.assign({clsName: 'UGNoticeModel', hiddenBottomLine: 'No'}, item);

    })
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGPlatformNoticeView.alloc.initWithFrame:[setDataArray:].show', [NSValue.CGRectMake(20, 60, AppDefine.width - 40, AppDefine.height * 0.8)], [dataModel])
        break;
      case 'android':
        ANHelper.callAsync(CMD.OPEN_POP_NOTICE, data.data)
        break;
    }
  }
  const init = async () => {
    try {
      // const {data } = await APIRouter.system_config()
      // OCHelper.call("NSNotificationCenter.defaultCenter.postNotificationName:[object:]", ["UGNotificationGetSystemConfigComplete", "nil"])
    } catch (error) {

    }
  }
  useEffect(() => {
    setProps({
      didFocus: async () => {
        const {data: userInfo} = await APIRouter.user_info()
        UGStore.dispatch({type: 'merge', userInfo: userInfo?.data});
        setProps();
        UGStore.save();
      }
    })

    init()

    const timer = setInterval(() => {
      getRandomString()
    }, 500)
    return (() => clearInterval(timer))
  }, [])
  const getRandomString = () => {
    const num = ((2 + Math.random()) * 100000).toFixed(2)
    setRandomString("¥ " + num)
  }
  const thirdPartGamePress = (index: number) => {
    if (anyEmpty(uid)) {
      navigate(PageName.HJLoginPage, {})
    } else {
      PushHelper.pushHomeGame(homeGames?.data?.icons?.[0]?.list?.[index])
    }

  }

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <ZLHeader/>
      <ScrollView refreshControl={
        <RefreshControl style={{backgroundColor: 'black'}}
                        tintColor={'white'}
                        refreshing={loading}
                        onRefresh={onRefresh}/>
      } style={{flex: 1, paddingHorizontal: 0, backgroundColor: 'black'}}>
        <Banner style={{marginBottom: 0}}
                size={{width: width, height: 0}}
                onlineNum={onlineNum} bannerData={banner}
                onlineSwitch={onlineSwitch}/>
        <View
          style={{flexDirection: 'row', alignItems: 'center', backgroundColor: colorEnum.marqueeBg, paddingLeft: 5}}>
          <Icon name="ios-volume-high" type="ionicon" color="white" size={24}/>
          <MarqueeHorizontal textStyle={{color: "white", fontSize: 13.2}}
                             bgContainerStyle={{backgroundColor: colorEnum.marqueeBg}}
                             width={width - 60}
                             height={34}

                             speed={40}
                             onTextClick={() => {
                               setShow(true)
                               setContent(originalNoticeString)
                               // PushHelper.pushNoticePopUp(originalNoticeString)
                             }}

                             textList={noticeFormat}/>
        </View>

        <View style={_styles.gameContainer}>
          <GameColumn games={homeGames}/>
          <GameRow games={homeGames}/>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{width: 13, height: 13, tintColor: 'white', marginRight: 5}} source={{uri: "礼品-(1)"}}/>
            <Text style={{color: 'white', fontWeight: "bold"}}>优惠活动</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => {
            push(PageName.JDPromotionListPage)
          }}>
            <Text style={{color: 'white', fontWeight: "bold"}}>{"查看更多>>"}</Text>
          </TouchableWithoutFeedback>
        </View>

        <FlatList style={{marginTop: 10}} data={couponListData?.data?.list?.filter((res, index) => index < 5)}
                  renderItem={({item, index}) => {
                    return <View style={{paddingHorizontal: 10, marginBottom: 10}}>
                      <TouchableWithoutFeedback
                        onPress={onPromotionItemPress.bind(null, item, couponListData?.data?.style ?? 'popup', () => {
                          if (selectId == index) {
                            setSelectedId(-1)
                          } else {
                            setSelectedId(index)
                          }
                        })}>
                        <View>
                          <Text style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            marginBottom: 5,
                            color: 'white'
                          }}>{item.title}</Text>
                          <FastImageAutoHeight source={{uri: item.pic}}/>
                        </View>
                      </TouchableWithoutFeedback>
                      {selectId == index ? <AutoHeightWebView
                        style={{width: width - 20, backgroundColor: 'white'}}
                        // scalesPageToFit={true}
                        viewportContent={'width=device-width, user-scalable=no'}
                        source={{
                          html: `<head>
                        <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>
                        <style>img{width:auto !important;max-width:100%;height:auto !important}</style>
                        <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>
                      </head>` +
                            `<script>
                        window.onload = function () {
                          window.location.hash = 1;
                          document.title = document.body.scrollHeight;
                        }
                      </script>` + item.content
                        }}></AutoHeightWebView> : null
                      }

                    </View>
                  }}/>


        <RankListCP timing={10000} backgroundColor={'black'} textColor={'white'} width={width - 24} ranks={rankList}/>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text onPress={() => {
            console.log(httpClient.defaults.baseURL + '/index2.php')
            PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
          }} style={{color: 'white', textAlign: 'center', marginRight: 20, marginBottom: 5}}>💻电脑版</Text>
          <Text style={{color: 'white', textAlign: 'center'}} onPress={() => {
            push(PageName.JDPromotionListPage)
          }}>🎁优惠活动</Text>
        </View>
        <Text style={{color: 'white', textAlign: 'center'}}>COPYRIGHT © {systemStore.webName} RESERVED</Text>
        <View style={{height: 100}}></View>
      </ScrollView>

      <AcctountDetail/>

      <RedBagItem loginPage={PageName.HJLoginPage} redBag={redBag}/>
      <TurntableListItem/>
      <MarqueePopupView onPress={() => {
        setShow(false)
      }} content={content} show={show} onDismiss={() => {
        setShow(false)
      }}/>
    </View>
  )
}

const TurntableListItem = () => {
  const {width, height} = useDimensions().screen
  const {isTest = false, uid = ""} = UGStore.globalProps.userInfo;
  const [turntableListVisiable, setTurntableListVisiable] = useState(false)
  const [turntableList, setTurntableList] = useState<TurntableListModel>()
  useEffect(() => {
    if (turntableList && turntableList != null) {
      setTurntableListVisiable(true)
    }
  }, [turntableList])
  const getTurntableList = async () => {
    try {
      const {data, status} = await APIRouter.activity_turntableList()
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
        if (!_checkLogin()) {
          const turntableListModel = Object.assign({clsName: 'DZPModel'}, turntableList?.[0]);
          switch (Platform.OS) {
            case 'ios':
              OCHelper.call(({vc}) => ({
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
              break;
            case 'android':
              //TODO
              break;
          }
        }
      }}>
        <ImageBackground style={{width: 70, height: 70, position: 'absolute', top: height * 0.4 + 95, right: 20}}
                         source={{uri: "dzp_btn"}}>
          <TouchableWithoutFeedback onPress={() => {
            setTurntableListVisiable(false)
          }}>
            <Image style={{width: 20, height: 20, right: 0, top: 0, position: 'absolute'}}
                   source={{uri: "dialog_close"}}/>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>)
  } else {
    return null
  }

}
const ZLHeader = () => {
  const {width, height} = useDimensions().window
  const insets = useSafeArea();
  const userStore = UGStore.globalProps.userInfo;
  const {uid = "", unreadMsg} = userStore
  const sysStore = UGStore.globalProps.sysConf;
  const {mobile_logo = ""} = sysStore

  let topDistance = 0;
  switch (Platform.OS) {
    case 'ios':
      topDistance = insets.top;
      break;
    case 'android':
      //原生处理了 安全区域，RN 不需要处理
      break;
  }

  return (
    <View style={{
      width,
      height: 68 + topDistance,
      paddingTop: topDistance,
      backgroundColor: colorEnum.mainColor,
      justifyContent: 'space-between',
      flexDirection: 'row',
      shadowColor: "#444",
      borderBottomWidth: 0.5,
      alignItems: 'center',
      borderColor: "#444"
    }}>
      <FastImageAutoWidth style={{width: 210, height: 50}} source={{uri: mobile_logo}}/>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {
          if (!_checkLogin(false)) {
            PushHelper.pushUserCenterType(UGUserCenterType.个人信息)
          }
        }} style={{flexDirection: 'column', marginRight: 20}}>
          <FastImage style={{width: 27, height: 24}}
                     source={{uri: "http://test10.6yc.com/views/mobileTemplate/16/images/service1.png"}}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const AcctountDetail = () => {
  const userStore = UGStore.globalProps.userInfo
  const {uid = "", balance = 0, isTest} = userStore

  const requestBalance = async () => {
    try {
      showLoading({type: UGLoadingType.Loading, text: '正在刷新金额...'});

      // switch (Platform.OS) {
      //   case 'ios':
      //       OCHelper.call('SVProgressHUD.showWithStatus:', ['正在刷新金额...']);
      //     break;
      //   case 'android':
      //         //TODO
      //     break;
      // }

      //@ts-ignore
      const {data, status} = await APIRouter.user_balance_token()
      UGStore.dispatch({type: 'merge', userInfo: {balance: data.data.balance}})
      // switch (Platform.OS) {
      //   case 'ios':
      //       OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['刷新成功！']);
      //     break;
      //   case 'android':
      //     //TODO
      //     break;
      // }
      Toast('刷新成功！')

    } catch (error) {
      ugLog(error)
      Toast('刷新失败请稍后再试！')
      // switch (Platform.OS) {
      //   case 'ios':
      //       OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '刷新失败请稍后再试']);
      //     break;
      //   case 'android':
      //     //TODO
      //     break;
      // }
    }

    hideLoading();
  }
  if (uid != "") {
    return (
      <LinearGradient start={{x: 0, y: 0}} colors={colorEnum.gradientColor}
                      style={{
                        height: 80,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 0,
                      }}>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
            paddingLeft: 40,
            flexDirection: 'row'
          }}>
            <TouchableOpacity onPress={() => {
              if (!_checkLogin()) {
                PushHelper.pushUserCenterType(UGUserCenterType.存款)
              }

            }} style={{alignItems: 'center', justifyContent: 'center'}}>
              <FastImage style={{width: 34, height: 34}}
                         source={{uri: "http://test10.6yc.com/views/mobileTemplate/16/images/depositlogo.png"}}/>
              <Text style={{color: 'white', fontSize: 15.5}}>充 值</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 14, color: 'white', marginLeft: 8}}> ¥ {balance}</Text>
          </View>

          <TouchableOpacity onPress={() => {
            if (!_checkLogin()) {
              PushHelper.pushUserCenterType(UGUserCenterType.额度转换)
            }

          }} style={{alignItems: 'center', justifyContent: 'center', padding: 16}}>
            <FastImage style={{width: 34, height: 34}}
                       source={{uri: "http://test10.6yc.com/views/mobileTemplate/16/images/xima.png"}}/>
            <Text style={{color: 'white', fontSize: 15.5}}>转 账</Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if (!_checkLogin()) {
              PushHelper.pushUserCenterType(UGUserCenterType.取款)
            }

          }} style={{alignItems: 'center', justifyContent: 'center', padding: 16}}>
            <FastImage style={{width: 34, height: 34}}
                       source={{uri: "http://test10.6yc.com/views/mobileTemplate/16/images/withdrawlogo.png"}}/>
            <Text style={{color: 'white', fontSize: 15.5}}>提 现</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
  } else {
    return null
  }

}

/**
 * 检查是否要登录
 *
 * @param checkTestAccount 临时账号是否也检测
 *
 */
const _checkLogin = (checkTestAccount: boolean = true): boolean => {
  const {isTest = false, uid = ""} = UGStore.globalProps.userInfo;

  ugLog('test, uid', isTest, uid)
  if (anyEmpty(uid)) {
    Alert.alert("温馨提示", "您还未登录", [
      {
        text: "取消", onPress: () => {
        }, style: "cancel"
      },
      {
        text: "马上登录", onPress: () => {
          navigate(PageName.HJLoginPage, {})
        },
      }
    ]);
    return true;
  } else if (checkTestAccount && isTest) {
    Alert.alert("温馨提示", "请先登录您的正式帐号", [
      {
        text: "取消", onPress: () => {
        }, style: "cancel"
      },
      {
        text: "马上登录", onPress: () => {
          navigate(PageName.HJLoginPage, {})
        },
      }
    ]);
    return true;
  }

  return false;
}

const MarqueePopupView = ({content, show, onPress, onDismiss}) => {
  const {width, height} = useDimensions().screen
  if (show) {
    return (
      <View style={{
        width,
        height,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        marginBottom: 10
      }}>
        <View style={{width: '90%', height: '55%', backgroundColor: 'white', borderRadius: 15}}>
          <View style={{
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: "gray",
            borderBottomWidth: 0.5
          }}>
            <Text style={{fontSize: 16, fontWeight: "bold"}}>公告详情</Text>
          </View>
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <AutoHeightWebView style={{width: width * 0.9 - 20}} source={{html: content}}></AutoHeightWebView>
          </View>
          <View style={{
            height: 70,
            paddingBottom: 10,
            paddingHorizontal: 5,
            justifyContent: 'space-between',
            width: "100%",
            flexDirection: 'row'
          }}>
            <TouchableOpacity onPress={onDismiss} style={{
              justifyContent: 'center', alignItems: 'center',
              width: "47%", height: 50, backgroundColor: 'white',
              borderRadius: 5, borderColor: "gray", borderWidth: 0.5
            }}>
              <Text>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress} style={{
              justifyContent: 'center',
              alignItems: 'center', width: "47%", height: 50,
              backgroundColor: '#46A3FF', borderRadius: 5,
              borderColor: "gray", borderWidth: 0.5
            }}>
              <Text style={{color: 'white'}}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  } else {
    return null
  }

}
const FastImageAutoHeight = (props: FastImageProperties) => {
  const [picHeight, setPicHeight] = useState(100)
  const {cardMargin, marginHorizontal} = usePopUpView()
  return (
    <FastImage {...props} style={[props.style, {height: picHeight}]} onLoad={(e) => {
      setPicHeight(((AppDefine.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height)
    }}/>
  )
}
const FastImageAutoWidth = (props: FastImageProperties) => {
  const [picWidth, setPicWidth] = useState(210)
  return (
    <FastImage {...props} style={[props.style, {width: picWidth}]} onLoad={(e) => {
      console.log(props.style?.height / e.nativeEvent.height * e.nativeEvent.width, e.nativeEvent.width)
      setPicWidth(props.style?.height / e.nativeEvent.height * e.nativeEvent.width)
    }}/>
  )
}
const _styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    marginRight: 5,
  },
  gameContainer: {
    backgroundColor: HJThemeColor.黑金.homeContentSubColor,
    flexDirection: 'row',
  },
  bottomInfo: {
    flex: 1,
    marginRight: 5,
  },
})
export default HJHomePage
