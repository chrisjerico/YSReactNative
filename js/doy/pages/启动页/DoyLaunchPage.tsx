import React, { useContext, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { UGBasePageProps } from "../../../rn/pages/base/UGPage";
import { PageName } from "../../../rn/public/navigation/Navigation";
import { jumpTo, push } from "../../../rn/public/navigation/RootNavigation";
import UGSkinManagers, { skin1 } from "../../../rn/public/theme/UGSkinManagers";
import { sc375 } from "../../../rn/public/tools/Scale";
import { img_doy } from "../../../rn/Res/icon";
import { DoyButton1, DoyButton2 } from "../../publicComponent/Button之类的基础组件/DoyButton";
import { doyDefine } from "../../publicClass/define/DoyDefine";

const sc = sc375

export const DoyLaunchPage = ({ setProps, setNavbarProps }: UGBasePageProps) => {
  useEffect(() => {
    const sysConf: any = {}
    UGSkinManagers.updateSkin(sysConf).then(() => {
      setProps({ backgroundColor: skin1.backgroundColor })
    })

    if (doyDefine.token?.length) {
      jumpTo(PageName.DoyHomePage)
    }
  }, [])

  return <View style={{ flex: 1, paddingHorizontal: sc(24) }}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: img_doy('启动页logo@3x') }} style={{ width: sc(103), height: sc(138) }} />
    </View>
    <DoyButton1 title='登录钱包' onPress={() => {
      push(PageName.DoyLoginPage)
    }} />
    <DoyButton2 title='免费注册' containerStyle={{ marginBottom: sc(32) }} onPress={() => { push(PageName.DoyRegisterPage1) }} />
  </View>
}