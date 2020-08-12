import CodePush from 'react-native-code-push';
import React, { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import AppDefine from '../../public/define/AppDefine';
import { OCHelper } from '../../public/define/OCHelper/OCHelper';
import { OCEventType } from '../../public/define/OCHelper/OCBridge/OCEvent';
import { PageName } from '../../public/navigation/Navigation';
import { UGBasePageProps } from '../base/UGPage';
import { Skin1 } from '../../public/theme/UGSkinManagers';
import { getCurrentPage, jumpTo } from '../../public/navigation/RootNavigation';

interface UpdateVersionVars {
  rnInstalled: boolean;
  type: 'rn' | 'jspatch';
  isNewest: boolean;
}

// 声明Props
export interface UpdateVersionProps extends UGBasePageProps<UpdateVersionProps, UpdateVersionVars> {
  progress?: number;
}

export const UpdateVersionPage = (props: UpdateVersionProps) => {
  const { setProps, vars: v = { rnInstalled: false, type: 'rn', isNewest: false }, progress = 0 } = props;

  function updateJspatch() {
    if (Platform.OS != 'ios') return;

    CodePush.getUpdateMetadata(2)
      .then(localPackage => {
        console.log('rn版本号为：' + localPackage.description);
        // 开始更新jspatch
        OCHelper.call('JSPatchHelper.updateVersion:progress:completion:', [localPackage.description]);
        OCHelper.addEvent(OCEventType.JspatchDownloadProgress, (progress: number) => {
          setProps({ progress: progress });
        });
        OCHelper.addEvent(OCEventType.JspatchUpdateComplete, (ret: boolean) => {
          setProps({ progress: 1 });

          // 修正旧版本原生代码版本号逻辑问题（1.60.xx以前）
          OCHelper.call('NSBundle.mainBundle.infoDictionary.valueForKey:', ['CFBundleShortVersionString']).then(ver => {
            const ret = ver.split('.')[0] + '.' + ver.split('.')[1] + '.' + localPackage.description.split('.')[2];
            OCHelper.call('AppDefine.shared.setVersion:', [ret]);
          });

          if (ret) {
            console.log('更新成功');
            if (v.rnInstalled && getCurrentPage() == PageName.UpdateVersionPage) {
              console.log('正在重启RN');
              CodePush.restartApp(true);
            } else {
              console.log('请手动重启APP');
              jumpTo(PageName.TransitionPage);
            }
          } else {
            console.log('jsp下载失败');
            // 弹框让用户去外部链接下载
            // ...
          }
        });
      })
      .catch(err => {
        console.log('获取rn版本号失败, err = ');
        console.log(err);
      });
  }


  useEffect(() => {
    console.log('OCHelper.CodePushKey = ', OCHelper.CodePushKey);

    CodePush.sync(
      {
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
        installMode: CodePush.InstallMode.ON_NEXT_RESTART,
      },
      status => {
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
            v.isNewest = true;
            updateJspatch();
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
            console.log('rn已是最新版本');
            v.isNewest = true;
            updateJspatch();
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
            console.log('rn热更新安装成功，jspatch安装后生效');
            v.isNewest = true;
            v.rnInstalled = true;
            updateJspatch();
            break;
        }
      },
      progress => {
        var p = progress.receivedBytes / progress.totalBytes;
        setProps({ progress: p });
        console.log('rn热更新包下载进度：' + p);
      },
    );

    setProps({
      navbarOpstions: { hidden: true },
      tabbarOpetions: { unmountOnBlur: false },
      backgroundColor: Skin1.bgColor,
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
        //TODO
        break;
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} />
      <LinearGradient colors={['transparent', '#00000066']}>
        <View style={{ height: 120 }} />
        <Text style={{ marginTop: 10, marginLeft: 22, color: '#fff', fontWeight: '500' }}>{this.isNewest ? '更新完毕请重新启动APP。' : '正在努力更新中...'}</Text>
        <Progress.Bar
          progress={progress}
          borderWidth={0.5}
          borderRadius={4}
          unfilledColor="#aaa"
          color="white"
          height={4}
          width={AppDefine.width - 40}
          style={{ marginLeft: 20, marginTop: 10, marginBottom: 60 }}
        />
      </LinearGradient>
    </View>
  );
}
