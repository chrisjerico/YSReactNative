import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { UGStore } from '../../redux/store/UGStore'
import Icon from 'react-native-vector-icons/FontAwesome'
import PushHelper from '../../public/define/PushHelper'
import useMemberItems from '../../public/hooks/useMemberItems'
import useLoginOut from '../../public/hooks/useLoginOut'
import { PageName } from '../../public/navigation/Navigation'
import APIRouter from '../../public/network/APIRouter'
import { httpClient } from '../../public/network/httpClient'
import PickAvatarComponent from '../../public/components/tars/PickAvatarComponent'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { useDimensions } from '@react-native-community/hooks'
import { Button } from 'react-native-elements'
import { pop } from '../../public/navigation/RootNavigation'
import { UGBasePageProps } from '../base/UGPage'
import AppDefine from '../../public/define/AppDefine'
import { MinePageImgConfig } from '../../public/config/MinePageImgConfig'
import { useHtml5Image } from '../../Res/icon'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const LLMinePage = ({ navigation, setProps }: UGBasePageProps) => {
  const {
    pickAvatarComponentRef,
    onSaveAvatarSuccess,
    onPressAvatar,
    info,
  } = useMinePage({
    homePage: PageName.LLHomePage,
    defaultUserCenterLogos: MinePageImgConfig.defaultUserCenterLogos,
  })
  const { sysInfo } = info
  const { balanceDecimal } = sysInfo
  const { getHtml5Image } = useHtml5Image()
  const { UGUserCenterItem } = useMemberItems()
  const [levelWidth, setLevelWidth] = useState(0)
  const [depositItem, setDepositItem] = useState<any>()
  const [withdrawItem, setWithdrawItem] = useState<any>()
  const [transferItem, setTransferItem] = useState<any>()
  const [missionItem, setMissionItem] = useState<any>()
  const { loginOut } = useLoginOut(PageName.LLHomePage)
  const [spinValue, setSpinValue] = useState(new Animated.Value(0))
  const reload = useRef(false)
  const spinDeg = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })
  const userStore = UGStore.globalProps.userInfo
  const { width } = useDimensions().window
  const { uid = '', curLevelTitle, curLevelInt, nextLevelInt, curLevelGrade, nextLevelGrade, avatar, isTest, balance, usr, unreadMsg, taskRewardTotal } = userStore
  const [showBackBtn, setShowBackBtn] = useState(false)

  const getLevelWidth = () => {
    setLevelWidth(193 * parseFloat(taskRewardTotal).toFixed(balanceDecimal || 2) / parseFloat(nextLevelInt).toFixed(balanceDecimal || 2))
  }

  const refresh = async () => {
    const { data: userInfo } = await APIRouter.user_info()
    UGStore.dispatch({ type: 'merge', props: userInfo?.data })
    setProps()
    UGStore.save()
  }

  useEffect(() => {
    navigation.addListener('focus', async () => {
      const { data: userInfo } = await APIRouter.user_info()
      UGStore.dispatch({ type: 'merge', props: userInfo?.data })
      UGStore.save()
      setProps()
    })

    setProps({
      didFocus: () => {
        AppDefine.checkHeaderShowBackButton((show) => {
          setShowBackBtn(show)
        })
      }
    }, false)
    return (() => {
      navigation.removeListener('focus', null)
    })
  }, [])

  useEffect(() => {
    if (UGUserCenterItem) {
      setDepositItem(UGUserCenterItem.find((item) => item.name == '存款'))
      setWithdrawItem(UGUserCenterItem.find((item) => item.name == '取款'))
      setTransferItem(UGUserCenterItem.find((item) => item.name == '额度转换'))
      setMissionItem(UGUserCenterItem.find((item) => item.name == '任务中心'))
    }
  }, [UGUserCenterItem])

  useEffect(() => {
    taskRewardTotal && nextLevelInt && getLevelWidth()
  }, [taskRewardTotal, nextLevelInt])

  return (
    <>
      <StatusBar barStyle="light-content" translucent={true} />
      <SafeAreaView style={{ backgroundColor: '#39150D' }}>
        <ScrollView bounces={false} style={{ backgroundColor: '#ffffff' }}>
          <SafeAreaView style={{ backgroundColor: '#39150D', height: 172 }}>
            <View style={{ marginHorizontal: 10, marginBottom: -5, flexDirection: 'row', alignItems: 'center' }}>
              {showBackBtn && (
                <Button
                  icon={{ name: 'ios-arrow-back', type: 'ionicon', color: '#A7BEDF' }}
                  buttonStyle={Object.assign({ backgroundColor: 'transparent', marginLeft: -8 })}
                  onPress={() => {
                    pop();
                  }}
                />
              )}
              <View style={{ flex: 1 }} />
              <TouchableWithoutFeedback onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
              }}>
                <Image style={{ width: 28, height: 28, marginRight: 8 }}
                  source={{ uri: httpClient.defaults.baseURL + '/views/mobileTemplate/20/images/zxkf.png' }} />
              </TouchableWithoutFeedback>
            </View>
            <View style={{
              backgroundColor: '#F3745B',
              marginHorizontal: 8,
              marginVertical: 12,
              height: 159,
              borderRadius: 6,
            }}>
              <View style={{ flexDirection: 'row', marginHorizontal: 8, marginVertical: 16 }}>
                <TouchableWithoutFeedback onPress={() => onPressAvatar()}>
                  <Image style={{ width: 50, height: 50 }}
                         source={{ uri: isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar }} />
                </TouchableWithoutFeedback>
                <View style={{ marginLeft: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <UGText style={{ color: '#ffffff', lineHeight: 20, fontSize: 14 }}>{usr}</UGText>
                    <LinearGradient colors={['#FFEAC3', '#FFE09A']} start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                      marginLeft: 8,
                                      marginTop: 1,
                                      borderRadius: 3,
                                      width: 42,
                                      height: 17,
                                    }}>
                      <UGText style={{
                        marginTop: 0.5,
                        textAlign: 'center',
                        color: '#8F6832',
                        fontStyle: 'italic',
                        fontWeight: '600',
                        fontSize: 13,
                      }}>{curLevelGrade}</UGText>
                    </LinearGradient>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      backgroundColor: '#ddf',
                      width: 193,
                      height: 8,
                      borderRadius: 4,
                    }} />
                    <View style={{
                      position: 'absolute',
                      backgroundColor: '#3F64D8',
                      width: levelWidth,
                      height: 8,
                      borderRadius: 4,
                    }} />
                    <UGText
                      style={{
                        position: 'absolute',
                        left: 91.5,
                        color: '#ffffff',
                        lineHeight: 20,
                        fontSize: 8,
                      }}>{isNaN(parseFloat(taskRewardTotal).toFixed(balanceDecimal || 2) / parseFloat(nextLevelInt).toFixed(balanceDecimal || 2)) ?
                      '0%' :
                      parseFloat(taskRewardTotal).toFixed(balanceDecimal || 2) / parseFloat(nextLevelInt).toFixed(balanceDecimal || 2) * 100 + '%'}</UGText>
                    <UGText
                      style={{
                        color: '#ffffff',
                        lineHeight: 20,
                        fontSize: 14,
                      }}>{nextLevelGrade}</UGText>
                  </View>
                  {levelWidth === 193 ?
                    <UGText style={{ color: '#ffffff', fontSize: 14 }}>恭喜您已经是最高等级!</UGText> :
                    <UGText style={{
                      color: '#ffffff',
                      fontSize: 14,
                    }}>{`距离下一级还差${isNaN(parseFloat(nextLevelInt) - parseFloat(taskRewardTotal)) ? 0.00 : (parseFloat(nextLevelInt).toFixed(balanceDecimal || 2) - parseFloat(taskRewardTotal).toFixed(balanceDecimal || 2)).toFixed(balanceDecimal || 2)}`}</UGText>
                  }
                </View>
              </View>
              <View style={{ marginHorizontal: 16, marginTop: 16 }}>
                <UGText style={{ fontSize: 13, color: '#ffffff' }}>总余额（元）</UGText>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <UGText style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>{balance ? isNaN(Number(balance)) ? `¥0.00` : `¥` + parseFloat(balance).toFixed(balanceDecimal || 2) : `¥0.00`}</UGText>
                  <View style={{ flex: 1 }} />
                  <Animated.View
                    style={[{ transform: [{ rotateZ: spinDeg }] }]}
                  >
                    <Icon size={18} style={{ color: '#ffffff' }} name={'refresh'} onPress={() => {
                      Animated.timing(spinValue, {
                        toValue: 1,
                        duration: 3000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                      }).start(() => {
                        setSpinValue(new Animated.Value(0))
                        reload.current = false
                      })
                      refresh()
                    }} />
                  </Animated.View>
                </View>
              </View>
            </View>
          </SafeAreaView>
          <View style={{
            marginTop: 56,
            flexDirection: 'row',
            width: Dimensions.get('screen').width - 16,
            marginHorizontal: 8,
          }}>
            <TouchableWithoutFeedback onPress={() => PushHelper.pushCategory(7, 21)}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Image style={{ width: 36, height: 28 }}
                       source={{ uri: 'http://test05.fhptdev.com/views/mobileTemplate/20/images/Cdeposit.png' }} />
                <UGText style={{ color: '#666666', fontSize: 14, marginTop: 4 }}>充值</UGText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => PushHelper.pushCategory(7, 22)
            }>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Image style={{ width: 36, height: 28 }}
                       source={{ uri: 'http://test05.fhptdev.com/views/mobileTemplate/20/images/Cwithdraw.png' }} />
                <UGText style={{ color: '#666666', fontSize: 14, marginTop: 4 }}>提现</UGText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => PushHelper.pushUserCenterType(transferItem.code)}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Image style={{ width: 36, height: 28 }}
                       source={{ uri: 'http://test05.fhptdev.com/views/mobileTemplate/20/images/Cconversion.png' }} />
                <UGText style={{ color: '#666666', fontSize: 14, marginTop: 4 }}>额度转换</UGText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => PushHelper.pushUserCenterType(missionItem.code)}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Image style={{ width: 36, height: 28 }}
                       source={{ uri: 'http://test05.fhptdev.com/views/mobileTemplate/20/images/Ctask.png' }} />
                <UGText style={{ color: '#666666', fontSize: 14, marginTop: 4 }}>任务中心</UGText>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <SafeAreaView>
            <FlatList
              scrollEnabled={false}
              style={{ borderTopWidth: 1, borderTopColor: '#E0E0E0', marginTop: 20, marginBottom: 90 }}
              keyExtractor={(item, index) => `mine-${index}`}
              data={UGUserCenterItem}
              ListFooterComponent={() => (
                <View style={{
                  flexDirection: 'row',
                  flex: 1,
                  marginLeft: 20,
                  height: 47,
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0',
                }}>
                  <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={loginOut}>
                    <Image style={{ height: 29, width: 29, marginRight: 10 }}
                           source={{ uri: httpClient.defaults.baseURL + `/views/mobileTemplate/20/images/Csignout.png` }} />
                    <UGText style={{ alignSelf: 'center', color: '#47535B', flex: 1 }}>退出登录</UGText>
                    <View style={{ marginRight: 20 }}>
                      <Icon size={20} name={'angle-right'} />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              renderItem={({ item }) => (
                <View style={{
                  flexDirection: 'row',
                  flex: 1,
                  marginLeft: 20,
                  height: 47,
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0',
                }}>
                  <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => {
                    PushHelper.pushUserCenterType(item.code)
                  }}>
                    <Image style={{ height: 29, width: 29, marginRight: 10 }}
                           source={{ uri: item.logo }} />
                    <UGText
                      style={{ alignSelf: 'center', color: '#47535B', flex: 1 }}>{item.name}</UGText>
                    <View style={{ marginRight: 20 }}>
                      <Icon size={20} name={'angle-right'} />
                    </View>
                    {item.name === '站内信' && unreadMsg > 0 && (
                      <View style={{
                        position: 'absolute',
                        left: 85,
                        backgroundColor: 'red',
                        borderRadius: 30,
                        justifyContent: 'center',
                        width: 20,
                        height: 20,
                      }}>
                        <UGText style={{ alignSelf: 'center', color: 'white' }}>{unreadMsg}</UGText>
                      </View>)}
                  </TouchableOpacity>
                </View>
              )} />
          </SafeAreaView>
          <PickAvatarComponent
            ref={pickAvatarComponentRef}
            color={'#fb5959'}
            initAvatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
            onSaveAvatarSuccess={onSaveAvatarSuccess}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default LLMinePage
