

import React, { useEffect, useRef, useState } from 'react';
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
import { UGChanglongBetRecordModel } from '../Model/UGChanglongaideModel';

interface JDBetRecordDetailPage {
  item ?: UGChanglongBetRecordModel,
}
const JDBetRecordDetailPage = ({ route, setProps }: UGBasePageProps) => {


  // console.log('route == ',route);
  // const { item } = route?.params

  let { current: v } = useRef<JDBetRecordDetailPage>( {
    item :null,
  })

  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: '注单详情', back: true },
      didFocus: (params) => {
        console.log('params == ',params);
        let dic = params;
        for (var key in dic) {
          console.log("key: " + key + " ,value: " + dic[key]);
          if (key == 'item') {
            let date = dic[key];

            if (!anyEmpty(date)) {
              console.log('item====',date.title);
              v.item = date;
            }

          }
        }
      }
    })

  }, [])

  function resultLabel() {
    let str: string;
    if (v.item?.status) {
      str = v.item?.lotteryNo;
    } else {
      str = "等待开奖";
    }
    return str;
  }

  function winAmountLabel() {
    let str: string;
    if (v.item?.status) {
      if (v.item?.isWin) {
        str = v.item?.bonus + '元';
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
    if (!anyEmpty(v?.item?.displayNumber)) {
      str = '第' + v?.item?.displayNumber + '期';
    } else {
      str = '第' + v.item?.issue + '期';
    }
    return str;
  }

  function resultMoneyLabel() {
    let str: string;
    if (v.item?.status) {
      if (v.item?.isWin) {
        str = "奖金:" + v.item?.bonus + '元';
      } else {
        str = "奖金：未中奖";
      }
    } else {
      str = "奖金：0元";
    }
    return str;
  }

  function cancelBetWith() {
    let orderNo: string = v.item?.orderNo
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



  return (
    <View style={{ backgroundColor: Skin1.textColor4 }}>
      <JDCLText title={v?.item?.title} content={issueLabel()} imgURL={v.item?.pic} />
      <JDCLInfoText title='投注时间' content={v.item?.addTime} />
      <JDCLInfoText title='投注单号' content={v.item?.orderNo} />
      <JDCLInfoText title='投注金额' content={v.item?.money + '元'} contentColor='red' />
      <JDCLInfoText title='派奖金额' content={winAmountLabel()} />
      <JDCLInfoText title='开奖号码' content={resultLabel()} contentColor='red' />
      <JDCLView title={v.item?.group_name + '-' + v.item?.play_name} content={resultMoneyLabel()} btnHide={!v.isAllowCancel} onPress={onPress} />
    </View>

  )
}

export default JDBetRecordDetailPage