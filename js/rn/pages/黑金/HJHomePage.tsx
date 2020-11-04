import {
  Alert,
  FlatList,
  Image,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native"
import React, {useEffect, useRef, useState} from 'react'
import {useSafeArea} from 'react-native-safe-area-context'
import FastImage from "react-native-fast-image"
import PushHelper from "../../public/define/PushHelper"
import {MarqueeHorizontal} from 'react-native-marquee-ab';
import {UGUserCenterType} from "../../redux/model/全局/UGSysConfModel"
import {PageName} from '../../public/navigation/Navigation';
import {UGStore} from "../../redux/store/UGStore";
import APIRouter from '../../public/network/APIRouter';
import {Icon} from 'react-native-elements';
import {httpClient} from "../../public/network/httpClient"
import usePopUpView from "../../public/hooks/usePopUpView"
import {navigate, push} from "../../public/navigation/RootNavigation"
import AppDefine from "../../public/define/AppDefine"
import useGetHomeInfo from "../../public/hooks/useGetHomeInfo"
import {useDimensions} from '@react-native-community/hooks'
import {OCHelper} from "../../public/define/OCHelper/OCHelper"
import {NSValue} from "../../public/define/OCHelper/OCBridge/OCCall"
import AutoHeightWebView from 'react-native-autoheight-webview'
import RankListCP from "../../public/widget/RankList";
import Banner from "./CP/Banner"
import {List} from "../../public/network/Model/PromotionsModel"
import {ugError, ugLog} from "../../public/tools/UgLog";
import {hideLoading, showLoading, UGLoadingType} from "../../public/widget/UGLoadingCP";
import {Toast} from "../../public/tools/ToastUtils";
import {ANHelper} from "../../public/define/ANHelper/ANHelper";
import {CMD} from "../../public/define/ANHelper/hp/CmdDefine";
import {anyEmpty, anyLength} from "../../public/tools/Ext";
import GameRow, {gameRowContentHeight} from "./view/GameRow";
import {HJThemeColor} from "../../public/theme/colors/HJThemeColor";
import GameColumn from "./view/GameColumn";
import {scale} from "../../public/tools/Scale";
import GameButton from "../../public/views/temp/GameButton";
import TouchableImage from "../../public/views/temp/TouchableImage";
import CommStyles from "../base/CommStyles";
import {FastImageAutoHeight, FastImageAutoWidth} from "../../public/tools/img/ExtImage";
import ActivityComponent from "../../public/components/temp/ActivityComponent";
import {getActivityPosition} from "../../public/tools/tars";
import {ROULETTE_LOGO} from "../../public/define/Res";

/**
 * 主页
 * @param navigation
 * @param setProps
 * @constructor
 */
const HJHomePage = ({navigation, setProps}) => {

  const {width,} = useDimensions().window
  const {onPopViewPress} = usePopUpView()
  const {uid = "", balance = 0, isTest} = UGStore.globalProps.userInfo
  const systemStore = UGStore.globalProps.sysConf;
  const [selectGameIndex, setSelectGameIndex] = useState(0)
  const [randomString, setRandomString] = useState(`¥ 2${(Math.random() * 100000).toFixed(2)}`)
  const {banner, notice, homeGames, couponListData, rankList, redBag, floatAds, turntableList, onlineNum, loading, onRefresh, onlineSwitch} = useGetHomeInfo()
  const [originalNoticeString, setOriginalNoticeString] = useState<string>()
  const [noticeFormat, setnoticeFormat] = useState<{ label: string, value: string }[]>()
  const [selectId, setSelectedId] = useState(-1)
  const [show, setShow] = useState(false)
  const [content, setContent] = useState("")
  const gameListRef = useRef()//游戏条目列表
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
      switch (Platform.OS) {
        case 'android':
          ANHelper.callAsync(CMD.VISIBLE_MAIN_TAB, {visibility: 8});
          break;
      }
      // const {data } = await APIRouter.system_config()
      // OCHelper.call("NSNotificationCenter.defaultCenter.postNotificationName:[object:]", ["UGNotificationGetSystemConfigComplete", "nil"])
    } catch (error) {
      ugError(error)
    }
  }
  useEffect(() => {
    setProps({
      backgroundColor: HJThemeColor.黑金.bgColor,
      didFocus: async () => {
        //ugLog('home focus')
        _requestBalance()

        const {data: userInfo} = await APIRouter.user_info()
        UGStore.dispatch({type: 'merge', userInfo: userInfo?.data});
        setProps();
        UGStore.save();

      }
    })

    init()

    // const timer = setInterval(() => {
    //   getRandomString()
    // }, 500)
    // return (() => clearInterval(timer))
  }, [])

  // const getRandomString = () => {
  //   const num = ((2 + Math.random()) * 100000).toFixed(2)
  //   setRandomString("¥ " + num)
  // }
  // const thirdPartGamePress = (index: number) => {
  //   if (anyEmpty(uid)) {
  //     navigate(PageName.HJLoginPage, {})
  //   } else {
  //     PushHelper.pushHomeGame(homeGames?.data?.icons?.[0]?.list?.[index])
  //   }
  //
  // }

  return (
    <View style={_styles.page_container}>
      <ZLHeader/>
      <ScrollView refreshControl={
        <RefreshControl style={{backgroundColor: 'black'}}
                        tintColor={'white'}
                        refreshing={loading}
                        onRefresh={onRefresh}/>
      } style={{flex: 1}}>
        <Banner style={{marginBottom: 0}}
                size={{width: width, height: 0}}
                onlineNum={onlineNum} bannerData={banner}
                onlineSwitch={onlineSwitch}/>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 5}}>
          <Icon name="ios-volume-high" type="ionicon" color="white" size={24}/>
          <MarqueeHorizontal textStyle={{color: "white", fontSize: 13.2}}
                             bgContainerStyle={{backgroundColor: 'black'}}
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

        <View style={_styles.game_container}>
          <GameColumn games={homeGames}
                      selectGameIndex={selectGameIndex}
                      clickListener={(index =>
                        gameListRef?.current?.scrollToIndex({index: index, animated: true}))}/>
          <GameRow games={homeGames}
                   onScroll={(e) => {
                     //滚动的时候选择左边的栏目
                     let index = Math.round(e.nativeEvent.contentOffset.y / gameRowContentHeight);
                     const iconsLength = anyLength(homeGames.data.icons) - 1;
                     index = index > iconsLength ? iconsLength : index;
                     index = index < 0 ? 0 : index;
                     setSelectGameIndex(index);
                   }}
                   listRef={gameListRef}
                   clickItem={(item) => {
                     //ugLog('item=', JSON.stringify(item))
                     PushHelper.pushHomeGame(item)

                   }}/>
        </View>

        {
          _couponTitleItem()
        }

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
                        <style>table{border-collapse: collapse};img{width:auto !important;max-width:100%;height:auto !important}</style>
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


        <RankListCP timing={10000} backgroundColor={'white'} textColor={'black'} width={width - 24} ranks={rankList}/>

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
        <View style={{height: 100}}/>

      </ScrollView>

      <AccountDetail/>

      <ActivityComponent
        refreshing={false}
        containerStyle={{top: scale(250), right: 0}}
        show={uid && redBag?.data && !isTest}
        logo={redBag?.data?.redBagLogo}
        onPress={() => {
          PushHelper.pushRedBag(redBag)
        }}
      />
      <ActivityComponent
        refreshing={false}
        containerStyle={{top: scale(400), right: 0}}
        enableFastImage={false}
        show={uid && turntableList?.data && !isTest}
        logo={ROULETTE_LOGO}
        onPress={() => {
          PushHelper.pushWheel(turntableList?.data)
        }}
      />
      {floatAds?.data?.map((item: any, index) => {
        const {image, position, linkCategory, linkPosition} = item
        return (
          <ActivityComponent
            key={index}
            refreshing={false}
            containerStyle={getActivityPosition(position)}
            enableFastImage={true}
            show={uid && !isTest}
            logo={image}
            onPress={() => {
              PushHelper.pushCategory(linkCategory, linkPosition)
            }}
          />
        )
      })}

      <MarqueePopupView onPress={() => {
        setShow(false)
      }} content={content} show={show} onDismiss={() => {
        setShow(false)
      }}/>

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
    </View>
  )
}

