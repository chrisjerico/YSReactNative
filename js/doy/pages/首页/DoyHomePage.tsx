import React, { useEffect } from "react"
import { ImageBackground, View } from "react-native"
import { Button, Header } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { useSafeArea } from "react-native-safe-area-context"
import { UGBasePageProps } from "../../../rn/pages/base/UGPage"
import { skin1 } from "../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../rn/public/tools/Scale"
import { img_doy } from "../../../rn/Res/icon"

const sc = sc375

export const DoyHomePage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {

  }, [])

  const { themeColor, navBarBgColor } = skin1

  return <View style={{ flex: 1 }}>
    <ImageBackground source={{ uri: img_doy('首页_背景@2x') }} style={{ width: '100%', height: sc(227), }}>
      <View style={{ paddingHorizontal: sc(16) }}>
        <View style={{ flexDirection: 'row', marginTop: useSafeArea()?.top + sc(16) }}>
          <FastImage source={{ uri: img_doy('导航栏/首页_logo@3x') }} style={{ width: sc(93), height: sc(20) }} />
          <Button icon={<FastImage source={{ uri: img_doy('导航栏/扫码@3x') }} />} />
        </View>
      </View>
    </ImageBackground>
  </View>
}