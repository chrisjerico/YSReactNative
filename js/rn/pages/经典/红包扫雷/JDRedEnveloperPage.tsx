
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



interface JDRedEnveloperPage {
  isLoading?: boolean //是否下拉刷新
  pageSize?: number//每页多少条数据
  pageNumber?: number//当前显示第几页
  items?: Array<RedBagLogModel>//界面数据
  type?: string//红包类型 1-普通红包 2-扫雷红包
  isShowFoot?: boolean //是否上拉加载
}

const CITY_NAMES = ["北京", "上海", "广州", "深圳", "成都", "武汉", "南京"];

const JDRedEnveloperPage = ({ route, setProps }: UGBasePageProps) => {

  const [isLoading, setIsLoading] = useState(false)
  let [dataArray, setDataArray] = useState(CITY_NAMES)
  let [items, setItems] = useState<Array<RedBagLogModel>>([])
  const { current: pageSize } = useRef<number>(20);
  let { current: pageNumber } = useRef<number>(1);
  const [type, setType] = useState<string>('1');
  let [isShowFoot, setIsShowFoot] = useState(false)

  //初始化
  useEffect(() => {

    setProps({
      navbarOpstions: { hidden: false, title: '红包扫雷', back: true },
      didFocus: (params) => {
        console.log('ppppp', params);
        let dic = params;
        for (var key in dic) {
          console.log("key: " + key + " ,value: " + dic[key]);
          if (key == 'type') {
            setType(dic[key])
            console.log('得到的type=', type);
            if (type == '1') {
              setProps({ navbarOpstions: { title: '红包记录' } }, false)
            } else {
              setProps({ navbarOpstions: { title: '扫雷记录' } }, false)
            }
            // loadData()
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
  function loadData() {
    pageNumber = 1
    let params = {
      type: Number(type),
      page: pageNumber,
    }

    setIsLoading(true)
    api.chat.redBagLogPage(params).setCompletionBlock(({ data }) => {
      // items.length = 0
      let dicData = data;
      setItems(dicData['list'])
      setIsLoading(false)
      setProps()

    }, (err) => {
      setIsLoading(false)
      console.log('err = ', err);
      // Toast(err.message)

    });
  }

  function footLabel(isShow:boolean){
    if (isShow) {
      return '正在加载更多'
    } else {
      return ''
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
          fontSize: 18
        }}>暂无更多数据</Text>
      </View>
    );
  }

  //上拉页面样式
  function renderLoadMoreView() {
    return <View style={styles.loadMore}>
      {isShowFoot && 
        <ActivityIndicator
          style={styles.indicator}
          size={"large"}
          // color={"red"}
          animating={true}
        />}
        <Text>{footLabel(isShowFoot)}</Text>
    </View>
  }
  //上拉加载更多数据
  function loadMoreData() {
    pageNumber = pageNumber + 1
    if (pageNumber == 1) {
      items.length = 0
    }
    let params = {
      type: parseInt(type),
      page: pageNumber,
    }
    api.chat.redBagLogPage(params).setCompletionBlock(({ data }) => {
      let dicData = data;
      setItems(items.concat(JSON.parse(JSON.stringify(dicData['list']))))
      if (dicData['list'].count < pageSize) {
        setIsShowFoot(false)
      } else {
        setIsShowFoot(true)
      }
      setProps()

    }, (err) => {
      console.log('err = ', err);

    });
  }
  // 渲染列表项
  const _renderItem = ({ index, item }) => {
    return (
      <View style={{ flexDirection: 'row', height: 60, backgroundColor: index % 2 ?  '#F7F8F8' :'white' }}>
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
        data={items}
        renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
        ListEmptyComponent={_renderListEmptyComp()} // 列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element
        //下拉刷新
        refreshing={isLoading}
        onRefresh={() => {
          loadData(); //下拉刷新加载数据
        }}
        //设置上拉加载
        ListFooterComponent={() => renderLoadMoreView()}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadMoreData()}
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