import React from 'react'
import { Skin1 } from '../theme/UGSkinManagers'
import { Dimensions, Platform, SafeAreaView, Text, TouchableOpacity, View, Image } from 'react-native'
import { pop } from '../navigation/RootNavigation'
import { OCHelper } from '../define/OCHelper/OCHelper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { httpClient } from '../network/httpClient'

export const FeedbackView = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flexDirection: 'row' }}>
        <Image style={{ width: 40, height: 40 }} source={{ uri: httpClient.defaults.baseURL + '/images/zxkf.png' }} />
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#ccc", justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 16, flex: 1}}>在线客服</Text>
            <Icon size={20} color={"#444"} name={'angle-left'} style={{transform: [{ rotateY: "180deg" }] }} />
          </View>
          <View>
            {/*//todo*/}
          </View>
        </View>
      </View>
    </View>
  )
}

const Header = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Skin1.themeColor, borderBottomColor: '#cccccc', borderBottomWidth: 1 }}>
      <View style={{
        backgroundColor: Skin1.themeColor,
        width: Dimensions.get('screen').width,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
        <Text style={{
          paddingTop: 15,
          paddingBottom: 15,
          textAlign: 'center',
          fontSize: 17,
          width: '100%',
          alignSelf: 'center',
          color: Skin1.navBarTitleColor,
        }}>意见反馈</Text>
        <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => {
          pop()
          switch (Platform.OS) {
            case 'ios':
              OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true])
              break
            case 'android':

              break
          }
        }}>
          <Icon size={33} color={Skin1.navBarTitleColor} name={'angle-left'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>)
}
