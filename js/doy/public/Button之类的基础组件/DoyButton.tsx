import React from "react";
import { TextProps, View } from "react-native";
import { Button, ButtonProps, Text } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { skin1 } from "../../../rn/public/theme/UGSkinManagers";
import { sc375 } from "../../../rn/public/tools/Scale";

const sc = sc375

// 背景渐变色样式
export const DoyButton1 = (p: ButtonProps & { linearGradientColors?: string[] }) => {
  const { titleStyle, buttonStyle, linearGradientColors } = p
  const { navBarBgColor } = skin1
  return (
    <Button title='确认'
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: linearGradientColors ?? navBarBgColor,
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      containerStyle={{ marginTop: sc(16) }}
      {...p}
      titleStyle={[{ fontSize: sc(16), fontWeight: '600' }, titleStyle]}
      buttonStyle={[{ height: sc(48) }, buttonStyle]}
    />
  )
}

// 透明背景色+描边样式
export const DoyButton2 = (p: ButtonProps) => {
  const { themeColor } = skin1
  return (
    <Button title='取消'
      titleStyle={{ fontSize: sc(16), fontWeight: '600', color: themeColor, }}
      containerStyle={{ marginTop: sc(16) }}
      {...p}
      buttonStyle={[{ height: sc(48), backgroundColor: 'transparent', borderWidth: 2, borderColor: themeColor }, p?.buttonStyle]}
    />
  )
}



interface DoyText1Props extends TextProps {
  gray1?: boolean //灰色
  gray2?: boolean //浅灰色
  white?: boolean //白色

  bold1?: boolean //小粗
  bold2?: boolean //中粗
  bold3?: boolean //大粗

  children?: any
}

const DoyText = (p: DoyText1Props & {
  size12?: boolean
  size13?: boolean
  size14?: boolean
  size15?: boolean
  size16?: boolean
  size18?: boolean
  size20?: boolean
  size28?: boolean
  size35?: boolean
  size40?: boolean
}) => {
  const { gray1, gray2, white } = p
  const { bold1, bold2, bold3 } = p
  const { size12, size13, size14, size15, size16, size18, size20, size28, size35, size40 } = p
  const { textColor1 = '#19202C', textColor2 = '#585A5E', textColor3 = '#8E929A' } = skin1

  let fontWeight = undefined
  bold1 && (fontWeight = '500')
  bold2 && (fontWeight = '600')
  bold3 && (fontWeight = '700')

  let color = textColor1
  white && (color = '#fff')
  gray2 && (color = textColor3)
  gray1 && (color = textColor2)

  let fontSize = undefined
  size12 && (fontSize = sc(12))
  size13 && (fontSize = sc(13))
  size14 && (fontSize = sc(14))
  size15 && (fontSize = sc(15))
  size16 && (fontSize = sc(16))
  size18 && (fontSize = sc(18))
  size20 && (fontSize = sc(20))
  size28 && (fontSize = sc(28))
  size35 && (fontSize = sc(35))
  size40 && (fontSize = sc(40))

  return <Text {...p} style={[{ fontSize, color, fontWeight }, p?.style]} />
}

export const DoyText12 = (p: DoyText1Props) => <DoyText {...p} size12 />
export const DoyText13 = (p: DoyText1Props) => <DoyText {...p} size13 />
export const DoyText14 = (p: DoyText1Props) => <DoyText {...p} size14 />
export const DoyText15 = (p: DoyText1Props) => <DoyText {...p} size15 />
export const DoyText16 = (p: DoyText1Props) => <DoyText {...p} size16 />
export const DoyText18 = (p: DoyText1Props) => <DoyText {...p} size18 />
export const DoyText20 = (p: DoyText1Props) => <DoyText {...p} size20 />
export const DoyText28 = (p: DoyText1Props) => <DoyText {...p} size28 />
export const DoyText35 = (p: DoyText1Props) => <DoyText {...p} size35 />
export const DoyText40 = (p: DoyText1Props) => <DoyText {...p} size40 />
