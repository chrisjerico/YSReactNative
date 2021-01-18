
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

import SegmentedControl from "rn-segmented-control";
import moment from 'moment';
import { UGImageHost, useHtml5Image } from '../../../public/tools/tars';


import { number } from 'prop-types';
import { Res } from '../../../Res/icon/Res';
interface JDSegmentPage {

}

const JDSegmentPage = ({ route, setProps }: UGBasePageProps) => {

  const [tabIndex, setTabIndex] = React.useState(1);
  const {img_assets} = useHtml5Image(UGImageHost.test5)
  const handleTabsChange = (index:number) => {
    // console.log('index ==',index);
    
    setTabIndex(index);

    // var date = moment('2016-10-11 18:06:03')
    //     console.log('date ==',date);

    //     let timestamp = moment(date).format("X");
    //     console.log('timestamp ==',timestamp);

    //     let timestamp2 = moment('2016-10-11 18:06:03').format("X");
    //     console.log('timestamp2 ==',timestamp2);
    



    // console.log('相差多少年',moment('2016-10-11 18:06:03').diff(moment('2015-10-11 18:06:03'), 'years'))
    // console.log('相差多少月',moment('2016-10-11 18:06:03').diff(moment('2015-10-11 18:06:03'), 'months'))
    // console.log('相差多少小时',moment('2015-10-11 19:07:03').diff(moment('2015-10-11 21:06:03'), 'hours'))
    // console.log('相差多少分',moment('2016-10-11 18:09:03').diff(moment('2016-10-11 18:06:03'), 'minutes')) 
    // console.log('相差多少秒',moment('2016-10-11 18:07:03').diff(moment('2016-10-11 18:06:03'), 'seconds')) 
    // let diff =   moment('2016-10-11 18:07:02') >= moment('2016-10-11 18:07:03')
    // console.log('diff==',diff);
    
    // var str="1.900"

    // console.log(str.split('.'));
    // var now = moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss');

    // var now2 = moment().format('YYYY-MM-DD HH:mm:ss');
    
    // console.log('now',now);
    // console.log('now2',now2);

    // console.log('相差多少秒',moment('2021-01-14 12:51:30').diff(moment(now2), 'seconds')) 
    // console.log('相差多少秒',moment(now2).diff(moment('2021-01-14 12:51:30'), 'seconds')) 
    // var now3 = moment().add(7, 'd');

    // console.log('now3',now3);

    // var now4 = moment().subtract(7, 's').format('YYYY-MM-DD HH:mm:ss');
    // console.log('now',now);
    // console.log('now4',now4);

    // console.log('相差多少天',moment(now4).diff(moment('2015-10-11 18:06:03'), 'days'))
    https://appstatic.guolongling.com/assets/gengduo.png
    
    console.log('图片路径：',img_assets('gengduo'));
    console.log('图片路径：',Res.gengduo);
  };
  /**
 * 初始化
 * @param item
 */
  //初始化
  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: '红包扫雷', back: true },
      didFocus: () => {

        
        
        
      }
    })

  }, [])

  return (
    <View style={{  justifyContent: 'center', alignItems: 'center'}}>
     <SegmentedControl
        tabs={["按钮1", "按钮2",]}
        onChange={handleTabsChange}
        currentIndex={tabIndex}
        paddingVertical={8}
        width={AppDefine.width - 90}
        containerStyle={{
          marginVertical: 20,
        }}
        textStyle={{
          fontWeight: "300",
          fontSize: 16,
        }}
        theme={'DARK'}
      />
    </View >
  )

}


export default JDSegmentPage
