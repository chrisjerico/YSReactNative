
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, } from 'react-native';
import { Button } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import AppDefine from '../../../public/define/AppDefine';
import { pop } from '../../../public/navigation/RootNavigation';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { scale } from '../../../public/tools/Scale';
import { Toast } from '../../../public/tools/ToastUtils';
import { showSuccess } from '../../../public/widget/UGLoadingCP';
import { UGAgentApplyInfo } from "../../../redux/model/全局/UGSysConfModel";
import { setProps } from '../../base/UGPage';


interface JDRedEnveloperPage {

}

const CITY_NAMES = ["北京", "上海", "广州", "深圳", "成都", "武汉", "南京"];

const JDRedEnveloperPage = ({ }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [dataArray, setDataArray] = useState(CITY_NAMES)


  useEffect(() => {
    loadData()
    setProps({
      navbarOpstions: { hidden: false, title: '红包扫雷' },
      didFocus: () => {
        AppDefine.checkHeaderShowBackButton((show) => {
          setProps({ navbarOpstions: { back: show } });
        })
      }
    })

  }, [])

  function loadData() {
    setIsLoading(true)
    //模拟网络请求
    setTimeout(() => {
      //把数据反转
      let newArray = [];
      for (let i = dataArray.length - 1; i >= 0; i--) {
        newArray.push(dataArray[i]);
      }
      setIsLoading(false)
      setDataArray(newArray)

    }, 3000);
  }

  // 渲染列表项
  const _renderItem = ({ index, item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{item}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dataArray}
        renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中

        //下拉刷新
        refreshing={isLoading}
        onRefresh={() => {
          loadData(); //下拉刷新加载数据
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
    backgroundColor: "#169",
    height: 200,
    margin: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 20,
  }
});


export default JDRedEnveloperPage