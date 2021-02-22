import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Animated, Easing, ImageBackground, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import PullToRefreshListComponent from '../../public/components/tars/PullToRefreshListComponent'
import AppDefine from '../../public/define/AppDefine'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import BottomGap from '../../public/views/temp/BottomGap'
import { showError, showLoading, showSuccess } from '../../public/widget/UGLoadingCP'
import { UGText } from '../../../doy/public/Button之类的基础组件/DoyButton'

const sleep = async (ms = 0) => {
  return new Promise((r) => setTimeout(r, ms))
}

const UserMessagePage = () => {
  const inAnimated = useRef(false)
  const sliderIsOpen = useRef(false)
  const page = useRef(1)
  const maxPage = useRef(0)

  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])

  const spinValue = useRef(new Animated.Value(1)).current
  const translateY = useRef(new Animated.Value(140)).current
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
      <PullToRefreshListComponent
        onReleaseToRefresh={async () => {
          await sleep(1000)
        }}
        initialNumToRender={20}
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
          const { content, title, updateTime, isRead, id } = item
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                APIRouter.user_readMsg(id).finally(() => {
                  const _list = list?.map((ele) => {
                    if (ele?.id == id) {
                      return Object.assign({}, ele, { isRead: 1 })
                    } else {
                      return ele
                    }
                  })
                  setList(_list)
                })
                Alert.alert('UG集团站内信', content, [
                  {
                    text: '确定',
                  },
                ])
              }}>
              <View style={styles.message}>
                <UGText style={isRead ? styles.readTextStyle : {}}>{title}</UGText>
                <UGText style={isRead ? styles.readTextStyle : {}}>{updateTime}</UGText>
              </View>
            </TouchableWithoutFeedback>
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
                  <UGText style={{ fontWeight: '500', marginLeft: 20 }}>{'Loading...'}</UGText>
                </View>
              )
            } else {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
                  <UGText style={{ fontWeight: '500' }}>{'Tap or pull up to load more'}</UGText>
                </View>
              )
            }
          }
        }}
      />
      <Animated.View style={{ position: 'absolute', bottom: 70, right: 0, height: 100, width: '100%', alignItems: 'flex-end', transform: [{ translateY }] }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (!inAnimated.current) {
              inAnimated.current = true
              Animated.parallel([
                Animated.timing(spinValue, {
                  toValue: sliderIsOpen.current ? 1 : 0,
                  duration: 500,
                  easing: Easing.linear,
                  useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                  toValue: sliderIsOpen.current ? 140 : 70,
                  duration: 500,
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
        <View style={{ flex: 1, backgroundColor: '#2894FF', width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
          <Button
            title={'全部已读'}
            logo={'站内信_全部已读'}
            containerStyle={{ width: '30%', backgroundColor: '#ffffff', borderRadius: 5, aspectRatio: 3, flexDirection: 'row', marginHorizontal: 10 }}
            showLogo
            logoStyle={{ width: '17%', aspectRatio: 1, marginRight: 10 }}
            titleStyle={{ fontWeight: '600', fontSize: 16 }}
            useFastImage={false}
            onPress={() => {
              showLoading()
              APIRouter.user_readMsgAll()
                .then(() => {
                  const _list = list?.map((ele) => {
                    return Object.assign({}, ele, { isRead: 1 })
                  })
                  setList(_list)
                  showSuccess('一键设置已读成功')
                })
                .catch((error) => {
                  showError(error)
                })
            }}
          />
          <Button
            title={'全部删除'}
            logo={'站内信_全部删除'}
            containerStyle={{ width: '30%', backgroundColor: '#ffffff', borderRadius: 5, aspectRatio: 3, flexDirection: 'row' }}
            showLogo
            logoStyle={{ width: '17%', aspectRatio: 1, marginRight: 10 }}
            titleStyle={{ fontWeight: '600', fontSize: 16 }}
            useFastImage={false}
            onPress={() => {
              showLoading()
              APIRouter.user_deleteMsgAll()
                .then(() => {
                  setList([])
                  showSuccess('一键设置删除成功')
                })
                .catch((error) => {
                  showError(error)
                })
            }}
          />
        </View>
      </Animated.View>
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
  readTextStyle: {
    color: '#9D9D9D',
  },
})

export default UserMessagePage
