
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

interface JDLotteryAssistantPage {
  bottomH?: number,//底部的高度
}

const JDLotteryAssistantPage = () => {

  let { current: v } = useRef<JDLotteryAssistantPage>(
    {
    }
  )


  /**
* 渲染列表项
* 
*/
  const _renderItem = ({ index, item }) => {
    {
      return (
        <View style={[styles.viewItem, { backgroundColor: Skin1.textColor4, alignItems: 'center', marginHorizontal: 10, }]}>

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
      }
    })

  }, [])


  return (
    <View style={[styles.container, { backgroundColor: Skin1.CLBgColor }]}>
      <View style={{ marginTop: 10, flex: 1 }}>

        {/* 底部 */}
        <View style={{
          marginTop: AppDefine.height - 44 - AppDefine.safeArea.top - AppDefine.safeArea.bottom - v.bottomH,
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: '#333333',
          height: v.bottomH,
        }}>
          <View style={{ height: v.bottomH, width: 80,  alignItems: 'center', justifyContent: 'center',borderRightWidth:1,borderRightColor:'white', }}>
            <Text style={{ fontSize: 18, color: '#FF8C00' }}>
              {'清空'}
            </Text>
          </View>
          <View style={{ height: v.bottomH, flex: 1,  flexDirection: 'row',alignItems: 'center',  }}>
            <Text style={{ fontSize: 16, color: 'white',marginRight:2 ,marginLeft:10}}>
              {'共'}
            </Text>
            <Text style={{ fontSize: 18, color: '#DC143C' }}>
              {'0'}
            </Text>
            <Text style={{ fontSize: 16, color: 'white' ,marginHorizontal:2}}>
              {'注'}
            </Text>
            <View style={{ flex:1}}></View>
            <TextInput style={{ height: 30,width:140, backgroundColor: Skin1.textColor4, marginRight: 10, borderRadius: 3, overflow: 'hidden', borderColor: Skin1.textColor3, borderWidth: 1, color: Skin1.textColor1 }}
              placeholder={'   投注金额'}
              placeholderTextColor={Skin1.textColor3}
              onChangeText={(text) => {
          
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

export default JDLotteryAssistantPage
