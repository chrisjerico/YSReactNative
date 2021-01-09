
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
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


interface JDPromotionTabBettingReportCP {
  pageTitle?: string,//界面名称数据
  titleArray?: Array<string>,// 按钮名称数据

  //===列表数据====================================
  pageSize?: number//每页多少条数据
  pageNumber?: number,//当前显示第几页

  items?: Array<any>//界面数据
  state: {
    showFoot?: number//控制foot， 0：点击重新加载   1：'数据加载中…  2 ：已加载全部数据(空)
    isRefreshing?: boolean//下拉刷新开始结束 
    isLastPage?: boolean //是否是最后一页 
  }
  //===下拉数据====================================
  levelArray?: Array<any>,// 下拉名称数据
  levelindex?: number,//下拉选中的索引

}

const JDPromotionTabBettingReportCP = ({ pageTitle, titleArray }: { pageTitle?: string, titleArray?: Array<string>, }) => {


  let { current: v } = useRef<JDPromotionTabBettingReportCP>(
    {
      pageTitle: PromotionConst.投注报表,
      titleArray: ["分级", "日期", "投注金额", "佣金"],
      items: [],
      levelArray: [],
      pageSize: 20,
      pageNumber: 1,
      levelindex: 0,
      state: {
        showFoot: 0,
        isRefreshing: true,
        isLastPage: false,
      }
    }
  )
  let capitalController //类型选择
  v.levelArray = [{ value: 0, label: '全部下线' },
  { value: 1, label: '1级下线' },
  { value: 2, label: '2级下线' },
  { value: 3, label: '3级下线' },
  { value: 4, label: '4级下线' },
  { value: 5, label: '5级下线' },
  { value: 6, label: '6级下线' },
  { value: 7, label: '7级下线' },
  { value: 8, label: '8级下线' },
  { value: 9, label: '9级下线' },
  { value: 10, label: '10级下线' }];

  //初始化
  useEffect(() => {
        onHeaderRefresh()
  }, [])

  /**
 * 下拉刷新
 * 
 */
  const onHeaderRefresh = () => {
    v.state.isRefreshing = true
    v.pageNumber = 1
    console.log('下拉刷新');
    teamBetStatData()
  }
  /**
  * 点击（上拉）加载更多数据
  * 
  */
  const onFooterRefresh = () => {
    v.pageNumber++
    console.log('上拉加载');
    v.state.showFoot = 1
    setProps()
    teamBetStatData()
  }
  /**
* 点击刷新
* 
*/
  function onEndReached() {
    console.log('onEndReached');
    console.log('showFoot ==', v.state.showFoot);

    //如果是正在加载中或没有更多数据了，则返回
    if (v.state.showFoot != 0) {
      console.log('正在加载中或没有更多数据了，则返回');
      return;
    }
    //如果当前页大于或等于总页数，那就是到最后一页了，返回
    if (v.state.isLastPage) {
      console.log('当前页大于或等于总页数，那就是到最后一页了，则返回');
      return;
    }
    //是否已是下拉刷新 返回     
    if (v.state.isRefreshing) {
      console.log('已是下拉刷新 返回  ');
      return;
    }
    //获取数据
    onFooterRefresh();
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
   * 得到投注报表列表数据
   * 
   */
  function teamBetStatData() {
    console.log('投注报表列表页码===', v.pageNumber);
    api.team.betStat(v.levelindex.toString(), '', '', v.pageNumber, v.pageSize).setCompletionBlock(({ data }) => {
      let dicData = data;
      let arrayData = returnData(dicData);
      if (arrayData.length == 0) {
        console.log('进来了：==================');
        v.state.isLastPage = true;
        v.state.showFoot = 2
        v.state.isRefreshing = false;
        setProps();
        return;
      }
      if (v.pageNumber == 1) {
        v.state.isRefreshing = false
        v.items.length = 0
        v.items = JSON.parse(JSON.stringify(arrayData))
        // console.log('v.state.isRefreshing ====', v.state.isRefreshing);
      }
      else {
        v.items = v.items.concat(JSON.parse(JSON.stringify(arrayData)))
      }
      v.state.showFoot = 0
      if (arrayData.length < v.pageSize) {
        console.log('进来了：==================', v.state.isLastPage);
        v.state.isLastPage = true;
        v.state.showFoot = 2
      }
      else{
        v.state.isLastPage = false;
        v.state.showFoot = 0
      }
      // console.log('网络数据长度：', arrayData.length);
      // console.log('网络数据：', arrayData);
      // console.log('showFoot==', v.state.showFoot);

      setProps()

    }, (err) => {
      console.log('err = ', err);
      // setProps()
      // Toast(err.message)
    });
  }


  /**
  * 数据为空展示页面
  * 
  */
  const _renderListEmptyComp = () => {
    return (
      <View style={{
        flex: 1,
        height: AppDefine.height,
        borderColor: '#E4E7EA',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={[{ color: Skin1.textColor3, }, styles.listEmpty,]}>暂无更多数据</Text>
      </View>
    );
  }

  /**
* 上拉加载布局
* 
*/
  const renderFooter = () => {
    if (v.state.showFoot === 0) {
      return (
        <TouchableOpacity onPress={() => {
          // onEndReached()
        }}
        >
          <View style={styles.foot}>
            <Text style={[styles.footText, { color: Skin1.textColor2 }]}>
              上拉加载
              </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (v.state.showFoot === 1) {
      return (
        <TouchableOpacity onPress={() => {
          // onEndReached()  //测试的时候可以打开，打开也没有影响
        }}
        >
          <View style={styles.foot}>
            <ActivityIndicator />
            <Text style={[styles.footText, { color: Skin1.textColor2 }]}>
              正在加载...
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (v.state.showFoot === 2) {
      return (
        <TouchableOpacity onPress={() => {
          // onEndReached()//测试的时候可以打开，打开也没有影响
        }}
        >
          <View style={styles.foot}>
            <Text style={[styles.footText, { color: Skin1.textColor2 }]}>

            </Text>

          </View>
        </TouchableOpacity>
      );
    }
  }



  /**
* 渲染列表项
* 
*/
  const _renderItem = ({ index, item }) => {
    {
      return (
        <View style={[styles.viewItem, { backgroundColor: Skin1.textColor4,borderBottomWidth:1,borderBottomColor:Skin1.textColor3,alignItems: 'center' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, width: AppDefine.width / 4, }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, marginTop: 9 }}>
              {item.level == 0 ? '全部下线' : item.level + '级下线'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, width: AppDefine.width / 4, }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, marginTop: 9 }}>
              {anyEmpty(item.date) ? '--' : item.date}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, width: AppDefine.width / 4, }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, marginTop: 9 }}>
              {item.bet_sum}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, width: AppDefine.width / 4, }}>

            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, marginTop: 9 }}>
              {item.fandian_sum}
            </Text>
          </View>
        </View>
      );
    }
  }
  return (
    <View style={styles.container}>
      <View style ={{marginTop:44}}>
      <FlatList
        data={v.items}
        renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
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
            refreshing={v.state.isRefreshing}
            // refreshing={isHeader}
            onRefresh={() => {
              onHeaderRefresh(); //下拉刷新加载数据
            }}
          />
        }
        //设置上拉加载
        ListFooterComponent={() => renderFooter()}
        onEndReachedThreshold={0.01}//上拉刷新测试发现经常不触发
        onEndReached={() => {
          onEndReached()
        }}
        onContentSizeChange={() => {
          console.log('onContentSizeChange');
        }}
      />
      </View>
      <View style={{ position: 'absolute',width: '100%',padding: 0,}}>
      { (v.pageTitle != PromotionConst.域名绑定) && <View key={'renderTitleHint'}>
        <View style={styles.capital_type_picker}>
          <DropDownPicker
            items={
              v.levelArray
            }
            defaultValue={v.levelindex}
            containerStyle={{ height: 40, width: AppDefine.width / 3 }}
            controller={instance => capitalController = instance}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => {
              v.levelindex = item.value;
              onHeaderRefresh();
             }}
          />
        </View>
      </View>}
      <View style={{ flexDirection: 'row', height: scale(66), backgroundColor: Skin1.textColor4 }}>
        {v.titleArray?.map((title, idx) => {
          return (

            <TouchableOpacity style={{ borderBottomWidth: scale(1), borderColor: Skin1.textColor3, flexDirection: 'row', justifyContent: 'center', flex: 1, width: AppDefine.width / v.titleArray?.length, }}
              onPress={() => {
                if ((v.pageTitle != PromotionConst.域名绑定 && idx == 0)) {
                  console.log('点击了。。。');
                  capitalController?.toggle();
                }
              }}>
              <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, marginTop: 15 }}>
                {title}
              </Text>
              {(v.pageTitle != PromotionConst.域名绑定 && idx == 0) && <Image style={[{ height: 18, width: 18, marginTop: 15 }]} source={{ uri: Skin1.isBlack ? 'https://appstatic.guolaow.com/assets/baijiantou1.png' : 'https://appstatic.guolaow.com/assets/jiantou1.png' }} />}

            </TouchableOpacity>
          )
        })}
      </View>

      </View>




    </View >
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin1.isBlack ? Skin1.CLBgColor : '#F1F2F5'
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
    height: scale(60),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  footText: {
    fontSize: scale(22),
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  viewItem: {
    flexDirection: 'row',
    height: scale(66),
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

export default JDPromotionTabBettingReportCP
