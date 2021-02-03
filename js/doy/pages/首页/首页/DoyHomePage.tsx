import React, { useEffect, useRef } from "react"
import { ImageBackground, View, Text } from "react-native"
import { Button, Header } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSafeArea } from "react-native-safe-area-context"
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import BannerBlock from "../../../../rn/public/views/tars/BannerBlock"
import TouchableImage from "../../../../rn/public/views/tars/TouchableImage"
import { showError, showMessage } from "../../../../rn/public/widget/UGLoadingCP"
import { img_assets, img_doy, img_root } from "../../../../rn/Res/icon"
import { DoyAboutTotalAmountCP } from "./cp/DoyAboutTotalAmountCP"

const sc = sc375

const subTextColor = '#ffffffcc'

const navBtnInfos: { icon: string, title: string, onPress: () => void }[] = [
  {
    icon: img_doy('我要买@3x'),
    title: '我要买',
    onPress: () => { }
  }, {
    icon: img_doy('我要卖@3x'),
    title: '我要卖',
    onPress: () => { }
  }, {
    icon: img_doy('我的订单@3x'),
    title: '我的订单',
    onPress: () => { }
  }, {
    icon: img_doy('打币@3x'),
    title: '打币',
    onPress: () => { }
  }, {
    icon: img_doy('收币@3x'),
    title: '收币',
    onPress: () => { }
  }, {
    icon: img_doy('钱包记录@3x'),
    title: '钱包记录',
    onPress: () => { }
  }
]

const midBanners: {} = [{ image: img_assets('c186HeaderBgImg') }, { image: img_assets('c126HeaderBgImg') }]



export const DoyHomePage = ({ setProps }: UGBasePageProps) => {
  useEffect(() => {

  }, [])

  const { current: v } = useRef<DoyAboutTotalAmountCP>({})

  const { themeColor, navBarBgColor } = skin1

  const navBtns = navBtnInfos?.map((ele) => {
    return <View style={{ width: '33.3%', alignItems: 'center' }}>
      <FastImage source={{ uri: ele?.icon }} style={{ marginTop: sc(23), width: sc(36), aspectRatio: 1 }} resizeMode='contain' />
      <Text style={{ marginTop: sc(11), marginBottom: sc(9), fontSize: sc(14) }} >{ele?.title}</Text>
    </View>
  })

  return [<View style={{ flex: 1 }}>
    <ImageBackground source={{ uri: img_doy('首页_背景@2x') }} style={{ width: '100%', height: sc(227), }}>
      <View style={{ paddingHorizontal: sc(16) }}>
        <View style={{ flexDirection: 'row', marginTop: useSafeArea()?.top + sc(16), justifyContent: 'space-between' }}>
          <FastImage source={{ uri: img_doy('导航栏/首页_logo@3x') }} style={{ width: sc(93), height: sc(20) }} />
          <TouchableOpacity onPress={() => {
            showError('等待对接')
          }}>
            <FastImage source={{ uri: img_doy('导航栏/扫码@3x') }} style={{ width: sc(20), aspectRatio: 1 }} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ marginTop: sc(32), flexDirection: 'row', alignItems: 'center' }} onPress={() => {
          v.showAboutTotalAmountAlert && v.showAboutTotalAmountAlert()
        }}>
          <Text style={{ fontSize: sc(14), color: subTextColor }}>总资产</Text>
          <Entypo name='info-with-circle' size={sc(12)} color={subTextColor} style={{ marginLeft: sc(4) }} />
        </TouchableOpacity>
        <Text style={{ marginTop: sc(8), fontSize: sc(35), fontWeight: '700', color: 'white' }}>30910</Text>
        <View style={{ marginTop: sc(23), height: sc(1), backgroundColor: '#00000022' }} />
        <View style={{ flexDirection: 'row', marginTop: sc(16) }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={{ fontSize: sc(14), color: subTextColor }}>可动数量</Text>
            <Text style={{ marginLeft: sc(8), marginTop: sc(-3), color: 'white', fontSize: sc(18), fontWeight: '600' }}>30910</Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={{ fontSize: sc(14), color: subTextColor }}>担保数量</Text>
            <Text style={{ marginLeft: sc(8), marginTop: sc(-3), color: 'white', fontSize: sc(18), fontWeight: '600' }}>0</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
    <View style={{ paddingHorizontal: sc(16) }}>
      <View style={{ marginTop: sc(16), backgroundColor: 'white', borderRadius: sc(4), flexDirection: 'row', flexWrap: 'wrap', paddingBottom: sc(15) }}>
        {navBtns}
      </View>
      {/* 腰部广告图 */}
      <BannerBlock
        containerStyle={{ marginTop: sc(16), aspectRatio: 343 / 86 }}
        visible
        autoplayTimeout={3}
        showOnlineNum={false}
        banners={midBanners}
        renderBanner={(item, index) => {
          //@ts-ignore
          const { linkCategory, linkPosition, image } = item
          return (
            <TouchableImage
              key={index}
              pic={image}
              resizeMode={'stretch'}
              onPress={() => {

              }}
            />
          )
        }}
      />
    </View>
  </View>,
  <DoyAboutTotalAmountCP c_ref={v} />]
}