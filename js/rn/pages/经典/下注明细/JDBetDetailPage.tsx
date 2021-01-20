
import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { setProps } from '../../base/UGPage';
import { scale } from "../../../public/tools/Scale";

import { UGStore } from '../../../redux/store/UGStore';
import { anyEmpty } from '../../../public/tools/Ext';


interface JDBetDetailPage {
  pageTitle?: string,//界面名称数据
  titleArray?: Array<string>,// 按钮名称数据

  //===列表数据====================================
  items?: Array<any>//界面数据
  state: {
    isRefreshing?: boolean//下拉刷新开始结束 
  },

}

const JDBetDetailPage = ({ }: { pageTitle?: string, titleArray?: Array<string>, }) => {

  //调用sysConf

  let { current: v } = useRef<JDBetDetailPage>(
    {
      pageTitle: '下注明细',
      titleArray: ['彩种', "笔数", "下注金额", "输赢",],
      items: [],
      state: {
        isRefreshing: true,
      },
    }
  )

  /**
 * 初始化
 * @param item
 */
  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: '下注明细', back: true },
      didFocus: (params) => {
        let dic = params;
        for (var key in dic) {
          console.log("key: " + key + " ,value: " + dic[key]);
          if (key == 'date') {
            let date = dic[key];

            if (!anyEmpty(date)) {
              onHeaderRefresh(date)
            }

          }
        }
      }
    })

  }, [])


  /**
 * 下拉刷新
 * 
 */
  const onHeaderRefresh = (date: string) => {
    v.state.isRefreshing = true
    console.log('下拉刷新');
    inviteCodeListData(date)
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
   * 得到邀请码列表数据
   * 
   */
  function inviteCodeListData(date: string) {

    console.log('得到数据===', date);
    api.user.lotteryDayStat(date).useSuccess(({ data }) => {

      console.log('data =', data);
      let dicData = data;
      let arrayData = returnData(dicData);
      if (arrayData.length == 0) {
        console.log('进来了：==================');
        v.state.isRefreshing = false;
        setProps();
        return;
      }
      v.state.isRefreshing = false
      v.items.length = 0
      v.items = JSON.parse(JSON.stringify(arrayData))
      setProps()

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
* 渲染列表项
* 
*/
  const _renderItem = ({ item }) => {
    {
      return (
        <View style={[styles.viewItem, { backgroundColor: Skin1.textColor4, borderBottomWidth: 1, borderBottomColor: Skin1.textColor3, alignItems: 'center' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: AppDefine.width / 4, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, }}>
              {item.title}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: AppDefine.width / 4, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, }}>
              {item.betCount}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: AppDefine.width / 4, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, }}>
              {item.betMoney}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, height: scale(66), alignItems: 'center' }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, }}>
              {item.rewardRebate}
            </Text>
          </View>
        </View>

      );
    }
  }
  return (
    <View style={styles.container}>
      <View style={{}}>
        <View style={{ flexDirection: 'row', height: scale(66), backgroundColor: Skin1.CLBgColor }}>
          {v.titleArray?.map((title) => {
            return (
              <TouchableOpacity style={{ borderBottomWidth: scale(1), borderColor: Skin1.textColor3, flexDirection: 'row', justifyContent: 'center', flex: 1, width: AppDefine.width / v.titleArray?.length, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}
                onPress={() => {
                }}>
                <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1, }}>
                  {title}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      <View style={{flex:1}}>
        <FlatList
          data={v.items}
          renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={_renderListEmptyComp()} // 列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element
        />
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

export default JDBetDetailPage
