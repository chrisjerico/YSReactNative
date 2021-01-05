import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import AppDefine from '../../define/AppDefine'
import LinearGradient from 'react-native-linear-gradient'
import { Skin1 } from '../../theme/UGSkinManagers'
import { pop } from '../../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/Entypo'
import { AlipayTransInView } from './AlipayTransInView'
import useHomePage from '../../hooks/tars/useHomePage'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { AlipayTransOutView } from './AlipayTransOutView'

export const AlipayTransferView = ({ route }) => {
  const [activeTab, setActiveTab] = useState(0)
  const { refresh } = useHomePage({})
  const { params } = route
  const { getYuebao, yuebao } = params

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    UGUserModel.updateFromNetwork()
    getYuebao()
  }

  return (
    <View style={{ backgroundColor: '#f3f3f3', flex: 1 }}>
      <Header name={yuebao?.yuebaoName} activeTab={activeTab}/>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == 0 ? <AlipayTransInView yuebao={yuebao} getData={getData} /> :
        <AlipayTransOutView getData={getData} yuebao={yuebao} />}
    </View>
  )
}

const Header = ({ name, activeTab }) => {
  return (
    <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <SafeAreaView style={{
        flexDirection: 'row',
      }}>
        <View style={{
          width: AppDefine.width,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
          <TouchableOpacity style={{ width: 30, height: 30, left: 20, position: 'absolute', zIndex: 2 }}
                            onPress={() => {
                              pop()
                            }}>
            <Icon size={28} name={'home'} color={Skin1.isBlack ? '#fff' : Skin1.textColor1} />
          </TouchableOpacity>
          <Text style={{
            alignSelf: 'center',
            paddingTop: 15,
            paddingBottom: 15,
            textAlign: 'center',
            fontSize: 20,
            flex: 1,
            color: Skin1.isBlack ? '#fff' : Skin1.textColor4,
          }}>{`${activeTab == 0 ? '转入' : '转出'}${name || `支付宝`}`}</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const TabBar = ({ activeTab, setActiveTab }) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#dddddd',
    }}>
      <TouchableWithoutFeedback onPress={() => setActiveTab(0)}>
        <View style={{
          paddingHorizontal: 48,
          paddingVertical: 12,
          borderBottomWidth: activeTab == 0 ? 2 : 0,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Skin1.tabSelectedColor,
        }}>
          <Text style={{
            fontSize: 15,
            color: activeTab == 0 ? Skin1.tabSelectedColor : Skin1.tabNoSelectColor,
          }}>转入</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setActiveTab(1)}>
        <View style={{
          paddingHorizontal: 48,
          paddingVertical: 12,
          borderBottomWidth: activeTab == 1 ? 2 : 0,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Skin1.tabSelectedColor,
        }}>
          <Text
            style={{
              fontSize: 15,
              color: activeTab == 1 ? Skin1.tabSelectedColor : Skin1.tabNoSelectColor,
            }}>转出</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
