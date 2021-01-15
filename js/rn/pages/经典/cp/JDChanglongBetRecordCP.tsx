
import React, { useEffect, useRef } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { setProps } from '../../base/UGPage';
import { scale } from "../../../public/tools/Scale";

import { anyEmpty } from '../../../public/tools/Ext';
import { Button } from 'react-native-elements';
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';

interface JDChanglongBetRecordCP {
  items?: Array<any>//界面数据
  isRefreshing?: boolean//下拉刷新开始结束 
}

const JDChanglongBetRecordCP = () => {

  let { current: v } = useRef<JDChanglongBetRecordCP>(
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
        console.log('进来了：==================');
        v.isRefreshing = false;
        v.items.length = 0
        setProps();
        return;
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
* cell 按钮点击
* 
*/
  async function betItemSelect(item?: any) {
    item = JSON.parse(JSON.stringify(item))
    console.log('0000000000===========================================================');
    console.log('item ===',item);
    
    item.clsName = 'UGChanglongBetRecordModel'
    item.pic = await OCHelper.call('UGNextIssueModel.modelWithGameId:model:.pic', [item.gameId])
    await OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
      {
        selectors: 'AppDefine.viewControllerWithStoryboardID:[setItem:]',
        args1: ['UGBetRecordDetailViewController'],
        args2: [item]
      },
      true,
    ])
    
  }


  /**
* 渲染列表项
* 
*/
  const _renderItem = ({ item }) => {
    {
      return (
        <TouchableOpacity style={[styles.viewItem, { backgroundColor: Skin1.textColor4, alignItems: 'center', marginHorizontal: 10, }]}
          onPress={() => {
            betItemSelect(item)
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10, }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, marginTop: 12, }}>
              {item.title}
            </Text>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: '#1E90FF', marginLeft: 10, marginTop: 10, }}>
              {'¥' + item.money}
            </Text>
            <View style={{ flex: 1 }}>
            </View>
            {isHide(item) && <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: '#FFD700', marginTop: 12, }}>
              {'+' + item.bonus + '元'}
            </Text>}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10, }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: '#FF4500', marginTop: 8, }}>
              {anyEmpty(item.displayNumber) ? item.issue + '期' : item.displayNumber + '期'}
            </Text>
            <View style={{ flex: 1 }}>
            </View>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: stateColor(item), marginTop: 8, }}>
              {stateStr(item)}
            </Text>
          </View>

        </TouchableOpacity>
      );
    }
  }

  /**
* 渲染列表项分割
* 
*/
  const _renderItemSeparator = ({ }) => {
    {
      return (
        <View style={[{ backgroundColor: Skin1.CLBgColor, height: 10 }]}>

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
          style={{ width: AppDefine.width - 20, height: 80 }}
          titleStyle={{ color: 'white', fontSize: 15 }}
          buttonStyle={{ backgroundColor: Skin1.themeColor, overflow: 'hidden', borderColor: Skin1.themeColor, borderWidth: 1, }}
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


  const _renderListEmptyComp = () => {
    return (
        <View >
           
        </View>
    );
}

  /**
 * 初始化
 * @param item
 */
  useEffect(() => {
    setProps({
      // navbarOpstions: {
      //   hidden: false, title: '我的投注', back: true
      // },
      didFocus: () => {



      }
    })

    onHeaderRefresh()

  }, [])


  return (
    <View style={[styles.container, { backgroundColor: Skin1.CLBgColor }]}>
      <View style={{ marginTop: 10, flex: 1 }}>
        <FlatList
          data={v.items}
          renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
          ItemSeparatorComponent={_renderItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={_renderListEmptyComp()} // 列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element
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
    height: scale(150),
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

export default JDChanglongBetRecordCP
