import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  LogBox,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { HomeHeaderButtonBar } from './component/homePage/HomeHeaderButtonBar'
import { HomeTabView } from './component/homePage/HomeTabView'
import { ImageButton } from './component/ImageButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import PushHelper from '../../public/define/PushHelper'
import { UGStore } from '../../redux/store/UGStore'
import APIRouter from '../../public/network/APIRouter'
import AppDefine from '../../public/define/AppDefine'
import { httpClient } from '../../public/network/httpClient'
import { navigate, push } from '../../public/navigation/RootNavigation'
import { PageName } from '../../public/navigation/Navigation'
import { useDimensions } from '@react-native-community/hooks'
import RankListCP from '../../public/widget/RankList'
import PromotionsBlock from '../../public/components/PromotionsBlock'
import LinearGradient from 'react-native-linear-gradient'
import useHomePage from '../../public/hooks/tars/useHomePage'
import Activitys from '../../public/views/tars/Activitys'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { UGText } from '../../../doy/public/Button之类的基础组件/DoyButton'

const LLHomePage = ({ setProps, navigation }) => {
  LogBox.ignoreLogs(['Animated:'])
  const { info, refresh } = useHomePage({})
  const { homeInfo, loading, refreshing, userInfo, sysInfo } = info
  const { rankLists, redBag, goldenEggs, scratchs, roulette, floatAds, redBagLogo, announcements } = homeInfo
  const { showCoupon } = sysInfo
  const { uid, isTest } = userInfo
  const { mobile_logo, rankingListSwitch, webName } = sysInfo

  useEffect(() => {
    refresh()
  }, [uid])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setProps()
    })

    return unsubscribe
  }, [navigation])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView refreshControl={<RefreshControl style={{ backgroundColor: '#ffffff' }} refreshing={loading}
                                                    onRefresh={async () => {
                                                      try {
                                                        await refresh()
                                                        PushHelper.pushAnnouncement(announcements)
                                                      } catch (error) {
                                                        console.log('-------error------', error)
                                                      }
                                                    }} />} style={{ flex: 1 }}>
          <HomeHeaderButtonBar logoIcon={mobile_logo} />
          <HomeTabView />
          {showCoupon && (
            <>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8, marginTop: 10 }}
                onPress={() => {
                  push(PageName.PromotionListPage)
                }}>
                <Icon size={16} name={'gift'} />
                <UGText style={{ fontSize: 16, color: '#333333', padding: 10 }}>优惠活动</UGText>
                <View style={{ flex: 1 }} />
                <UGText style={{ fontSize: 16, color: '#333333', textAlign: 'center' }}>{`查看更多 >>`}</UGText>
              </TouchableOpacity>
              <View style={{ backgroundColor: '#ffffff' }}>
                <PromotionsBlock horizontal={true} titleVisible={false} />
              </View>
            </>
          )}
          <ImageButton
            imgStyle={{
              height: 131,
              width: Dimensions.get('screen').width - 16,
              marginHorizontal: 8,
              marginTop: 8,
            }}
            onPress={() => {
              const type = (!uid || uid === '') ? UGUserCenterType.登录页 : UGUserCenterType.推荐收益
              PushHelper.pushUserCenterType(type)
            }}
            uri={httpClient.defaults.baseURL + '/views/mobileTemplate/20/images/llhhr.png'}
          />
          {rankingListSwitch === 2 ? <SafeAreaView style={{ marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ paddingRight: 4 }} size={16} name={'bar-chart-o'} />
                <UGText style={{
                  fontSize: 16,
                  lineHeight: 22,
                  color: '#3c3c3c',
                  marginVertical: 10,
                }}>投注排行榜</UGText>
              </View>
              <RankListCP titleVisible={false} timing={5000} backgroundColor={'white'} textColor={'black'}
                          width={Dimensions.get('screen').width - 24} ranks={rankLists} />
            </SafeAreaView> :
            rankingListSwitch === 1 ? <SafeAreaView style={{ marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ paddingRight: 4 }} size={16} name={'bar-chart-o'} />
                <UGText style={{ fontSize: 16, lineHeight: 22, color: '#3c3c3c', marginVertical: 10 }}>中奖排行榜</UGText>
              </View>
              <RankListCP titleVisible={false} timing={10000} backgroundColor={'white'} textColor={'black'}
                          width={Dimensions.get('screen').width - 24} ranks={rankLists} />
            </SafeAreaView> : <></>}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <UGText
              onPress={() => {
                console.log(httpClient.defaults.baseURL + '/index2.php')
                PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
              }}
              style={{ color: 'black', textAlign: 'center', marginRight: 20, marginBottom: 5 }}>
              💻 电 脑 版
            </UGText>
            <UGText
              style={{ color: 'black', textAlign: 'center' }}
              onPress={() => {
                push(PageName.PromotionListPage)
              }}>
              🎁优惠活动
            </UGText>
          </View>
          <UGText style={{ color: 'black', textAlign: 'center' }}>COPYRIGHT © {webName} RESERVED</UGText>
          <UGText style={{ color: 'black', textAlign: 'center' }}>version: {30}</UGText>
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
      {(!uid || uid === '') && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            width: AppDefine.width,
            bottom: 120,
          }}>
          <LinearGradient colors={['#df4133', '#fe695b']} style={{ borderRadius: 40 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 8 }}>
              <TouchableOpacity style={{ height: 40, justifyContent: 'center', paddingHorizontal: 30 }}
                                onPress={() => navigate(PageName.LLLoginPage, {})}>
                <UGText style={{ fontSize: 20, color: '#ffffff' }}>登录</UGText>
              </TouchableOpacity>
              <View style={{ width: 1, backgroundColor: '#ffffff', height: 40 }} />
              <TouchableOpacity style={{ height: 40, justifyContent: 'center', paddingHorizontal: 30 }}
                                onPress={() => push(PageName.LLRegisterPage)}>
                <UGText style={{ fontSize: 20, color: '#ffffff' }}>注册</UGText>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      )}
      <Activitys uid={uid} isTest={isTest} refreshing={refreshing} redBagLogo={redBagLogo} redBag={redBag}
                 roulette={roulette} floatAds={floatAds} goldenEggs={goldenEggs} scratchs={scratchs} />
    </View>
  )
}

