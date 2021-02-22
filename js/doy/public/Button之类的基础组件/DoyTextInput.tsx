import React, { ReactElement, useRef, useState } from "react"
import { TextInputProps, StyleProp, TextStyle, TextInput, View, TouchableOpacity, Text, ViewStyle, } from "react-native"
import { Button, ButtonProps } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { IconProps } from "react-native-vector-icons/Icon"
import Ionicons from "react-native-vector-icons/Ionicons"
import { FastImagePlaceholder } from "../../../rn/pages/经典/tools/ImagePlaceholder"
import { skin1 } from "../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../rn/public/tools/Scale"
import { img_doy } from "../../../rn/Res/icon"
import { UGText } from './DoyButton'

const sc = sc375

interface DoyTextInputProps extends TextInputProps {
  bold1?: boolean
  bold2?: boolean
  bold3?: boolean

  leftComponent?: ReactElement<any>
  rightComponent?: ReactElement<any>

  children?: any

  onlyInteger?: boolean; // 仅数字
  onlyNumbersWithDecimals?: number; // 仅数字含小数
  onlyIntegerAndLetter?: boolean; // 仅数字加字母
  onlyVisibleASCII?: boolean; // 仅可见的ASCII
  additionalAllowedCharacters?: string; // 额外允许的字符
  forbiddenCharacters?: string; // 禁止的字符
}

const textInputDefaultStyle: StyleProp<TextStyle> = { backgroundColor: 'white', width: '100%', height: sc(46), borderRadius: sc(4), marginTop: sc(12), paddingHorizontal: sc(16), }


// ————————————————————————————————————
// 基础输入框
export const DoyTextInput1 = (p: DoyTextInputProps) => {
  const { leftComponent, rightComponent } = p
  const { bold1, bold2, bold3 } = p
  const { onlyInteger, onlyNumbersWithDecimals, onlyIntegerAndLetter, onlyVisibleASCII, additionalAllowedCharacters: chars = '', forbiddenCharacters } = p
  const { onChangeText, defaultValue } = p
  const { textColor1 = '#19202C', textColor2 = '#585A5E', textColor3 = '#8E929A' } = skin1

  const { current: v } = useRef({ defaultValue })
  const [text, setText] = useState(null)

  let fontWeight = undefined
  bold1 && (fontWeight = '500')
  bold2 && (fontWeight = '600')
  bold3 && (fontWeight = '700')

  let color = textColor1
  let fontSize = sc(14)


  // 限定输入的字符
  const newChangeText = (text) => {
    // 禁用指定字符
    if (forbiddenCharacters) {
      text = text.replace(new RegExp(`[${forbiddenCharacters}]+`), '');
    }
    var reg: string = null;
    // 仅数字
    if (onlyInteger) {
      reg = `[0-9${chars}]*`;
    }
    // 仅数字含小数
    else if (onlyNumbersWithDecimals) {
      text = text.match(new RegExp(`[0-9.${chars}]*`, 'g'))?.join('') ?? '';
      reg = `^[0-9]*[.]?[0-9${chars}]{0,${onlyNumbersWithDecimals}}`;
    }
    // 仅数字加字母
    else if (onlyIntegerAndLetter) {
      reg = `[0-9A-Za-z${chars}]*`;
    }
    // 仅可见的ASCII码
    else if (onlyVisibleASCII) {
      reg = `[\x20-\x7E${chars}]*`;
    }
    if (reg) {
      text = text.match(new RegExp(reg, 'g'))?.join('') ?? '';
    }
    setText(text);

    // 回调
    onChangeText && onChangeText(text);
  }

  // Value
  let value = text;
  if (v.defaultValue != defaultValue) {
    value = v.defaultValue = defaultValue;
  }

  // 左右两边有单位
  if (leftComponent || rightComponent) {
    return (
      <View style={[textInputDefaultStyle, { alignItems: 'center', flexDirection: 'row', }, p?.style]}>
        {leftComponent}
        <TextInput {...p} style={[{ fontSize, fontWeight, color, flex: 1 }, p?.style]} value={value} onChangeText={newChangeText} />
        {rightComponent}
      </View>
    )
  }

  // 纯文本
  return <TextInput {...p} style={[textInputDefaultStyle, { fontSize, fontWeight, color, }, p?.style]} value={value} onChangeText={newChangeText} />
}


