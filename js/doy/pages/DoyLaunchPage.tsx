import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { setProps, UGBasePageProps } from "../../rn/pages/base/UGPage";
import { PageName } from "../../rn/public/navigation/Navigation";
import UGSkinManagers, { skin1 } from "../../rn/public/theme/UGSkinManagers";
import { sc540 } from "../../rn/public/tools/Scale";
import { img_doy } from "../../rn/Res/icon";

export const DoyLaunchPage = ({ setNavbarProps }: UGBasePageProps) => {
  useEffect(() => {
    const sysConf: any = {}
    UGSkinManagers.updateSkin(sysConf).then(() => {
      setProps({ backgroundColor: skin1.backgroundColor })
    })
  }, [])

  return <View style={{ alignItems: 'center' }}>
    <FastImage source={{ uri: img_doy('启动页logo', 'svg') }} style={{ width: sc540(100), height: sc540(100), backgroundColor: '#ddd' }} />
    <Text style={{ fontSize: sc540(40), textAlign: 'center' }}>DOY</Text>
    <Button title='登录钱包' buttonStyle={{ width: sc540(500) }} />
  </View>
}