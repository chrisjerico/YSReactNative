import React, { useEffect, useRef, useState } from "react"
import { View, Text, ListRenderItemInfo, DeviceEventEmitter } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AppDefine from "../../../public/define/AppDefine";
import { api } from "../../../public/network/NetworkRequest1/NetworkRequest1";
import { Skin1 } from "../../../public/theme/UGSkinManagers";
import { AnimationFadeView } from "../../../public/tools/animation/AnimationViews";
import { UGSignInHistoryModel } from "../../../redux/model/other/UGSignInHistoryModel";
import { Button } from 'react-native-elements';
import { hideLoading, showLoading, showMessage } from "../../../public/widget/UGLoadingCP";
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { UGStore } from "../../../redux/store/UGStore";
import SegmentedControl from "rn-segmented-control";
import { getCurrentPage } from "../../../public/navigation/RootNavigation";
import { PageName } from "../../../public/navigation/Navigation";
import { OCHelper } from "../../../public/define/OCHelper/OCHelper";


export interface JDInviteCodeGenerateCP {
  showSalaryAlert?: () => void
}

interface JDInviteCodeGenerateProps {
  c_ref: JDInviteCodeGenerateCP,
  reloadBlock?: () => void,
}

// 
interface JDSignInHistoryVars {
  show?: boolean,//是否显示
  length?: string,//邀请码长度
  number?: string,//邀请码数量
}


