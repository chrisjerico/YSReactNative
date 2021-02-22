import React, { useState, useEffect, useRef } from 'react'
import LinearGradient from "react-native-linear-gradient"
import { View, Text, ListRenderItemInfo } from "react-native"
import { Button, Input } from "react-native-elements"
import { FlatList, TextInput } from 'react-native-gesture-handler'
import AppDefine from '../define/AppDefine'
import { SalaryModel } from '../network/Model/SalaryModel'
import { api } from '../network/NetworkRequest1/NetworkRequest1'
import { Skin1 } from '../theme/UGSkinManagers'
import { AnimationFadeView } from '../tools/animation/AnimationViews'
import { showLoading, hideLoading, showSuccess } from './UGLoadingCP'
import { UGText } from '../../../doy/public/Button之类的基础组件/DoyButton'


export interface TextFieldAlertCP {
  showTextFieldAlert?: () => void;
}

interface TextFieldAlertProps {
  c_ref: TextFieldAlertCP,
  title?: string;
  placeholder?: string;
  text?: string;
  completed?: (text: string) => void;
}

interface TextFieldAlertVars {
  text?: string;
  show?: boolean;
}


export const TextFieldAlertCP = (props: TextFieldAlertProps) => {
  const { c_ref, title, placeholder, text, completed } = props;
  const [, setState] = useState({});
  const { current: v } = useRef<TextFieldAlertVars>({});

  // 初始化
  useEffect(() => {
    c_ref && (c_ref.showTextFieldAlert = () => {
      v.show = !v.show;
      setState({});
    });
  }, []);

  return (
    <AnimationFadeView show={v.show} backgroundColor='#0004' >
      <View style={{ backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', alignItems: 'center' }}>
        <UGText style={{ marginTop: 28, textAlign: 'center', fontSize: 17.5, fontWeight: '500' }} >{title ?? '请输入绑定的真实姓名'}</UGText>
        <TextInput style={{ marginTop: 18, width: 240, height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: '#ddd', paddingHorizontal: 10, fontSize: 18 }} placeholder={placeholder ?? '请输入真实姓名'} defaultValue={text} onChangeText={(text) => {
          v.text = text;
        }} />
        <View style={{ margin: 12, marginTop: 31, flexDirection: 'row' }}>
          <Button title="关闭" buttonStyle={{ paddingHorizontal: 40, paddingVertical: 10, backgroundColor: '#f9f9f9', borderRadius: 3, borderWidth: 0.4, borderColor: '#ccc' }} titleStyle={{ color: '#444', fontSize: 18 }} onPress={() => {
            v.show = !v.show;
            setState({});
          }} />
          <View style={{ width: 20 }} />
          <Button title="确定" buttonStyle={{ paddingHorizontal: 40, paddingVertical: 10, backgroundColor: Skin1.navBarBgColor[0], borderRadius: 3, borderWidth: 0.4, borderColor: '#ccc' }} titleStyle={{ color: '#fff', fontSize: 18 }} onPress={() => {
            if (v.text?.length) {
              v.show = !v.show;
              setState({});
              completed && completed(v.text);
            }
          }} />
        </View>
      </View>
    </AnimationFadeView>
  )
}
