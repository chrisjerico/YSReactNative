import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import AppDefine from '../../public/define/AppDefine'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import List from '../../public/views/tars/List'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'

const UserMessagePage = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    APIRouter.user_msgList().then((value) => {
      const list = value?.data?.data.list
      setList(list)
      console.log('------list------', list)
    })
  }, [])
  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'站內信'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <List
        uniqueKey={'MessagePage'}
        scrollEnabled={true}
        data={list}
        renderItem={({ item }) => {
          const { content, title, updateTime } = item
          return (
            <View style={styles.message}>
              <Text>{title}</Text>
              <Text>{updateTime}</Text>
            </View>
          )
        }}
      />
      <View style={{ position: 'absolute', bottom: 80, right: 0, height: 100, width: '100%', alignItems: 'flex-end' }}>
        <View style={{ width: '30%', aspectRatio: 4 }}>
          <ImageBackground source={{ uri: '站内信_底' }} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} resizeMode={'contain'}>
            <Image source={{ uri: '站内信_三角形' }} style={{ width: '15%', aspectRatio: 1 }} resizeMode={'contain'} />
          </ImageBackground>
        </View>
        <View style={{ flex: 1, backgroundColor: '#2894FF', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <Button
            title={'全部已读'}
            logo={'站内信_全部已读'}
            containerStyle={{ width: '30%', backgroundColor: '#ffffff', borderRadius: 5, aspectRatio: 3, flexDirection: 'row', marginHorizontal: 10 }}
            showLogo
            logoStyle={{ width: '17%', aspectRatio: 1, marginRight: 10 }}
            titleStyle={{ fontWeight: '600', fontSize: 16 }}
            useFastImage={false}
          />
          <Button
            title={'全部删除'}
            logo={'站内信_全部删除'}
            containerStyle={{ width: '30%', backgroundColor: '#ffffff', borderRadius: 5, aspectRatio: 3, flexDirection: 'row' }}
            showLogo
            logoStyle={{ width: '17%', aspectRatio: 1, marginRight: 10 }}
            titleStyle={{ fontWeight: '600', fontSize: 16 }}
            useFastImage={false}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  message: {
    width: '95%',
    aspectRatio: 10,
    borderBottomColor: '#9D9D9D',
    borderBottomWidth: AppDefine.onePx,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
})

export default UserMessagePage
