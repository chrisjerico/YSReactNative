

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
import { UGAgentApplyInfo } from "../../../redux/model/全局/UGSysConfModel";
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';

interface JDAgentPage {
  reviewStatus?: number //0,1 未提交、审核中(输入) 3 审核拒绝 （显示）
}
const JDAgentPage =({ })=>{

  const [reviewStatus, setReviewStatus] = useState<number>(0)//控制View 隐藏显示
  const [agentApplyInfo, setAgentApplyInfo] = useState<UGAgentApplyInfo>()//签到数据（全部）

   //代理申请信息
   function teamAgentApplyInfo() {
    api.team.agentApplyInfo().setCompletionBlock(({ data, msg }) => {
         setAgentApplyInfo(data)
         console.log('代理申请信息数据：=', data);
        setReviewStatus(data.reviewStatus)

    }, (err) => {
        console.log('err = ', err);
        // Toast(err.message)

    });
}
  useEffect(() => {
    teamAgentApplyInfo()
    setProps({
      navbarOpstions: { hidden: false, title: '申请代理' },
      didFocus: () => {
        AppDefine.checkHeaderShowBackButton((show) => {
          setProps({ navbarOpstions: { back: show } });
        })
      }
    })

  }, [])

  return(
    <View style={{}}>
      {/* 输入界面 */}
     {reviewStatus == 0 || reviewStatus == 1 && <View style={{height: 200,backgroundColor:'red'}}></View>}
      {/* 展示界面 */}
      {reviewStatus == 3 && <View style={{height: 200,backgroundColor:'yellow'}}></View>}
    </View>

  )
}

export default JDAgentPage