const _couponTitleItem = () => {
  return <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
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
}

const ZLHeader = () => {
  const {width, height} = useDimensions().window
  const insets = useSafeArea();
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
      height: scale(80) + topDistance,
      paddingTop: topDistance,
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      alignItems: 'center',
      borderColor: "grey"
    }}>
      <FastImageAutoWidth style={{height: scale(80)}} source={{uri: mobile_logo}}/>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={CommStyles.flex}/>
        <TouchableImage
          containerStyle={_styles.top_icon}
          pic={'https://cdn01.bimwill.com/views/mobileTemplate/28/images/icon_user.png'}
          resizeMode={'contain'}
          onPress={() => {
            if (!_checkLogin(false)) {
              navigate(PageName.HJMinePage, {})
            }
          }}/>
      </View>
    </View>
  )
}

/**
 * 刷新余额
 */
const _requestBalance = async () => {
  try {
    // showLoading({'正在刷新金额...');

    //@ts-ignore
    const {data, status} = await APIRouter.user_balance_token()
    UGStore.dispatch({type: 'merge', userInfo: {balance: data?.data?.balance}})
    // Toast('刷新成功！')

  } catch (error) {
    ugLog(error)
    // Toast('刷新失败请稍后再试！')
  }

  // hideLoading();
}

