
import React, { useEffect, useState } from "react"
import { Platform, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { UGBasePageProps } from "../../../../rn/pages/base/UGPage"
import { FastImagePlaceholder } from "../../../../rn/pages/经典/tools/ImagePlaceholder"
import { NSValue } from "../../../../rn/public/define/OCHelper/OCBridge/OCCall"
import { OCEventType } from "../../../../rn/public/define/OCHelper/OCBridge/OCEvent"
import { OCHelper } from "../../../../rn/public/define/OCHelper/OCHelper"
import { PageName } from "../../../../rn/public/navigation/Navigation"
import { push } from "../../../../rn/public/navigation/RootNavigation"
import { api } from "../../../../rn/public/network/NetworkRequest1/NetworkRequest1"
import { sc375 } from "../../../../rn/public/tools/Scale"
import { showLoading, showSuccess } from "../../../../rn/public/widget/UGLoadingCP"
import { UGStore } from "../../../../rn/redux/store/UGStore"
import { img_doy } from "../../../../rn/Res/icon"
import { DoyText12, DoyText14 } from "../../../publicComponent/Button之类的基础组件/DoyButton"

const sc = sc375

export const DoyUserInfoEditPage = ({ setProps }: UGBasePageProps) => {

  const [avatar, setAvatar] = useState('null')
  useEffect(() => {
    setProps({ navbarOpstions: { title: '编辑个人资料' } })
  }, [])

  const items = [
    {
      title: '我的头像',
      icon: avatar,
      onPress: () => {
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
                setAvatar(imgs[0])
              }, 2000);
            }
          })
        } else {
          //TODO Android
        }
      }
    }, {
      title: '我的昵称',
      content: 'Adam',
      onPress: () => { push(PageName.DoyNickNamePage) }
    }, {
      title: '会员编号',
      content: '#71bs8c',
    }, {
      title: '手机号码',
      content: '+86 15512345678',
      onPress: () => { push(PageName.DoyPhoneNumberPage1) }
    }, {
      title: '个人签名',
      onPress: () => { push(PageName.DoySelfIntroductionPage) }
    },
  ]

  const btns = items.map(({ title, icon, content, onPress }) => {
    return [
      <TouchableOpacity style={{ paddingHorizontal: sc(24), height: sc(46), flexDirection: 'row', alignItems: 'center' }} onPress={onPress}>
        <DoyText14 gray1 bold1 style={{ flex: 1 }}>{title}</DoyText14>
        {icon?.length && <FastImagePlaceholder source={{ uri: icon }} style={{ width: sc(32), aspectRatio: 1, borderRadius: sc(4) }} />}
        {content && <DoyText12 gray1 bold1>{content}</DoyText12>}
        {onPress && <FastImage source={{ uri: img_doy('更多_小@3x') }} style={{ marginLeft: sc(16), width: sc(6), height: sc(18) }} resizeMode='contain' />}
      </TouchableOpacity>,
      <View style={{ marginHorizontal: sc(24), height: sc(1), backgroundColor: '#EFF1F5' }} />
    ]
  })

  return <View style={{ flex: 1, padding: sc(16) }}>
    <View style={{ backgroundColor: 'white', borderRadius: sc(4) }}>
      {btns}
    </View>
  </View>
}