import React from 'react'
import { Skin1 } from '../theme/UGSkinManagers'
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { navigate, pop } from '../navigation/RootNavigation'
import { OCHelper } from '../define/OCHelper/OCHelper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { httpClient } from '../network/httpClient'
import { goToUserCenterType } from '../tools/tars'
import { PageName } from '../navigation/Navigation'

export const FeedbackView = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FeedBackItem
        onPress={goToUserCenterType.在线客服}
        img={httpClient.defaults.baseURL + '/images/zxkf.png'}
        title={`在线客服`}
        subText={`游戏过程中遇到的问题（如充值提款等），请联系在线客服以便我们为您及时处理。`}
      />
      <FeedBackItem
        onPress={() => navigate(PageName.FeedbackSubmitView, {type: 0})}
        img={httpClient.defaults.baseURL + '/images/jyfk.png'}
        title={`建议反馈`}
        subText={`如果您对游戏或者平台有好的建议可以进行提交，官方客服会在48小时内进行回复。我们会参考您的反馈不断优化我们的产品和服务。`}
      />
      <FeedBackItem
        onPress={() => navigate(PageName.FeedbackSubmitView, {type: 1})}
        img={httpClient.defaults.baseURL + '/images/tsjy.png'}
        title={`投诉建议`}
        subText={`为了让平台所有会员获得最好的服务，维护会员权益，我们为会员提供出款监督服务，如出款遇到恶意拖延、不出款等问题可以提出投诉！我们会尽快为您解决。`}
      />
      <FeedBackItem
        onPress={() => navigate(PageName.FeedbackRecordView)}
        img={httpClient.defaults.baseURL + '/images/fkjl.png'}
        title={`反馈记录`}
        subText={`为了让平台所有会员获得最好的服务，维护会员权益，我们为会员提供出款监督服务，如出款遇到恶意拖延、不出款等问题可以提出投诉！我们会尽快为您解决。`}
      />
    </View>
  )
}

const FeedBackItem = ({ onPress, title, img, subText }: { onPress: () => void, title: string, img: string, subText: string }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12, marginVertical: 16 }}>
        <Image style={{ width: 40, height: 40 }} source={{ uri: img }} />
        <View style={{ flex: 1, marginLeft: 20 }}>
          <View style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 16, flex: 1, marginBottom: 12 }}>{title}</Text>
            <Icon size={20} color={'#444'} name={'angle-left'}
                  style={{ transform: [{ rotateY: '180deg' }], marginRight: 16, marginBottom: 12 }} />
          </View>
          <View style={{ width: 280, paddingTop: 16 }}>
            <Text style={{ fontSize: 12, color: Skin1.textColor2 }}>{subText}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
        <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => pop()}>
          <Icon size={33} color={Skin1.navBarTitleColor} name={'angle-left'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>)
}
