import React, { Component } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Platform, StyleProp, View, ViewStyle } from 'react-native';
import { Text, Card } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import WebView from 'react-native-webview';
import { UGPromoteModel } from '../../../redux/model/other/UGPromoteModel';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import AppDefine from '../../../public/define/AppDefine';
import { NSValue } from '../../../public/define/OCHelper/OCBridge/OCCall';
import { ANHelper } from "../../../public/define/ANHelper/ANHelper";
import { CMD } from "../../../public/define/ANHelper/hp/CmdDefine";

interface IProps {
  list: Array<UGPromoteModel>;
  style2: 'slide' | 'popup' | 'page'; // slide折叠、popup弹窗、page内页
}
interface IState {
  selectedIndex: number;
}

export default class JDPromotionListCP extends Component<IProps, IState> {
  style1: '贴边' | '行边框' | '外边框' | '不贴边' = '不贴边'; // 行样式
  style2: 'slide' | 'popup' | 'page' = 'page'; // 详情样式：slide折叠、popup弹窗、page内页
  list: Array<UGPromoteModel> = [];
  itemStyle : StyleProp<ViewStyle> = {}

  constructor(props) {
    super(props);
    const { list = [], style2 } = props;

    if ('c190'.indexOf(AppDefine.siteId) != -1) {
      this.style1 = '贴边';
    } else if ('c199,c200,c213,c018,c206'.indexOf(AppDefine.siteId) != -1) {
      this.style1 = '行边框';
    } else if ('c012'.indexOf(AppDefine.siteId) != -1) {
      this.style1 = '外边框';
    }
    if (Skin1.skitType.indexOf('威尼斯') != -1) {
      this.style1 = '行边框'
      this.itemStyle = {borderColor:'#b06065', backgroundColor:'transparent'}
    }
    this.style2 = style2;
    this.list = list.map((item: UGPromoteModel) => {
      return Object.assign({}, item);
    });
    this.state = {
      selectedIndex: -1,
    };
  }

  renderCell(pm: UGPromoteModel, idx: number) {
    const cardMargin = this.style1 == '行边框' ? 11 : 0;
    const marginHorizontal = this.style1 === '贴边' ? 0 : 10;
    const marginVertical = this.style1 == '贴边' || this.style1 == '外边框' ? 0 : 5;
    let contentView = (
      <View style={{ marginHorizontal: marginHorizontal, marginVertical: AppDefine.siteId == 'c092' ? 10 : marginVertical, backgroundColor: AppDefine.siteId == 'c092' ? "#e0e0e0" : '#00000000', borderRadius: 8 }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (!pm.clsName) {
              pm.clsName = 'UGPromoteModel';
            }


            switch (Platform.OS) {
              case 'ios':
                OCHelper.call('UGNavigationController.current.pushViewControllerWithLinkCategory:linkPosition:', [pm.linkCategory, pm.linkPosition]).then((ret) => {
                  if (ret) return;

                  switch (this.style2) {
                    // 内页
                    case 'page': {
                      OCHelper.call(({ vc }) => ({
                        vc: {
                          selectors: 'UGPromoteDetailController.new[setItem:]',
                          args1: [pm],
                        },
                        ret: {
                          selectors: 'UGNavigationController.current.pushViewController:animated:',
                          args1: [vc, true],
                        },
                      }));
                      break;
                    }
                    // 弹框
                    case 'popup': {
                      OCHelper.call('PromotePopView.alloc.initWithFrame:[setItem:].show', [NSValue.CGRectMake(20, AppDefine.height * 0.1, AppDefine.width - 40, AppDefine.height * 0.8)], [pm]);
                      break;
                    }
                    // 折叠
                    case 'slide': {
                      this.setState({
                        selectedIndex: this.state.selectedIndex === idx ? -1 : idx,
                      });
                      break;
                    }
                  }
                })
                break;
              case 'android':
                switch (this.style2) {
                  // 内页
                  case 'page': {
                    ANHelper.callAsync(CMD.OPEN_COUPON,
                      {
                        ...pm,
                        style: this.style2,
                      })
                    break;
                  }
                  // 弹框
                  case 'popup': {
                    OCHelper.call('PromotePopView.alloc.initWithFrame:[setItem:].show', [NSValue.CGRectMake(20, AppDefine.height * 0.1, AppDefine.width - 40, AppDefine.height * 0.8)], [pm]);
                    break;
                  }
                  // 折叠
                  case 'slide': {
                    this.setState({
                      selectedIndex: this.state.selectedIndex === idx ? -1 : idx,
                    });
                    break;
                  }
                }

                break;
            }

          }}>
          {pm.title?.length > 0 && <Text style={{ marginTop: 10, marginBottom: 5, marginLeft: 5, color: Skin1.textColor1, fontSize: 16, fontWeight: '500' }}>{pm.title}</Text>}
          <FastImage
            style={{ height: pm.picHeight ?? 100 }}
            source={{ uri: pm.pic }}
            onLoad={(e) => {
              if (!pm.picHeight) {
                pm.picHeight = ((AppDefine.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height ?? 100;
                this.setState({});
              }
            }}
          />
        </TouchableOpacity>
        {
          this.state.selectedIndex === idx && <View style={{ height: pm.webViewHeight ?? 200 }}>
            <WebView
              onMessage={(e) => {
                const h = parseInt(e.nativeEvent.data);
                if (h > 0 && h != pm.webViewHeight) {
                  pm.webViewHeight = h + (pm.webViewHeight ? 0 : 40);
                  this.setState({});
                }
              }}
              style={{ flex: 1 }}
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
                  pm.content,
              }}
            />
          </View>
        }
      </View>
    );

    if (this.style1 === '行边框') {
      return <Card containerStyle={[{ margin: cardMargin, borderRadius: 8, paddingHorizontal: 0, paddingVertical: 3, backgroundColor: Skin1.homeContentColor, }, this.itemStyle]}>{contentView}</Card>;
    }
    return contentView;
  }

  render() {
    if (!this.list.length) {
      return (
        <Text style={{ marginTop: 50, textAlign: 'center', color: 'white' }}>暂无</Text>
      );
    }
    if (this.style1 == '外边框') {
      return (
        <View style={{ margin: 7, paddingTop: 11, borderColor: 'white', borderWidth: 1, borderRadius: 7, backgroundColor: Skin1.homeContentColor }} >
          <FlatList showsVerticalScrollIndicator={false} data={this.list} renderItem={(data) => this.renderCell(data.item, data.index)} keyExtractor={(pm, idx) => `key${idx}`} ListFooterComponent={<View style={{ height: 100 }} />} />
        </View>
      )
    }
    return (
      <FlatList showsVerticalScrollIndicator={false} data={this.list} renderItem={(data) => this.renderCell(data.item, data.index)} keyExtractor={(pm, idx) => `key${idx}`} ListFooterComponent={<View style={{ height: 100 }} />} />
    );
  }
}
