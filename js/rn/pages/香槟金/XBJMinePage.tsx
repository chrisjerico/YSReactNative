import React, { Component, useEffect, useRef } from 'react';
import { View, Alert, Platform, Image } from 'react-native';
import { Button, Text, Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import UGSysConfModel, { UGUserCenterItem, UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import AppDefine from '../../public/define/AppDefine';
import PushHelper, { UGLinkPositionType } from '../../public/define/PushHelper';
import { connect } from 'react-redux';
import { UGColor } from '../../public/theme/UGThemeColor';
import { Skin1 } from '../../public/theme/UGSkinManagers';
import { OCHelper } from '../../public/define/OCHelper/OCHelper';
import { Toast } from '../../public/tools/ToastUtils';
import { UGStore } from '../../redux/store/UGStore';
import { UGBasePageProps } from '../base/UGPage';
import UGUserModel from '../../redux/model/全局/UGUserModel';
import { ANHelper } from "../../public/define/ANHelper/ANHelper";
import { CMD } from "../../public/define/ANHelper/hp/CmdDefine";
import { JDSalaryListCP } from '../经典/cp/JDSalaryListCP';
import { api } from '../../public/network/NetworkRequest1/NetworkRequest1';
import { JDAvatarListCP } from '../经典/cp/JDAvatarListCP';
import { AvatarModel } from '../../public/network/Model/SystemAvatarListModel';
import { img_assets } from '../../Res/icon';
import { UGText } from '../../../doy/public/Button之类的基础组件/DoyButton'

// 定义Props
export interface XBJMineProps extends UGBasePageProps<XBJMineProps> {}

export const XBJMinePage = (props: XBJMineProps) => {
  const { setProps } = props;
  const { current: v } = useRef<{} & JDSalaryListCP & JDAvatarListCP>({});
  const { mBonsSwitch, checkinSwitch, missionSwitch } = UGStore.globalProps.sysConf;
  const { avatar, usr, curLevelGrade, curLevelTitle, balance, unreadMsg } = UGStore.globalProps.userInfo;
  const style = {
    navImageTintColor: Skin1.isBlack ? undefined : Skin1.navBarBgColor[0],
    showCard: "c245".indexOf(AppDefine.siteId) == -1,
    cellBgColor: Skin1.isBlack ? '#555050' : '#ffffff99',
    textColor: Skin1.isBlack ? '#fff' : '#000',
    lineColor: Skin1.isBlack ? '#777' : '#bbb',
  };
  const avatarURL = avatar?.length ? avatar : img_assets('money-2');
  const dataArray = UGSysConfModel.getUserCenterItems();

  let cells = dataArray?.map(item => {
    if (!item) return;
    return [
      <TouchableOpacity
        key={item.code}
        style={{ flexDirection: 'row' }}
        onPress={() => {
          PushHelper.pushUserCenterType(item.code);
        }}>
        <FastImage source={{ uri: item.logo }} style={{ margin: 10, marginLeft: 13, width: 26, height: 26 }} />
        {item.code == UGUserCenterType.站内信 && unreadMsg != 0 && (
          <UGText style={{ marginLeft: -20, marginRight: 6, marginTop: 7, paddingHorizontal: 2.5, minWidth: 14, height: 14, textAlign: 'center', borderRadius: 7, overflow: 'hidden', backgroundColor: 'red', color: '#fff', fontSize: 10 }}>{unreadMsg}</UGText>
        )}
        <UGText style={{ marginTop: 14, marginLeft: 6, color: style.textColor }}>{item.name}</UGText>
      </TouchableOpacity>,
      <View style={{ marginLeft: 55, height: 0.5, backgroundColor: style.lineColor }} />,
    ];
  });

  useEffect(() => {
    setProps({
      navbarOpstions: {
        title: '我的',
        gradientColor: Skin1.bgColor,
        hideUnderline: true,
        back: true,
        rightComponent: (
          <TouchableOpacity
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.站内信);
            }}>
            <FastImage source={{ uri: img_assets('zhanneixin@3x') }} style={{ marginRight: 16, width: 20, height: 20 }} />
          </TouchableOpacity>
        ),
      },
      bgGradientColor: Skin1.bgColor,
      didFocus: () => {
        // 获取用户信息
        UGUserModel.updateFromNetwork();
      },
    })
  }, []);

  return (
    [
      <ScrollView style={{ flex: 1, padding: 16 }} key="scrollView">
        <View style={{ padding: 16, borderRadius: 4, backgroundColor: style.cellBgColor }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => {
              v?.showAvatarList && v?.showAvatarList();
            }} >
              <FastImage source={{ uri: avatarURL }} style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#00000022' }} />
            </TouchableOpacity>
            <View style={{ marginLeft: 16 }}>
              <View style={{ marginTop: 4, flexDirection: 'row' }}>
                <UGText style={{ fontWeight: '500', fontSize: 16, color: style.textColor }}>{usr?.length > 10 ? usr?.substr(0, 10) + "..." : usr}</UGText>
                <LinearGradient colors={['#FFEAC3', '#FFE09A']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ marginLeft: 8, marginTop: 1, borderRadius: 3, width: 42, height: 17 }}>
                  <UGText style={{ marginTop: 0.5, textAlign: 'center', color: '#8F6832', fontStyle: 'italic', fontWeight: '600', fontSize: 13 }}>{curLevelGrade}</UGText>
                </LinearGradient>
              </View>
              <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <UGText style={{ fontSize: 12, color: style.textColor }}>头衔：</UGText>
                <UGText style={{ fontSize: 12, color: UGColor.YellowColor1 }}>{curLevelTitle}</UGText>
              </View>
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={{ marginTop: -5, marginRight: -3 }}>
              {missionSwitch != '1' && <TouchableOpacity onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.任务中心)
              }}>
                <FastImage source={{ uri: img_assets('missionhall@2x') }} style={{ paddingVertical: 4, paddingHorizontal: 8, borderRadius: 10, flexDirection: 'row' }} >
                  <UGText style={{ textAlign: 'right', fontSize: 9, color: '#fff', marginRight: 18 }}>任务中心</UGText>
                </FastImage>
              </TouchableOpacity>}
              {checkinSwitch != '0' && <TouchableOpacity onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.每日签到)
              }}>
                <FastImage source={{ uri: img_assets('dailysign@2x') }} style={{ paddingVertical: 4, paddingHorizontal: 8, borderRadius: 10, flexDirection: 'row', marginTop: 5 }}>
                  <UGText style={{ textAlign: 'right', fontSize: 9, color: '#fff' }}>每日签到</UGText>
                </FastImage>
              </TouchableOpacity>}
              {(mBonsSwitch == false) && <TouchableOpacity onPress={() => {
                v?.showSalaryAlert && v?.showSalaryAlert();
              }}>
                <FastImage source={{ uri: img_assets('usercenter03') }} style={{ paddingVertical: 4, paddingHorizontal: 8, borderRadius: 10, flexDirection: 'row', marginTop: 5 }} >
                  <UGText style={{ textAlign: 'right', fontSize: 9, color: '#fff' }}>领取俸禄</UGText>
                </FastImage>
              </TouchableOpacity>}
            </View>

          </View>
          <View style={{ marginLeft: -15, marginTop: 18, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.存款);
              }}>
              <Image source={{ uri: img_assets('icon_wallet_deposit_u') }} style={{ width: 35, height: 21, tintColor: style.navImageTintColor }} />
              <UGText style={{ marginTop: 11, fontSize: 12, color: style.textColor }}>存款</UGText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.额度转换);
              }}>
              <Image source={{ uri: img_assets('icon_wallet_transfer_u') }} style={{ width: 35, height: 21, tintColor: style.navImageTintColor }} />
              <UGText style={{ marginTop: 11, fontSize: 12, color: style.textColor }}>额度转换</UGText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.取款);
              }}>
              <Image source={{ uri: img_assets('icon_wallet_withdraw_u') }} style={{ width: 35, height: 21, tintColor: style.navImageTintColor }} />
              <UGText style={{ marginTop: 11, fontSize: 12, color: style.textColor }}>取款</UGText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.存款);
              }}>
              <Image source={{ uri: img_assets('icon_mine_vip_u') }} style={{ width: 35, height: 21, tintColor: style.navImageTintColor }} />
              <UGText style={{ marginTop: 11, fontSize: 12, color: style.textColor }}>资金管理</UGText>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', borderRadius: 100 }} onPress={() => {
              UGUserModel.updateFromNetwork();
            }}>
              <UGText style={{ marginTop: 4, fontWeight: '700', color: UGColor.RedColor2 }}>{'¥' + (balance ?? '0.00')}</UGText>
              <UGText style={{ marginTop: 11, fontSize: 12, color: style.textColor }}>中心钱包</UGText>
            </TouchableOpacity>
          </View>
        </View>
        {style.showCard && (<View style={{ marginTop: 12, flexDirection: 'row', flex: 1 }}>
          <TouchableOpacity
            containerStyle={{ padding: 12, borderRadius: 4, backgroundColor: style.cellBgColor, flex: 1, marginRight: 12 }}
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.推荐收益);
            }}>
            <UGText style={{ marginTop: -3, fontSize: 14, color: style.textColor }}>推荐收益</UGText>
            <UGText style={{ marginTop: 4, fontSize: 10, color: style.textColor }}>现金奖励等你拿</UGText>
            <FastImage source={{ uri: img_assets('quanyuanfuli@3x') }} style={{ marginTop: 9, marginBottom: -1, width: 80, height: 53 }} />
          </TouchableOpacity>
          <TouchableOpacity
            containerStyle={{ padding: 12, borderRadius: 4, backgroundColor: style.cellBgColor, flex: 1, marginRight: 12 }}
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.活动彩金);
            }}>
            <UGText style={{ marginTop: -3, fontSize: 14, color: style.textColor }}>彩金申请</UGText>
            <UGText style={{ marginTop: 4, fontSize: 10, color: style.textColor }}>新手有好礼</UGText>
            <FastImage source={{ uri: img_assets('quanyuanfuli@3x') }} style={{ marginTop: 9, marginBottom: -1, width: 92, height: 53 }} />
          </TouchableOpacity>
          <TouchableOpacity
            containerStyle={{ padding: 12, borderRadius: 4, backgroundColor: style.cellBgColor, flex: 1 }}
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.任务中心);
            }}>
            <UGText style={{ marginTop: -3, fontSize: 14, color: style.textColor }}>任务中心</UGText>
            <UGText style={{ marginTop: 4, fontSize: 10, color: style.textColor }}>领取丰富大奖</UGText>
            <FastImage source={{ uri: img_assets('quanyuanfuli@3x') }} style={{ marginTop: 9, marginBottom: -1, width: 92, height: 53 }} />
          </TouchableOpacity>
        </View>)}
        <View style={{ marginTop: 12, borderRadius: 4, backgroundColor: style.cellBgColor }}>{cells}</View>
        <Button
          title="退出登录"
          style={{ marginTop: 12 }}
          buttonStyle={{ backgroundColor: style.cellBgColor, borderRadius: 4, height: 48 }}
          titleStyle={{ color: UGColor.RedColor2 }}
          onPress={() => {
            Alert.alert('温馨提示', '确定退出账号', [
              { text: '取消', style: 'cancel' },
              {
                text: '确定',
                onPress: async () => {
                  api.user.logout();

                  switch (Platform.OS) {
                    case 'ios':
                      await OCHelper.call('UGUserModel.setCurrentUser:', []);
                      await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
                      await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]);

                      break;
                    case 'android':
                      await ANHelper.callAsync(CMD.LOG_OUT)
                      Toast('退出成功');
                      break;
                  }
                },
              },
            ]);
          }}
        />
        <View style={{ height: 150 }} />
      </ScrollView>,
      <JDSalaryListCP c_ref={v} />,
      <JDAvatarListCP c_ref={v} />,
    ]
  );
}
