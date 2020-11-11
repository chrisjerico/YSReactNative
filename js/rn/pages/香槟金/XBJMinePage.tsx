import React, { Component, useEffect, useRef } from 'react';
import { View, Alert, Platform } from 'react-native';
import { Button, Text, Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { UGUserCenterItem, UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import AppDefine from '../../public/define/AppDefine';
import PushHelper from '../../public/define/PushHelper';
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


// 定义Props
export interface XBJMineProps extends UGBasePageProps<XBJMineProps> {
  dataArray?: Array<UGUserCenterItem>; // 功能按钮列表
  avatarURL?: string;
  list?: AvatarModel[]; // 头像列表
}

export const XBJMinePage = (props: XBJMineProps) => {
  const { setProps, list } = props;
  const { current: v } = useRef<{} & JDSalaryListCP & JDAvatarListCP>({});
  const { sysConf: { mBonsSwitch }, userInfo: UserI } = UGStore.globalProps;
  const cellBgColor = '#ffffff99';

  useEffect(() => {
    setProps({
      navbarOpstions: {
        hidden: false,
        title: '我的',
        gradientColor: Skin1.bgColor,
        hideUnderline: true,
        rightComponent: (
          <TouchableOpacity
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.站内信);
            }}>
            <FastImage source={{ uri: 'https://i.ibb.co/q0Pgt4B/2x.png' }} style={{ marginRight: 16, width: 20, height: 20 }} />
          </TouchableOpacity>
        ),
      },
      backgroundColor: Skin1.bgColor,
      dataArray: [],
      didFocus: () => {
        AppDefine.checkHeaderShowBackButton((show) => {
          setProps({ navbarOpstions: { back: show } });
        });

        console.log('获取用户信息');
        // 获取用户信息
        UGUserModel.updateFromNetwork();
      },
    })

    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGSystemConfigModel.currentConfig.userCenter').then((list: Array<UGUserCenterItem>) => {
          let dataArray = list.map(item => new UGUserCenterItem(item));
          setProps({ dataArray: dataArray });
        });
        break;
      case 'android':
        ANHelper.callAsync(CMD.ASK_MINE_ITEMS)
          .then((data) => {
            const userCenterItems = JSON.parse(data)?.map((item: any) => new UGUserCenterItem(item)) ?? []
            setProps({ dataArray: userCenterItems });
          })
        break;
    }

    // 获取头像列表
    api.system.avatarList().setCompletionBlock(({ data: list }) => {
      setProps({ list: list })
    });
  }, []);

  const avatarURL = UGUserModel.getAvatarURL(list, UserI?.avatar);

  let cells = props?.dataArray?.map(item => {
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
    [
      <ScrollView style={{ flex: 1, padding: 16 }} key="scrollView">
        <View style={{ padding: 16, borderRadius: 4, backgroundColor: cellBgColor }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => {
              return;
              v?.showAvatarList && v?.showAvatarList();
            }} >
              <FastImage source={{ uri: avatarURL }} style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#00000022' }} />
            </TouchableOpacity>
            <View style={{ marginLeft: 16 }}>
              <View style={{ marginTop: 4, flexDirection: 'row' }}>
                <Text style={{ fontWeight: '500', fontSize: 16 }}>{UserI?.usr?.length > 10 ? UserI?.usr?.substr(0, 10) + "..." : UserI?.usr}</Text>
                <LinearGradient colors={['#FFEAC3', '#FFE09A']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ marginLeft: 8, marginTop: 1, borderRadius: 3, width: 42, height: 17 }}>
                  <Text style={{ marginTop: 0.5, textAlign: 'center', color: '#8F6832', fontStyle: 'italic', fontWeight: '600', fontSize: 13 }}>{UserI?.curLevelGrade}</Text>
                </LinearGradient>
              </View>
              <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <Text style={{ fontSize: 12 }}>头衔：</Text>
                <Text style={{ fontSize: 12, color: UGColor.RedColor2 }}>{UserI?.curLevelTitle}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}></View>
            {!mBonsSwitch && <TouchableOpacity onPress={() => {
              v?.showSalaryAlert && v?.showSalaryAlert();
            }}>
              <LinearGradient colors={['#8DA9F9', '#9774EF']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ paddingVertical: 6, paddingHorizontal: 8, borderRadius: 5, flexDirection: 'row' }} >
                <Text style={{ textAlign: 'right', fontWeight: '600', fontSize: 14, color: '#fff' }}>领取俸禄</Text>
                <FastImage source={{ uri: 'https://i.ibb.co/SxCc8CN/image.png' }} style={{ marginVertical: -2, marginLeft: 2, marginRight: -2, width: 20, height: 20 }} />
              </LinearGradient>
            </TouchableOpacity>}
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
              <Text style={{ marginTop: 4, fontWeight: '500', color: UGColor.RedColor2 }}>{'¥' + (UserI?.balance ?? '0.00')}</Text>
              <Text style={{ marginTop: 11, fontSize: 12 }}>中心钱包</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 12, flexDirection: 'row', flex: 1 }}>
          <TouchableOpacity
            containerStyle={{ padding: 12, borderRadius: 4, backgroundColor: cellBgColor, flex: 1, marginRight: 12 }}
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.推荐收益);
            }}>
            <Text style={{ marginTop: -3, fontSize: 14 }}>推荐收益</Text>
            <Text style={{ marginTop: 4, fontSize: 10 }}>现金奖励等你拿</Text>
            <FastImage source={{ uri: 'https://i.ibb.co/WHXtKwK/2x.png' }} style={{ marginTop: 9, marginBottom: -1, width: 80, height: 53 }} />
          </TouchableOpacity>
          <TouchableOpacity
            containerStyle={{ padding: 12, borderRadius: 4, backgroundColor: cellBgColor, flex: 1, marginRight: 12 }}
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.活动彩金);
            }}>
            <Text style={{ marginTop: -3, fontSize: 14 }}>彩金申请</Text>
            <Text style={{ marginTop: 4, fontSize: 10 }}>新手有好礼</Text>
            <FastImage source={{ uri: 'https://i.ibb.co/Jz0F2nV/2x.png' }} style={{ marginTop: 9, marginBottom: -1, width: 92, height: 53 }} />
          </TouchableOpacity>
          <TouchableOpacity
            containerStyle={{ padding: 12, borderRadius: 4, backgroundColor: cellBgColor, flex: 1 }}
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.任务中心);
            }}>
            <Text style={{ marginTop: -3, fontSize: 14 }}>任务中心</Text>
            <Text style={{ marginTop: 4, fontSize: 10 }}>领取丰富大奖</Text>
            <FastImage source={{ uri: 'https://i.ibb.co/mNs6pFN/2x.png' }} style={{ marginTop: 9, marginBottom: -1, width: 92, height: 53 }} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 12, borderRadius: 4, backgroundColor: cellBgColor }}>{cells}</View>
        <Button
          title="退出登录"
          style={{ marginTop: 12 }}
          buttonStyle={{ backgroundColor: cellBgColor, borderRadius: 4, height: 48 }}
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
