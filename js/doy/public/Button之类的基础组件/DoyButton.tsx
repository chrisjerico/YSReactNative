import React from "react";
import { Button, ButtonProps } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { skin1 } from "../../../rn/public/theme/UGSkinManagers";
import { sc375 } from "../../../rn/public/tools/Scale";

const sc = sc375

// 背景渐变色样式
export const DoyButton1 = (p: ButtonProps) => {
  return (
    <Button title='确认'
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: skin1.navBarBgColor,
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      containerStyle={{ marginTop: sc(16) }}
      titleStyle={{ fontSize: sc(16), fontWeight: '600' }}
      {...p}
      buttonStyle={[{ height: sc(48) }, p?.buttonStyle]}
    />
  )
}

// 透明背景色+描边样式
export const DoyButton2 = (p: ButtonProps) => {
  const { themeColor } = skin1
  return (
    <Button title='取消'
      titleStyle={{ fontSize: sc(16), fontWeight: '600', color: themeColor, }}
      {...p}
      buttonStyle={[{ marginTop: sc(16), height: sc(48), backgroundColor: 'transparent', borderWidth: 2, borderColor: themeColor }, p?.buttonStyle]}
    />
  )
}