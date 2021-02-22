import { Image, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import * as React from "react";
import { useState } from "react";
import { Skin1 } from "../../../public/theme/UGSkinManagers";
import { scale } from "../../../public/tools/Scale";
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface JDPromotionInfoText1CP {
  title?:string,
content?:string,
textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify',

}


export const JDPromotionInfoText1CP = (props: JDPromotionInfoText1CP)=> {

  return <View style={{
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 0,
   borderBottomColor:Skin1.textColor3,
   borderBottomWidth:1,
  }}>
    <UGText style={{ fontSize: scale(24), paddingVertical: scale(20), marginLeft: scale(20) ,color:Skin1.textColor1}} >{props.title}</UGText>
    <UGText style={{ fontSize: scale(24), paddingVertical: scale(20),marginHorizontal: scale(20),flex:1 ,color:Skin1.textColor1,textAlign: props.textAlign?props.textAlign:'right',}} >{props.content}</UGText>
  </View>

}
