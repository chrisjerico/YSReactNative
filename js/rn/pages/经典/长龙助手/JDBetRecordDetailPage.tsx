

import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import AppDefine from '../../../public/define/AppDefine';
import { pop } from '../../../public/navigation/RootNavigation';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { anyEmpty } from '../../../public/tools/Ext';
import { scale } from '../../../public/tools/Scale';
import { Toast } from '../../../public/tools/ToastUtils';
import { showSuccess } from '../../../public/widget/UGLoadingCP';
import { UGAgentApplyInfo } from "../../../redux/model/全局/UGSysConfModel";
import { UGBasePageProps } from '../../base/UGPage';
import { JDAgentInput } from '../cp/JDAgentInput';
import { JDCLInfoText, JDCLText, JDCLView } from '../cp/JDCLInfoText';

interface JDBetRecordDetailPage {
  showBackButton: Boolean,
  item: any
}
const JDBetRecordDetailPage = ({ route, setProps }: UGBasePageProps) => {

  const { item, showBackButton } = route?.params

  const  isAllowCancel:boolean = item.isAllowCancel;


  function resultLabel() {
    let str: string;
    if (item.status) {
      str = item.lotteryNo;
    } else {
      str = "等待开奖";
    }
    return str;
  }

  function winAmountLabel() {
    let str: string;
    if (item.status) {
      if (item.isWin) {
        str = item.bonus + '元';
      } else {
        str = "未中奖";
      }
    } else {
      str = "0元";
    }
    return str;
  }


  function issueLabel() {
    let str: string;
    if (!anyEmpty(item.displayNumber)) {
      str = '第' + item.displayNumber + '期';
    } else {
      str = '第' + item.issue + '期';
    }
    return str;
  }

  function resultMoneyLabel() {
    let str: string;
    if (item.status) {
      if (item.isWin) {
        str = "奖金:" + item.bonus + '元';
      } else {
        str = "奖金：未中奖";
      }
    } else {
      str = "奖金：0元";
    }
    return str;
  }

  function cancelBetWith() {
    let orderNo: string = item.orderNo
    console.log('orderNo=============================',orderNo);
    api.user.cancelBet(orderNo).useSuccess(({ data, msg }) => {
      console.log('useSuccess=============================');
      
      showSuccess(msg)
      pop();

    });
  }

  function cancelBet() {
    Alert.alert('温馨提示', '您确定要撤销该注单吗？', [
      {
        text: '取消',
      },
      {
        text: '确定',
        onPress: () => {
          cancelBetWith()
        },
      },
    ])
  }

  const onPress = () => {
    cancelBet()
  }

  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: '注单详情RN', back: true },
      didFocus: (params) => {

      }
    })

  }, [])

  return (
    <View style={{ backgroundColor: Skin1.textColor4 }}>
      <JDCLText title={item.title} content={issueLabel()} imgURL={item.pic} />
      <JDCLInfoText title='投注时间' content={item.addTime} />
      <JDCLInfoText title='投注单号' content={item.orderNo} />
      <JDCLInfoText title='投注金额' content={item.money + '元'} contentColor='red' />
      <JDCLInfoText title='派奖金额' content={winAmountLabel()} />
      <JDCLInfoText title='开奖号码' content={resultLabel()} contentColor='red' />
      <JDCLView title={item.group_name + '-' + item.play_name} content={resultMoneyLabel()} btnHide={!isAllowCancel} onPress={onPress} />
    </View>

  )
}

export default JDBetRecordDetailPage