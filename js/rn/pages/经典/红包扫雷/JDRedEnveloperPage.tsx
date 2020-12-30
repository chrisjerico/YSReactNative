
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, } from 'react-native';
import { Button } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import RedBagItem from '../../../public/components/RedBagItem';
import AppDefine from '../../../public/define/AppDefine';
import { pop } from '../../../public/navigation/RootNavigation';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { scale } from '../../../public/tools/Scale';
import { Toast } from '../../../public/tools/ToastUtils';
import { showSuccess } from '../../../public/widget/UGLoadingCP';
import { RedBagLogModel } from '../../../redux/model/other/RedBagLogModel';
import { UGAgentApplyInfo } from "../../../redux/model/全局/UGSysConfModel";
import { setProps, UGBasePageProps } from '../../base/UGPage';
import DateUtil from '../../../public/tools/andrew/DateUtil';
import { is } from 'immer/dist/internal';
import RefreshListView, { RefreshState } from '../RefreshListView';



interface JDRedEnveloperPage {
  pageSize?: number//每页多少条数据
  pageNumber?: number//当前显示第几页
  items?: Array<RedBagLogModel>//界面数据
  type?: string//红包类型 1-普通红包 2-扫雷红包
  refreshState?: number//
  noMore?: boolean
}

const JDRedEnveloperPage = ({ route, setProps }: UGBasePageProps) => {

  let { current: v } = useRef<JDRedEnveloperPage>(
    {
      pageSize: 3,
      pageNumber: 1,
      type: '1',
      items: [],
      refreshState: RefreshState.Idle,
      noMore: false
    })

  //初始化
  useEffect(() => {

    setProps({
      navbarOpstions: { hidden: false, title: '红包扫雷', back: true },
      didFocus: (params) => {
        let dic = params;
        for (var key in dic) {
          if (key == 'type') {
            v.type = dic[key]
            console.log('得到的type=', v.type);
            if (v.type == '1') {
              setProps({ navbarOpstions: { title: '红包记录' } }, false)
            } else {
              setProps({ navbarOpstions: { title: '扫雷记录' } }, false)
            }
            onHeaderRefresh()
          }

        }
      }
    })

  }, [])


  function labelColor(item: RedBagLogModel) {
    let returnColor = '#F15C5F'
    if (item?.amount.length) {
      if (parseInt(item?.operate) == 1 || parseInt(item?.operate) == 4) {
        returnColor = '#16AD58'
      }
    }
    return returnColor
  }

  function labelStr(item: RedBagLogModel) {
    let returnStr = ''
    if (item?.amount.length) {
      if (parseInt(item?.operate) == 1 || parseInt(item?.operate) == 4) {
        returnStr = '-' + item?.amount
      }
      else {
        returnStr = '+' + item?.amount
      }
    }
    return returnStr
  }
  //下拉刷新
  const onHeaderRefresh = () => {
    v.pageNumber = 1
    v.refreshState = RefreshState.HeaderRefreshing
    console.log('下拉刷新');
    loadWBData()
  }

  //上拉加载更多数据
  const onFooterRefresh = () => {
    v.pageNumber = v.pageNumber + 1
    v.refreshState = RefreshState.FooterRefreshing

    console.log('上拉加载');
    loadWBData()
  }

  function loadWBData() {
    let params = {
      type: parseInt(v.type),
      page: v.pageNumber,
    }
    console.log('页码===', v.pageNumber);
    api.chat.redBagLogPage(params).useSuccess(({ data }) => {
      let dicData = data;
      if (v.pageNumber == 1) {
        v.items.length = 0
        v.items = JSON.parse(JSON.stringify(dicData['list']))
        v.refreshState = v.items.length < 1 ? RefreshState.EmptyData : RefreshState.Idle
        console.log('下拉刷新数据 ====', v.items);
        setProps()
      }
      else {

        if (v.noMore) {
          return
        }
        else {
          v.items = v.items.concat(JSON.parse(JSON.stringify(dicData['list'])))
          dicData['list'].count < v.pageSize ? v.refreshState = RefreshState.NoMoreData : v.refreshState = RefreshState.Idle

          if (dicData['list'].count < v.pageSize) {
            v.noMore = true;
          }
          else {
            v.noMore = false;
          }
          console.log('上拉加载更多数据 ====', v.items);
          setProps()
        }

      }

    }).useFailure((err) => {
      console.log('err = ', err);
      v.refreshState = RefreshState.Failure
      // setProps()
      // Toast(err.message)

    });
  }

  //数据为空展示页面
  const _renderListEmptyComp = () => {
    return (
      <View style={{
        flex: 1,
        height: AppDefine.height,
        borderColor: '#E4E7EA',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{
          color: Skin1.textColor3,
          fontSize: 18,
          marginTop: 15

        }}>暂无更多数据</Text>
      </View>
    );
  }

  // 渲染列表项
  const _renderItem = ({ index, item }) => {
    return (
      <View style={{ flexDirection: 'row', height: 60, backgroundColor: index % 2 ? '#F7F8F8' : 'white' }}>
        <View style={[styles.item,]}>
          <Text style={styles.text}>{DateUtil.stampformat(item.createTime, "YYYY-MM-DD")}</Text>
          <Text style={styles.text}>{DateUtil.stampformat(item.createTime, "hh:mm:ss")}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>{item.operateText}</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.text, { color: labelColor(item), }]}>{labelStr(item)}</Text>
        </View>
      </View>
    );
  }

  return (

    <View style={styles.container}>
      <View style={{ flexDirection: 'row', height: 60 }}>
        <View style={styles.item}>
          <Text style={styles.text}>{'时间'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>{'类型'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>{'输赢'}</Text>
        </View>
      </View>

      {/* <FlatList
        data={v.items}
        renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
        keyExtractor={(item,index)=>index.toString()}
        ListEmptyComponent={_renderListEmptyComp()} // 列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element
        //下拉刷新
        refreshing={v.isLoading}
        onRefresh={() => {
          onHeaderRefresh(); //下拉刷新加载数据
        }}
        //设置上拉加载
        ListFooterComponent={() => onFooterStyle()}
        // onEndReachedThreshold={0.1}
        onEndReached={() => loadMoreData()}
      /> */}

      {/* <RefreshListView
        data={v.items}
        renderItem={_renderItem}
        keyExtractor={(item,index)=>index.toString()}
        ListEmptyComponent={_renderListEmptyComp()} // 列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element
        refreshState={v.refreshState}
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}

        // 可选
        // footerRefreshingText='玩命加载中 >.<'
        // footerFailureText='我擦嘞，居然失败了 =.=!'
        // footerNoMoreDataText='-我是有底线的-'
        // footerEmptyDataText='-好像什么东西都没有-'
      /> */}



    </View>
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
    color: Skin1.textColor1,
    fontSize: 18
  },
  loadMore: {
    alignItems: "center"
  },
  indicator: {
    color: "red",
    margin: 10
  }
});


export default JDRedEnveloperPage