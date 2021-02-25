import React, { useState } from 'react'
import { Image, Linking, Modal, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { scale } from '../../tools/Scale'
import TouchableImage from '../../views/tars/TouchableImage'
import Button from '../../../public/views/tars/Button'
import AppDefine from '../../define/AppDefine'
import { Skin1 } from '../../theme/UGSkinManagers'
import { Res } from '../../../Res/icon/Res'
import { ugLog } from '../../tools/UgLog'
import PushHelper from '../../define/PushHelper'
import { PushHomeGame } from '../../models/Interface'
import { PageName } from '../../navigation/Navigation'
import { push } from '../../navigation/RootNavigation'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'
import { List } from '../../network/Model/PromotionsModel'

interface AutoHeightCouponAutoHeightCouponComponentProps {
  title: string
  pic: string
  onPress?: (setShowPop: (showPop: boolean) => any) => any
  content: string
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  slide?: boolean
  item?: List
  couponStyle?: string
}

const AutoHeightCouponComponent = ({ title, pic, onPress, content, containerStyle, titleStyle, slide = false, couponStyle, item }: AutoHeightCouponAutoHeightCouponComponentProps) => {
  const [aspectRatio, setAspectRatio] = useState(undefined)
  const [showPop, setShowPop] = useState(false)
  const [showSlide, setShowSlide] = useState(slide)
  const [showUrl, setShowUrl] = useState((item?.linkUrl?.length>0) || (item?.linkCategory>0))
  // const [show, setShow] = useState(true)
  // if (show) {

  const defaultPress = () => {
    switch (couponStyle) {
      // 内页
      case 'page': {
        PushHelper.pushPromoteDetail(item)
        break
      }
      // 弹框
      case 'popup': {
        setShowPop(true)
        break
      }
      case 'slide': {
        ugLog("item=", item)
        setShowSlide(!showSlide)
        break
      }
    }
  }
  
  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      <UGText style={[styles.title, titleStyle]}>{title}</UGText>
      <TouchableImage
        pic={pic}
        containerStyle={{ width: '100%', aspectRatio }}
        resizeMode={'contain'}
        onPress={() => {
          onPress == null ? defaultPress() : onPress && onPress(setShowPop)
        }}
        onLoad={(e) => {
          const width = e?.nativeEvent?.width ?? 0
          const height = e?.nativeEvent?.height ?? 0
          setAspectRatio(height == 0 || width == 0 ? undefined : width / height)
        }}
        // onError={(error) => {
        //   console.log('------error------',error)
        //   setShow(false)
        // }}
      />
      {(onPress ? slide : showSlide) && (
        <View style={{ flex:1}}>
          <AutoHeightWebView
            style={{ width: '100%' }}
            scalesPageToFit={true}
            // onSizeUpdated={size => setHeight(size?.height)}
            viewportContent={'width=device-width, user-scalable=no'}
            source={{
              html:
                `<head>
                <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>
                <style>img{width:auto !important;max-width:100%;height:auto !important}</style>
                <style>table,table tr th, table tr td { border:1px solid; border-collapse: collapse}</style>
                <style>table{width:auto !important;}</style>
                <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>
                </head>` +
                `<script>
                window.onload = function () {
                  window.location.hash = 1;
                  document.title = document.body.scrollHeight;
                }
                </script>` + content,
            }}
            />
            {showUrl ? 
              (<Button
                  containerStyle={{ flex: 1, width: '100%', height: scale(90), alignItems: 'center'}}
                  showLogo={true}
                  logoStyle={{ flex: 1, width: '100%', alignItems: 'center'}}
                  logo={Res.promotion_more}
                  onPress={() => {
                    if (item?.linkUrl) {
                      push(PageName.Game3rdView, {url: item?.linkUrl})
                      setShowPop(false)
                      return
                    }
                    let game: PushHomeGame = {
                      seriesId: item?.linkCategory,
                      gameId: item?.linkPosition,
                      subId: item?.linkPosition,
                    }
                    PushHelper.pushHomeGame(game)
                    setShowPop(false)
                  }}
                />
            ) : null}
          </View>
      )}
      <Modal
        visible={showPop}
        transparent={true}
        onRequestClose={()=> {setShowPop(false)}}
        >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: '90%',
              height: '80%',
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: scale(10),
            }}>
            <View
              style={{
                height:60,
                alignItems: 'center',
                borderTopRightRadius: scale(10),
                borderTopLeftRadius: scale(10),
              }}>
              <UGText style={{ marginVertical:13, fontSize: 17, fontWeight: '500' }}>{title}</UGText>
              <View style={{ height:1, width:'100%', backgroundColor:'#ddd'}} />
            </View>
            <View style={{ flex:1}}>
              <ScrollView 
                showsVerticalScrollIndicator={false} 
                style={{paddingHorizontal:5}}>
                <View style={{ flex:1 }}>
                  <AutoHeightWebView
                    style={{ width: '100%' }}
                    scalesPageToFit={true} 
                    automaticallyAdjustContentInsets={false}
                    allowsInlineMediaPlayback={true}
                    onMessage={(webviewState) => {
                      let message  = JSON.parse(webviewState.nativeEvent.data)?.msg;
                      console.log("onMessage = ", message)
                      if (message?.length) Linking.openURL(message)
                    }}
                    // onSizeUpdated={size => setHeight(size?.height)}
                    viewportContent={'width=device-width, user-scalable=no'}
                    // onNavigationStateChange={event => {
                    //   ugLog("event.url: " + event.url)
                    // }}
                    source={{
                      html:
                        `<head>
                          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>
                          <style>img{width:auto !important;max-width:100%;height:auto !important}</style>
                          <style>table,table tr th, table tr td { border:1px solid; border-collapse: collapse}</style>
                          <style>body{width:100%-20;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:10}</style>
                        </head>` +
                        `<script>
                        window.onload = function () {
                          window.location.hash = 1;
                          document.title = document.body.scrollHeight;
                          var elem = document.querySelector('table');
                          elem.style.width = "100%"
                          var imgs = document.querySelectorAll('img')
                          imgs.forEach((ele) => {
                            if (ele == imgs[0] ) return
                            ele.style.padding = "10px 0px 0px 0px"
                          })
                        }

                        window.onclick = function(e) {
                          e.preventDefault();
                          var uri = e.path.find(ele => ele.tagName == "A" || ele.tagName == "a").getAttribute('href').toString()
                          var dataJson
                          if (uri != undefined) {
                            dataJson={
                              msg: uri,
                            }
                            window.ReactNativeWebView.postMessage(JSON.stringify(dataJson));
                          }
                          e.stopPropagation()
                        }
                        </script>` +
                        content,
                    }}/>
                    {showUrl ?
                      (<Button
                          containerStyle={{ flex: 1, width: '100%', height: scale(90), alignItems: 'center'}}
                          showLogo={true}
                          logoStyle={{ flex: 1, width: '100%', alignItems: 'center'}}
                          logo={Res.promotion_more}
                          onPress={() => {
                            // ugLog("onPress promotion url: " + item?.linkUrl)
                            if (item?.linkUrl) {
                              push(PageName.Game3rdView, {url: item?.linkUrl})
                              setShowPop(false)
                              return
                            }
                            let game: PushHomeGame = {
                              seriesId: item?.linkCategory,
                              gameId: item?.linkPosition,
                              subId: item?.linkPosition,
                            }
                            PushHelper.pushHomeGame(game)
                            setShowPop(false)
                          }}
                        />
                    ) : null}
                  </View>
              </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={'取消'}
                onPress={() => {
                  setShowPop(false)
                }}
                titleStyle={{ color: '#000', fontSize: 16 }}
                containerStyle={styles.cancelButton}
              />
              <Button
                title={'确认'}
                onPress={() => {
                  setShowPop(false)
                }}
                titleStyle={{ color: '#fff', fontSize: 16 }}
                containerStyle={styles.confirmButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
  // } else {
  //   return null
  // }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 5,
    marginHorizontal:8,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderColor: '#8E8E8E',
    borderWidth: AppDefine.onePx,
    width: scale(220),
    height:42,
    borderRadius: scale(5),
  },
  confirmButton: {
    backgroundColor:'#cc5c54',
    borderWidth: AppDefine.onePx,
    borderColor: '#8E8E8E',
    width: scale(220),
    height:42,
    borderRadius: scale(5),
  },
  title: {
    fontSize: scale(25),
    marginVertical: scale(10),
  },
})

export default AutoHeightCouponComponent
