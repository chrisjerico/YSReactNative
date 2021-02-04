import { ActivityIndicator, FlatList, Platform, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import { UGBasePageProps } from '../../../base/UGPage'
import { ugLog } from '../../../../public/tools/UgLog'
import { anyEmpty } from '../../../../public/tools/Ext'
import EmptyView from '../../../../public/components/view/empty/EmptyView'
import AppDefine from '../../../../public/define/AppDefine'
import CommStyles from '../../../base/CommStyles'
import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import { Skin1, skin1 } from '../../../../public/theme/UGSkinManagers'
import { UGStore } from '../../../../redux/store/UGStore'
import { GameHistorylistBean, GameHistoryModel } from '../../../../public/network/Model/HomeRecommendModel'
import APIRouter from '../../../../public/network/APIRouter'
import { UGBetsRecordListModel, UGBetsRecordModel } from '../../Model/UGBetsRecordModel'
import { api } from '../../../../public/network/NetworkRequest1/NetworkRequest1'


interface JDDayDetailPage {

  gameId?: string;//下注id
  date?: string;//下注时间
  totalWinAmount?: string/**<   输赢总金额 */
  totalBetAmount?: string/**<   总下注金额 */
  //========================
  pageSize?: number//每页多少条数据
  pageNumber?: number//当前显示第几页
  items?: Array<UGBetsRecordModel>//界面数据
  state: {
    showFoot?: number//控制foot， 0：点击重新加载   1：'数据加载中…  2 ：已加载全部数据(空)
    isRefreshing?: boolean//下拉刷新开始结束 
    isLastPage?: boolean //是否是最后一页 
  }
}

/**
 * 其他注单
 * @param navigation
 * @constructor
 */
const JDDayDetailPage = ({ route, setProps }: UGBasePageProps) => {


  let { current: v } = useRef<JDDayDetailPage>(
    {
      totalWinAmount: '0',
      totalBetAmount: '0',
      pageSize: 30,
      pageNumber: 1,
      items: [],
      state: {
        showFoot: 0,
        isRefreshing: true,
        isLastPage: false,
      }
    })

  const [totalBetMoney, setTotalBetMoney] = useState('0') //下注
  const [totalResultMoney, setTotalResultMoney] = useState('0') //输赢



  useEffect(() => {
    setProps({

      navbarOpstions: { hidden: false, title: '下注明细(已结算)', back: true },
      didFocus: (params) => {
        ugLog('--------------------------params==', params)
        switch (Platform.OS) {
          case 'ios':
            let dic = params;
            for (var key in dic) {
              if (key == 'gameId') {
                if (!anyEmpty(dic[key])) {
                  v.gameId = dic[key];
                }
              }
              if (key == 'date') {
                if (!anyEmpty(dic[key])) {
                  v.date = dic[key];
                }
              }
            }
            if (!anyEmpty(v.gameId) && !anyEmpty(v.date)) {
              v.items.length = 0;
              v.pageNumber = 1;
              v.state.showFoot = 0;
              v.state.isRefreshing = true;
              v.state.isLastPage = false;
              onHeaderRefresh()
            }

            break;
          case 'android':
            //TODO Android 传参
            break;
        }


      },
    }, false)
  }, [])

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
 * 获取注单列表数据
 * 
 */
  function loadWBData() {

    console.log('获取注单列表===', v.pageNumber);

    //  APIRouter.ticket_history_args('1','20','lottery',date,date,gameId,).then(({ data: res }) => {
    //   ugLog('获取注單數據=======', res)
    //   if (res?.code == 0) {
      
    //   } else {
       
    //   }
    // }).finally(() => {
    
    // })


    api.ticket.history('lottery', 5, v.date, v.date, v.gameId, v.pageNumber, v.pageSize).useSuccess(({ data }) => {
      let dicData = data;
      v.totalWinAmount = dicData.totalWinAmount
      v.totalBetAmount = dicData.totalBetAmount
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
      else {
        v.state.isLastPage = false;
        v.state.showFoot = 0
      }
      ugLog('dicData====',dicData)
      // console.log('showFoot==', v.state.showFoot);

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
        <Text style={[{ color: Skin1.textColor3, }, _styles.listEmpty,]}>暂无更多数据</Text>
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
        <TouchableOpacity style={{ paddingBottom: 150 }} onPress={() => {
          // onEndReached()
        }}
        >
          <View style={_styles.foot}>
            <Text style={[_styles.footText, { color: Skin1.textColor2 }]}>
              上拉加载
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (v.state.showFoot === 1) {
      return (
        <TouchableOpacity style={{ paddingBottom: 150 }} onPress={() => {
          // onEndReached()  //测试的时候可以打开，打开也没有影响
        }}
        >
          <View style={_styles.foot}>
            <ActivityIndicator />
            <Text style={[_styles.footText, { color: Skin1.textColor2 }]}>
              正在加载...
          </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (v.state.showFoot === 2) {
      return (
        <TouchableOpacity style={{ paddingBottom: 150 }} onPress={() => {
          // onEndReached()//测试的时候可以打开，打开也没有影响
        }}
        >
          <View style={_styles.foot}>
            <Text style={[_styles.footText, { color: Skin1.textColor2 }]}>

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
        <View style={[_styles.viewItem, { backgroundColor: Skin1.textColor4, borderBottomWidth: 1, borderBottomColor: Skin1.textColor3, alignItems: 'center' }]}>
          <View style={{ flex: 1, flexDirection: 'column' , borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(110), justifyContent: 'center',}}>
            <Text style={{ color: Skin1.textColor1, fontSize: scale(20),marginHorizontal:5 }}>{item.issue}</Text>
            <Text style={{ color: 'red', fontSize: scale(20),marginHorizontal:5 }}>{item.id}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center',flex: 1,  borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(110), alignItems: 'center' }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1,marginHorizontal:5  }}>
            {item.playGroupName +'  '+item.playName+'  ' + '@'+'  ' + item.odds}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1,  borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(110), alignItems: 'center' }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1,marginHorizontal:5  }}>
            {item.lotteryNo}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1,  borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(110), alignItems: 'center' }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1,marginHorizontal:5  }}>
            {item.betAmount}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1,  borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(110), alignItems: 'center' }}>
            <Text style={{ flexDirection: 'row', textAlign: 'center', fontSize: scale(20), color: Skin1.textColor1,marginHorizontal:5 }}>
            {item.settleAmount}
            </Text>
          </View>
        </View>
      )
    }
  }

  return (
    <View style={CommStyles.flex}>

      {
        anyEmpty(v.items)
          ? <EmptyView style={{ flex: 1 }} />
          :
          <View style={_styles.container}>
            <View style={{ flexDirection: 'row', height: scale(66), backgroundColor: Skin1.CLBgColor }}>
              <View style={{ borderBottomWidth: scale(1), borderColor: Skin1.textColor3, flexDirection: 'row', justifyContent: 'center', flex: 1, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}>
                <Text style={{ flexDirection: 'row', fontSize: scale(20), color: Skin1.textColor1, }}>
                  {'期号/'}
                </Text>
                <Text style={{ flexDirection: 'row', fontSize: scale(20), color: 'red', }}>
                  {'注单号'}
                </Text>
              </View>
              <View style={{ borderBottomWidth: scale(1), borderColor: Skin1.textColor3, flexDirection: 'row', justifyContent: 'center', flex: 1, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}>
                <Text style={{ flexDirection: 'row', fontSize: scale(20), color: Skin1.textColor1, }}>
                  {'下注明细'}
                </Text>
              </View>
              <View style={{ borderBottomWidth: scale(1), borderColor: Skin1.textColor3, flexDirection: 'row', justifyContent: 'center', flex: 1, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}>
                <Text style={{ flexDirection: 'row', fontSize: scale(20), color: Skin1.textColor1, }}>
                  {'开奖号码'}
                </Text>
              </View>
              <View style={{ borderBottomWidth: scale(1), borderColor: Skin1.textColor3, flexDirection: 'row', justifyContent: 'center', flex: 1, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}>
                <Text style={{ flexDirection: 'row', fontSize: scale(20), color: Skin1.textColor1, }}>
                  {'投注金额'}
                </Text>
              </View>
              <View style={{ borderBottomWidth: scale(1), borderColor: Skin1.textColor3, flexDirection: 'row', justifyContent: 'center', flex: 1, borderRightColor: Skin1.textColor3, borderRightWidth: 1, height: scale(66), alignItems: 'center' }}>
                <Text style={{ flexDirection: 'row', fontSize: scale(20), color: Skin1.textColor1, }}>
                  {'输赢'}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
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

          </View>
      }
      <View style={[_styles.text_bottom_container, { bottom: 0, backgroundColor: skin1.themeColor, }]}>
        <View style={[_styles.text_content_bottom, { alignItems: 'flex-start',  flexDirection: 'row', justifyContent: 'center', }]}>
          <Text style={{ fontSize: scale(22), color: skin1.navBarTitleColor, }}>{'下注: '}</Text>
          <Text style={[{ fontSize: scale(25),color: 'yellow',marginTop:-2  }]}>{v.totalBetAmount}</Text>
        </View>
        <View style={[_styles.text_content_bottom, { alignItems: 'flex-start',  flexDirection: 'row', justifyContent: 'center', }]}>
          <Text style={{ fontSize: scale(22), color: skin1.navBarTitleColor, }}>{'输赢: '}</Text>
          <Text style={[{ fontSize: scale(25),color: 'yellow',marginTop:-2 }]}>{v.totalWinAmount}</Text>
        </View>

      </View>
    </View>
  )
}

const TAB_ITEM_HEIGHT = scale(70) //tab高度

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin1.isBlack ? Skin1.CLBgColor : '#F1F2F5'
  },
  text_title_container: {
    backgroundColor: UGColor.BackgroundColor2,
    height: TAB_ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.BackgroundColor3,
  },
  text_content_0: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(20),
    alignItems: 'center',
    textAlign: 'center',
  },
  text_bottom_container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: skin1.textColor4,
    position: 'absolute',

  },
  text_content_bottom: {
    flex: 1,
    fontSize: scale(20),
    textAlign: 'center',
  },
  calendar_wid: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,
  },
  calendar_button: {
    fontSize: scale(22),
    textAlign: 'center',
    padding: scale(18),
  },
  calendar_title: {
    flex: 1,
    fontSize: scale(24),
    textAlign: 'center',
    padding: scale(16),
  },
  listEmpty: {
    fontSize: scale(22),
    marginTop: scale(15),
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
    // height: scale(110),
  },

})

export default JDDayDetailPage
