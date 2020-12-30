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
import { UGStore } from '../../redux/store/UGStore'
import useMemberItems from '../../public/hooks/useMemberItems'
import PushHelper from '../../public/define/PushHelper'
import useLoginOut from '../../public/hooks/useLoginOut'
import { PageName } from '../../public/navigation/Navigation'
import LinearGradient from 'react-native-linear-gradient'

const LCMinePage = () => {
  const userStore = UGStore.globalProps.userInfo
  const { uid = '', unreadMsg } = userStore
  const { UGUserCenterItem } = useMemberItems()
  useEffect(() => {
    userStore && uid == '' && PushHelper.pushLogin()
  })
  const { loginOut } = useLoginOut(PageName.LCHomePage)

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
          <Text style={{
            paddingTop: 15,
            paddingBottom: 15,
            textAlign: 'center',
            fontSize: 17,
            width: '100%',
            alignSelf: 'center',
          }}>{'我的'}</Text>
        </View>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <CardView />
        <SafeAreaView>
          <FlatList
            scrollEnabled={false}
            style={{ borderTopWidth: 1, borderTopColor: '#E0E0E0' }}
            keyExtractor={(item, index) => `mine-${index}`}
            data={UGUserCenterItem}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback style={{ flexDirection: 'row', flex: 1 }} onPress={() => {
                console.log(item.code)
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
                  <Text
                    style={{ alignSelf: 'center', color: '#47535B', flex: 1 }}>{item.name}</Text>
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
                      <Text style={{ alignSelf: 'center', color: 'white' }}>{unreadMsg}</Text>
                    </View>)}
                </View>
              </TouchableWithoutFeedback>
            )} />
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
              <Text style={{ color: 'white', fontSize: 21, alignSelf: 'center' }}>退出登录</Text>
              </View>
            </TouchableWithoutFeedback>
          </LinearGradient>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

export default LCMinePage
