import React, { useEffect, useState } from "react"
import { Platform, View, Image } from "react-native"
import FastImage from "react-native-fast-image"
import { ScrollView } from "react-native-gesture-handler"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import { NSValue } from "../../../../rn/public/define/OCHelper/OCBridge/OCCall"
import { OCEventType } from "../../../../rn/public/define/OCHelper/OCBridge/OCEvent"
import { OCHelper } from "../../../../rn/public/define/OCHelper/OCHelper"
import { pop } from "../../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { showLoading, showSuccess } from "../../../../rn/public/widget/UGLoadingCP"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyButton1, DoyText12, DoyText14 } from "../../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyDropDownPicker1, getDoyDropDownPickerItems } from "../../../publicComponent/Button之类的基础组件/DoyDropDownPicker"
import { DoyTextInput1 } from "../../../publicComponent/Button之类的基础组件/DoyTextInput"

const sc = sc375

const textBgColor = '#F7F7F9'

const bankList = ['招商银行', '工商银行', '农商银行']

export const DoyPaymentEditPage = ({ setProps }: UGBasePageProps) => {

  const [type, setType] = useState<'银行卡' | '支付宝' | '微信'>('银行卡')
  const [qrCode, setQRCode] = useState('')

  useEffect(() => {
    setProps({
      navbarOpstions: { title: '设置收付款方式', }
    })
  }, [])

  let nameTitle = '账户姓名'
  type == '银行卡' && (nameTitle = '账户姓名')
  type == '支付宝' && (nameTitle = '支付宝姓名')
  type == '微信' && (nameTitle = '微信姓名')

  return <ScrollView style={{ flex: 1, padding: sc(16), }}>
    <View style={{ paddingHorizontal: sc(16), paddingVertical: sc(24), backgroundColor: 'white', borderRadius: sc(4) }}>
      <DoyText14>付款方式</DoyText14>
      <DoyDropDownPicker1 items={getDoyDropDownPickerItems(['银行卡', '支付宝', '微信'])} defaultValueAtIndex={0} style={{ backgroundColor: textBgColor }} onChangeItem={(item) => {
        const { label } = item
        setType(label)
      }} />
      <DoyText14 style={{ marginTop: sc(20) }}>{nameTitle}</DoyText14>
      <DoyTextInput1 bold1 style={{ backgroundColor: textBgColor }}>王霸胆</DoyTextInput1>
      {type == '银行卡' && <DoyText12 gray2 style={{ marginTop: sc(12) }}>提醒您：账户姓名建立后无法变更，请谨慎填写</DoyText12>}
      {type == '银行卡' && <DoyText14 style={{ marginTop: sc(20) }}>银行名称</DoyText14>}
      {type == '银行卡' && <DoyDropDownPicker1 items={getDoyDropDownPickerItems(bankList)} defaultValueAtIndex={0} style={{ backgroundColor: textBgColor }} />}
      {type == '银行卡' && <DoyText14 style={{ marginTop: sc(20) }}>银行账号</DoyText14>}
      {type == '银行卡' && <DoyTextInput1 bold1 style={{ backgroundColor: textBgColor }}>1234567890123456</DoyTextInput1>}
      {'支付宝,微信'.indexOf(type) != -1 && <FastImagePlaceholder source={{ uri: qrCode }} placeholderURL={img_doy('上传二维码@3x')} style={{ width: sc(160), aspectRatio: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: sc(24), marginBottom: sc(16) }} onPress={() => {
        if (Platform.OS) {
          // 打开原生相册
          OCHelper.call('AppDefine.shared.Window.rootViewController.presentViewController:animated:completion:', [{
            selectors: 'TZImagePickerController.alloc.initWithMaxImagesCount:delegate:[setAllowPickingVideo:][setDidFinishPickingPhotosHandle:]',
            args1: [1],
            args2: [false],
            args3: [NSValue.Block(['Object', 'Object', 'Number'], OCEventType.TZImagePickerControllerDidFinishPickingPhotosHandle)]
          }, true]);
          // 上传图片
          OCHelper.removeEvents(OCEventType.TZImagePickerControllerDidFinishPickingPhotosHandle)
          OCHelper.addEvent(OCEventType.TZImagePickerControllerDidFinishPickingPhotosHandle, ({ 0: imgs }: { 0: string[] }) => {
            if (imgs?.length) {
              showLoading()
              setTimeout(() => {
                showSuccess('修改成功！')
                setQRCode(imgs[0])
              }, 2000);
            }
          })
        } else {
          //TODO Android
        }
      }}>
        {!qrCode?.length && <DoyText12 gray2>上传收款二维码</DoyText12>}
        {!qrCode?.length ? undefined : <Image source={{ uri: img_doy('二维码logo') }} style={{ width: sc(40), aspectRatio: 1 }} />}
      </FastImagePlaceholder>}
      <DoyButton1 title='完成' containerStyle={{ marginTop: sc(24) }} onPress={() => {
        showLoading()
        setTimeout(() => {
          showSuccess('操作成功！')
          pop()
        }, 1000);
      }} />
    </View>
    <DoyText12 gray2 textAlignCenter style={{ lineHeight: sc(18), marginTop: sc(24), marginBottom: sc(70), paddingHorizontal: sc(16) }}>{`为了确保买卖双方资金安全，买卖交易皆需使用本人账号，若买家在交易过程中，打款账户与回报填写的资料不符合，造成买家未能收到币，DOY无权介入此类交易纠纷，请买家谨慎填写账户资料。`}</DoyText12>
  </ScrollView>
}