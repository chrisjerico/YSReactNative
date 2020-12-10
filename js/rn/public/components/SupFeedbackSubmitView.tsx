import React, { useEffect, useState } from 'react'
import { api } from '../network/NetworkRequest1/NetworkRequest1'
import {
  Alert,
  Dimensions, Platform,
  SafeAreaView, ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { pop } from '../navigation/RootNavigation'
import { Skin1 } from '../theme/UGSkinManagers'
import { OCHelper } from '../define/OCHelper/OCHelper'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

export const SupFeedbackSubmitView = ({ route }) => {
  const [content, setContent] = useState('')
  const [detail, setDetail] = useState([])

  useEffect(() => {
    getDetail()
  }, [])

  const submit = () => {
    content.length >= 10 ? api.user.addFeedback(route.params.item.type, route.params.item.id, content).promise.then((data) => {
      Alert.alert(data.data.msg, '', [
        {
          text: '好',
          onPress: () => {
            pop()
          },
        },
      ])
    }) : Alert.alert('内容长度不得小于10')
  }


  const getDetail = () => {
    api.user.feedbackDetail(route.params.item.id).promise.then(({ data }) => {
      setDetail(data.data.list)
    })
  }
  return (
    <>
      <Header />
      <ScrollView style={{ paddingHorizontal: 20, paddingTop: 24, backgroundColor: '#f5f5f9', flex: 1 }}>
        <View style={{ backgroundColor: 'white', minHeight: 80 }}>
          <Text style={{ color: Skin1.textColor2, fontSize: 12, marginLeft: 8, marginTop: 8 }}>类型：提交建议</Text>
          <Text
            style={{ color: '#ad8552', fontSize: 12, marginLeft: 8, marginTop: 8 }}>{route.params.item.content}</Text>
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1 }}>
            <Text style={{
              color: Skin1.textColor2,
              fontSize: 12,
              marginBottom: 8,
              marginRight: 8,
            }}>{`提交时间：${moment(new Date(route.params.item.createTime * 1000)).format('YYYY-MM-DD HH:MM:ss')}`}</Text>
          </View>
        </View>
        {detail.map((item) => (
          <View style={{ backgroundColor: 'white', minHeight: 60, marginTop: 12 }}>
            <Text
              style={{ color: '#ad8552', fontSize: 12, marginLeft: 8, marginTop: 8 }}>{item.content}</Text>
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1 }}>
              <Text style={{
                color: Skin1.textColor2,
                fontSize: 12,
                marginBottom: 8,
                marginRight: 8,
              }}>{`提交时间：${moment(new Date(item.createTime * 1000)).format('YYYY-MM-DD HH:MM:ss')}`}</Text>
            </View>
          </View>
        ))}
        <TextInput
          multiline={true}
          style={{ backgroundColor: 'white', minHeight: 200, marginTop: 12, marginHorizontal: 16 }}
          placeholder={'请输入反馈内容'}
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
            marginHorizontal: 36,
          }}>
            <Text style={{ color: '#fff' }}>提交</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
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
        }}>反馈记录</Text>
        <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => pop()}>
          <Icon size={33} color={Skin1.navBarTitleColor} name={'angle-left'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>)
}
