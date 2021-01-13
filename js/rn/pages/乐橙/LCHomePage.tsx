import { useDimensions } from '@react-native-community/hooks'
import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { HomeHeaderButtonBar } from './component/homePage/HomeHeaderButtonBar'
import { HomeTabView } from './component/homePage/homeTabView/HomeTabView'
import { navigate, push } from '../../public/navigation/RootNavigation'
import { PageName } from '../../public/navigation/Navigation'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import APIRouter from '../../public/network/APIRouter'
import FastImage from 'react-native-fast-image'
import { MarqueeHorizontal } from 'react-native-marquee-ab'
import PromotionsBlock from '../../public/components/PromotionsBlock'
import RedBagItem from '../../public/components/RedBagItem'
import AppDefine from '../../public/define/AppDefine'
import { NSValue } from '../../public/define/OCHelper/OCBridge/OCCall'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { httpClient } from '../../public/network/httpClient'
import { List } from '../../public/network/Model/BannerModel'
import { TurntableListModel } from '../../public/network/Model/TurntableListModel'
import { scale } from '../../public/tools/Scale'
import GameButton from '../../public/views/tars/GameButton'
import RankListCP from '../../public/widget/RankList'
import { UGStore } from '../../redux/store/UGStore'
import MarqueePopupView from '../common/MarqueePopupView'
import NavBlock from './component/homePage/NavBlock'
import Carousel from 'react-native-banner-carousel'
import Activitys from '../../public/views/tars/Activitys'


