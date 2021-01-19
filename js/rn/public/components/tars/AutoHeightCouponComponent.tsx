import React, { useState } from 'react'
import { Image, Modal, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { ScrollView } from 'react-native-gesture-handler'
import { scale } from '../../tools/Scale'
import TouchableImage from '../../views/tars/TouchableImage'
import Button from '../../../public/views/tars/Button'
import AppDefine from '../../define/AppDefine'
import { Skin1 } from '../../theme/UGSkinManagers'
import { Res } from '../../../Res/icon/Res'

interface AutoHeightCouponAutoHeightCouponComponentProps {
  title: string
  pic: string
  onPress: (setShowPop: (showPop: boolean) => any) => any
  content: string
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  slide?: boolean
}

const AutoHeightCouponComponent = ({ title, pic, onPress, content, containerStyle, titleStyle, slide = false }: AutoHeightCouponAutoHeightCouponComponentProps) => {
  const [aspectRatio, setAspectRatio] = useState(undefined)
  const [showPop, setShowPop] = useState(false)
  // const [show, setShow] = useState(true)
  // if (show) {
  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <TouchableImage
        pic={pic}
        containerStyle={{ width: '100%', aspectRatio }}
        resizeMode={'contain'}
        onPress={() => {
          onPress && onPress(setShowPop)
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
      {slide && (
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
  <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>
  </head>` +
              `<script>
  window.onload = function () {
    window.location.hash = 1;
    document.title = document.body.scrollHeight;
  }
  </script>` +
              content,
          }}
        />
      )}
      <Modal visible={showPop} transparent={true}>
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
              <Text style={{ marginVertical:13, fontSize: 17, fontWeight: '500' }}>{title}</Text>
              <View style={{ height:1, width:'100%', backgroundColor:'#ddd'}} />
            </View>
            <View style={{ flex: 8 }}>
              <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal:5}}>
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
  <style>body{width:100%-20;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:10}</style>
  </head>` +
                      `<script>
  window.onload = function () {
    window.location.hash = 1;
    document.title = document.body.scrollHeight;
  }
  </script>` +
                      content,
                  }}/>
                  <View style={{ flex: 1, width: '100%', alignItems: 'center'}}>
                    <Image 
                      source={{ uri: Res.promotion_more }} 
                      style={{ width: scale(250), height: scale(60)}}
                      onProgress={() => {
                        
                      }}
                      />
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
