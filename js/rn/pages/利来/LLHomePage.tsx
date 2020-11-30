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
import RedBagItem from '../../public/components/RedBagItem'
import { useDimensions } from '@react-native-community/hooks'
import RankListCP from '../../public/widget/RankList'
import PromotionsBlock from '../../public/components/PromotionsBlock'
import LinearGradient from 'react-native-linear-gradient'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import { getActivityPosition } from '../../public/tools/tars'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { TransferView } from '../../public/components/TransferView'
import { TransferRecordView } from '../../public/components/TransferRecordView'

const LLHomePage = ({ setProps, navigation }) => {
  LogBox.ignoreLogs(['Animated:'])
  const { value, refresh } = useHomePage({})
  const { rankList, redBag, loading, refreshing, userInfo, sysInfo, floatAds, onRefresh, m_promote_pos } = value
  const { uid } = userInfo
  const { mobile_logo, rankingListSwitch, webName } = sysInfo

  useEffect(() => {
    // const timer = setInterval(() => {
    refresh()
    //updateUserInfo()
    // }, 2000)
    // return () => {
    //   clearInterval(timer)
    // }
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
                                                    onRefresh={onRefresh} />} style={{ flex: 1 }}>
          <HomeHeaderButtonBar logoIcon={mobile_logo} />
          <HomeTabView />
          {m_promote_pos && (
            <>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8, marginTop: 10 }}
                onPress={() => {
                  push(PageName.PromotionListPage)
                }}>
                <Icon size={16} name={'gift'} />
                <Text style={{ fontSize: 16, color: '#333333', padding: 10 }}>优惠活动</Text>
                <View style={{ flex: 1 }} />
                <Text style={{ fontSize: 16, color: '#333333', textAlign: 'center' }}>{`查看更多 >>`}</Text>
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
              (!uid || uid === '') ? PushHelper.pushLogin() : PushHelper.pushUserCenterType(5)
            }}
            uri={httpClient.defaults.baseURL + '/views/mobileTemplate/20/images/llhhr.png'}
          />
          {rankList ? rankingListSwitch === 1 ? (
            <SafeAreaView style={{ marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ paddingRight: 4 }} size={16} name={'bar-chart-o'} />
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 22,
                    color: '#3c3c3c',
                    marginVertical: 10,
                  }}>
                  中奖排行榜
                </Text>
              </View>
              <RankListCP titleVisible={false} timing={10000} backgroundColor={'white'} textColor={'black'}
                          width={Dimensions.get('screen').width - 24} ranks={rankList} />
            </SafeAreaView>
          ) : (
            <SafeAreaView style={{ marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon style={{ paddingRight: 4 }} size={16} name={'bar-chart-o'} />
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 22,
                    color: '#3c3c3c',
                    marginVertical: 10,
                  }}>
                  投注排行榜
                </Text>
              </View>
              <RankListCP titleVisible={false} timing={10000} backgroundColor={'white'} textColor={'black'}
                          width={Dimensions.get('screen').width - 24} ranks={rankList} />
            </SafeAreaView>
          ) : <></>}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <Text
              onPress={() => {
                console.log(httpClient.defaults.baseURL + '/index2.php')
                PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
              }}
              style={{ color: 'black', textAlign: 'center', marginRight: 20, marginBottom: 5 }}>
              💻 电 脑 版
            </Text>
            <Text
              style={{ color: 'black', textAlign: 'center' }}
              onPress={() => {
                push(PageName.PromotionListPage)
              }}>
              🎁优惠活动
            </Text>
          </View>
          <Text style={{ color: 'black', textAlign: 'center' }}>COPYRIGHT © {webName} RESERVED</Text>
          <Text style={{ color: 'black', textAlign: 'center' }}>version: {28}</Text>
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
                <Text style={{ fontSize: 20, color: '#ffffff' }}>登录</Text>
              </TouchableOpacity>
              <View style={{ width: 1, backgroundColor: '#ffffff', height: 40 }} />
              <TouchableOpacity style={{ height: 40, justifyContent: 'center', paddingHorizontal: 30 }}
                                onPress={() => push(PageName.LLRegisterPage)}>
                <Text style={{ fontSize: 20, color: '#ffffff' }}>注册</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      )}
      {floatAds?.map((item: any, index) => {
        const { image, position, linkCategory, linkPosition } = item
        return (
          <ActivityComponent
            key={index}
            refreshing={refreshing}
            containerStyle={getActivityPosition(position)}
            enableFastImage={true}
            show={true} // uid && !isTest
            logo={image}
            onPress={() => {
              PushHelper.pushCategory(linkCategory, linkPosition)
            }}
          />
        )
      })}
      <RedBagItem redBag={redBag} style={{ top: 200 }} />
      <TurntableListItem />
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
