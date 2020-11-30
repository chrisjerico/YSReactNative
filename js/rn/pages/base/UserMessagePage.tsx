import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppDefine from '../../public/define/AppDefine'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import List from '../../public/views/tars/List'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/temp/MineHeader'

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