export const JDInviteCodeGenerateCP = (props: JDInviteCodeGenerateProps) => {
  const { c_ref, reloadBlock } = props;
  //调用sysConf
  const { inviteCode } = UGStore.globalProps.sysConf
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index: number) => {
    console.log('  选择index ==', index);
    setTabIndex(index);
  };
  const [, setState] = useState({})
  const { current: v } = useRef<JDSignInHistoryVars>({})
  // console.log('进来了=');
  // 初始化
  useEffect(() => {
    // console.log('初始化进来了=');
    c_ref &&
      (c_ref.showSalaryAlert = () => {

        if (!v.show) {
          v.show = !v.show
          setState({})
        }
        else {
          v.show = !v.show
          setState({})
        }
      }
      )

  }, [])

  function noticeSwitch() {
    if (inviteCode.noticeSwitch == '1') {
      return true;
    } else {
      return false;
    }
  }

  /**
 * 确定==》生成邀请码
 * 
 */
  function confirmAction() {
    var err: string;
    if (!v?.length?.trim()?.length) {
      err = '请输入' + inviteCode.displayWord + '长度';
    } else if (!v?.number?.trim()?.length) {
      err = '请输入' + inviteCode.displayWord + '数量';
    }

    console.log('v?.length ==', v?.length);
    console.log('v?.number ==', v?.number);
    console.log('err ==', err);

    if (err) {
      showMessage(err);
      return;
    }

    let params = {
      length: parseInt(v.length),
      count: parseInt(v.number),
      user_type: tabIndex,
    }
    api.team.generateInviteCode(params).useSuccess(({ data }) => {
      console.log('成功了');
      //通知上个页面刷新
      reloadBlock && reloadBlock()
      v.show = !v.show
      setState({})
    })
  }

  /**
* 自动生成==》生成邀请码
* 
*/
  function radomGenerateAction() {

    let params = {
      length: 4,
      count: 1,
      user_type: tabIndex,
      randomCheck: 1,
    }
    api.team.generateInviteCode(params).useSuccess(({ data }) => {
      console.log('成功了');
      //通知上个页面刷新
       //通知上个页面刷新
       reloadBlock && reloadBlock()
      v.show = !v.show
      setState({})
    })
  }


  return (
    <AnimationFadeView show={v.show} backgroundColor='#33333388'>
      <View style={{ width: AppDefine.width - 55, height: inviteCode.noticeSwitch == '1' ? 370 : 270, borderRadius: 10, overflow: 'hidden', backgroundColor: Skin1.textColor4 }}>
        <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ height: 50, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 17 }}>{inviteCode.displayWord}</Text>
        </LinearGradient>
        <View style={{ flexDirection: 'row', height: 50, marginTop: 15 }}>
          <View style={{ width: 120, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'right', color: Skin1.textColor1 }}>{inviteCode.displayWord + '类型'}</Text>
          </View>
          <View style={{ marginLeft: 20, flex: 1 }}>
            <SegmentedControl
              tabs={["会员", "代理",]}
              onChange={handleTabsChange}
              currentIndex={tabIndex}
              paddingVertical={8}
              width={120}
              containerStyle={{
                marginVertical: 8,
              }}
              textStyle={{
                fontWeight: "300",
                fontSize: 14,
              }}
              theme={Skin1.isBlack ? 'DARK' : 'LIGHT'}
            />
          </View >
        </View>

        <View style={{ flexDirection: 'row', height: 50 }}>
          <View style={{ width: 120, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'right', color: Skin1.textColor1 }}>{inviteCode.displayWord}</Text>
          </View>
          <View style={{ marginLeft: 20, flex: 1, justifyContent: 'center' }}>
            <TextInput style={{ height: 30, backgroundColor: Skin1.textColor4, marginRight: 20, borderRadius: 3, overflow: 'hidden', borderColor: Skin1.textColor3, borderWidth: 1, color: Skin1.textColor1 }}
              placeholder={'   请输入' + inviteCode.displayWord + '长度'}
              placeholderTextColor={Skin1.textColor3}
              onChangeText={(text) => {
                v.length = text;
              }}
            ></TextInput>
          </View >
        </View>

        <View style={{ flexDirection: 'row', height: 50 }}>
          <View style={{ width: 120, justifyContent: 'center', }}>
            <Text style={{ textAlign: 'right', color: Skin1.textColor1 }}>{'生成数量'}</Text>
          </View>
          <View style={{ marginLeft: 20, flex: 1, justifyContent: 'center' }}>
            <TextInput style={{ height: 30, backgroundColor: Skin1.textColor4, marginRight: 20, borderRadius: 3, overflow: 'hidden', borderColor: Skin1.textColor3, borderWidth: 1, color: Skin1.textColor1 }}
              placeholder={'   最多可生成' + inviteCode.canGenNum + inviteCode.displayWord}
              placeholderTextColor={Skin1.textColor3}
              onChangeText={(text) => {
                v.number = text;
              }}
            ></TextInput>
          </View >
        </View>

        {noticeSwitch() && <View style={{ flexDirection: 'row', height: 70, marginTop: 20 }}>
          <View style={{ width: 120, marginTop: 0 }}>
            <Text style={{ textAlign: 'right', color: Skin1.textColor1 }}>{inviteCode.displayWord + '说明'}</Text>
          </View>
          <View style={{ marginLeft: 20, flex: 1, marginTop: 0 }}>
            <Text style={{ textAlign: 'left', color: Skin1.textColor1, height: 80, marginRight: 20, }} >{inviteCode.noticeText}</Text>
          </View >
        </View>}

        <View style={{ flexDirection: 'row', height: 40, justifyContent: 'center', marginHorizontal: 20 }}>
          <View style={{ width: 90, marginHorizontal: 10, justifyContent: 'center', }}>
            <Button
              title="取消"
              style={{}}
              titleStyle={{ color: Skin1.textColor1, fontSize: 16 }}
              buttonStyle={{ backgroundColor: Skin1.textColor4, overflow: 'hidden', borderColor: Skin1.textColor1, borderWidth: 1 }}
              onPress={() => {

                v.show = !v.show
                setState({})
              }}
            />
          </View>
          <View style={{ width: 90, marginHorizontal: 10, justifyContent: 'center', }}>
            <Button
              title="自动生成"
              style={{}}
              titleStyle={{ color: Skin1.textColor1, fontSize: 16 }}
              buttonStyle={{ backgroundColor: Skin1.textColor4, overflow: 'hidden', borderColor: Skin1.textColor1, borderWidth: 1 }}
              onPress={() => {
                radomGenerateAction()
              }}
            />
          </View>
          <View style={{ width: 90, marginHorizontal: 10, justifyContent: 'center', }}>
            <Button
              title="确定"
              style={{}}
              titleStyle={{ color: 'white', fontSize: 16 }}
              buttonStyle={{ backgroundColor: Skin1.themeColor, overflow: 'hidden', borderColor: Skin1.themeColor, borderWidth: 1 }}
              onPress={() => {

                confirmAction()
              }}
            />
          </View>
        </View>


      </View>
    </AnimationFadeView>
  )
}


