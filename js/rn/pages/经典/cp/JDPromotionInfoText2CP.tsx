import { Image, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import * as React from "react";
import { useState } from "react";
import { Skin1 } from "../../../public/theme/UGSkinManagers";
import { scale } from "../../../public/tools/Scale";

interface JDPromotionInfoText2CP {
content?:string,
}


export const JDPromotionInfoText2CP = (props: JDPromotionInfoText2CP)=> {

  return <View style={{
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 0,
    backgroundColor:Skin1.CLBgColor,
   borderBottomColor:Skin1.textColor3,
   borderBottomWidth:1,
  }}>
    <Text style={{ fontSize: scale(22), paddingVertical: scale(22),marginHorizontal: scale(20),color:Skin1.textColor2,textAlign:'left',}} >{props.content}</Text>
  </View>

}
