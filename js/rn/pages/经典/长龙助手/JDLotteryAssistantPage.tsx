
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, Image, TouchableOpacity, View, Platform, TextInput } from 'react-native';
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
import { UGBetItemModel, UGChanglongaideModel } from '../Model/UGChanglongaideModel';

interface JDLotteryAssistantPage {
  bottomH?: number,//底部的高度
  items?: Array<any>//界面数据
  isRefreshing?: boolean//下拉刷新开始结束 
  imgLoading?: string //默认图片
  selAideModel?: UGChanglongaideModel //
  selBetItem?: UGBetItemModel//投注
  betCount?: number //下注数
  amountLabel?: string//投注金额
  betDetailViewhidden?: boolean//提示是否隐藏
  betDetailLabel?: string//提示文字
  betDetail2Label?: string//提示2文字
}

const JDLotteryAssistantPage = () => {

  let { current: v } = useRef<JDLotteryAssistantPage>(
    {
      bottomH: 60,
      items: [],
      isRefreshing: true,
      imgLoading: 'https://appstatic.guolaow.com/web/images/loading.png'
    }
  )


  /**
* 限制只能输入数字和小数
* 
*/
  function chkPrice(obj) { //方法1
    obj = obj.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    obj = obj.replace(/^\./g, "");//保证只有出现一个.而没有多个. 
    obj = obj.replace(/\.{2,}/g, ".");//保证.只出现一次，而不能出现两次以上 
    obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
    return obj;
}



  /**
* cell 按钮点击
* 
*/
  function betItemSelect(item?: any, index?: number) {
    let obj = item?.betList[index];
    obj.select = !obj.select;
    for (let index = 0; index < v.items.length; index++) {
      const aideModel = v.items[index];
      for (let i = 0; i < aideModel.betList.length; i++) {
        const bet = aideModel.betList[i];
        if (bet != obj) {
          bet.select = false;
        }
      }
    }

    if (obj.select) {
      console.log('item==', item);
      console.log('obj==', obj);

      v.selAideModel = item;
      v.selBetItem = obj;
      v.betCount = 1;


      if (anyEmpty(v.amountLabel)) {
        v.betDetailViewhidden = true;
        setProps()
        return;
      }
      v.betDetailViewhidden = false;
      let total: number = parseFloat(v.amountLabel) * parseFloat(obj.odds)
      v.betDetailLabel = v.selAideModel?.title + ', '
        + v.selAideModel?.playCateName + ', '
        + v.selBetItem?.playName;
      v.betDetail2Label = ' 奖金:' + total?.toFixed(4)
    } else {
      v.betDetailViewhidden = true;
      v.selAideModel = null
      v.betCount = 0;
    }
    setProps()

  }


  /**
* cell img的显示数据
* 
*/
  function cellImg(item: any, index: number) {

    if (anyEmpty(item.logo)) {

      return v.imgLoading;
    } else {
      return item.logo
    }

  }
  /**
* betView2 的颜色
* 
*/
  function betView2Color(item: any) {
    if (!arrayEmpty(item.betList)) {
      let length = item.betList.length - 1;
      let obj = item.betList[length]
      if (obj.select) {
        return Skin1.themeColor
      } else {
        return 'white'
      }
    }
  }

  /**
*  betView1 的颜色
* 
*/
  function betView1Color(item: any) {
    if (!arrayEmpty(item.betList)) {
      let obj = item.betList[0]
      if (obj.select) {
        return Skin1.themeColor
      } else {
        return 'white'
      }
    }

  }

  /**
* oddsLabel2 playNameLabel2 的颜色
* 
*/
  function lastLabelColor(item: any) {
    if (!arrayEmpty(item.betList)) {
      let length = item.betList.length - 1;
      let obj = item.betList[length]
      if (obj.select) {
        return 'white'
      } else {
        return 'black'
      }
    }
    else {
      return Skin1.textColor1
    }
  }

  /**
* oddsLabel1 playNameLabel1 的颜色
* 
*/
  function fastLabelColor(item: any) {
    if (!arrayEmpty(item.betList)) {
      let obj = item.betList[0]
      if (obj.select) {
        return 'white'
      } else {
        return 'black'
      }
    }
    else {
      return Skin1.textColor1
    }
  }


  /**
* 根据oddsLabel2 的显示数据
* 
*/
  function oddsLabel2(item: any) {
    if (!arrayEmpty(item.betList)) {
      let length = item.betList.length - 1;
      return item.betList[length].odds;
    }
  }

  /**
* 根据playNameLabel2 的显示数据
* 
*/
  function playName2(item: any) {
    if (!arrayEmpty(item.betList)) {
      let length = item.betList.length - 1;
      return item.betList[length].playName;
    }
  }


  /**
* 根据oddsLabel1 的显示数据
* 
*/
  function oddsLabel1(item: any) {
    if (!arrayEmpty(item.betList)) {
      return item.betList[0].odds;
    }
  }

  /**
* 根据playNameLabel1 的显示数据
* 
*/
  function playName1(item: any) {
    if (!arrayEmpty(item.betList)) {
      return item.betList[0].playName;
    }
  }



  /**
* 根据数据是数组还是字典返回数据
* 
*/
  function playNameColor(item: any) {
    if (item.playName == '小' || item.playName == '大') {
      return '#76B473'
    }
    else if (item.playName == '单' || item.playName == '双') {
      return '#800080'
    }
    else if (item.playName == '龙' || item.playName == '虎') {
      return '#DC143C	'
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
    getChanglong()
  }

  function getChanglong() {
    console.log('长龙助手===');
    api.game.changlong('60').useSuccess(({ data }) => {

      // console.log('data =', data);

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
      for (let index = 0; index < arrayData.length; index++) {
        const clm1 = arrayData[index];
        for (let i = 0; i < clm1.betList.length; i++) {
          const bet1 = clm1.betList[i];
          if (bet1.select) {
            for (let j = 0; j < v.items.length; j++) {
              const clm2 = v.items[j];
              if (clm1.gameId == clm2.gameId && clm1.displayNumber == clm2.displayNumber) {
                for (let k = 0; k < clm2.betList.length; k++) {
                  const bet2 = clm2.betList[k];
                  if (bet1.playId == bet2.playId) {
                    bet2.select = true;
                  }
                }
              }

            }
          }

        }
      }
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
        <View style={[styles.viewItem, { alignItems: 'center', marginHorizontal: 10, flexDirection: 'row', }]}>
          {/* 图片 */}
          <View style={{ alignItems: 'center', justifyContent: 'center', }}>
            <Image style={[styles.itemImageImageStyle,]} source={{ uri: cellImg(item, index) }} />
          </View>
          {/* 内容 */}
          <View style={[{ flexDirection: 'column', marginLeft: 10, }]}>
            {/* 文字1 */}
            <View>
              <Text style={{ fontSize: 15, color: Skin1.textColor1, }}>
                {item.title}
              </Text>
            </View>
            {/* 文字2 */}
            <View style={[{ flexDirection: 'row', }]}>
              <Text style={{ fontSize: 13, color: Skin1.textColor1 }}>
                {!anyEmpty(item.displayNumber)?item.displayNumber:item.issue}
              </Text>
              <Text style={{ fontSize: 13, color: 'red', marginLeft: 10 }}>
                {'00:03:32'}
              </Text>
            </View>
            {/* 图标 */}
            <View style={[{ flexDirection: 'row', }]}>
              <View style={{ backgroundColor: '#A9A9A9', borderRadius: 3, }}>
                <Text style={{ fontSize: 12, color: 'white', marginHorizontal: 5, marginVertical: 3 }}>
                  {item.playCateName}
                </Text>
              </View>
              <View style={{ marginLeft: 10, backgroundColor: playNameColor(item), borderRadius: 3, }}>
                <Text style={{ fontSize: 12, color: 'white', marginHorizontal: 5, marginVertical: 3 }}>
                  {item.playName}
                </Text>
              </View>
              <View style={{ marginLeft: 10, backgroundColor: '#DC143C', borderRadius: 3, }}>
                <Text style={{ fontSize: 12, color: 'white', marginHorizontal: 5, marginVertical: 3 }}>
                  {item.count}
                </Text>
              </View>

            </View>
          </View >
          {/* 多余 */}
          <View style={[{ flex: 1 }]}></View>
          {/* 按钮 */}
          <View style={[{ flexDirection: 'row', }]}>
            <TouchableOpacity style={[{
              flexDirection: 'column', alignItems: 'center', width: 46, height: 46, borderRadius: 4, borderColor: Skin1.textColor1, borderWidth: 1,
              backgroundColor: betView1Color(item)
            }]}
              onPress={() => {
                betItemSelect(item, 0)
              }}
            >
              <Text style={{ fontSize: 15, color: fastLabelColor(item), marginTop: 5 }}>
                {playName1(item)}
              </Text>
              <Text style={{ fontSize: 12, color: fastLabelColor(item), marginTop: 4 }}>
                {oddsLabel1(item)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{
              marginLeft: 15, flexDirection: 'column', alignItems: 'center', width: 46, height: 46, borderRadius: 4, borderColor: Skin1.textColor1, borderWidth: 1,
              backgroundColor: betView2Color(item)
            }]}
              onPress={() => {
                betItemSelect(item, 1)
              }}
            >
              <Text style={{ fontSize: 15, color: lastLabelColor(item), marginTop: 5 }}>
                {playName2(item)}
              </Text>
              <Text style={{ fontSize: 12, color: lastLabelColor(item), marginTop: 4 }}>
                {oddsLabel2(item)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
        v.bottomH = 60;
        v.imgLoading = 'https://appstatic.guolaow.com/web/images/loading.png'
        v.selAideModel = null
        v.selBetItem = null
        v.betCount = 0
        v.amountLabel = ''
        v.betDetailViewhidden = true
        v.betDetailLabel = ''
        v.betDetail2Label = ''
        onHeaderRefresh()
      }
    })

  }, [])


  return (
    <View style={[styles.container, { backgroundColor: Skin1.isBlack ? Skin1.CLBgColor : Skin1.textColor4 }]}>
      <View style={{ marginTop: 0, flex: 1, }}>
        {/* 列表 */}
        <View style={{ height: AppDefine.height - 44 - AppDefine.safeArea.top - AppDefine.safeArea.bottom - v.bottomH }}>
          <FlatList
            data={v.items}
            renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
            // ItemSeparatorComponent ={_renderItemSeparator}
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
          />

        </View>
        {/* 下注详情 */}
        {!v.betDetailViewhidden && <View style={{
          position: 'absolute',
          marginTop: AppDefine.height - 44 - AppDefine.safeArea.top - AppDefine.safeArea.bottom - v.bottomH - 40,
          marginLeft: 10,
          backgroundColor: '#FFD9A3',
          height: 35,
          width: 310,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: 3,
        }}>
          <Text style={{ fontSize: 14, color: 'black' }}>
            {v.betDetailLabel}
          </Text>
          <Text style={{ fontSize: 14, color: '#DC143C' }}>
            {v.betDetail2Label}
          </Text>

        </View>}
        {/* 底部 */}
        <View style={{
          position: 'absolute',
          marginTop: AppDefine.height - 44 - AppDefine.safeArea.top - AppDefine.safeArea.bottom - v.bottomH,
          justifyContent: 'center',
          flexDirection: 'row',
          width: '100%',
          backgroundColor: '#333333',
          height: v.bottomH + AppDefine.safeArea.bottom,
        }}>
          <View style={{ height: v.bottomH, width: 80, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: 'white', }}>
            <Text style={{ fontSize: 18, color: '#FF8C00' }}>
              {'清空'}
            </Text>
          </View>
          <View style={{ height: v.bottomH, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ fontSize: 16, color: 'white', marginRight: 2, marginLeft: 10 }}>
              {'共'}
            </Text>
            <Text style={{ fontSize: 18, color: '#DC143C' }}>
              {v.betCount}
            </Text>
            <Text style={{ fontSize: 16, color: 'white', marginHorizontal: 2 }}>
              {'注'}
            </Text>
            <View style={{ flex: 1 }}></View>
            <TextInput style={{ height: 30, width: 140, backgroundColor: Skin1.textColor4, marginRight: 10, borderRadius: 3, overflow: 'hidden', borderColor: Skin1.textColor3, borderWidth: 1, color: Skin1.textColor1 }}
              placeholder={'   投注金额'}
              value={v.amountLabel} 
              placeholderTextColor={Skin1.textColor3}
              onChangeText={(text) => {
                console.log('投注金额==', text);
                v.amountLabel = chkPrice(text).trim()
                if (!anyEmpty(v.amountLabel) && !anyEmpty(v.selBetItem) && !anyEmpty(v.selAideModel)) {
                  v.betDetailViewhidden = false;
                  setProps()
                }
                else{
                  v.betDetailViewhidden = true;
                  setProps()
                }
              }}
            ></TextInput>

          </View>
          <View style={{ height: v.bottomH, width: 100, backgroundColor: '#1E90FF', alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ fontSize: 18, color: 'white' }}>
              {'马上投注'}
            </Text>
          </View>
        </View>


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
    height: scale(90),
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
  itemImageImageStyle: {
    height: 50,
    width: 50,
    // marginHorizontal:10,
    marginVertical: 10,
    resizeMode: "stretch",

  },
});

export default JDLotteryAssistantPage
