
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, Image, TouchableOpacity, View, Platform } from 'react-native';
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

      }
    })

  }, [])


  return (
    <View style={[styles.container, { backgroundColor: Skin1.CLBgColor }]}>
      <View style={{ marginTop: 10, flex: 1 }}>

        {/* 底部 */}
        <View style={{ marginTop: AppDefine.height - 80 - AppDefine.safeArea.top - AppDefine.safeArea.bottom - 44, justifyContent: 'center', flexDirection: 'row', backgroundColor: '#333333', height: 80, }}>
          <View style={{ height: 80, width: 80, backgroundColor: 'blue' }}>

          </View>
          <View style={{ height: 80, width: 80, backgroundColor: 'yellow',flex:1 }}>

          </View>
          <View style={{ height: 80, width: 180, backgroundColor: 'red' }}>

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
