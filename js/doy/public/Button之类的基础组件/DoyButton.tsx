import React, { ReactElement, useRef, useState } from "react";
import { StyleProp, TextInput, TextInputProps, TextProps, TextStyle, View, ViewProps, ViewStyle } from "react-native";
import { Button, ButtonProps, CheckBox, Text } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { TouchableNativeFeedback, TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { skin1 } from "../../../rn/public/theme/UGSkinManagers";
import { sc375, scale } from "../../../rn/public/tools/Scale";
import { img_doy } from "../../../rn/Res/icon";

const sc = sc375

// 背景渐变色样式
export const DoyButton1 = (p: ButtonProps & { linearGradientColors?: string[] }) => {
  const { containerStyle, buttonStyle, titleStyle, linearGradientColors } = p
  const { navBarBgColor } = skin1
  return (
    <Button title='确认'
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: linearGradientColors ?? navBarBgColor,
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      {...p}
      containerStyle={[{ marginTop: sc(16) }, containerStyle]}
      buttonStyle={[{ height: sc(48) }, buttonStyle]}
      titleStyle={[{ fontSize: sc(16), fontWeight: '600' }, titleStyle]}
    />
  )
}

// 透明背景色+描边样式
export const DoyButton2 = (p: ButtonProps) => {
  const { containerStyle, buttonStyle, titleStyle, } = p
  const { themeColor } = skin1
  return (
    <Button title='取消'
      {...p}
      containerStyle={[{ marginTop: sc(16) }, containerStyle]}
      buttonStyle={[{ height: sc(48), backgroundColor: 'transparent', borderWidth: 2, borderColor: themeColor }, buttonStyle]}
      titleStyle={[{ fontSize: sc(16), fontWeight: '600', color: themeColor, }, titleStyle]}
    />
  )
}



interface DoyCheckboxProps {
  selected?: boolean
  onClick?: (selected: boolean) => boolean
  style?: StyleProp<ViewStyle>
  title?: string
  titleProps?: DoyTextProps
}
export const DoyCheckbox1 = (p: DoyCheckboxProps) => {
  const [, setState] = useState({})

  const { onClick, titleProps, title, style } = p
  const { themeColor } = skin1
  const { current: v } = useRef({
    internalRender: false,  // 是否内部渲染
    selected: false
  })
  if (!v.internalRender) {
    v.selected = p?.selected // 从外部渲染的情况下，直接从外部取值
  }
  v.internalRender = false

  return <TouchableNativeFeedback onPress={() => {
    if (!onClick || onClick(v.selected)) {
      v.selected = !v.selected
      v.internalRender = true
      setState({})
    }
  }}>
    <View style={[{
      marginTop: sc(12), borderRadius: sc(4), overflow: 'hidden', alignItems: 'center', padding: sc(14), borderWidth: sc(2),
      borderColor: v.selected ? themeColor : 'transparent',
      backgroundColor: v.selected ? '#EAF1FF' : 'white',
    }, style]}>
      <DoyText14 {...titleProps}>{title}</DoyText14>
      {v.selected && < FastImage source={{ uri: img_doy('选择@3x') }} style={{ width: sc(17), aspectRatio: 1, position: 'absolute', right: 0 }} />}
    </View>
  </TouchableNativeFeedback>
}





interface DoyTextProps extends TextProps {
  gray1?: boolean //灰色
  gray2?: boolean //浅灰色
  white?: boolean //白色

  bold1?: boolean //小粗
  bold2?: boolean //中粗
  bold3?: boolean //大粗

  textAlignCenter?: boolean

  size10?: boolean
  size12?: boolean
  size13?: boolean
  size14?: boolean
  size15?: boolean
  size16?: boolean
  size18?: boolean
  size20?: boolean
  size28?: boolean
  size30?: boolean
  size35?: boolean
  size40?: boolean

  children?: any
}

const DoyText = (p: DoyTextProps) => {
  const { gray1, gray2, white } = p
  const { bold1, bold2, bold3 } = p
  const { textAlignCenter } = p
  const { size10, size12, size13, size14, size15, size16, size18, size20, size28, size30, size35, size40 } = p
  const { textColor1 = '#19202C', textColor2 = '#585A5E', textColor3 = '#8E929A' } = skin1

  let fontWeight = undefined
  bold1 && (fontWeight = '500')
  bold2 && (fontWeight = '600')
  bold3 && (fontWeight = '700')

  let color = textColor1
  white && (color = '#fff')
  gray2 && (color = textColor3)
  gray1 && (color = textColor2)

  let fontSize = sc(14)
  size10 && (fontSize = sc(10))
  size12 && (fontSize = sc(12))
  size13 && (fontSize = sc(13))
  size14 && (fontSize = sc(14))
  size15 && (fontSize = sc(15))
  size16 && (fontSize = sc(16))
  size18 && (fontSize = sc(18))
  size20 && (fontSize = sc(20))
  size28 && (fontSize = sc(28))
  size30 && (fontSize = sc(30))
  size35 && (fontSize = sc(35))
  size40 && (fontSize = sc(40))

  let textAlign = undefined
  textAlignCenter && (textAlign = 'center')

  return <Text {...p} style={[{ fontSize, fontWeight, color, textAlign }, p?.style]} />
}

export const DoyText10 = (p: DoyTextProps) => <DoyText {...p} size10 />
export const DoyText12 = (p: DoyTextProps) => <DoyText {...p} size12 />
export const DoyText13 = (p: DoyTextProps) => <DoyText {...p} size13 />
export const DoyText14 = (p: DoyTextProps) => <DoyText {...p} size14 />
export const DoyText15 = (p: DoyTextProps) => <DoyText {...p} size15 />
export const DoyText16 = (p: DoyTextProps) => <DoyText {...p} size16 />
export const DoyText18 = (p: DoyTextProps) => <DoyText {...p} size18 />
export const DoyText20 = (p: DoyTextProps) => <DoyText {...p} size20 />
export const DoyText28 = (p: DoyTextProps) => <DoyText {...p} size28 />
export const DoyText30 = (p: DoyTextProps) => <DoyText {...p} size30 />
export const DoyText35 = (p: DoyTextProps) => <DoyText {...p} size35 />
export const DoyText40 = (p: DoyTextProps) => <DoyText {...p} size40 />








interface DoyTextInputProps extends TextInputProps {
  bold1?: boolean
  bold2?: boolean
  bold3?: boolean

  leftComponent?: ReactElement<any>
  rightComponent?: ReactElement<any>

  children?: any
}

const textInputDefaultStyle: StyleProp<TextStyle> = { backgroundColor: 'white', width: '100%', height: sc(46), borderRadius: sc(4), marginTop: sc(12), paddingHorizontal: sc(16), }

export const DoyTextInput1 = (p: DoyTextInputProps) => {
  const { leftComponent, rightComponent } = p
  const { bold1, bold2, bold3 } = p
  const { textColor1 = '#19202C', textColor2 = '#585A5E', textColor3 = '#8E929A' } = skin1

  let fontWeight = undefined
  bold1 && (fontWeight = '500')
  bold2 && (fontWeight = '600')
  bold3 && (fontWeight = '700')

  let color = textColor1
  let fontSize = sc(14)

  // 左右两边有单位
  if (leftComponent || rightComponent) {
    return (
      <View style={[textInputDefaultStyle, { alignItems: 'center', flexDirection: 'row', }, p?.style]}>
        {leftComponent}
        <TextInput {...p} style={[{ fontSize, fontWeight, color, flex: 1 }, p?.style]} />
        {rightComponent}
      </View>
    )
  }

  // 纯文本
  return <TextInput {...p} style={[textInputDefaultStyle, { fontSize, fontWeight, color, }, p?.style]} />
}