/**
 * 信息栏
 * @constructor
 */
const AccountDetail = () => {

  const {uid = "", balance = 0, isTest} = UGStore.globalProps.userInfo
  // if (true) {
  if (!anyEmpty(uid)) {
    return (
      <FastImage style={_styles.bottom_layout}
                 resizeMode={'stretch'}
                 source={{uri: "http://t126f.fhptcdn.com/views/mobileTemplate/28/images/fooernav_bg.png"}}>

        <View style={_styles.bottom_info}>
          <TouchableOpacity onPress={() => {
            if (!_checkLogin()) {
              PushHelper.pushUserCenterType(UGUserCenterType.存款)
            }

          }} style={[CommStyles.center, {padding: scale(20)}]}>
            <FastImage style={_styles.bottom_icon}
                       source={{uri: "http://test10.6yc.com/views/mobileTemplate/16/images/depositlogo.png"}}/>
            <Text style={_styles.bottom_font}>充值</Text>
          </TouchableOpacity>
          <Text style={_styles.bottom_money}> ¥ {balance}</Text>
        </View>

        <TouchableOpacity onPress={() => {
          if (!_checkLogin()) {
            PushHelper.pushUserCenterType(UGUserCenterType.额度转换)
          }

        }} style={[CommStyles.center, {padding: scale(20)}]}>
          <FastImage style={_styles.bottom_icon}
                     source={{uri: "http://test10.6yc.com/views/mobileTemplate/16/images/xima.png"}}/>
          <Text style={_styles.bottom_font}>转账</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if (!_checkLogin()) {
            PushHelper.pushUserCenterType(UGUserCenterType.取款)
          }

        }} style={[CommStyles.center,
          {padding: scale(20)}]}>
          <FastImage style={_styles.bottom_icon}
                     source={{uri: "http://test10.6yc.com/views/mobileTemplate/16/images/withdrawlogo.png"}}/>
          <Text style={_styles.bottom_font}>提现</Text>
        </TouchableOpacity>

      </FastImage>
    )
  } else {
    return <FastImage style={_styles.bottom_layout}
                      resizeMode={FastImage.resizeMode.stretch}
                      source={{
                        priority: FastImage.priority.high,
                        uri: 'http://test29f.fhptcdn.com/views/mobileTemplate/28/images/icon_navbg.png'
                      }}>

      <View style={CommStyles.flex}>
        <TouchableOpacity onPress={() => {
          navigate(PageName.HJLoginPage, {})

        }} style={[CommStyles.center, {padding: 16}]}>
          <FastImage style={_styles.bottom_icon}
                     source={{uri: "http://test29f.fhptcdn.com/views/mobileTemplate/28/images/icon_login.png"}}/>
          <Text style={_styles.bottom_font}>登录</Text>

        </TouchableOpacity>
      </View>

      <View style={[CommStyles.line_v, {height: scale(50)}]}/>

      <View style={CommStyles.flex}>

        <TouchableOpacity onPress={() => {
          navigate(PageName.HJRegisterPage, {})

        }} style={[CommStyles.center, {padding: 16}]}>
          <FastImage style={_styles.bottom_icon}
                     source={{uri: "http://test29f.fhptcdn.com/views/mobileTemplate/28/images/icon_reg.png"}}/>
          <Text style={_styles.bottom_font}>注册</Text>
        </TouchableOpacity>
      </View>

    </FastImage>
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

const _styles = StyleSheet.create({
  page_container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
  },
  game_container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  top_icon: {
    flex: 0,
    width: scale(80),
    height: scale(54),
    paddingHorizontal: scale(16)
  },
  bottom_icon: {
    width: scale(36),
    height: scale(36)
  },
  bottom_layout: {
    height: scale(130),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: "absolute",
    paddingTop: scale(20)
  },
  bottom_info: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  bottom_font: {
    color: 'white',
    fontSize: scale(20)
  },
  bottom_money: {
    fontSize: scale(22),
    color: 'white',
  },
  server_container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute'
  },
  server: {
    width: '25%',
    marginBottom: scale(140),
  },
})
export default HJHomePage
