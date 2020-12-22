import React, { useEffect, useRef, useState } from "react"
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AppDefine from "../../../public/define/AppDefine";
import { api } from "../../../public/network/NetworkRequest1/NetworkRequest1";
import { Skin1 } from "../../../public/theme/UGSkinManagers";
import { AnimationFadeView } from "../../../public/tools/animation/AnimationViews";
import { UGSignInHistoryModel } from "../../../redux/model/other/UGSignInHistoryModel";
import { Button } from 'react-native-elements';
import { hideLoading, showLoading } from "../../../public/widget/UGLoadingCP";


export interface JDSignInHistoryPage {
  showSalaryAlert?: () => void
}

interface JDSignInHistoryVars {
  list?: UGSignInHistoryModel[]
  show?: boolean
}



export const JDSignInHistoryPage = ({ c_ref }: { c_ref: JDSignInHistoryPage }) => {
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

  return (
    <AnimationFadeView show = {v.show}>
      <View style={{ width: AppDefine.width - 55, height: AppDefine.height - 260, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden' }}>
        <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ height: 45, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 17 }}>领取俸禄</Text>
        </LinearGradient>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 45 }}>
          <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>等级</Text>
          <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>周俸禄</Text>
          <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>月俸禄</Text>
          <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1 }}>领取</Text>
        </View>
        <View style={{ height: 0.5, backgroundColor: '#aaa' }} />

        <Button
          title="关闭"
          style={{ marginVertical: 10, marginHorizontal: 13 }}
          onPress={() => {
            v.list = undefined
            v.show = !v.show
            setState({})
          }}
        />
      </View>
    </AnimationFadeView>
  )
}


