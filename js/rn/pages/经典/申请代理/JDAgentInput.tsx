import { Image, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import * as React from "react";
import { useState } from "react";
import { Skin1 } from "../../../public/theme/UGSkinManagers";

interface JDAgentInput {
  placeholder?: string  //输入框提示文字
  img?: string          //最左边icon
  content?: string      //icon 右边👉文本内容
  imgVisible?: boolean  //icon 是否显示    默认true
  contentVisible?: boolean  //icon 右边👉文本内容 是否显示  默认true
  isInput?: boolean  // 最左边👉 true  TextInput   false Text 类型  默认true
  editable?:boolean  //输入框是否可编辑，默认true
  inputContent?: string      //输入框文本内容 默认‘’
}


export const JDAgentInput = ({ onChangeText, placeholder, img, content,rightContent,inputContent='', imgVisible = true, contentVisible = true, isInput = true ,editable = true}: { onChangeText?: (text) => void, placeholder?: string, img: string, content?: string,rightContent?: string,inputContent?:string, imgVisible?: boolean, contentVisible?: boolean, isInput?: boolean ,editable?:boolean}) => {

  return <View style={{
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d0d0",
    backgroundColor:Skin1.textColor4,
    paddingTop: 0,
  }}>
    {imgVisible && <Image style={{ height: 20, width: 20, marginLeft: 20, resizeMode: "stretch" }}
      source={{ uri: img }} />}
    <Text style={{ fontSize: 15, paddingVertical: 20, marginLeft: 20 ,color:Skin1.textColor1}} >{content}</Text>
    {contentVisible && isInput && <TextInput
      maxLength={15}
      onChangeText={onChangeText}
      style={{ fontSize: 15, paddingVertical: 20, flex: 1, textAlign: 'right', paddingHorizontal: 20 ,color:Skin1.textColor1}}
      placeholderTextColor={Skin1.textColor3}
      placeholder={placeholder}
      editable ={editable}
       >{inputContent}</TextInput>}
    {!isInput && <Text style={{ fontSize: 15, paddingVertical: 20, flex: 1, textAlign: 'right', paddingHorizontal: 20 ,color:Skin1.textColor1 }} >{rightContent}</Text>}

  </View>

}
