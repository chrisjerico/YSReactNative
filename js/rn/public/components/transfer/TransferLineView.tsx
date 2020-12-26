import { pop } from '../../navigation/RootNavigation'
import React, { useEffect, useState } from 'react'
import AppDefine from '../../define/AppDefine'
import LinearGradient from 'react-native-linear-gradient'
import { Skin1 } from '../../theme/UGSkinManagers'
import { Image, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { UGStore } from '../../../redux/store/UGStore'
import { useHtml5Image } from '../../tools/tars'
import { httpClient } from '../../network/httpClient'
import UGUserModel from '../../../redux/model/全局/UGUserModel'

export const TransferLineView = () => {
  const [activeTab, setActiveTab] = useState(tab[0])

  return (
    <View>
      <Header />
      <UserContent />
      <TabBar />
      <WalletTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  )
}

const Header = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    AppDefine.checkHeaderShowBackButton((show) => {
      show && setShow(show)
    })
  }, [])
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
          {show && <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => pop()}>
            <Icon size={28} name={'left'} color={Skin1.isBlack ? '#fff' : Skin1.textColor4} />
          </TouchableOpacity>}
          <Text style={{
            alignSelf: 'center',
            paddingTop: 15,
            paddingBottom: 15,
            textAlign: 'center',
            fontSize: 20,
            color: Skin1.isBlack ? '#fff' : Skin1.textColor4,
          }}>额度转换</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const UserContent = () => {
  const userStore = UGStore.globalProps.userInfo
  const { avatar, isTest, usr, balance, fullName } = userStore
  const { getHtml5Image } = useHtml5Image()
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 12, justifyContent: 'center' }}>
      <Image style={{ width: 70, height: 70 }}
             source={{ uri: isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar }} />
      <View style={{justifyContent: 'center', marginLeft: 24}}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{fontWeight: 'bold', fontSize: 14, color: Skin1.isBlack ? "white" : "black"}}>{usr}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => UGUserModel.updateFromNetwork()}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8 }}>
            <Text style={{color: Skin1.textColor2, fontSize: 14}}>用户余额：</Text>
            <Text style={{color: Skin1.themeColor, fontSize: 14}}>{balance}</Text>
            <Text style={{color: Skin1.textColor2, fontSize: 14}}> RMB</Text>
            <Image style={{ width: 20, height: 20, marginLeft: 4 }}
                   source={{ uri: httpClient.defaults.baseURL + '/images/icon-refresh.png' }} />
          </View>
        </TouchableWithoutFeedback>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 8}}>
          <Text style={{color: Skin1.textColor2, fontSize: 14}}>真实姓名：</Text>
          <Text style={{color: Skin1.themeColor, fontSize: 14}}>{fullName}</Text>
        </View>
      </View>
    </View>
  )
}

const TabBar = () => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 32,
      borderBottomWidth: 1,
      borderBottomColor: '#dddddd',
    }}>
        <View style={{
          paddingHorizontal: 32,
          paddingVertical: 12,
          borderBottomWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Skin1.themeColor,
        }}>
          <Text style={{
            fontSize: 14,
            color: Skin1.themeColor,
          }}>额度转换</Text>
        </View>
      <TouchableWithoutFeedback onPress={() => {
      }}>
        <View style={{
          paddingHorizontal: 32,
          paddingVertical: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text
            style={{
              fontSize: 14,
              color: Skin1.textColor3,
            }}>转换记录</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const WalletTabBar = ({ activeTab, setActiveTab }) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: Skin1.homeContentColor }}>
      {tab.map((item, index) => {
        return (
          <TouchableWithoutFeedback key={`tab-${index}`} onPress={() => setActiveTab(item)}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: activeTab == item ? 2 : 1,
              paddingVertical: 16,
              borderColor: activeTab == item ? Skin1.themeColor : Skin1.textColor3,
            }}>
              <Text style={{ color: activeTab == item ? Skin1.themeColor : Skin1.textColor3 }}>{item.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
      })}
    </View>
  )
}

const tab = [
  { title: '真人', category: 'real' },
  { title: '棋牌', category: 'card' },
  { title: '电子', category: 'game' },
  { title: '电竞', category: 'esport' },
  { title: '捕鱼', category: 'fish' },
  { title: '体育', category: 'sport' },
]


