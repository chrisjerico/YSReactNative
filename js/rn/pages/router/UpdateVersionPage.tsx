import React, { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import CodePush from 'react-native-code-push';
import * as Progress from 'react-native-progress';
import { ANHelper } from "../../public/define/ANHelper/ANHelper";
import { CMD } from "../../public/define/ANHelper/hp/CmdDefine";
import { NA_DATA } from "../../public/define/ANHelper/hp/DataDefine";
import AppDefine from '../../public/define/AppDefine';
import { OCHelper } from '../../public/define/OCHelper/OCHelper';
import { setRnPageInfo } from '../../public/define/OCHelper/SetRnPageInfo';
import UGSkinManagers from '../../public/theme/UGSkinManagers';
import { anyEmpty, arrayEmpty } from "../../public/tools/Ext";
import UGSysConfModel from '../../redux/model/全局/UGSysConfModel';
import { UGStore } from '../../redux/store/UGStore';
import { UGBasePageProps } from '../base/UGPage';

// 声明Props
export interface UpdateVersionProps extends UGBasePageProps<UpdateVersionProps> {
  progress?: number;
  text?: string;
  bCodePush?: boolean;//codepush是否OK
  bBanner?: boolean;//banner是否播放完
}

export const UpdateVersionPage = (props: UpdateVersionProps) => {
  const { setProps, progress = 0, text = '正在努力更新中...', bCodePush = false, bBanner = false } = props;


  useEffect(() => {
    console.log('OCHelper.CodePushKey = ', OCHelper.CodePushKey);

    let options = {};
    switch (Platform.OS) {
      case 'ios':
        options = {
          deploymentKey: OCHelper.CodePushKey,
          /*
         * installMode (codePush.InstallMode)： 安装模式，用在向CodePush推送更新时没有设置强制更新(mandatory为true)的情况下，默认codePush.InstallMode.ON_NEXT_RESTART 即下一次启动的时候安装。
         * 在更新配置中通过指定installMode来决定安装完成的重启时机，亦即更新生效时机
           codePush.InstallMode.IMMEDIATE：表示安装完成立即重启更新(强制更新安装模式)
           codePush.InstallMode.ON_NEXT_RESTART：表示安装完成后会在下次重启后进行更新
           codePush.InstallMode.ON_NEXT_RESUME：表示安装完成后会在应用进入后台后重启更新
         *
         * 强制更新模式(单独的抽出来设置 强制安装)
         * mandatoryInstallMode (codePush.InstallMode):强制更新,默认codePush.InstallMode.IMMEDIATE
         *
         * minimumBackgroundDuration (Number):该属性用于指定app处于后台多少秒才进行重启已完成更新。默认为0。该属性只在installMode为InstallMode.ON_NEXT_RESUME情况下有效
         *
         * */
          installMode: CodePush.InstallMode.IMMEDIATE,
        }
        break;
      case 'android':
        options = {
          /*
         * installMode (codePush.InstallMode)： 安装模式，用在向CodePush推送更新时没有设置强制更新(mandatory为true)的情况下，默认codePush.InstallMode.ON_NEXT_RESTART 即下一次启动的时候安装。
         * 在更新配置中通过指定installMode来决定安装完成的重启时机，亦即更新生效时机
           codePush.InstallMode.IMMEDIATE：表示安装完成立即重启更新(强制更新安装模式)
           codePush.InstallMode.ON_NEXT_RESTART：表示安装完成后会在下次重启后进行更新
           codePush.InstallMode.ON_NEXT_RESUME：表示安装完成后会在应用进入后台后重启更新
         *
         * 强制更新模式(单独的抽出来设置 强制安装)
         * mandatoryInstallMode (codePush.InstallMode):强制更新,默认codePush.InstallMode.IMMEDIATE
         *
         * minimumBackgroundDuration (Number):该属性用于指定app处于后台多少秒才进行重启已完成更新。默认为0。该属性只在installMode为InstallMode.ON_NEXT_RESUME情况下有效
         *
         * */
          installMode: CodePush.InstallMode.IMMEDIATE,
        }
        break;
    }

    CodePush.sync(
        options,
      status => {
        let isNewest = false;
        switch (status) {
          case CodePush.SyncStatus.SYNC_IN_PROGRESS:
            console.log('当前已经在更新了，无须重复执行');
            break;
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            console.log('rn正在查找可用的更新');
            break;
          case CodePush.SyncStatus.AWAITING_USER_ACTION:
            console.log('rn弹了框让用户自己选择是否要更新');
            break;
          case CodePush.SyncStatus.UPDATE_IGNORED:
            console.log('rn忽略此热更新');
            isNewest = true;
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
            console.log('rn已是最新版本');
            isNewest = true;
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log('rn正在下载热更新');
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            console.log('rn正在安装热更新');
            break;
          case CodePush.SyncStatus.UNKNOWN_ERROR:
            console.log('rn热更新出错❌');
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            console.log('rn热更新安装成功，正在重启RN');
            return;
        }

        if (isNewest) {
          setProps({ progress: 1, text: '正在进入主页...' });
          switch (Platform.OS) {
            case 'ios':
              OCHelper.call('UGSystemConfigModel.currentConfig').then((sysConf: UGSysConfModel) => {
                initConfig(sysConf)
              });
              break;
            case 'android':
              ANHelper.callAsync(CMD.LOAD_DATA, {key: NA_DATA.CONFIG})
                .then((config) => {
                  initConfig(JSON.parse(config))
                });
              break;
          }
        }
      },
      progress => {
        let p = progress.receivedBytes / progress.totalBytes;
        setProps({ progress: p });
        console.log('rn热更新包下载进度：' + p);
      },
    );

    // 超时时间20秒
    const timer = setTimeout(() => {
      clearTimeout(timer)

      switch (Platform.OS) {
        case 'ios':
          OCHelper.launchFinish();
          break;
        case 'android':
          ANHelper.callAsync(CMD.LAUNCH_GO);
          break;
      }
    }, 20000);

    setProps({
      navbarOpstions: { hidden: true },
      tabbarOpetions: { unmountOnBlur: false },
    })

    switch (Platform.OS) {
      case "ios":
        OCHelper.call('NSUserDefaults.standardUserDefaults.arrayForKey:', ['LaunchPics']).then((pics: string[]) => {
          if (pics && pics.length) {
            setProps({ backgroundImage: pics[0] });
          }
        });
        break;
      case "android":
        ANHelper.callAsync(CMD.LOAD_DATA, { key: NA_DATA.LAUNCH_PICS })
          .then((picStr) => {
            if (!anyEmpty(picStr)) {
              let pics: [] = JSON.parse(picStr);
              if (!arrayEmpty(pics)) {

                setProps({backgroundImage: pics.shift()});
                //暂时不轮播，直接清空
                pics = [];

                //定时器显示图片
                let tempInterval = setInterval(() => {
                  if (arrayEmpty(pics)) {
                    clearInterval(tempInterval)
                    setProps({bBanner: true});
                  } else {
                    setProps({backgroundImage: pics.shift()});
                  }
                }, 2500);
              } else {
                setProps({ bBanner: true});
              }
            }
          });
    }

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // ugLog('bCodePush=', bCodePush, ', bBanner=', bBanner)
    switch (Platform.OS) {
      case "ios":
        break;
      case "android":
        bCodePush && bBanner && ANHelper.callAsync(CMD.LAUNCH_GO);
        break;
    }
  }, [bCodePush, bBanner])

  const initConfig = (sysConf: UGSysConfModel) => {
    UGStore.dispatch({ type: 'merge', sysConf: sysConf });
    sysConf = UGStore.globalProps.sysConf;

    switch (Platform.OS) {
      case 'ios':
        console.log('初始化RN模板', '替换原生页面');
        // 设置皮肤
        UGSkinManagers.updateSkin(sysConf)
        // 配置替换rn的页面
        setRnPageInfo()
        // 通知iOS进入首页
        OCHelper.call('ReactNativeVC.showLastRnPage');
        OCHelper.launchFinish();
        break;
      case 'android':
        setProps({ bCodePush: true});
        break;
    }
    UGStore.save()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <View style={{ marginHorizontal: 15, paddingHorizontal: 15, backgroundColor: '#0000003f', height: 70, marginBottom: 300, borderRadius: 20 }} >
        <Text style={{ marginTop: 24, color: '#fff', fontWeight: '500' }}>{text}</Text>
        <Progress.Bar
          progress={progress}
          borderWidth={0}
          borderRadius={2}
          unfilledColor="#aaa"
          color="white"
          height={4}
          width={AppDefine.width - 60}
          style={{ marginTop: 10 }}
        />
      </View>

    </View>
  );
}