// ————————————————————————————————————
// 带眼睛的密码输入框
export const DoyTextInputPwd = (p: DoyTextInputProps) => {
  const { secureTextEntry = true, } = p
  const [selected, setSelected] = useState(secureTextEntry);

  return <DoyTextInput1
    placeholder='请输入密码'
    secureTextEntry={selected}
    keyboardType='email-address'
    onlyVisibleASCII
    rightComponent={
      <FastImagePlaceholder source={{ uri: img_doy(selected ? '显示密码@3x' : '隐藏密码@3x') }} style={{ width: sc(17), height: sc(13) }} onPress={() => {
        setSelected((!selected));
      }} />
    }
    {...p}
  />
}


// ————————————————————————————————————
// 短信验证码
export const DoyTextInputSms = (p: DoyTextInputProps & { smsButtonProps: SmsButtonProps }) => {
  const { smsButtonProps } = p
  return <DoyTextInput1 placeholder='请输入验证码' keyboardType='email-address' onlyIntegerAndLetter rightComponent={<SmsButton {...smsButtonProps} />} {...p} />
}
// 获取短信验证码按钮
type SmsButtonProps = ButtonProps & { onSmsButtonClick: (startCountdown: () => void) => void }
const SmsButton = (p: SmsButtonProps) => {
  const { onSmsButtonClick, } = p
  const { buttonStyle, titleStyle, disabledTitleStyle } = p
  const { themeColor, textColor3 } = skin1

  const [count, setCount] = useState(59)
  const [willCountdown, setWillCountdown] = useState(0)

  let title: string = '发送验证码';
  let disabled = false;
  if (willCountdown) {
    title = `${count}秒后重新获取`;
    disabled = true;
    setTimeout(() => {
      if (count == 1) {
        setCount(59);
        setWillCountdown(0);
      } else {
        setCount(count - 1);
      }
    }, 1000);
  }

  return (
    <Button
      {...p}
      type='clear'
      title={title}
      disabled={disabled}
      disabledTitleStyle={[{ color: textColor3 }, disabledTitleStyle]}
      buttonStyle={[{ padding: 0 }, buttonStyle]}
      titleStyle={[{ fontSize: sc(14), fontWeight: '600', color: themeColor }, titleStyle]}
      onPress={() => {
        onSmsButtonClick && onSmsButtonClick(() => {
          setWillCountdown(1);
        });
      }}
    />
  );
}


// ————————————————————————————————————
// 数字字母验证码输入框
export const DoyTextInputVerificationCode1 = (p: DoyTextInputProps & { codeProps: VerificationCodeProps }) => {
  const { codeProps } = p
  return <DoyTextInput1 placeholder='验证码' keyboardType='email-address' onlyIntegerAndLetter rightComponent={<VerificationCodeCP {...codeProps} />} {...p} />
}
// 数字字母验证码
type VerificationCodeProps = {
  onCodePress: (code: string) => void
  codeLength?: number //验证码长度
  style?: StyleProp<ViewStyle>
}
const VerificationCodeCP = (p: VerificationCodeProps) => {
  const [, setState] = useState({});
  const { onCodePress, style, codeLength = 4 } = p
  const selectChar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  let code = '';
  for (var i = 0; i < codeLength; i++) {
    var charIndex = Math.floor(Math.random() * selectChar.length);
    code += selectChar[charIndex];
  }
  return (
    <UGText
      style={[{
        color: 'white', backgroundColor: '#00000055',
        paddingVertical: sc(7), paddingLeft: sc(11), paddingRight: sc(8),
        borderRadius: sc(10), overflow: 'hidden',
        fontWeight: '600', fontStyle: 'italic', letterSpacing: sc(3),
      }, style]}
      onPress={() => {
        setState({})
        onCodePress && onCodePress(code);
      }}>
      {code}
    </UGText>
  );
}
