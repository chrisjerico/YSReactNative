import {
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Skin1 } from '../theme/UGSkinManagers'
import { pop, push } from '../navigation/RootNavigation'
import { OCHelper } from '../define/OCHelper/OCHelper'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import { api } from '../network/NetworkRequest1/NetworkRequest1'
import { PageName } from '../navigation/Navigation'

export const FeedbackSubmitView = ({ route }) => {
  const [content, setContent] = useState('')
  const submit = () => {
    content.length >= 10 ? api.user.addFeedback(route.params.type, '', content).promise.then((data) => {
      Alert.alert(data.data.msg, '', [
        {
          text: '好',
          onPress: () => {
            pop()
          },
        },
      ])
    }) : Alert.alert('内容长度不得小于10');
  }

  return (
    <>
      <Header />
      <View style={{ paddingHorizontal: 20, paddingTop: 24, backgroundColor: '#f5f5f9', flex: 1 }}>
        <Text style={{ color: Skin1.textColor2 }}>反馈类型：{route?.params?.type == 0 ? '提交建议' : '我要投诉'} </Text>
        <TextInput
          multiline={true}
          style={{ backgroundColor: 'white', minHeight: 200, marginTop: 12, marginHorizontal: 16 }}
          placeholder={`请输入${route?.params?.type == 0 ? '反馈' : '投诉'}内容`}
          placeholderTextColor={Skin1.textColor3}
          onChangeText={(text) => setContent(text)}
        />
        <TouchableWithoutFeedback disabled={content.length == 0} onPress={submit}>
          <View style={{
            backgroundColor: content.length == 0 ? '#d19798' : '#d82e2f',
            marginTop: 12,
            alignItems: 'center',
            paddingVertical: 16,
            borderRadius: 4,
            marginHorizontal: 36
          }}>
            <Text style={{ color: '#fff' }}>提交</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
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
        }}>建议反馈</Text>
        <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => pop()}>
          <Icon size={33} color={Skin1.navBarTitleColor} name={'angle-left'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>)
}
