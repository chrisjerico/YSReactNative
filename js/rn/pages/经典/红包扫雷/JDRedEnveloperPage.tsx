
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import DateUtil from '../../../public/tools/andrew/DateUtil';
import { RedBagLogModel } from '../../../redux/model/other/RedBagLogModel';
import { UGBasePageProps } from '../../base/UGPage';
import { scale } from "../../../public/tools/Scale";
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'
interface JDRedEnveloperPage {
  pageSize?: number//每页多少条数据
  pageNumber?: number//当前显示第几页
  items?: Array<RedBagLogModel>//界面数据
  type?: string//红包类型 1-普通红包 2-扫雷红包
  state: {
    showFoot?: number//控制foot， 0：点击重新加载   1：'数据加载中…  2 ：已加载全部数据(空)
    isRefreshing?: boolean//下拉刷新开始结束
    isLastPage?: boolean //是否是最后一页
  }
}

const JDRedEnveloperPage = ({ route, setProps, setNavbarProps }: UGBasePageProps) => {

  let { current: v } = useRef<JDRedEnveloperPage>(
    {
      pageSize: 20,
      pageNumber: 1,
      type: '1',
      items: [],
      state: {
        showFoot: 0,
        isRefreshing: true,
        isLastPage: false,
      }
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
              setNavbarProps({ title: '红包记录' })
            } else {
              setNavbarProps({ title: '扫雷记录' })
            }
            v.items.length = 0;
            v.pageNumber = 1;
            v.state.showFoot = 0;
            v.state.isRefreshing = true;
            v.state.isLastPage = false;
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

   /**
   * 下拉刷新
   *
   */
  const onHeaderRefresh = () => {
    v.state.isRefreshing = true
    v.pageNumber = 1
    console.log('下拉刷新');
    loadWBData()
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
    loadWBData()
  }

   /**
   * 网络请求
   *
   */
  function loadWBData() {
    let params = {
      type: parseInt(v.type),
      page: v.pageNumber,
    }
    console.log('页码===', v.pageNumber);
    api.chat.redBagLogPage(params).useSuccess(({ data }) => {
      let dicData = data;
      let arrayData = dicData['list'];
      if (v.pageNumber == 1) {
        v.state.isRefreshing = false
        v.items.length = 0
        v.items = JSON.parse(JSON.stringify(dicData['list']))
        console.log('v.state.isRefreshing ====', v.state.isRefreshing);
      }
      else {
        v.items = v.items.concat(JSON.parse(JSON.stringify(dicData['list'])))
      }
      v.state.showFoot = 0
      if (arrayData.length < v.pageSize) {
        v.state.isLastPage = true;
        v.state.showFoot = 2
      }
      console.log('网络数据长度：', arrayData.length);
      console.log('showFoot==', v.state.showFoot);

      setProps()

    }).useFailure((err) => {
      console.log('err = ', err);
      v.state.isRefreshing = false
      v.state.showFoot = 2
      setProps()
      // Toast(err.message)
    });
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
   * 上拉加载布局
   *
   */
  const renderFooter = () => {
    if (v.state.showFoot === 0) {
      return (
        <TouchableOpacity onPress={() => {
          onEndReached()
        }}
        >
          <View style={styles.foot}>
            <UGText style={[styles.footText, { color: Skin1.textColor2 }]}>
              点击重新加载
                </UGText>
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
            <UGText style={[styles.footText, { color: Skin1.textColor2 }]}>
              正在加载...
              </UGText>
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
            <UGText style={[styles.footText, { color: Skin1.textColor2 }]}>

            </UGText>

          </View>
        </TouchableOpacity>
      );
    }
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
        <UGText style={[{color: Skin1.textColor3,},styles.listEmpty, ]}>暂无更多数据</UGText>
      </View>
    );
  }

   /**
   * 渲染列表项
   *
   */
  const _renderItem = ({ index, item }) => {
    return (
      <View style={[styles.viewItem, { backgroundColor: index % 2 ? Skin1.isBlack ? '#707070' : '#F7F8F8' : Skin1.isBlack ? Skin1.CLBgColor : 'white' }]}>
        <View style={[styles.item,]}>
          <UGText style={[styles.text, { color: Skin1.textColor1 }]}>{DateUtil.stampformat(item.createTime, "YYYY-MM-DD")}</UGText>
          <UGText style={[styles.text, { color: Skin1.textColor1 }]}>{DateUtil.stampformat(item.createTime, "hh:mm:ss")}</UGText>
        </View>
        <View style={styles.item}>
          <UGText style={[styles.text, { color: Skin1.textColor1 }]}>{item.operateText}</UGText>
        </View>
        <View style={styles.item}>
          <UGText style={[styles.text, { color: labelColor(item), }]}>{labelStr(item)}</UGText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.viewItem, { backgroundColor: Skin1.isBlack ? Skin1.textColor4 : '#F7F8F8' }]}>
        <View style={styles.item}>
          <UGText style={[styles.text, { color: Skin1.textColor1 }]}>{'时间'}</UGText>
        </View>
        <View style={styles.item}>
          <UGText style={[styles.text, { color: Skin1.textColor1 }]}>{'类型'}</UGText>
        </View>
        <View style={styles.item}>
          <UGText style={[styles.text, { color: Skin1.textColor1 }]}>{'输赢'}</UGText>
        </View>
      </View>

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
      // onEndReachedThreshold={0}//上拉刷新测试发现经常不触发
      // onEndReached={() => {
      //   onEndReached()
      // }}
      // onContentSizeChange={() => {
      //   console.log('onContentSizeChange');
      // }}
      />

    </View>
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
  listEmpty:{
    fontSize: scale(22),
    marginTop: scale(15),
  }
});


export default JDRedEnveloperPage
