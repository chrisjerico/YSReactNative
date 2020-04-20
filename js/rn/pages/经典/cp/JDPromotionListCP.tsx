import React, {Component} from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';
import {Text, Card} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import WebView from 'react-native-webview';
import {UGPromoteModel} from '../../../redux/model/other/UGPromoteModel';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import AppDefine from '../../../public/define/AppDefine';
import { NSValue } from '../../../public/define/OCHelper/OCBridge/OCCall';

interface IProps {
  list: Array<UGPromoteModel>;
  style2: 'slide' | 'popup' | 'page'; // slide折叠、popup弹窗、page内页
}
interface IState {
  selectedIndex: number;
}

export default class JDPromotionListCP extends Component<IProps, IState> {
  style1: '贴边' | '边框' | '内间距' = '内间距';
  style2: 'slide' | 'popup' | 'page' = 'page'; // slide折叠、popup弹窗、page内页
  list: Array<UGPromoteModel> = [];

  constructor(props) {
    super(props);
    const { list = [], style2 } = props;

    if ('c190'.indexOf(AppDefine.siteId) != -1) {
      this.style1 = '贴边';
    } else if ('c199,c200,c213,c018'.indexOf(AppDefine.siteId) != -1) {
      this.style1 = '边框';
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
    let marginHorizontal = this.style1 === '贴边' ? 0 : 5 + (this.style1 == '边框' ? 11 : 0);
    const marginVertical = this.style1 === '贴边' ? 0 : 5;
    let contentView = (
      <View style={{marginHorizontal: marginHorizontal, marginVertical: marginVertical}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (!pm.clsName) {
              pm.clsName = 'UGPromoteModel';
            }
            switch (this.style2) {
              // 内页
              case 'page': {
                OCHelper.call(({vc}) => ({
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
          }}>
          {pm.title?.length > 0 && <Text style={{marginTop: 10, marginBottom: 5, marginLeft: 5, color: Skin1.textColor1, fontSize:16, fontWeight:'500'}}>{pm.title}</Text>}
          <FastImage
            style={{height: pm.picHeight ?? 100}}
            source={{uri: pm.pic}}
            onLoad={(e) => {
              if (!pm.picHeight) {
                pm.picHeight = ((AppDefine.width - (marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height ?? 100;
                this.setState({});
              }
            }}
          />
        </TouchableOpacity>
        <View style={{height: this.state.selectedIndex === idx ? pm.webViewHeight ?? 200 : 0}}>
          <WebView
            onNavigationStateChange={(title) => {
              if (!pm.webViewHeight && parseInt(title.title)) {
                pm.webViewHeight = parseInt(title.title);
                this.setState({});
              }
            }}
            style={{flex: 1}}
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
                pm.content,
            }}
          />
        </View>
      </View>
    );

    if (this.style1 === '边框') {
      return <Card containerStyle={{margin:11, borderRadius: 8, padding: 3, backgroundColor:Skin1.homeContentColor}}>{contentView}</Card>;
    }
    return contentView;
  }

  render() {
    if (!this.list.length) {
      return (
        <Text style={{ marginTop: 50, textAlign: 'center', color: 'white' }}>暂无</Text>
      );
    }
    return (
      <FlatList data={this.list} renderItem={(data) => this.renderCell(data.item, data.index)} keyExtractor={(pm, idx) => `key${idx}`} ListFooterComponent={<View style={{ height: 100 }} />} />
    );
  }
}
