import { ActivityIndicator, FlatList, Platform, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import { UGBasePageProps } from '../../base/UGPage'
import { ugLog } from '../../../public/tools/UgLog'
import { anyEmpty } from '../../../public/tools/Ext'
import CommStyles from '../../base/CommStyles'
import EmptyView from '../../../public/components/view/empty/EmptyView'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import {UGPromoteModel} from '../../../redux/model/other/UGPromoteModel'
import { scale } from '../../../public/tools/Scale'
import { FastImagePlaceholder } from '../tools/ImagePlaceholder'
import { WebView } from 'react-native-webview'


interface JDPromoteDetailPage {

  item?: UGPromoteModel;//优惠数据
  webViewHeight?:number;//webView 高
}

/**
 * 其他注单
 * @param navigation
 * @constructor
 */
const JDPromoteDetailPage = ({ route, setProps }: UGBasePageProps) => {


  let { current: v } = useRef<JDPromoteDetailPage>(
    {
      webViewHeight:0,
    })


  useEffect(() => {
    setProps({

      navbarOpstions: { hidden: false, title: '优惠活动详情', back: true },
      didFocus: (params) => {
        ugLog('--------------------------params==', params)
        switch (Platform.OS) {
          case 'ios':
            let dic = params;
            for (var key in dic) {
              if (key == 'item') {
                if (!anyEmpty(dic[key])) {
                  v.item = dic[key];
                  setProps();
                }
              }
            }

            break;
          case 'android':
            //TODO Android 传参
            break;
        }


      },
    }, false)
  }, [])




  return (
    <View style={CommStyles.flex}>
      anyEmpty(v.items)
          ? <EmptyView style={{ flex: 1 }} />
          :
      <ScrollView
        style={_styles.container}
      // stickyHeaderIndices={[0,1]}
      >

        {/* 标题 */}
        <View style={{ justifyContent: 'center', height: scale(66), alignItems: 'center', backgroundColor:'blue' }}>
          <Text style={{ flexDirection: 'row', fontSize: scale(20), color: Skin1.textColor1, }}>
            {v.item.title}
          </Text>
        </View>
        {/* 图片 */}
        <View style={{  backgroundColor:'red' }}>
          <FastImagePlaceholder source={{ uri: v.item.pic }} style={{ flex: 1,  }} />
        </View>
        {/* 网页 */}
        <View style={{  backgroundColor:'yellow',flex: 1, }}>
        <WebView
                style={{ flex: 1, minHeight: v.webViewHeight, backgroundColor: 'black' }}
                containerStyle={{ backgroundColor: 'black' }}
                javaScriptEnabled
                startInLoadingState
                source={{
                  html:`
                  <head>
                  <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>
                  <style>img{width:auto !important;max-width:100%;height:auto !important}</style>
                  <style>table,table tr th, table tr td { border:1px solid; border-collapse: collapse}</style>
                  <style>body{width:100%-20;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:10}</style>
                  </head>` + `
                <script>
                window.onload = function () {
                  window.webkit.messageHandlers.postSwiperData.postMessage(document.body.scrollHeight);
                }
                document.addEventListener("DOMContentLoaded", function() {
                  window.webkit.messageHandlers.postSwiperData.postMessage(document.body.scrollHeight);
                }, false);
                </script>` +
                    v.item.content,
                }}
                onMessage={(e) => {
                  const h = parseInt(e.nativeEvent.data);
                  if (h > 0 && h != v.webViewHeight) {
                    v.webViewHeight = h + (v.webViewHeight ? 0 : 40);
                    setProps();
                  }
                }}
              />
        </View>

      </ScrollView>
    </View>

  )
}



const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin1.isBlack ? Skin1.CLBgColor : '#F1F2F5'
  },

})

export default JDPromoteDetailPage
