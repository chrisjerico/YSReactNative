import React, { useEffect, useRef, useState } from "react"
import { View, Text, ListRenderItemInfo } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AppDefine from "../../../public/define/AppDefine";
import { api } from "../../../public/network/NetworkRequest1/NetworkRequest1";
import { Skin1 } from "../../../public/theme/UGSkinManagers";
import { AnimationFadeView } from "../../../public/tools/animation/AnimationViews";
import { UGSignInHistoryModel } from "../../../redux/model/other/UGSignInHistoryModel";
import { Button } from 'react-native-elements';
import { hideLoading, showLoading } from "../../../public/widget/UGLoadingCP";
import { FlatList } from 'react-native-gesture-handler'

export interface JDSignInHistoryPage {
  showSalaryAlert?: () => void
}

interface JDSignInHistoryVars {
  list?: UGSignInHistoryModel[]
  show?: boolean
  name?:string
  checkinMoney?:string
}



export const JDSignInHistoryPage = ({ c_ref,c_name,c_money }: { c_ref: JDSignInHistoryPage,c_name:string,c_money:string }) => {
  const [, setState] = useState({})
  const { current: v } = useRef<JDSignInHistoryVars>({})

  // 初始化
  useEffect(() => {

    c_ref &&
    (c_ref.showSalaryAlert = () =>{


      if (!v.list) {
        showLoading()
        api.task.checkinHistory().setCompletionBlock(({ data }) => {
          hideLoading()
          console.log('用户签到历史：=', data);
          v.list = data
          v.show = !v.show
          setState({})

        }, (err) => {
          console.log('err = ', err);
          // Toast(err.message)
        });
      }
      else{
        v.show = !v.show
        setState({})
      }
    }
    )

  }, [])
  v.name = c_name;
  v.checkinMoney = c_money;

  return (
    <AnimationFadeView show = {v.show}>
 <LinearGradient colors={Skin1.bgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ width: AppDefine.width - 55, height: AppDefine.height - 260, borderRadius: 10, overflow: 'hidden' }}>
        <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ height: 50, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: Skin1.textColor1, fontSize: 17 }}>{'已经连续签到'+v.name+'天'}</Text>
          <Text style={{ textAlign: 'center', color: Skin1.textColor2, fontSize: 16 }}>{'累计积分'+v.checkinMoney+'分'}</Text>
        </LinearGradient>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 45 }}>
          <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 ,color: Skin1.textColor1}}>签到日期</Text>
          <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 ,color: Skin1.textColor1}}>奖励</Text>
          <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 ,color: Skin1.textColor1}}>说明</Text>
        </View>
        <View style={{ height: 0.5,}} />
        <FlatList showsVerticalScrollIndicator={false} data={v.list} renderItem={SalaryCell} keyExtractor={(pm, idx) => `key${idx}`} ListFooterComponent={<View style={{ height: 100 }} />} />
        <Button
          title="关闭"
          style={{ marginVertical: 10, marginHorizontal: 13 }}
          onPress={() => {
            v.list = undefined
            v.show = !v.show
            setState({})
          }}
        />
      </LinearGradient>
    </AnimationFadeView>
  )
}

const SalaryCell = ({ item }: ListRenderItemInfo<UGSignInHistoryModel>) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', height: 45 }}>
        <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 ,color: Skin1.textColor1}}>{item.checkinDate}</Text>
        <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 ,color: Skin1.textColor1}}>{item.integral}</Text>
        <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 ,color: Skin1.textColor1}}>{item.remark}</Text>
      </View>
      <View style={{ height: 0.5, backgroundColor: Skin1.homeContentColor }} />
    </View>
  )
}

