import { Image, Text, TextInput, TouchableWithoutFeedback, View, Switch, GestureResponderEvent, Platform } from "react-native";
import * as React from "react";
import { useState } from "react";
import { Skin1 } from "../../../public/theme/UGSkinManagers";
import { scale } from "../../../public/tools/Scale";
import { Button } from "react-native-elements";
import QRCode from 'react-native-qrcode-svg';
import { OCHelper } from "../../../public/define/OCHelper/OCHelper";
import { Toast } from "../../../public/tools/ToastUtils";
import { CMD } from "../../../public/define/ANHelper/hp/CmdDefine";
import { ANHelper } from "../../../public/define/ANHelper/ANHelper";
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'
interface JDPromotionInfoCopyCP {
  title?: string,
  content?: string,
  onPress?: (event: GestureResponderEvent) => void;
  onValueChange?: (value: boolean) => void,
  imgUrl?: string,
}


export const JDPromotionInfoCopyCP = (props: JDPromotionInfoCopyCP) => {

  const [swicthValue, setSwicthValue] = useState<boolean>(false)//控制switch

  return <View style={{
    flexDirection: 'column',
    alignItems: "center",
    paddingTop: 0,
    borderBottomColor: Skin1.textColor3,
    borderBottomWidth: 1,
  }}>
    {/* 👆的界面 */}
    <View style={{ height: 120, flexDirection: 'column', width: '100%' }}>
      <View style={{ flexDirection: "row", height: 55, justifyContent: 'space-between' }}>
        <UGText style={{ fontSize: scale(24), marginTop: scale(20), marginLeft: scale(20), color: Skin1.textColor1 }} >{props.title}</UGText>
        <Button title={'复制链接'} containerStyle={{ marginRight: scale(20), marginTop: scale(15), width: 95, height: 40, borderRadius: 5, overflow: 'hidden' }} titleStyle={{ color: 'white', fontSize: 13 }}
          onPress={
            (v) => {
              switch (Platform.OS) {
                case 'ios':
                  OCHelper.call('UIPasteboard.generalPasteboard.setString:', [props.content])
                  break
                case 'android':
                  // TODO Andoid 复制 title 到粘贴板
                  ANHelper.callAsync(CMD.COPY_TO_CLIPBOARD, { value: props.content })
                  break
              }
              Toast('复制成功')
              if (props.onPress) {
                props.onPress(v)
              }

            }
          } />
      </View>
      <View style={{ flexDirection: 'row', flex: 1, }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <UGText style={{ fontSize: scale(20), marginHorizontal: scale(20), color: '#1E90FF' }} >{props.content}</UGText>
        </View>
        <View style={{ width: 50, alignItems: 'center', justifyContent: 'center', }}>
          <Switch
            value={swicthValue} //当开关状态改变了，一定要修改value的值，不然最终无法改变状态
            onValueChange={
              (v) => {
                setSwicthValue(v)
                if (props.onValueChange) {
                  props.onValueChange(v)
                }

              }
            }
          />
        </View>
        <View style={{ width: 80, alignItems: 'center', justifyContent: 'center', }}>
          <UGText style={{ fontSize: scale(24), marginRight: scale(20), color: Skin1.textColor1 }} >{'二维码'}</UGText>
        </View>
      </View>
    </View>
    {/* 👇图片界面 */}
    {swicthValue && <View style={{ height: 200, alignItems: 'center', justifyContent: 'center', width: '100%', }}>
      {/* <Image style={[{ height: 190, width: 190, }]} source={{ uri: props.imgUrl}} /> */}
      <QRCode
        value={props.imgUrl}
        size={190}
        ecl=  {"Q"}
      />

    </View>}
    <View style={{ height: 8, }}></View>
  </View>

}
