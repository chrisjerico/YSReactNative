
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, Image, TouchableOpacity, View, Platform } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import DateUtil from '../../../public/tools/andrew/DateUtil';
import { RedBagLogModel } from '../../../redux/model/other/RedBagLogModel';
import { setProps, UGBasePageProps } from '../../base/UGPage';
import { scale } from "../../../public/tools/Scale";
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import EmptyView from '../../../public/components/view/empty/EmptyView';
import { anyEmpty, arrayEmpty } from '../../../public/tools/Ext';
import { ugLog } from '../../../public/tools/UgLog';
import { PromotionConst } from '../const/PromotionConst';
import { Badge, Button } from 'react-native-elements';
import UGDropDownPicker from '../../bank/add/view/UGDropdownPicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import { NSValue } from '../../../public/define/OCHelper/OCBridge/OCCall';
import { UGStore } from '../../../redux/store/UGStore';
import { JDInviteCodeGenerateCP } from '../cp/JDInviteCodeGenerateCP';

interface JDChanglongBetRecordpage {
  items?: Array<any>//界面数据
  isRefreshing?: boolean//下拉刷新开始结束 
}

const JDChanglongBetRecordpage = () => {

  let { current: v } = useRef<JDChanglongBetRecordpage>(
    {
      items: [],
      isRefreshing: true,
    }
  )

    /**
* 钱是否隐藏
* 
*/
function isHide(item: any) {
  if (item.isWin) {
    return true
  } else {
    return false
  }
}

  /**
* 状态文字
* 
*/
  const stateStr = (item: any) => {
    if (item.isWin) {
      return '已中奖'
    } else {
      return item.msg
    }
  }

  /**
* 状态颜色
* 
*/

  function stateColor(item: any) {
    if (item.isWin) {
      return '#3CB371'
    } else {
      if (item.status) {
        return '#808080'
      } else {
        return '#FF0000'
      }
    }
  }
  /**
   * 根据数据是数组还是字典返回数据
   * 
   */
  function returnData(data: any) {
    if (Array.isArray(data)) {
      return data;
    } else {
      return data['list']
    }
  }

  /**
 * 下拉刷新
 * 
 */
  const onHeaderRefresh = () => {
    v.isRefreshing = true
    console.log('下拉刷新');
    getUserRecentBet()
  }

  function getUserRecentBet() {
    console.log('我的长龙助手投注记录===');
    api.report.getUserRecentBet().useSuccess(({ data }) => {

      console.log('data =', data);

      if (anyEmpty(data)) {
        return
      }
      let arrayData = returnData(data);
      if (arrayData.length == 0) {
        console.log('进来了：==================');
        v.isRefreshing = false;
        v.items.length = 0
        setProps();
        return;
      }
      v.isRefreshing = false
      v.items.length = 0
      v.items = JSON.parse(JSON.stringify(arrayData))

      setProps()

    });
  }

  /**
* 渲染列表项
* 
*/
  const _renderItem = ({ index, item }) => {
    {
      return (
        <View style={[styles.viewItem, { backgroundColor: Skin1.textColor4, alignItems: 'center',marginHorizontal: 10, }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10, }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, marginTop: 12, }}>
              {item.title}
            </Text>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: '#1E90FF',marginLeft: 10,  marginTop: 12, }}>
              {'¥' + item.money}
            </Text>
            <View style={{ flex: 1 }}>
            </View>
            { isHide(item)&& <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: '#FFD700', marginTop: 12, }}>
              {'+' + item.bonus + '元'}
            </Text>}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center',  marginHorizontal: 10, }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: '#FF4500', marginTop: 8, }}>
              {anyEmpty(item.displayNumber) ? item.issue + '期' : item.displayNumber + '期'}
            </Text>
            <View style={{ flex: 1 }}>
            </View>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: stateColor(item), marginTop: 8, }}>
              {stateStr(item)}
            </Text>
          </View>

        </View>
      );
    }
  }

   /**
* 渲染列表项分割
* 
*/
const _renderItemSeparator = ({ index, item }) => {
  {
    return (
      <View style={[ { backgroundColor: Skin1.CLBgColor, height:10}]}>

      </View>
    );
  }
}

  /**
* 按钮加载布局
* 
*/
const renderFooter = () => {
 
    return (

        <View style={styles.foot}>
          <Button
              title="查看更多"
              style={{width:AppDefine.width -20,height:55}}
              titleStyle ={{color:'white',fontSize:16}}
              buttonStyle ={{backgroundColor:Skin1.themeColor,overflow: 'hidden', borderColor:Skin1.themeColor,borderWidth:1 }}
              onPress={() => {
                OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                  {
                    selectors: 'UGBetRecordViewController.new',
                  },
                  true,
                ])

              }}
            />
        </View>
    );
  
}


  /**
 * 初始化
 * @param item
 */
  useEffect(() => {
    setProps({
      navbarOpstions: {
        hidden: false, title: '我的投注', back: true
      },
      didFocus: () => {
        onHeaderRefresh()
      }
    })

  }, [])


  return (
    <View style={styles.container}>
      <View style={{marginTop:20,flex:1}}>
        <FlatList
          data={v.items}
          renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
          ItemSeparatorComponent ={_renderItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          //下拉刷新
          //设置下拉刷新样式
          refreshControl={
            <RefreshControl
              title={"正在加载..."} //android中设置无效
              colors={[Skin1.textColor2]} //android
              tintColor={Skin1.textColor2} //ios
              titleColor={Skin1.textColor2}
              refreshing={v.isRefreshing}
              // refreshing={isHeader}
              onRefresh={() => {
                onHeaderRefresh(); //下拉刷新加载数据
              }}
            />
          }
          ListFooterComponent={() => renderFooter()}
        />
        
      </View>
    </View >

  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin1.CLBgColor
  },
  item: {
    flex: 1,
    borderColor: '#E4E7EA',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: scale(22)
  },
  loadMore: {
    alignItems: "center"
  },
  indicator: {
    color: "red",
    margin: scale(10)
  },
  foot: {
    height: scale(80),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  footText: {
    fontSize: scale(22),
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  viewItem: {
    flexDirection: 'column',
    height: scale(85),
  },
  listEmpty: {
    fontSize: scale(22),
    marginTop: scale(15),
  },
  capital_type_picker: {
    height: scale(66),
    padding: scale(8),
    position: 'absolute',
    width: '100%',
  },
});

export default JDChanglongBetRecordpage
