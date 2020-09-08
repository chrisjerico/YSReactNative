import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Alert, Platform, Text } from 'react-native';
import UGBasePage from '../base/UGBasePage';
import { ZHTYMineProps, ZHTYMineStateToProps } from './ZHTYMineProps';
import { OCHelper } from '../../public/define/OCHelper/OCHelper';
import { UGUserCenterItem, UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import { IGlobalStateHelper } from '../../redux/store/IGlobalStateHelper';
import PushHelper from '../../public/define/PushHelper';
import FastImage from 'react-native-fast-image';
import { Skin1 } from '../../public/theme/UGSkinManagers';
import { Avatar, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { UGColor } from '../../public/theme/UGThemeColor';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import { Toast } from '../../public/tools/ToastUtils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppDefine from '../../public/define/AppDefine';
import { Res } from '../../Res/icon/Resources';
import {ANHelper} from "../../public/define/ANHelper/ANHelper";
import {CMD} from "../../public/define/ANHelper/hp/CmdDefine";
import {NA_DATA} from "../../public/define/ANHelper/hp/DataDefine";
import {anyEmpty, arrayEmpty} from "../../public/tools/Ext";
import {logoutAndroid} from "../../public/define/ANHelper/InfoHelper";

class ZHTYMinePage extends UGBasePage<ZHTYMineProps> {
  // 成为焦点页面
  didFocus(params: ZHTYMineProps) { }

  requestData() {
    // 获取功能按钮列表
    //TODO Android

    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGSystemConfigModel.currentConfig.userCenter').then((list: Array<UGUserCenterItem>) => {
          let dataArray = list.map(item => new UGUserCenterItem(item));
          this.setProps({ dataArray: dataArray });
        });
        break;
      case 'android':
        ANHelper.callAsync(CMD.ASK_MINE_ITEMS)
          .then((data) => {
            const userCenterItems = JSON.parse(data)?.map((item: any) => new UGUserCenterItem(item)) ?? []
            this.setProps({ dataArray: userCenterItems });
          })
        break;
    }
  }

  renderContent(): React.ReactNode {
    let UserI = this.props.userInfo;
    let cells = this.props.dataArray.map(item => {
      const itemW = AppDefine.width / 11;
      return [
        <TouchableOpacity
          key={item.code}
          style={{ width: (AppDefine.width - 40) / 4, alignItems: 'center', marginVertical: 13 }}
          onPress={() => {
            PushHelper.pushUserCenterType(item.code);
          }}>
          <FastImage source={{ uri: item.logo }} style={{ width: itemW, height: itemW }} />
          <Text style={{ marginTop: 10, color: UGColor.TextColor1 }}>{item.name}</Text>
        </TouchableOpacity>,
      ];
    });

    return (
      <View style={{ flex: 1 }}>
        <FastImage source={Res.zhtyMineBg} style={{ position: 'absolute', top: -88, width: AppDefine.width, height: 200 }} />
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
          <View style={{ marginTop: 12, borderRadius: 4, flexWrap: 'wrap', flexDirection: 'row', paddingVertical: 14, backgroundColor: Skin1.homeContentColor }}>{cells}</View>
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

                    switch (Platform.OS) {
                      case 'ios':
                        await OCHelper.call('UGUserModel.setCurrentUser:', []);
                        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
                        await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]);
                        break;
                      case 'android':
                        ANHelper.callAsync(CMD.LOG_OUT)
                        break;
                    }

                    Toast('退出成功');
                  },
                },
              ]);
            }}
          />

          <View style={{ height: 150 }} />
        </ScrollView>
      </View>
    );
  }
}

// 绑定Redux
export default connect(ZHTYMineStateToProps)(ZHTYMinePage);
