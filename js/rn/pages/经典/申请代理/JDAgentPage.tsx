

import { View, Text, FlatList, StyleSheet, RefreshControl, Image, ImageBackground, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import React, { useEffect, useRef, useState, Component } from 'react'
import { setProps } from '../../base/UGPage';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { UGSignInHistoryModel } from '../../../redux/model/other/UGSignInHistoryModel';
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import PushHelper from '../../../public/define/PushHelper';
import { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel';
import { push } from '../../../public/navigation/RootNavigation';
import { PageName } from '../../../public/navigation/Navigation';

interface JDAgentPage {
  reviewStatus?: number //0,1 未提交、审核中(输入) 3 审核拒绝 （显示）
}
const JDAgentPage =({ setProps })=>{

  const [reviewStatus, setReviewStatus] = useState<number>(0)//控制View 隐藏显示

  useEffect(() => {

    setProps({
      navbarOpstions: { hidden: false, title: '申请代理' },
      didFocus: (params) => {
        let dic = params;
        // console.log("输出最初的字典元素: "); 
        for (var key in dic) {
          // console.log("key: " + key + " ,value: " + dic[key]);
          if (key == 'feedType') {
            setReviewStatus(dic[key])
          }

        }
      }
    })

  }, [])

  return(
    <View>
      //输入界面
      {reviewStatus == 0 || reviewStatus == 1 && <View style={{height: 200,backgroundColor:'red'}}></View>}
      //显示界面
      {reviewStatus == 3 && <View style={{height: 200,backgroundColor:'yellow'}}></View>}
    </View>

  )
}

export default JDAgentPage