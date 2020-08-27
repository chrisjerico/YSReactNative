import React, { Component } from 'react';
import { View, Alert, Platform } from 'react-native';
import { Button, Text, Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import { UGUserCenterItem, UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import AppDefine from '../../public/define/AppDefine';
import PushHelper from '../../public/define/PushHelper';
import { connect } from 'react-redux';
import { IGlobalStateHelper } from '../../redux/store/IGlobalStateHelper';
import { UGColor } from '../../public/theme/UGThemeColor';
import { Skin1 } from '../../public/theme/UGSkinManagers';
import { OCHelper } from '../../public/define/OCHelper/OCHelper';
import { Toast } from '../../public/tools/ToastUtils';
import { UGStore } from '../../redux/store/UGStore';
import { UGBasePageProps } from '../base/UGPage';
import UGUserModel from '../../redux/model/全局/UGUserModel';


// 定义Props
export interface XBJMineProps extends UGBasePageProps<XBJMineProps> {
  dataArray?: Array<UGUserCenterItem>;
  userInfo?: UGUserModel;
}

// 设置默认Props
// UGStore.defaultGlobalProps.XBJMineProps = {
//   tabbarOpetions: { unmountOnBlur: false },
//   navbarOpstions: {
//     title: '我的',
//     backgroundColor: 'transparent',
//     hideUnderline: true,
//     rightComponent: (
//       <TouchableOpacity
//         onPress={() => {
//           PushHelper.pushUserCenterType(UGUserCenterType.站内信);
//         }}>
//         <FastImage source={{ uri: 'https://i.ibb.co/q0Pgt4B/2x.png' }} style={{ marginRight: 16, width: 20, height: 20 }} />
//       </TouchableOpacity>
//     ),
//   },
//   dataArray: [],
// };

export const XBJMinePage = (props: XBJMineProps) => {
  const { setProps } = props;
  // 获取功能按钮列表
  OCHelper.call('UGSystemConfigModel.currentConfig.userCenter').then((list: Array<UGUserCenterItem>) => {
    let dataArray = list.map(item => new UGUserCenterItem(item));
    setProps({ dataArray: dataArray });
  });

  console.log('获取用户信息');
  // 获取用户信息
  IGlobalStateHelper.updateUserInfo();


  let UserI = props.userInfo;
  let cells = props.dataArray.map(item => {
    return [
      <TouchableOpacity
        key={item.code}
        style={{ flexDirection: 'row' }}
        onPress={() => {
          PushHelper.pushUserCenterType(item.code);
        }}>
        <FastImage source={{ uri: item.logo }} style={{ margin: 10, marginLeft: 13, width: 26, height: 26 }} />
        <Text style={{ marginTop: 14, marginLeft: 6 }}>{item.name}</Text>
      </TouchableOpacity>,
      <View style={{ marginLeft: 55, height: 0.5, backgroundColor: '#AAA' }} />,
    ];
  });

  return (
    <ScrollView style={{ flex: 1, padding: 16 }} key="scrollView">
      <View style={{ padding: 16, borderRadius: 4, backgroundColor: Skin1.homeContentColor }}>
        <View style={{ flexDirection: 'row' }}>
          <Avatar source={{ uri: UserI.avatar }} rounded showEditButton size={56} onPress={() => { }} />
          <View style={{ marginLeft: 16 }}>
            <View style={{ marginTop: 4, flexDirection: 'row' }}>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>{UserI.usr}</Text>
              <LinearGradient colors={['#FFEAC3', '#FFE09A']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ marginLeft: 8, marginTop: 1, borderRadius: 3, width: 42, height: 17 }}>
                <Text style={{ marginTop: 0.5, textAlign: 'center', color: '#8F6832', fontStyle: 'italic', fontWeight: '600', fontSize: 13 }}>{UserI.curLevelGrade}</Text>
              </LinearGradient>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <Text style={{ fontSize: 12 }}>头衔：</Text>
              <Text style={{ fontSize: 12, color: UGColor.RedColor2 }}>{UserI.curLevelTitle}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: -15, marginTop: 18, flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.存款);
            }}>
            <FastImage source={{ uri: 'https://i.ibb.co/1MzcBGd/2x.png' }} style={{ width: 28, height: 21 }} />
            <Text style={{ marginTop: 11, fontSize: 12 }}>存款</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.额度转换);
            }}>
            <FastImage source={{ uri: 'https://i.ibb.co/VNm1G2s/2x.png' }} style={{ width: 28, height: 21 }} />
            <Text style={{ marginTop: 11, fontSize: 12 }}>额度转换</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.取款);
            }}>
            <FastImage source={{ uri: 'https://i.ibb.co/mJjNngx/2x.png' }} style={{ width: 28, height: 21 }} />
            <Text style={{ marginTop: 11, fontSize: 12 }}>取款</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.存款);
            }}>
            <FastImage source={{ uri: 'https://i.ibb.co/RGXm0sc/2x.png' }} style={{ width: 28, height: 21 }} />
            <Text style={{ marginTop: 11, fontSize: 12 }}>资金管理</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', borderRadius: 100 }}>
            <Text style={{ marginTop: 4, fontWeight: '500', color: UGColor.RedColor2 }}>{'¥' + (UserI.balance ? UserI.balance : '0.00')}</Text>
            <Text style={{ marginTop: 11, fontSize: 12 }}>中心钱包</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 12, flexDirection: 'row', flex: 1 }}>
        <TouchableOpacity
          containerStyle={{ padding: 12, borderRadius: 4, backgroundColor: Skin1.homeContentColor, flex: 1, marginRight: 12 }}
          onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.全民竞猜);
          }}>
          <Text style={{ marginTop: -3, fontSize: 14 }}>全员福利</Text>
          <Text style={{ marginTop: 4, fontSize: 10 }}>现金奖励等你拿</Text>
          <FastImage source={{ uri: 'https://i.ibb.co/WHXtKwK/2x.png' }} style={{ marginTop: 9, marginBottom: -1, width: 80, height: 53 }} />
        </TouchableOpacity>
        <TouchableOpacity
          containerStyle={{ padding: 12, borderRadius: 4, backgroundColor: Skin1.homeContentColor, flex: 1, marginRight: 12 }}
          onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.活动彩金);
          }}>
          <Text style={{ marginTop: -3, fontSize: 14 }}>彩金申请</Text>
          <Text style={{ marginTop: 4, fontSize: 10 }}>新手有好礼</Text>
          <FastImage source={{ uri: 'https://i.ibb.co/Jz0F2nV/2x.png' }} style={{ marginTop: 9, marginBottom: -1, width: 92, height: 53 }} />
        </TouchableOpacity>
        <TouchableOpacity
          containerStyle={{ padding: 12, borderRadius: 4, backgroundColor: Skin1.homeContentColor, flex: 1 }}
          onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.任务中心);
          }}>
          <Text style={{ marginTop: -3, fontSize: 14 }}>任务中心</Text>
          <Text style={{ marginTop: 4, fontSize: 10 }}>领取丰富大奖</Text>
          <FastImage source={{ uri: 'https://i.ibb.co/mNs6pFN/2x.png' }} style={{ marginTop: 9, marginBottom: -1, width: 92, height: 53 }} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 12, borderRadius: 4, backgroundColor: Skin1.homeContentColor }}>{cells}</View>
      <Button
        title="退出登录"
        style={{ marginTop: 12 }}
        buttonStyle={{ backgroundColor: Skin1.homeContentColor, borderRadius: 4, height: 48 }}
        titleStyle={{ color: UGColor.RedColor2 }}
        onPress={() => {
          Alert.alert('温馨提示', '确定退出账号', [
            { text: '取消', style: 'cancel' },
            {
              text: '确定',
              onPress: async () => {
                NetworkRequest1.user_logout();

                if (Platform.OS == 'ios') {
                  await OCHelper.call('UGUserModel.setCurrentUser:', []);
                  await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
                  await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]);
                  Toast('退出成功');
                } else {
                  // TODO 安卓
                }
              },
            },
          ]);
        }}
      />

      <View style={{ height: 150 }} />
    </ScrollView>
  );
}
