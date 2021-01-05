import { Image, Text, TextInput, TouchableWithoutFeedback, View, Switch, GestureResponderEvent } from "react-native";
import * as React from "react";
import { useState } from "react";
import { Skin1 } from "../../../public/theme/UGSkinManagers";
import { scale } from "../../../public/tools/Scale";
import { Button } from "react-native-elements";

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
        <Text style={{ fontSize: scale(24), marginTop: scale(20), marginLeft: scale(20), color: Skin1.textColor1 }} >{props.title}</Text>
        <Button title={'复制链接'} containerStyle={{ marginRight: scale(20), marginTop: scale(15), width: 100, height: 40, borderRadius: 5, overflow: 'hidden' }} titleStyle={{ color: 'white', fontSize: 13 }}
          onPress={
            (v) => {
              props.onPress(v)
            }
          } />
      </View>
      <View style={{ flexDirection: 'row', flex: 1, }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: scale(20), marginHorizontal: scale(20), color: '#1E90FF' }} >{props.content}</Text>
        </View>
        <View style={{ width: 50, alignItems: 'center', justifyContent: 'center', }}>
          <Switch
            value={swicthValue} //当开关状态改变了，一定要修改value的值，不然最终无法改变状态
            onValueChange={
              (v) => {
                setSwicthValue(v)
                props.onValueChange(v)
              }
            }
          />
        </View>
        <View style={{ width: 80, alignItems: 'center', justifyContent: 'center', }}>
          <Text style={{ fontSize: scale(24), marginRight: scale(20), color: Skin1.textColor1 }} >{'二维码'}</Text>
        </View>
      </View>
    </View>
 {/* 👇图片界面 */}
   {swicthValue && <View  style={{ height: 200, alignItems: 'center', justifyContent: 'center', width: '100%' ,}}>
      <Image style={[{ height: 200, width: 200, }]} source={{ uri: props.imgUrl}} />

    </View>}
    <View style={{ height: 8, }}></View>
  </View>

}
