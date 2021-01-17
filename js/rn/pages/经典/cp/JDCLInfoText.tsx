import { Image, ImageBackground, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import * as React from "react";
import { useState } from "react";
import { skin1, Skin1 } from "../../../public/theme/UGSkinManagers";
import { scale } from "../../../public/tools/Scale";
import { Button } from "react-native-elements";
import { Res } from "../../../Res/icon/Res";
import AppDefine from "../../../public/define/AppDefine";

interface JDCLInfoText {
  title?: string     //左边👉文本内容
  content?: string      // 右边👉文本内容
  contentColor?: string   // 内容文字颜色 默认‘Skin1.textColor1’

}


export const JDCLInfoText = (props: JDCLInfoText) => {

  return <View style={{
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    borderBottomColor: skin1.textColor3,
    borderBottomWidth: scale(1),
    marginHorizontal: scale(20),
  }}>

    <Text style={{ fontSize: scale(22), paddingVertical: scale(16), color: Skin1.textColor1 }} >{props.title}</Text>
    <Text style={{ fontSize: scale(22), paddingVertical: scale(16), flex: 1, textAlign: 'left', paddingHorizontal: scale(20), color: props.contentColor ? props.contentColor : Skin1.textColor1 }} >{props.content}</Text>

  </View>

}



interface JDCLText {
  title?: string     //左边👉文本内容
  content?: string      // 右边👉文本内容
  imgURL?: string   // 图片url

}


export const JDCLText = (props: JDCLText) => {

  return <View style={{
    flexDirection: "row",
    alignItems: "center",
    paddingTop: scale(5),
    borderBottomColor: skin1.textColor3,
    borderBottomWidth: scale(1),
    marginHorizontal: scale(20),
  }}>

    {/* 图片 */}
    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
      <Image
        defaultSource={require('./load.png')} //默认图片
        style={{
          height: scale(80),
          width: scale(80),
          marginVertical: scale(10),
          resizeMode: "stretch",
        }}
        source={{ uri: props.imgURL }} />
    </View>
    {/* 内容 */}
    <View style={[{ flexDirection: 'column', marginLeft: scale(10), }]}>
      {/* 文字1 */}
      <Text style={{ fontSize: scale(22), paddingVertical: scale(10), color: Skin1.textColor1, marginLeft: scale(18) }}>
        {props.title}
      </Text>
      {/* 文字2 */}
      <Text style={{ fontSize: scale(22), paddingVertical: scale(10), color: Skin1.textColor1, marginLeft: scale(18) }}>
        {props.content}
      </Text>
    </View>
    {/* 多余 */}
    <View style={[{ flex: 1 }]}></View>
    <Text style={{ fontSize: scale(22), paddingVertical: scale(10), color: 'red', }}>{'已中奖'}</Text>


  </View>




}


interface JDCLView {
  title?: string     //左边👉文本内容
  content?: string      // 右边👉文本内容
  onPress?:() => void, //点击
}

export const JDCLView = (props: JDCLView) => {

  return <View style={{
    flexDirection: 'column',
    alignItems: "center",
    paddingTop: scale(20),
    marginHorizontal: scale(20),
  }}>

    {/* 图片 */}

      <View style={{ alignItems: 'center', justifyContent: 'center',flexDirection: 'row' ,width:'100%'  }}>
        {/* 文字1 */}
        <Text style={{ fontSize: scale(26), paddingVertical: scale(10), color: '#FF7F50', marginLeft: scale(10) }}>
          {'我的投注'}
        </Text>
        <View style={[{ flex: 1 }]}></View>
        <Button title={'撤单'} containerStyle={{ width: 70, height: 30, borderRadius: 5, overflow: 'hidden' ,marginRight:20}} titleStyle={{ color: 'white', fontSize: 13 }}
          onPress={props.onPress} />
      </View>
      <ImageBackground style={{marginTop:10 ,borderRadius: 5, overflow: 'hidden',width:AppDefine.width - 40,height:(AppDefine.width - 40)/4.8 }} source={{ uri: Res.betDetailBg }}>
      <Text style={{marginTop:10, fontSize: scale(22), paddingVertical: scale(10), color: Skin1.textColor3, marginLeft: scale(30) }}>
          {props?.title}
        </Text>
        <Text style={{ fontSize: scale(22), color: Skin1.textColor3, marginLeft: scale(30) }}>
          {props?.content}
        </Text>
      </ImageBackground>



  </View>




}

