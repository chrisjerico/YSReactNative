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
import { FastImagePlaceholder, ImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import BannerBlock from "../../../../rn/public/views/tars/BannerBlock"
import TouchableImage from "../../../../rn/public/views/tars/TouchableImage"
import { showError, showMessage } from "../../../../rn/public/widget/UGLoadingCP"
import { img_assets, img_doy, img_root } from "../../../../rn/Res/icon"
import { DoyText14, DoyText18, DoyText35 } from "../../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyTabbar } from "../../../publicComponent/Tabbar/DoyTabbar"
import { DoyAboutTotalAmountCP } from "./cp/DoyAboutTotalAmountCP"

const sc = sc375
const subTextColor = '#ffffffcc'

const navBtnInfos: { icon: string, title: string, onPress: () => void }[] = [
  {
    icon: img_doy('我要买@3x'),
    title: '我要买',
    onPress: () => { push(PageName.DoyWantBuyPage) }
  }, {
    icon: img_doy('我要卖@3x'),
    title: '我要卖',
    onPress: () => { push(PageName.DoyWantSellPage) }
  }, {
    icon: img_doy('我的订单@3x'),
    title: '我的订单',
    onPress: () => { push(PageName.DoyMyOrderPage) }
  }, {
    icon: img_doy('打币@3x'),
    title: '打币',
    onPress: () => { push(PageName.DoyTransferCurrencyPage) }
  }, {
    icon: img_doy('收币@3x'),
    title: '收币',
    onPress: () => { push(PageName.DoyReceiveCurrencyPage) }
  }, {
    icon: img_doy('钱包记录@3x'),
    title: '钱包记录',
    onPress: () => { push(PageName.DoyWalletRecordListPage) }
  }
]

const midBanners: {} = [{ image: img_assets('c186HeaderBgImg') }, { image: img_assets('c126HeaderBgImg') }]



export const DoyHomePage = ({ setProps }: UGBasePageProps) => {

  const { current: v } = useRef<DoyAboutTotalAmountCP>({})
  const { navBarBgColor } = skin1
  const navBtns = navBtnInfos?.map((ele) => {
    const { title, icon, onPress } = ele
    return <View style={{ width: '33.3%' }}>
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
        <FastImage source={{ uri: icon }} style={{ marginTop: sc(23), width: sc(36), aspectRatio: 1 }} resizeMode='contain' />
        <DoyText14 style={{ marginTop: sc(11), marginBottom: sc(9), }} >{title}</DoyText14>
      </TouchableOpacity>
    </View>
  })

  return [<View style={{ flex: 1 }}>
    <FastImagePlaceholder placeholderGradientColor={navBarBgColor} source={{ uri: img_doy('首页_背景@2x') }} style={{ width: '100%', height: sc(227), }}>
      <View style={{ paddingHorizontal: sc(16) }}>
        {/* 扫一扫 */}
        <View style={{ flexDirection: 'row', marginTop: useSafeArea()?.top + sc(16), justifyContent: 'space-between' }}>
          <FastImage source={{ uri: img_doy('导航栏/首页_logo@3x') }} style={{ width: sc(93), height: sc(20) }} />
          <TouchableOpacity onPress={() => {
            showError('等待对接')
          }}>
            <FastImage source={{ uri: img_doy('导航栏/扫码@3x') }} style={{ width: sc(20), aspectRatio: 1 }} />
          </TouchableOpacity>
        </View>
        {/* 总资产 */}
        <TouchableOpacity style={{ marginTop: sc(32), flexDirection: 'row', alignItems: 'center' }} onPress={() => {
          v.showAboutTotalAmountAlert && v.showAboutTotalAmountAlert()
        }}>
          <DoyText14 style={{ color: subTextColor }}>总资产</DoyText14>
          <Entypo name='info-with-circle' size={sc(12)} color={subTextColor} style={{ marginLeft: sc(4) }} />
        </TouchableOpacity>
        <DoyText35 bold3 white style={{ marginTop: sc(8), }}>30910</DoyText35>
        <View style={{ marginTop: sc(23), height: sc(1), backgroundColor: '#00000022' }} />
        <View style={{ flexDirection: 'row', marginTop: sc(16) }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <DoyText14 style={{ color: subTextColor }}>可动数量</DoyText14>
            <DoyText18 bold2 white style={{ marginLeft: sc(8), marginTop: sc(-3), }}>30910</DoyText18>
          </View>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <DoyText14 style={{ color: subTextColor }}>担保数量</DoyText14>
            <DoyText18 white bold2 style={{ marginLeft: sc(8), marginTop: sc(-3), }}>0</DoyText18>
          </View>
        </View>
      </View>
    </FastImagePlaceholder>
    <View style={{ paddingHorizontal: sc(16) }}>
      {/* 导航按钮 */}
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
    <View style={{ flex: 1 }} />
    <DoyTabbar selectedIndex={0} />
  </View>,
  <DoyAboutTotalAmountCP c_ref={v} />
  ]
}