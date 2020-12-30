
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, RefreshControl, } from 'react-native';
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



interface JDRedEnveloperPage {
  pageSize?: number//每页多少条数据
  pageNumber?: number//当前显示第几页
  items?: Array<RedBagLogModel>//界面数据
  type?: string//红包类型 1-普通红包 2-扫雷红包
  state :{
    showFoot?:number//控制foot， 0：点击重新加载   1：'数据加载中…  2 ：已加载全部数据(空)
    isRefreshing?: boolean//下拉刷新开始结束 
    isLastPage?:boolean //是否是最后一页 
  }

}

const JDRedEnveloperPage = ({ route, setProps }: UGBasePageProps) => {

  let { current: v } = useRef<JDRedEnveloperPage>(
    {
      pageSize: 3,
      pageNumber: 1,
      type: '1',
      items: [],
      state :{
        showFoot:0,
        isRefreshing:true,
        isLastPage:false
      }
    })

  const [isHeader, setIsHeader] = useState<boolean>(true)//控制View 隐藏

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
    v.state.isRefreshing = true
    setIsHeader(true)
    v.pageNumber = 1
    console.log('下拉刷新');
    loadWBData()
  }

  //上拉加载更多数据
  const onFooterRefresh = () => {
    v.pageNumber ++
    console.log('上拉加载');
    v.state.showFoot = 1
    setProps()
    loadWBData()
  }

  function loadWBData() {
    let params = {
      type: parseInt(v.type),
      page: v.pageNumber,
    }
    console.log('页码===', v.pageNumber);
    api.chat.redBagLogPage(params).setCompletionBlock(({ data }) => {
      let dicData = data;

      if (dicData['list'].count == 0) {
        return
      }
      if (v.pageNumber == 1) {
        v.state.isRefreshing = false
        setIsHeader(false)
        v.items.length = 0
        console.log('下拉刷新数据 ====', v.items);
        v.items = JSON.parse(JSON.stringify(dicData['list']))
        console.log('下拉刷新数据 ====', v.items);
        console.log('v.state.isRefreshing ====', v.state.isRefreshing);
        console.log('isHeader ====', isHeader);
        setProps()
      }
      else {
        if (v.state.isLastPage) {
          return
        }
        else {
          v.state.showFoot = 0
          if (dicData['list'].count < v.pageSize) {
            v.state.isLastPage = true;
            v.state.showFoot = 3
          }
          v.items = v.items.concat(JSON.parse(JSON.stringify(dicData['list'])))
          console.log('上拉加载更多数据 ====', v.items);
          setProps()
        }
      }

    }, (err) => {
      console.log('err = ', err);
      // setProps()
      // Toast(err.message)
    });
  }

  function onEndReached(){
    // setTimeout(() => {
      
    // }, 1000);
    console.log('onEndReached');
    //如果是正在加载中或没有更多数据了，则返回
    if(v.state.showFoot != 0 ){
      console.log('正在加载中或没有更多数据了，则返回');
        return ;
    }
    //如果当前页大于或等于总页数，那就是到最后一页了，返回
    if(v.state.isLastPage){
      console.log('当前页大于或等于总页数，那就是到最后一页了，则返回');
        return;
    } 
      //是否已是下拉刷新 返回     
    if(v.state.isRefreshing  ){
      console.log('已是下拉刷新 返回  ');
        return ;
    }
    //底部显示正在加载更多数据
    v.state.showFoot = 0
    //获取数据
  
    onFooterRefresh();
}

  //上拉加载布局
  const renderFooter= () => {
    if (v.state.showFoot === 0) {
        return (
            <View style={{alignItems:'center',justifyContent:'flex-start',backgroundColor:'blue'}}>
                <Text style={{color:'#999999',fontSize:18,marginTop:10,marginBottom:10,}}>
                    拖动加载数据
                </Text>
            </View>
        );
    } else if (v.state.showFoot === 1) {
        return (
            <View style={{alignItems:'center',justifyContent:'flex-start',backgroundColor:'blue'}}>
                <ActivityIndicator />
                <Text>正在加载...</Text>
            </View>
        );
    } else if (v.state.showFoot === 1) {
        return (
          <View style={{alignItems:'center',justifyContent:'flex-start',backgroundColor:'blue'}}>
          <Text style={{color:'#999999',fontSize:18,marginTop:10,marginBottom:10,}}>
              
          </Text>
      </View>
        );
    }
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

      <FlatList
        data={v.items}
        renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={_renderListEmptyComp()} // 列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element
        //下拉刷新
        //设置下拉刷新样式
        refreshControl={
          <RefreshControl
              title={"Loading"} //android中设置无效
              colors={["red"]} //android
              tintColor={"red"} //ios
              titleColor={"red"}
              refreshing={v.state.isRefreshing}
              // refreshing={isHeader}
              onRefresh={() => {
                
                onHeaderRefresh(); //下拉刷新加载数据
              }}
          />
      }
        //设置上拉加载
        ListFooterComponent={() => renderFooter()}
        onEndReachedThreshold={50}
        
        onEndReached={() => {
          console.log('==============1');
          
          onEndReached()
        }}
      />

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