import * as React from 'react'
import { useEffect } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { CardView } from './component/minePage/CardView'
import Icon from 'react-native-vector-icons/FontAwesome'
import PushHelper from '../../public/define/PushHelper'
import useLoginOut from '../../public/hooks/useLoginOut'
import { PageName } from '../../public/navigation/Navigation'
import LinearGradient from 'react-native-linear-gradient'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { MinePageImgConfig } from '../../public/config/MinePageImgConfig'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { ugLog } from '../../public/tools/UgLog'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const LCMinePage = () => {
  const { info } = useMinePage({
    homePage: PageName.LCHomePage,
    defaultUserCenterLogos: MinePageImgConfig.defaultUserCenterLogos,
  })
  const { userInfo, sysInfo } = info
  const { unreadMsg, uid } = userInfo
  const { userCenterItems } = sysInfo
  const { loginOut } = useLoginOut(PageName.LCHomePage)
  useEffect(() => {
    uid == '' && PushHelper.pushUserCenterType(UGUserCenterType.登录页)
  }, [uid])

  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: '#ffffff', borderBottomColor: '#cccccc', borderBottomWidth: 1 }}>
        <View style={{
          backgroundColor: '#ffffff',
          width: Dimensions.get('screen').width,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
          <UGText style={{
            paddingTop: 15,
            paddingBottom: 15,
            textAlign: 'center',
            fontSize: 17,
            width: '100%',
            alignSelf: 'center',
          }}>{'我的'}</UGText>
        </View>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <CardView />
        <SafeAreaView>
          <FlatList
            scrollEnabled={false}
            style={{ borderTopWidth: 1, borderTopColor: '#E0E0E0' }}
            keyExtractor={(item, index) => `mine-${index}`}
            // data={userCenterItems?.slice(4, userCenterItems?.length) || []}
            data={userCenterItems || []}
            renderItem={({ item }) => {
              ugLog('name==',item.name)
              ugLog('logo==',item.logo)
              return (
                <TouchableWithoutFeedback style={{ flexDirection: 'row', flex: 1 }} onPress={() => {
                  PushHelper.pushUserCenterType(item.code)
                }}>
                  <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    marginLeft: 20,
                    height: 47,
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E0E0E0',
                  }}>
                    <Image style={{ height: 29, width: 29, marginRight: 10, resizeMode: 'stretch' }}
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
                  </View>
                </TouchableWithoutFeedback>
              )
            }} />
          <LinearGradient
            style={{
              marginTop: 10,
              marginBottom: 90,
              height: 55,
              borderRadius: 8,
              marginHorizontal: 20,
              justifyContent: 'center',
            }}
            colors={['#df830f', '#ffc200']}>
            <TouchableWithoutFeedback onPress={loginOut}>
              <View style={{
                height: 55,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}>
                <UGText style={{ color: 'white', fontSize: 21, alignSelf: 'center' }}>退出登录</UGText>
              </View>
            </TouchableWithoutFeedback>
          </LinearGradient>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

export default LCMinePage
