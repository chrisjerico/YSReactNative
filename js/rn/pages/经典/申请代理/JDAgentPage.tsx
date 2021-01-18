

import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import AppDefine from '../../../public/define/AppDefine';
import { pop } from '../../../public/navigation/RootNavigation';
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import { scale } from '../../../public/tools/Scale';
import { UGImageHost, useHtml5Image } from '../../../public/tools/tars';
import { Toast } from '../../../public/tools/ToastUtils';
import { showSuccess } from '../../../public/widget/UGLoadingCP';
import { UGAgentApplyInfo } from "../../../redux/model/全局/UGSysConfModel";
import { UGBasePageProps } from '../../base/UGPage';
import { JDAgentInput } from '../cp/JDAgentInput';

interface JDAgentPage {

}
const JDAgentPage = ({ route, setProps }: UGBasePageProps) => {

  const { getHtml5Image, img_platform, img_home, img_assets, img_mobileTemplate } = useHtml5Image(UGImageHost.test5)

  const [agentApplyInfo, setAgentApplyInfo] = useState<UGAgentApplyInfo>()//数据（全部）
  const [qq, setQq] = useState("")
  const [phone, setPhone] = useState("")
  const [remark, setRemark] = useState('')

  function show1(item: UGAgentApplyInfo) {
    // console.log("输出最初的字典元素: ",item); 
    console.log('1状态=', item?.reviewStatus);
    var returnStr = false;
    if (item?.reviewStatus != 3) {
      returnStr = true;
    }
    return returnStr
  }

  function show2(item: UGAgentApplyInfo) {

    console.log('2状态=', item?.reviewStatus);

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
    api.team.agentApplyInfo().useSuccess(({ data, msg }) => {
      setAgentApplyInfo(JSON.parse(JSON.stringify(data)))
    });
  }

  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: '申请代理', back: true },
      didFocus: (params) => {
        let dic = params;
        // console.log("输出最初的字典元素: "+agentApplyInfo); 
        for (var key in dic) {
          // console.log("key: " + key + " ,value: " + dic[key]);
          if (key == 'item') {
            let itemDic = dic[key];
            setAgentApplyInfo(JSON.parse(JSON.stringify(itemDic)))
            setProps()
          }
        }
      }
    })

  }, [])

  return (
    <View style={{ backgroundColor: Skin1.textColor4 }}>
      {/* 输入界面 */}
      {show1(agentApplyInfo) && <View style={{}}>
        <JDAgentInput onChangeText={(text) => setQq(text)} placeholder={"请输入QQ"}
          backgroundColor= {Skin1.CLBgColor}
          img={img_assets('usrCenter_qq')} 
          content='QQ'
          editable={agentApplyInfo?.reviewStatus == 0 ? true : false}
          inputContent={agentApplyInfo?.reviewStatus == 0 ? '' : agentApplyInfo?.qq} />
        <JDAgentInput onChangeText={(text) => setPhone(text)} placeholder={"请输入联系电话"}
          img={img_assets('phone_icon')}
          content='联系电话'
          editable={agentApplyInfo?.reviewStatus == 0 ? true : false}
          inputContent={agentApplyInfo?.reviewStatus == 0 ? '' : agentApplyInfo?.mobile} />
        <JDAgentInput onChangeText={(text) => { }} placeholder={""}
          backgroundColor= {Skin1.CLBgColor}
          img={""}
          content='申请内容'
          imgVisible={false}
          contentVisible={false}
        />

        <TextInput onChangeText={(text) => setRemark(text)}
          style={{ marginTop: scale(20), height: scale(120), marginHorizontal: scale(20), color: Skin1.textColor1, fontSize: scale(26) }}
          placeholder={'申请理由(6-30个字符必填项)'}
          multiline
          // maxLength={200}
          editable={agentApplyInfo?.reviewStatus == 0 ? true : false}>
          {agentApplyInfo?.reviewStatus == 0 ? '' : agentApplyInfo?.applyReason}
        </TextInput>
        <Button
          title="申请"
          style={{ marginTop: scale(20), marginHorizontal: scale(30) }}
          buttonStyle={{ height: scale(66), backgroundColor: showText(agentApplyInfo) ? 'gray' : Skin1.themeColor }}
          disabled={showText(agentApplyInfo)}

          onPress={() => {
            if (qq.length || phone.length) {
            }
            else {
              Toast("QQ号和手机号必须填一个")
              return
            }
            if (remark.length < 6 || remark.length > 30) {
              Toast("申请理由大于6 小于30")
              return
            }
            let params = {
              "action": "apply",
              "qq": qq,
              "phone": phone,
              "content": remark,
            }
            api.team.agentApply(qq, phone, remark).useSuccess(({ data, msg }) => {



              showSuccess(msg)
              setTimeout(() => {
                pop()
              }, 1000);

            });
          }}
        />
        {showText(agentApplyInfo) && <Text style={{ fontSize: scale(26), paddingVertical: scale(20), textAlign: 'center', color: 'red' }} >{'您已申请代理，请耐心等待工作人员审核'}</Text>}
      </View>}
      {/* 展示界面 */}
      {show2(agentApplyInfo) && <View style={{}}>
        <JDAgentInput onChangeText={(text) => { }} placeholder={""}
          img={img_assets('user_icon')} 
          content='用户'
          isInput={false}
          rightContent={agentApplyInfo?.username} />
        <JDAgentInput onChangeText={(text) => { }} placeholder={""}
          backgroundColor= {Skin1.CLBgColor}
          img={img_assets('usrCenter_qq')} 
          content='QQ'
          isInput={false}
          rightContent={agentApplyInfo?.qq} />
        <JDAgentInput onChangeText={(text) => { }} placeholder={""}
          img={img_assets('phone_icon')} 
          content='联系电话'
          isInput={false}
          rightContent={agentApplyInfo?.mobile} />
        <JDAgentInput onChangeText={(text) => { }} placeholder={""}
          backgroundColor= {Skin1.CLBgColor}
          img={img_assets('status_icon')} 
          content='申请状态'
          isInput={false}
          rightContent={'代理审核拒绝'} />
        <JDAgentInput onChangeText={(text) => { }} placeholder={""}
          img={img_assets('refused_y_icon')} 
          content='拒绝原因'
          isInput={false}
          rightContent={agentApplyInfo?.reviewResult} />
        <Button
          title="再次申请"
          style={{ marginTop: scale(20), marginHorizontal: scale(30), height: scale(66) }}
          buttonStyle={{ height: scale(66), backgroundColor: Skin1.themeColor }}
          onPress={() => {
            console.log('再次申请');
            agentApplyInfo.reviewStatus = 0;
            console.log('reviewStatus = ', agentApplyInfo.reviewStatus);
            setProps()
          }}
        />

      </View>}
      {<View style={{ backgroundColor: Skin1.textColor4 ,height:600}}/>}
    </View>

  )
}

export default JDAgentPage