import { Image, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import * as React from "react";
import { useState } from "react";
import { Skin1 } from "../../../public/theme/UGSkinManagers";
import { scale } from "../../../public/tools/Scale";

interface JDAgentInput {
  placeholder?: string  //输入框提示文字
  img?: string          //最左边icon
  content?: string      //icon 右边👉文本内容
  imgVisible?: boolean  //icon 是否显示    默认true
  contentVisible?: boolean  //icon 右边👉文本内容 是否显示  默认true
  isInput?: boolean  // 最左边👉 true  TextInput   false Text 类型  默认true
  editable?:boolean  //输入框是否可编辑，默认true
  inputContent?: string      //输入框文本内容 默认‘’
  backgroundColor?:string   // 背景颜色 默认‘Skin1.textColor4’

}


export const JDAgentInput = ({ onChangeText,backgroundColor=Skin1.textColor4, placeholder, img, content,rightContent,inputContent='', imgVisible = true, contentVisible = true, isInput = true ,editable = true}: { onChangeText?: (text) => void, backgroundColor?:string,placeholder?: string, img: string, content?: string,rightContent?: string,inputContent?:string, imgVisible?: boolean, contentVisible?: boolean, isInput?: boolean ,editable?:boolean}) => {

  return <View style={{
    flexDirection: "row",
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: "#d1d0d0",
    backgroundColor:backgroundColor,
    paddingTop: 5,
  }}>
    {imgVisible && <Image style={{ height: scale(30), width: scale(30), marginLeft: scale(20), resizeMode: "stretch" }}
      source={{ uri: img }} />}
    <Text style={{ fontSize: scale(26), paddingVertical: scale(20), marginLeft: scale(20) ,color:Skin1.textColor1}} >{content}</Text>
    {contentVisible && isInput && <TextInput
      onChangeText={onChangeText}
      style={{ fontSize: scale(26), paddingVertical: scale(20), flex: 1, textAlign: 'right', paddingHorizontal: scale(20) ,color:Skin1.textColor1}}
      placeholderTextColor={Skin1.textColor3}
      placeholder={placeholder}
      editable ={editable}
       >{inputContent}</TextInput>}
    {!isInput && <Text style={{ fontSize: scale(26), paddingVertical: scale(20), flex: 1, textAlign: 'right', paddingHorizontal: scale(20) ,color:Skin1.textColor1 }} >{rightContent}</Text>}

  </View>

}
