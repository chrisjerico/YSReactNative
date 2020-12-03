import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, ImageBackground, StyleSheet, Text, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import AppDefine from '../../public/define/AppDefine'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import Button from '../../public/views/tars/Button'
import List from '../../public/views/tars/List'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import BottomGap from '../../public/views/temp/BottomGap'

const UserMessagePage = () => {
  const inAnimated = useRef(false)
  const sliderIsOpen = useRef(false)
  const page = useRef(1)
  const maxPage = useRef(0)

  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])

  const [spinValue, setSpinValue] = useState(new Animated.Value(1))
  const [translateY, setTranslateY] = useState(new Animated.Value(70))
  const spinDeg = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  useEffect(() => {
    APIRouter.user_msgList().then((value) => {
      const _list = value?.data?.data.list
      maxPage.current = Math.ceil(value?.data?.data?.total / 20)
      setList(_list)
    })
  }, [])
  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'站內信'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <List
        uniqueKey={'MessagePage'}
        onEndReached={() => {
          if (page.current < maxPage.current) {
            setLoading(true)
            APIRouter.user_msgList(page.current)
              .then((value) => {
                const _list = value?.data?.data.list
                setList(list?.concat(_list))
              })
              .finally(() => {
                page.current = page.current + 1
                setLoading(false)
              })
          }
        }}
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
        ListFooterComponent={() => {
          if (page.current >= maxPage.current) {
            return null
          } else {
            if (loading) {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 50, flexDirection: 'row' }}>
                  <ActivityIndicator />
                  <Text style={{ fontWeight: '500', marginLeft: 20 }}>{'Loading...'}</Text>
                </View>
              )
            } else {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
                  <Text style={{ fontWeight: '500' }}>{'Tap or pull up to load more'}</Text>
                </View>
              )
            }
          }
        }}
      />
      <Animated.View style={{ position: 'absolute', bottom: 80, right: 0, height: 100, width: '100%', alignItems: 'flex-end', transform: [{ translateY }] }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (!inAnimated.current) {
              inAnimated.current = true
              Animated.parallel([
                Animated.timing(spinValue, {
                  toValue: sliderIsOpen.current ? 1 : 0,
                  duration: 1000,
                  easing: Easing.linear,
                  useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                  toValue: sliderIsOpen.current ? 70 : 0,
                  duration: 1000,
                  easing: Easing.linear,
                  useNativeDriver: true,
                }),
              ]).start(() => {
                sliderIsOpen.current = !sliderIsOpen.current
                inAnimated.current = false
              })
            }
          }}>
          <View style={{ width: '30%', aspectRatio: 4 }}>
            <ImageBackground source={{ uri: '站内信_底' }} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} resizeMode={'contain'}>
              <Animated.Image source={{ uri: '站内信_三角形' }} style={{ width: '15%', aspectRatio: 1, transform: [{ rotateZ: spinDeg }] }} resizeMode={'contain'} />
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
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
      </Animated.View>
      <BottomGap />
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
