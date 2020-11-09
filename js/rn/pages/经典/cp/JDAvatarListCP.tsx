import React, { useState, useEffect, useRef } from 'react'
import LinearGradient from "react-native-linear-gradient"
import { View, Text, ListRenderItemInfo } from "react-native"
import { Button, Icon } from "react-native-elements"
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import AppDefine from '../../../public/define/AppDefine'
import { SalaryModel } from '../../../public/network/Model/SalaryModel'
import { hideLoading, showLoading, showSuccess } from '../../../public/widget/UGLoadingCP'
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1'
import { AnimationFadeView, AnimationMoveView } from '../../../public/tools/animation/AnimationViews'
import { AvatarModel } from '../../../public/network/Model/SystemAvatarListModel'
import FastImage from 'react-native-fast-image'


export interface JDAvatarListCP {
  showAvatarList?: () => void;
}

interface JDAvatarListVars {
  list?: AvatarModel[]
  show?: boolean;
  selected?: AvatarModel;

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
        api.system.avatarList().setCompletionBlock(({ data: list }) => {
          hideLoading();
          v.list = list;
          v.selected = list[0];
          v.show = !v.show;
          setState({});
        });
      } else {
        v.show = !v.show;
        setState({});
      }
    });
  }, []);

  return (
    <AnimationMoveView show={v.show} direction='bottom' >
      <View style={{ flex: 1 }} />
      <LinearGradient colors={Skin1.bgColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ width: AppDefine.width, backgroundColor: '#fff' }}>
        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <FastImage source={{ uri: v.selected?.url }} style={{ width: 95, height: 95, backgroundColor: '#fff', borderRadius: 50 }} />
        </View>
        <Text style={{ marginTop: 9, textAlign: 'center' }}>头像预览</Text>
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
          <Button title="保存头像" titleStyle={{ fontSize: 14 }} buttonStyle={{ width: 100 }} onPress={() => {
            if (!v.selected) return;
            showLoading();
            api.task.changeAvatar(v.selected.filename).setCompletionBlock((res) => {
              showSuccess(res.msg);
              v.show = false;
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