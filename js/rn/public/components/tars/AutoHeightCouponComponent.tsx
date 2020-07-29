import React, { useState } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { scale } from '../../tools/Scale'
import TouchableImage from '../../views/tars/TouchableImage'

interface AutoHeightCouponAutoHeightCouponComponentProps {
  title: string;
  pic: string;
  onPress: () => any;
  content: string;
  enableOnPressPop?: boolean;
}

const AutoHeightCouponComponent = ({
  title,
  pic,
  onPress,
  content,
  enableOnPressPop = false,
}: AutoHeightCouponAutoHeightCouponComponentProps) => {
  const [aspectRatio, setAspectRatio] = useState(0)
  const [showPop, setShowPop] = useState(false)
  return (
    <View style={{ width: '100%' }}>
      <Text style={{ fontSize: scale(25), marginVertical: scale(10) }}>
        {title}
      </Text>
      <TouchableImage
        pic={pic}
        containerStyle={{ width: '100%', aspectRatio }}
        resizeMode={'contain'}
        onPress={() => {
          if (enableOnPressPop) {
            setShowPop(true)
          } else {
            onPress && onPress()
          }
        }}
        onLoad={(e) => {
          setAspectRatio(e.nativeEvent.width / e.nativeEvent.height)
        }}
      />
      <Modal visible={enableOnPressPop && showPop} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              width: '90%',
              height: '80%',
              backgroundColor: '#ffffff',
              borderRadius: scale(10),
            }}
          >
            <View
              style={{
                flex: 0.8,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E0E0E0',
                borderTopRightRadius: scale(10),
                borderTopLeftRadius: scale(10),
              }}
            >
              <Text style={{ fontSize: scale(20) }}>{title}</Text>
            </View>
            <View style={{ flex: 8 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <AutoHeightWebView
                  style={{ width: '100%' }}
                  // scalesPageToFit={true}
                  viewportContent={'width=device-width, user-scalable=no'}
                  source={{
                    html:
                      `<head>
<meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>
<style>img{width:auto !important;max-width:100%;height:auto !important}</style>
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
              </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                activeOpacity={1}
                title={'取消'}
                onPress={() => {
                  setShowPop(false)
                }}
                titleStyle={{ color: '#000000' }}
                buttonStyle={styles.cancelButton}
              />
              <Button
                activeOpacity={1}
                title={'確認'}
                onPress={() => {
                  setShowPop(false)
                }}
                buttonStyle={styles.confirmButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cancelButton: {
    backgroundColor: '#FCFCFC',
    borderColor: '#8E8E8E',
    borderWidth: scale(1),
    width: scale(220),
  },
  confirmButton: {
    borderWidth: scale(1),
    borderColor: '#8E8E8E',
    width: scale(220),
  },
})

export default AutoHeightCouponComponent
