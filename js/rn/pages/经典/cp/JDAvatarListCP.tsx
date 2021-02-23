import React, { useState, useEffect, useRef } from 'react'
import LinearGradient from "react-native-linear-gradient"
import { View, Text, ListRenderItemInfo, Platform } from "react-native"
import { Button, Icon } from "react-native-elements"
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import AppDefine from '../../../public/define/AppDefine'
import { SalaryModel } from '../../../public/network/Model/SalaryModel'
import { hideLoading, showLoading, showSuccess } from '../../../public/widget/UGLoadingCP'
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1'
import { AnimationFadeView, AnimationMoveView } from '../../../public/tools/animation/AnimationViews'
import { AvatarModel, AvatarSettingModel } from '../../../public/network/Model/SystemAvatarListModel'
import FastImage from 'react-native-fast-image'
import { UGStore } from '../../../redux/store/UGStore'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { OCHelper } from '../../../public/define/OCHelper/OCHelper'
import { OCEventType } from '../../../public/define/OCHelper/OCBridge/OCEvent'
import { NSValue } from '../../../public/define/OCHelper/OCBridge/OCCall'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'


export interface JDAvatarListCP {
  showAvatarList?: () => void;
}

interface JDAvatarListVars {
  list?: AvatarModel[];
  show?: boolean;
  selected?: AvatarModel;// 当前选中的头像
  isAcceptUpload?: boolean;// 是否允许上传图片

  fastList?: FlatList<AvatarModel>;
  offsetX?: number;
}

export const JDAvatarListCP = ({ c_ref }: { c_ref: JDAvatarListCP }) => {
  const [, setState] = useState({});
  const { current: v } = useRef<JDAvatarListVars>({ offsetX: 0 });

  // 初始化
  useEffect(() => {
    c_ref && (c_ref.showAvatarList = () => {
      if (!v.list) {
        // 俸禄数据
        showLoading();
        api.user.getAvatarSetting().useSuccess(async ({ data }) => {
          hideLoading();
          if (Platform.OS == 'ios') {
            const iosCanUpload = await OCHelper.call('AppDefine.shared.isCanUploadAvatar')
            v.isAcceptUpload = iosCanUpload && data?.isAcceptUpload;
          } else {
            v.isAcceptUpload = data?.isAcceptUpload;
          }
          v.list = data?.publicAvatarList;
          v.show = true;
          setState({});
        });
      } else {
        v.show = !v.show;
        setState({});
      }
    });
  }, []);

  return (
    <AnimationMoveView show={v.show} direction='bottom' backgroundColor='#0005' >
      <View style={{ flex: 1 }} />
      <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ width: AppDefine.width, backgroundColor: '#fff' }}>
        {v.isAcceptUpload != false && (
          <View style={{ marginTop: 6, marginLeft: 5, flexDirection: 'row' }}>
            <Button title='选择头像' buttonStyle={{ marginTop: 0.5, backgroundColor: 'transparent' }} titleStyle={{ fontSize: 14, color: UGColor.RedColor3 }} />
            <Button title='上传头像' buttonStyle={{ backgroundColor: 'transparent' }} titleStyle={{ fontSize: 14 }} onPress={() => {
              if (Platform.OS) {
                // 打开原生相册
                OCHelper.call('UGNavigationController.current.presentViewController:animated:completion:', [{
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
                    api.user.uploadAvatar(imgs[0]).useSuccess(({ data, msg }) => {
                      showSuccess(msg)
                      v.show = false;
                      setState({})
                      if (data?.isReview) {
                        UGStore.dispatch({ type: 'merge', userInfo: { avatar: imgs[0] } });
                      }
                    });
                  }
                })
              } else {
                //TODO Android
              }
            }} />
          </View>
        )}
        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <FastImage source={{ uri: v.selected?.url ?? UGStore.globalProps?.userInfo?.avatar }} style={{ width: 95, height: 95, backgroundColor: '#fff', borderRadius: 50 }} />
        </View>
        <UGText style={{ marginTop: 9, textAlign: 'center', color: '#fff' }}>头像预览</UGText>
        <View style={{ marginTop: 12, flexDirection: 'row', height: 100, paddingHorizontal: 12 }}>
          <Button
            buttonStyle={{ marginTop: 14, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 0, backgroundColor: '#00000000', }}
            icon={{ name: 'angle-left', type: 'font-awesome', color: '#fff', size: 30 }}
            onPress={() => {
              v.fastList.scrollToOffset({ animated: true, offset: Math.max(v.offsetX - CellWidth * 3, 0) });
            }} />
          <FlatList
            ref={(list) => v.fastList = list}
            horizontal={true}
            data={v.list}
            onScroll={({ nativeEvent: { contentOffset, contentSize } }) => {
              v.offsetX = contentOffset.x;
            }}
            renderItem={({ item }) => AvatarCell(item, () => {
              v.selected = item;
              setState({});
            })}
            keyExtractor={(pm, idx) => `key${idx}`}
          />
          <Button
            buttonStyle={{ marginTop: 14, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 0, backgroundColor: '#00000000', }}
            icon={{ name: 'angle-right', type: 'font-awesome', color: '#fff', size: 30 }}
            onPress={() => {
              v.fastList.scrollToOffset({ animated: true, offset: Math.min(v.offsetX + CellWidth * 3, v.list?.length * CellWidth) });
            }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button title="保存头像" titleStyle={{ fontSize: 14 }} buttonStyle={{ width: 100, backgroundColor:UGColor.RedColor3 }} onPress={() => {
            if (!v.selected) return;
            showLoading();
            api.user.updateAvatar(v.selected.id).useSuccess((res) => {
              showSuccess(res.msg);
              v.show = false;
              UGStore.dispatch({ type: 'merge', userInfo: { avatar: v.selected.url } });
              setState({})
            })
          }} />
          <Button title="取消" titleStyle={{ fontSize: 14 }} buttonStyle={{ width: 100, backgroundColor: '#bbb' }} onPress={() => {
            v.show = false;
            setState({});
          }} />
        </View>
        <View style={{ height: 100 }} />
      </LinearGradient>
    </AnimationMoveView>
  )
}

const CellWidth = 80;
const AvatarCell = (item: AvatarModel, onPress: () => void) => {
  return (
    <TouchableOpacity style={{ padding: 5 }} onPress={onPress}>
      <FastImage source={{ uri: item.url }} style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#ddd' }} />
    </TouchableOpacity>
  )
}
