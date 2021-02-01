import React, { useContext, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { setProps, UGBasePageProps } from "../../../rn/pages/base/UGPage";
import { PageName } from "../../../rn/public/navigation/Navigation";
import { push } from "../../../rn/public/navigation/RootNavigation";
import UGSkinManagers, { skin1 } from "../../../rn/public/theme/UGSkinManagers";
import { sc375 } from "../../../rn/public/tools/Scale";
import { img_doy } from "../../../rn/Res/icon";

const sc = sc375

export const DoyLaunchPage = ({ setNavbarProps }: UGBasePageProps) => {
  useEffect(() => {
    const sysConf: any = {}
    UGSkinManagers.updateSkin(sysConf).then(() => {
      setProps({ backgroundColor: skin1.backgroundColor })
    })
  }, [])

  const { themeColor, navBarBgColor } = skin1

  return <View style={{ alignItems: 'center', flex: 1 }}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Image source={{ uri: img_doy('注册页 logo@3x') }} style={{ width: sc(96), aspectRatio: 1, backgroundColor: '#ddd' }} />
      <Text style={{ marginTop: sc(10), fontSize: sc(40), textAlign: 'center' }}>DOY</Text>
    </View>
    <Button title='登录钱包'
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: navBarBgColor,
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      buttonStyle={{ width: sc(327), height: sc(48), backgroundColor: themeColor }}
      onPress={() => { push(PageName.DoyLoginPage) }}
    />
    <Button title='免费注册'
      buttonStyle={{ marginTop: sc(16), width: sc(327), height: sc(48), backgroundColor: 'transparent', borderWidth: 2, borderColor: themeColor, marginBottom: sc(32) }}
      titleStyle={{ color: themeColor, fontSize: sc(16), fontWeight: '600' }}
      onPress={() => { push(PageName.DoyRegisterPage) }}
    />
  </View>
}