export default LLHomePage

const TurntableListItem = () => {
  const { width, height } = useDimensions().screen
  const userStore = UGStore.globalProps.userInfo
  const { isTest = false, uid = '' } = userStore
  const [turntableListVisiable, setTurntableListVisiable] = useState(false)
  const [turntableList, setTurntableList] = useState<any>()
  useEffect(() => {
    if (turntableList && turntableList != null) {
      setTurntableListVisiable(true)
    }
  }, [turntableList])
  const getTurntableList = async () => {
    try {
      const res = await APIRouter.activity_turntableList()
      res?.data != null && setTurntableList(res?.data)
    } catch (error) {
    }
  }
  useEffect(() => {
    if (uid != '') {
      getTurntableList()
    }
  }, [uid])
  if (turntableListVisiable && uid && uid != '') {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (uid == '') {
            Alert.alert('温馨提示', '您还未登录', [
              {
                text: '取消',
                onPress: () => {
                },
                style: 'cancel',
              },
              {
                text: '马上登录',
                onPress: () => {
                  navigate(PageName.LLLoginPage, {})
                },
              },
            ])
          } else if (isTest) {
            Alert.alert('温馨提示', '请先登录您的正式帐号', [
              {
                text: '取消',
                onPress: () => {
                },
                style: 'cancel',
              },
              {
                text: '马上登录',
                onPress: () => navigate(PageName.LLLoginPage, {}),
              },
            ])
          } else {
            PushHelper.pushWheel(turntableList?.data)
          }
        }}>
        <ImageBackground style={{ width: 95, height: 95, position: 'absolute', top: height / 2, right: 20 }}
                         source={{ uri: 'dzp_btn' }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setTurntableListVisiable(false)
            }}>
            <Image style={{ width: 20, height: 20, right: 0, top: 0, position: 'absolute' }}
                   source={{ uri: 'dialog_close' }} />
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>
    )
  } else {
    return null
  }
}
