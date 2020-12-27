

import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import AppDefine from '../../../public/define/AppDefine';
import { pop } from '../../../public/navigation/RootNavigation';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { scale } from '../../../public/tools/Scale';
import { Toast } from '../../../public/tools/ToastUtils';
import { showSuccess } from '../../../public/widget/UGLoadingCP';
import { UGAgentApplyInfo } from "../../../redux/model/全局/UGSysConfModel";
import { setProps } from '../../base/UGPage';
import { JDAgentInput } from './JDAgentInput';
interface JDAgentPage {

}
const JDAgentPage = ({ }) => {


  const [agentApplyInfo, setAgentApplyInfo] = useState<UGAgentApplyInfo>()//数据（全部）
  const [qq, setQq] = useState("")
  const [phone, setPhone] = useState("")
  const [remark, setRemark] = useState('')

  function show1(item: UGAgentApplyInfo) {
    var returnStr = false;
    if (item?.reviewStatus == 0 || item?.reviewStatus == 1) {
       returnStr = true;
    }
    return returnStr
  }

  function show2(item: UGAgentApplyInfo) {
    var returnStr = false;
    if (item?.reviewStatus == 3) {
      returnStr = true;
    }
    return returnStr
  }

  function showText(item: UGAgentApplyInfo) {
    var returnStr = false;
    if (item?.reviewStatus != 0) {
       returnStr = true;
    }
    return returnStr
  }



  //代理申请信息
  function teamAgentApplyInfo() {
    api.team.agentApplyInfo().setCompletionBlock(({ data, msg }) => {
      setAgentApplyInfo(data)
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

  return (
    <View style={{ backgroundColor: Skin1.textColor4 }}>
      {/* 输入界面 */}
      {show1(agentApplyInfo) && <View style={{}}>
        <JDAgentInput onChangeText={(text) => setQq(text)} placeholder={"请输入QQ"}
          img={"https://appstatic.guolaow.com/assets/usrCenter_qq.png"}
          content='QQ'
          editable={agentApplyInfo.reviewStatus == 0 ? true : false}
          inputContent={agentApplyInfo.reviewStatus == 0 ? '' : agentApplyInfo.qq} />
        <JDAgentInput onChangeText={(text) => setPhone(text)} placeholder={"请输入联系电话"}
          img={"https://appstatic.guolaow.com/assets/phone_icon.png"}
          content='联系电话'
          editable={agentApplyInfo.reviewStatus == 0 ? true : false}
          inputContent={agentApplyInfo.reviewStatus == 0 ? '' : agentApplyInfo.mobile} />
        <JDAgentInput onChangeText={(text) => { }} placeholder={""}
          img={""}
          content='申请内容'
          imgVisible={false}
          contentVisible={false}
        />

        <TextInput onChangeText={(text) => setRemark(text)}
          style={{ marginTop: scale(20), height: scale(120), marginHorizontal: scale(20), color: Skin1.textColor1,fontSize:scale(26) }}
          placeholder={'申请理由(6-30个字符必填项)'}
          multiline
          // maxLength={200}
          editable={agentApplyInfo.reviewStatus == 0 ? true : false}>
          {agentApplyInfo.reviewStatus == 0 ? '' : agentApplyInfo.applyReason}
        </TextInput>
        <Button
          title="申请"
          style={{ marginTop: scale(20), marginHorizontal: scale(30) }}
          buttonStyle={{height:scale(66)}}
          onPress={() => {
            if (qq.length || phone.length) {
            }
            else {
              Toast("QQ号和手机号必须填一个")
            }
            if (remark.length < 6 || remark.length > 30) {
              Toast("申请理由大于6 小于30")
            }
            let params = {
              "action": "apply",
              "qq":qq,
              "phone": phone,
              "content": remark,
            }
            api.team.agentApply(qq,phone,remark).setCompletionBlock(({ data, msg }) => {
              showSuccess(msg)
              pop()
            });


          }}
        />
        {showText(agentApplyInfo) && <Text style={{ fontSize: scale(26), paddingVertical: scale(20), textAlign: 'center', color: 'red' }} >{'您已申请代理，请耐心等待工作人员审核'}</Text>}
      </View>}
      {/* 展示界面 */}
      {show2(agentApplyInfo) && <View style={{}}>
        <JDAgentInput onChangeText={(text) => { }} placeholder={""}
          img={"https://appstatic.guolaow.com/assets/user_icon.png"}
          content='用户'
          isInput={false}
          rightContent={agentApplyInfo.username} />
        <JDAgentInput onChangeText={(text) => { }} placeholder={""}
          img={"https://appstatic.guolaow.com/assets/usrCenter_qq.png"}
          content='QQ'
          isInput={false}
          rightContent={agentApplyInfo.qq} />
        <JDAgentInput onChangeText={(text) => { }} placeholder={""}
          img={"https://appstatic.guolaow.com/assets/phone_icon.png"}
          content='联系电话'
          isInput={false}
          rightContent={agentApplyInfo.mobile} />
        <JDAgentInput onChangeText={(text) => { }} placeholder={""}
          img={"https://appstatic.guolaow.com/assets/status_icon.png"}
          content='申请状态'
          isInput={false}
          rightContent={'代理审核拒绝'} />
        <JDAgentInput onChangeText={(text) => { }} placeholder={""}
          img={"https://appstatic.guolaow.com/assets/refused_y_icon.png"}
          content='拒绝原因'
          isInput={false}
          rightContent={agentApplyInfo.reviewResult} />
        <Button
          title="再次申请"
          style={{ marginTop: scale(20), marginHorizontal: scale(30), height:scale(66) }}
          onPress={() => {
            agentApplyInfo.reviewStatus = 0;
            setAgentApplyInfo(agentApplyInfo)
          }}
        />

      </View>}
    </View>

  )
}

export default JDAgentPage