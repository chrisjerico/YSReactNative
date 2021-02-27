import React, { useState } from 'react'
import { Image, Modal, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { scale } from '../../public/tools/Scale'
import TouchableImage from '../../public/views/tars/TouchableImage'
import Button from '../../public/views/tars/Button'
import AppDefine from '../../public/define/AppDefine'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { Res } from '../../Res/icon/Res'
import { ugLog } from '../../public/tools/UgLog'
import PushHelper from '../../public/define/PushHelper'
import { PushHomeGame } from '../../public/models/Interface'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import { UGPromoteModel } from '../../redux/model/other/UGPromoteModel'
import { BaseScreen } from '../乐橙/component/BaseScreen'

interface IRouteParams {
  item?: UGPromoteModel,
  showBackBtn?: string // 1或者不传 为 显示
}

const PromotionDetailPage = (props: any) => {
  const { item, showBackBtn }: IRouteParams = props?.route?.params
  const showUrl: boolean = (item?.linkUrl?.length>0) || (item?.linkCategory>0)
  const [aspectRatio, setAspectRatio] = useState(undefined)

  return (
    <BaseScreen style={styles.container}
                hideLeft={showBackBtn == '0'}
                screenName={'活动详情'}>
    <View style={{ flex: 1 }}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={{paddingHorizontal:5}}>
        <View style={{ flex:1 }}>
          <Text style={[styles.title]}>{item?.title}</Text>
          <TouchableImage
            pic={item?.pic}
            containerStyle={{ width: '100%', aspectRatio }}
            resizeMode={'contain'}
            onLoad={(e) => {
              const width = e?.nativeEvent?.width ?? 0
              const height = e?.nativeEvent?.height ?? 0
              setAspectRatio(height == 0 || width == 0 ? undefined : width / height)
            }}
            />
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
                item?.content,
            }}/>
            {showUrl ? 
              (<Button
                  containerStyle={{ flex: 1, width: '100%', height: scale(90), alignItems: 'center'}}
                  showLogo={true}
                  logoStyle={{ flex: 1, width: '100%', alignItems: 'center'}}
                  logo={Res.promotion_more}
                  onPress={() => {
                    ugLog("onPress promotion url: " + item?.linkUrl)
                    if (item?.linkUrl) {
                      push(PageName.Game3rdView, {url: item?.linkUrl})
                      return
                    }
                    let game: PushHomeGame = {
                      seriesId: item?.linkCategory,
                      gameId: item?.linkPosition,
                      subId: item?.linkPosition,
                    }
                    PushHelper.pushHomeGame(game)
                  }}
                />
            ) : null}
          </View>
      </ScrollView>
    </View>
    </BaseScreen>
  )
  // } else {
  //   return null
  // }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
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
    alignSelf: 'center',
    fontSize: scale(25),
    marginVertical: scale(10),
  },
})

export default PromotionDetailPage