const LCHomePage = ({ setProps }) => {
  const { width } = useDimensions().screen
  const [originalNoticeString, setOriginalNoticeString] = useState<string>()
  const [noticeFormat, setNoticeFormat] = useState<{ label: string, value: string }[]>([])
  const [show, setShow] = useState(false)
  const [content, setContent] = useState('')
  const { refresh, info } = useHomePage({})
  const { loading, userInfo, sysInfo, homeInfo, refreshing, redBagLogo, isTest } = info
  const { showCoupon } = sysInfo
  const { homeGames, navs, rankLists, banners, onlineNum, redBag, notices, midBanners, goldenEggs, scratchs, roulette, bannersInterval, floatAds } = homeInfo
  const { rankingListSwitch, webName, midBannerTimer } = sysInfo
  const { uid } = userInfo

  useEffect(() => {
    const timer = setInterval(() => {
      setProps()
    }, 3000)
    return (() => {
      clearInterval(timer)
    })
  }, [])

  useEffect(() => {
    if (notices && notices.length > 0 && noticeFormat.length == 0) {
      let string = ''
      const noticeData = notices.map((res) => {
        string += res.content
        return { label: res.id, value: res.title }
      }) ?? []

      setNoticeFormat(noticeData)
      setOriginalNoticeString(string)
    }
  }, [notices])

  useEffect(() => {
    setProps()
  }, [userInfo.uid])

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      <HomeHeaderButtonBar info={info} />
      <ScrollView showsVerticalScrollIndicator={false}
                  refreshControl={<RefreshControl style={{ backgroundColor: '#ffffff' }} refreshing={loading}
                                                  onRefresh={refresh} />}
      >
        <Banner onlineNum={onlineNum} bannerData={banners} interval={bannersInterval} />
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          marginHorizontal: 8,
          marginBottom: 8,
          borderRadius: 16,
          paddingLeft: 5,
        }}>
          <FastImage source={{ uri: httpClient.defaults.baseURL + '/views/mobileTemplate/19/images/notice.png' }}
                     style={{ width: 12, height: 12, marginRight: 4 }} />
          <MarqueeHorizontal textStyle={{ color: 'black', fontSize: 16 }}
                             bgContainerStyle={{ backgroundColor: 'white' }}
                             width={width - 50}
                             height={40}
                             speed={60}
                             onTextClick={() => {
                               setShow(true)
                               setContent(originalNoticeString)
                             }}
                             textList={noticeFormat} />
        </View>
        {navs && navs.length > 0 && (
          <NavBlock
            info={info}
            navs={navs}
            containerStyle={{ alignItems: 'center' }}
            renderNav={(item, index) => {
              const { title, logo, icon, name, subtitle, tipFlag, hotIcon, subType, gameId } = item
              const showFlag = parseInt(tipFlag)
              return (
                <GameButton
                  showRightTopFlag={showFlag > 0 && showFlag < 4}
                  showCenterFlag={showFlag == 4}
                  showSecondLevelIcon={!!subType}
                  resizeMode={'contain'}
                  key={index}
                  imageContainerStyle={{ width: '45%' }}
                  enableCircle={false}
                  logo={icon || logo}
                  title={name || title}
                  flagIcon={hotIcon}
                  containerStyle={{width: AppDefine.width / 5 -5, paddingTop: 4}}
                  titleStyle={{ fontSize: scale(18) }}
                  titleContainerStyle={{ aspectRatio: 3 }}
                  onPress={() => {
                    if (gameId == 9) {
                      push(PageName.JDPromotionListPage, {
                        containerStyle: {
                          backgroundColor: '#ffffff',
                        },
                      })
                    } else {
                      PushHelper.pushHomeGame(item)
                    }
                  }}
                />
              )
            }}
          />
        )}
        {midBanners && midBanners.length > 0 &&
        <Banner onlineNum={onlineNum} bannerData={midBanners} interval={midBannerTimer} showOnlineCount={false}
                customHeight={150} />}
        <HomeTabView homeGames={homeGames} sysInfo={sysInfo} />
        {showCoupon && <>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
            <Icon style={{ paddingRight: 4 }} size={16} name={'gift'} />
            <TouchableWithoutFeedback onPress={() => {
              push(PageName.PromotionListPage)
            }}>
              <Text style={{ fontSize: 18, color: '#333333', lineHeight: 22, marginVertical: 10 }}>优惠活动</Text>
            </TouchableWithoutFeedback>
            <View style={{ flex: 1 }} />
            <TouchableWithoutFeedback onPress={() => {
              push(PageName.PromotionListPage)
            }}>
              <Text style={{ fontSize: 18, color: '#333333', textAlign: 'center' }}>查看更多>></Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ backgroundColor: 'white', marginHorizontal: 10, borderRadius: 16 }}>
            <PromotionsBlock />
          </View>
        </>
        }
        {rankingListSwitch === 2 ? <SafeAreaView style={{ marginHorizontal: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon style={{ paddingRight: 4 }} size={16} name={'bar-chart-o'} />
              <Text style={{
                fontSize: 16,
                lineHeight: 22,
                color: '#3c3c3c',
                marginVertical: 10,
              }}>投注排行榜</Text>
            </View>
            <RankListCP titleVisible={false} timing={5000} backgroundColor={'white'} textColor={'black'}
                        width={Dimensions.get('screen').width - 24} ranks={rankLists} />
          </SafeAreaView> :
          rankingListSwitch === 1 ? <SafeAreaView style={{ marginHorizontal: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon style={{ paddingRight: 4 }} size={16} name={'bar-chart-o'} />
              <Text style={{ fontSize: 16, lineHeight: 22, color: '#3c3c3c', marginVertical: 10 }}>中奖排行榜</Text>
            </View>
            <RankListCP titleVisible={false} timing={10000} backgroundColor={'white'} textColor={'black'}
                        width={Dimensions.get('screen').width - 24} ranks={rankLists} />
          </SafeAreaView> : <></>}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <Text onPress={() => {
            PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
          }} style={{ color: 'black', textAlign: 'center', marginRight: 20, marginBottom: 5 }}>💻 电 脑 版</Text>
          <Text style={{ color: 'black', textAlign: 'center' }} onPress={() => {
            push(PageName.PromotionListPage)
          }}>🎁优惠活动</Text>
        </View>
        <Text style={{ color: 'black', textAlign: 'center' }}>COPYRIGHT © {webName} RESERVED</Text>
        <Text style={{ color: '#000000', textAlign: 'center' }}>{'VERSION : 13'}</Text>
        <View style={{ height: 100 }} />
      </ScrollView>
      <Activitys uid={uid} isTest={isTest} refreshing={refreshing} redBagLogo={redBagLogo} redBag={redBag}
                 roulette={roulette} floatAds={floatAds} goldenEggs={goldenEggs} scratchs={scratchs} />
      <MarqueePopupView onPress={() => {
        setShow(false)
      }} content={content} show={show} onDismiss={() => {
        setShow(false)
      }} />
    </View>
  )
}

const TurntableListItem = () => {
  const { width, height } = useDimensions().screen
  const { isTest = false, uid = '' } = UGStore.globalProps.userInfo
  const [turntableListVisiable, setTurntableListVisiable] = useState(false)
  const [turntableList, setTurntableList] = useState<TurntableListModel>()
  useEffect(() => {
    if (turntableList) {
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
    if (uid != '') {
      getTurntableList()
    }
  }, [uid])
  if (turntableListVisiable) {
    return (
      <TouchableWithoutFeedback onPress={() => {
        if (uid == '') {
          Alert.alert('温馨提示', '您还未登录', [
            {
              text: '取消', onPress: () => {
              }, style: 'cancel',
            },
            {
              text: '马上登录', onPress: () => {
                navigate(PageName.ZLLoginPage, {})
              },
            },
          ])
        } else if (isTest) {
          Alert.alert('温馨提示', '请先登录您的正式帐号', [
            {
              text: '取消', onPress: () => {
              }, style: 'cancel',
            },
            {
              text: '马上登录', onPress: () => PushHelper.pushLogin(),
            },
          ])
        } else {
          if (Platform.OS != 'ios') return
          const turntableListModel = Object.assign({ clsName: 'DZPModel' }, turntableList?.[0])
          OCHelper.call(({ vc }) => ({
            vc: {
              selectors: 'DZPMainView.alloc.initWithFrame:[setItem:]',
              args1: [NSValue.CGRectMake(100, 100, AppDefine.width - 60, AppDefine.height - 60)],
              args2: [turntableListModel],
            },
            ret: {
              selectors: 'SGBrowserView.showMoveView:yDistance:',
              args1: [vc, 100],
            },
          }))
        }
      }}>
        <ImageBackground style={{ width: 95, height: 95, position: 'absolute', top: height / 2, right: 20 }}
                         source={{ uri: 'dzp_btn' }}>
          <TouchableWithoutFeedback onPress={() => {
            setTurntableListVisiable(false)
          }}>
            <Image style={{ width: 20, height: 20, right: 0, top: 0, position: 'absolute' }}
                   source={{ uri: 'dialog_close' }} />
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>)
  } else {
    return null
  }

}
const Banner = ({ bannerData, onlineNum = 0, showOnlineCount = true, customHeight, interval }: { bannerData: List[], onlineNum: number, showOnlineCount?: boolean, customHeight?: number, interval?: any }) => {
  const { width } = useDimensions().window
  const BannerRef = React.useRef<Carousel>()
  const [height, setHeight] = useState(100)
  useEffect(() => {
    const timer = setInterval(() => {
        //@ts-ignore
        BannerRef?.current?.gotoNextPage()
      },
      interval ?
        parseInt(interval) * 1000 : 5000)
    return (() => {
      clearInterval(timer)
    })
  }, [bannerData])

  useEffect(() => {
    customHeight && setHeight(customHeight)
  }, [customHeight])

  if (bannerData.length > 0 || bannerData.length > 0) {
    return (
      <View style={{ marginBottom: 10 }}>
        <Carousel
          autoplay
          index={0}
          ref={BannerRef}
          loop
          pageSize={width}
        >
          {bannerData.map((res, index) => {
            return (
              <TouchableWithoutFeedback key={index} onPress={() => {
                PushHelper.pushCategory(res.linkCategory, res.linkPosition)
              }}>
                <FastImage onLoad={(e) => {
                  setHeight(e.nativeEvent.height * ((width) / e.nativeEvent.width))
                }} key={'banner' + index} style={{ width: width, height: height }}
                           source={{ uri: res.pic || res.image }}>

                </FastImage>
              </TouchableWithoutFeedback>)
          })}
        </Carousel>
        {showOnlineCount && <View style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: 16,
          padding: 5,
        }}>
          <Text style={{ color: 'white' }}>当前在线:{onlineNum}</Text>
        </View>}
      </View>
    )
  } else {
    return <View style={{ height: (Dimensions.get('screen').width) / 2 }} />
  }

}
export default LCHomePage
