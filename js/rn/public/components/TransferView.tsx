import React from 'react'
import { FlatList, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native'
import AppDefine from '../define/AppDefine'
import Icon from 'react-native-vector-icons/AntDesign'

export const TransferView = () => {
  const mainColor = 'black'
  return (
    <View>
      <Header mainColor={mainColor} pressRecord={() => {
      }} />
      <MiddleView mainColor={mainColor} balance={0} />
      <AccListView />
    </View>
  )
}

const Header = ({ mainColor, pressRecord }: { mainColor: string, pressRecord: () => {} }) => {
  return (
    <SafeAreaView style={{
      backgroundColor: mainColor,
      borderBottomColor: '#cccccc',
      borderBottomWidth: 1,
      flexDirection: 'row',
    }}>
      <View style={{
        width: AppDefine.width,
        backgroundColor: mainColor,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
        <Text style={{
          flex: 1,
          paddingTop: 15,
          paddingBottom: 15,
          textAlign: 'center',
          fontSize: 20,
          color: 'white',
        }}>额度转换</Text>
        <TouchableWithoutFeedback onPress={pressRecord}>
          <View style={{ justifyContent: 'flex-end', position: 'absolute', left: AppDefine.width - 80 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>转换纪录</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  )
}

const MiddleView = ({ mainColor, balance }: { mainColor: string, balance: string }) => {
  return (
    <View style={{ marginHorizontal: 12, marginTop: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>转出钱包</Text>
        <View style={{
          flex: 1,
          marginLeft: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#d9d9d9',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <Text style={{ fontSize: 14, paddingVertical: 10 }}>MG电子</Text>
          <View style={{ flex: 1 }} />
          <Icon style={{ alignSelf: 'center' }} size={16} name={'caretdown'} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>转出钱包</Text>
        <View style={{
          flex: 1,
          marginLeft: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#d9d9d9',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <Text style={{ fontSize: 14, paddingVertical: 10 }}>MG电子</Text>
          <View style={{ flex: 1 }} />
          <Icon style={{ alignSelf: 'center' }} size={16} name={'caretdown'} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>转出钱包</Text>
        <View style={{
          flex: 1,
          marginLeft: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#d9d9d9',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <Text style={{ fontSize: 14, paddingVertical: 10 }}>MG电子</Text>
          <View style={{ flex: 1 }} />
          <Icon style={{ alignSelf: 'center' }} size={16} name={'caretdown'} />
        </View>
      </View>
      <View style={{ paddingTop: 32 }}>
        <TouchableWithoutFeedback onPress={() => {
        }}>
          <View style={{ backgroundColor: mainColor, paddingVertical: 10, borderRadius: 4, height: 40 }}>
            <Text style={{ fontSize: 17, color: 'white', alignSelf: 'center' }}>开始转换</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
        }}>
          <View style={{ backgroundColor: mainColor, paddingVertical: 10, borderRadius: 4, marginTop: 12, height: 40 }}>
            <Text style={{ fontSize: 17, color: 'white', alignSelf: 'center' }}>一键提取</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
        }}>
          <View style={{
            backgroundColor: mainColor,
            paddingVertical: 10,
            borderRadius: 4,
            marginTop: 12,
            flexDirection: 'row',
            height: 40,
          }}>
            <Text
              style={{ marginLeft: 12, fontSize: 17, color: 'white', alignSelf: 'center' }}>{`帐号余额: ￥${balance}`}</Text>
            <Icon size={20} name={'reload1'} color={'white'} style={{ marginLeft: 16 }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const AccListView = () => {
  return (
    <FlatList style={{marginHorizontal: 12, marginTop: 12}} data={[1,2,3,4,5,6]} renderItem={() => (
      <View style={{ flexDirection: 'row', marginHorizontal: 8, borderBottomWidth: 1, borderBottomColor: "#d9d9d9", alignItems: 'center', paddingVertical: 12}}>
        <Icon style={{ alignSelf: 'center' }} size={24} name={'caretdown'} />
        <Text style={{fontSize: 14, paddingLeft: 16, flex: 1}}>MG电子</Text>
        <Text>￥*****</Text>
        <Icon size={20} name={'reload1'} color={'black'} style={{ marginLeft: 16 }} />
      </View>
    )} />
  )
}
