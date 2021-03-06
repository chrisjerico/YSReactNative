import React, { useEffect } from 'react'
import { Alert, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import CodePush, { SyncOptions } from 'react-native-code-push'
import * as Progress from 'react-native-progress'
import { useSafeArea } from 'react-native-safe-area-context'
import { getIOSCodePushKey } from '../../public/config/CodePushKeys'
import { ANHelper } from '../../public/define/ANHelper/ANHelper'
import { CMD } from '../../public/define/ANHelper/hp/CmdDefine'
import { NA_DATA } from '../../public/define/ANHelper/hp/DataDefine'
import AppDefine from '../../public/define/AppDefine'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import { setRnPageInfo } from '../../public/define/OCHelper/SetRnPageInfo'
import UGSkinManagers from '../../public/theme/UGSkinManagers'
import { anyEmpty, arrayEmpty } from '../../public/tools/Ext'
import { scale } from '../../public/tools/Scale'
import { ugLog } from '../../public/tools/UgLog'
import UGSysConfModel from '../../redux/model/全局/UGSysConfModel'
import { UGStore } from '../../redux/store/UGStore'
import { DefaultMenu } from '../../Res/DefaultMenu'
import { UGBasePageProps } from '../base/UGPage'
import UseVersion from './us/UseVersion'
import { push } from '../../public/navigation/RootNavigation'
import { PageName } from '../../public/navigation/Navigation'
import { combination, combineArr } from '../bet/util/ArithUtil'
import { IWebPage } from '../common/web/WebPage'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

// 声明Props
export interface UpdateVersionProps extends UGBasePageProps<UpdateVersionProps> {
  progress?: number
  text?: string
  bCodePush?: boolean //codepush是否OK
  bBanner?: boolean //banner是否播放完
  networkOK?: boolean //域名是否都正常
  codeStatus?: CodePush.SyncStatus //code push状态
  counter?: number //计数器
  clickCount?: number //点击倒计时次数
  showNetwork?: string //显示网络状态
}

const MAX_TIME = 12 //最多N秒倒计时

export const UpdateVersionPage = (props: UpdateVersionProps) => {
  const { setProps, progress = 0, counter = 0, clickCount = 0, showNetwork = '', text = '正在努力更新中...',
    bCodePush = false, bBanner = false, networkOK = false, codeStatus } = props

  // 保存安全区域
  AppDefine.safeArea = useSafeArea()

  //网络状态的回调
  const testResult = (str: string) => {
    let net = ' ' + AppDefine.host + ' ' + str
    ugLog('try: ' + net)
    setProps({ showNetwork: net })
  }
  const { testNetwork, testSite, testCodePush } = UseVersion({ testResult })

  useEffect(() => {
    function CodePushSync(options: SyncOptions) {
      CodePush.sync(
        options,
        (status) => {
          let isNewest = false

          setProps({ codeStatus: status })
          switch (status) {
            case CodePush.SyncStatus.SYNC_IN_PROGRESS:
              console.log('当前已经在更新了，无须重复执行')
              setProps({ progress: 1, text: '当前已经在更新了...' })
              break
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
              console.log('rn正在查找可用的更新')
              break
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
              console.log('rn弹了框让用户自己选择是否要更新')
              break
            case CodePush.SyncStatus.UPDATE_IGNORED:
              console.log('rn忽略此热更新')
              isNewest = true
              break
            case CodePush.SyncStatus.UP_TO_DATE:
              console.log('rn已是最新版本')
              setProps({ progress: 1, text: '已是最新版本...' })
              isNewest = true
              break
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
              console.log('rn正在下载热更新')
              //此时不能强制跳转
              // clearTimeout(timer)
              break
            case CodePush.SyncStatus.INSTALLING_UPDATE:
              console.log('rn正在安装热更新')
              //此时不能强制跳转
              // clearTimeout(timer)
              break
            case CodePush.SyncStatus.UNKNOWN_ERROR:
              console.log('rn热更新出错❌')
              setProps({ progress: 1, text: '更新出错...' })

              switch (Platform.OS) {
                case 'ios':
                  // 更新出错时无限重试
                  setTimeout(() => {
                    testCodePush(async (serverURL) => {
                      console.log('发现热更新域名：', serverURL);
                      await OCHelper.call('CodePushConfig.current.setServerURL:', [serverURL])
                      await OCHelper.call('CodePushConfig.current.setAppVersion:', ['1.2'])
                      CodePushSync(options)
                    })
                  }, 1000)
                  break;
                case 'android':
                  // isNewest = true
                  break
              }
              break
            case CodePush.SyncStatus.UPDATE_INSTALLED:
              console.log('rn热更新安装成功，正在重启RN')
              setProps({ progress: 1, text: '安装成功...' })
              Platform.OS == 'ios' && OCHelper.call('ReactNativeVC.showSnapshotImageWhenRnIMMEDIATE')
              return
          }

          if (isNewest) {
            setProps({ progress: 1, text: '正在进入主页...' })
            switch (Platform.OS) {
              case 'ios':
                OCHelper.call('UGSystemConfigModel.currentConfig').then((sysConf: UGSysConfModel) => {
                  initConfig(sysConf)
                })
                break
              case 'android':
                ANHelper.callAsync(CMD.LOAD_DATA, { key: NA_DATA.CONFIG }).then((config) => {
                  initConfig(JSON.parse(config))
                })
                break
            }
          }
        },
        (progress) => {
          let p = progress.receivedBytes / progress.totalBytes
          setProps({ progress: p, text: '正在更新，请稍等...' })
          console.log('rn热更新包下载进度：' + p)
        },
        (update) => {
          const verInfo = '(' + update.appVersion + ') ' + update.description
          console.log('发现新的热更新包：', verInfo)
        },
      )
    }

    if (Platform.OS == 'ios') {
      // 重新启动后直接进入首页（优化CodePush访问慢用户的体验）
      OCHelper.call('AppDefine.shared.rnVersion').then(async (rnVersion: string) => {
        const isFirst = !rnVersion?.length
        // 先初始化一遍原生配置（避免有些用户网络慢，没更新完RN配置就直接超时进入首页）
        const sysConf: UGSysConfModel = await OCHelper.call('UGSystemConfigModel.currentConfig')
        await initConfig(sysConf, !isFirst)

        testCodePush(async (serverURL) => {
          console.log('发现热更新域名：', serverURL);
          // 检查更新
          await OCHelper.call('CodePushConfig.current.setServerURL:', [serverURL])
          await OCHelper.call('CodePushConfig.current.setAppVersion:', ['1.2'])
          const CodePushKey = await getIOSCodePushKey()
          console.log('OCHelper.CodePushKey = ', CodePushKey)
          CodePushSync({
            deploymentKey: CodePushKey,
            installMode: CodePush.InstallMode.IMMEDIATE,
          })
        })
      })
    } else {
      CodePushSync({ installMode: CodePush.InstallMode.IMMEDIATE })
    }

    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('NSUserDefaults.standardUserDefaults.arrayForKey:', ['LaunchPics']).then((pics: string[]) => {
          if (pics && pics.length) {
            setProps({ backgroundImage: pics[0] })
          }
        })
        break
      case 'android':
        //初始化默认菜单
        ANHelper.callAsync(CMD.INIT_MENU, { value: DefaultMenu }).then()
        //初始化启动图
        ANHelper.callAsync(CMD.LOAD_DATA, { key: NA_DATA.LAUNCH_PICS }).then((picStr) => {
          if (!anyEmpty(picStr)) {
            let pics: [] = JSON.parse(picStr)
            if (!arrayEmpty(pics)) {
              setProps({ backgroundImage: pics.shift() })
              //暂时不轮播，直接清空
              pics = []

              //定时器显示图片
              let tempInterval = setInterval(() => {
                if (arrayEmpty(pics)) {
                  clearInterval(tempInterval)
                  setProps({ bBanner: true })
                } else {
                  setProps({ backgroundImage: pics.shift() })
                }
              }, 4500)
            } else {
              setProps({ bBanner: true })
            }
          }
        })
    }

    //测试哪个域名最快
    testSite((httpOk) =>
    {
      setProps({ networkOK: httpOk })
      httpOk && OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGDidDomainNameChange'])
    })

    return () => {
      // ugLog("clear timer")
      // clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // ugLog('bCodePush=', bCodePush, ', bBanner=', bBanner)
    switch (Platform.OS) {
      case 'ios':
        break
      case 'android':
        //ugLog('bCodePush bCodePush networkOK = ', bCodePush, bBanner, networkOK)
        bCodePush && bBanner && networkOK && ANHelper.callAsync(CMD.LAUNCH_GO)
        break
    }
  }, [bCodePush, bBanner, networkOK])

  useEffect(() => {
    //设置一个计数器给用户倒计时
    const interval = setInterval(() => {

      // ugLog('bCodePush bCodePush networkOK = ', bCodePush, bBanner, networkOK)

      switch (Platform.OS) {
        case 'ios':
          //TODO
          break;
        case 'android':
          //倒计时也到了, 请求没给正常结果，codePush也检查完毕 就判定域名有问题，如果codePush正在升级安装，就不管
          if (counter == MAX_TIME) {
            if (networkOK) { //时间到了，网络OK 不管如何都放用户进去
              ANHelper.callAsync(CMD.LAUNCH_GO)
            } else if(codeStatus == CodePush.SyncStatus.UNKNOWN_ERROR || //codePush出错
              codeStatus == CodePush.SyncStatus.UPDATE_IGNORED || //忽略此热更新
              codeStatus == CodePush.SyncStatus.UP_TO_DATE //已是最新版本
            ) {
              Alert.alert('温馨提示',
                '访问出现异常，请检查网络情况，重新打开App再试试。\n或者联系客服...',
                [
                  {
                    text: '尝试直接打开',
                    onPress: () => {
                      push(PageName.WebPage, {url: AppDefine.host} as IWebPage)
                    }, style: 'default',
                  },
                  {
                    text: '退出',
                    onPress: () => {
                      ANHelper.callAsync(CMD.FINISH_ACTIVITY)
                    }, style: 'destructive',
                  },
                ])
            }

          }
          break;
      }

      counter <= MAX_TIME && setProps({ counter: counter + 1 })
    }, 1000)
    return () => {
      // ugLog('clear interval')
      clearInterval(interval)
    }
  }, [counter])

  const initConfig = async (sysConf: UGSysConfModel, willLaunch = true) => {
    UGStore.dispatch({ type: 'merge', sysConf: sysConf })
    sysConf = UGStore.globalProps.sysConf

    switch (Platform.OS) {
      case 'ios':
        console.log('初始化RN模板', '替换原生页面')
        // 设置皮肤
        await UGSkinManagers.updateSkin(sysConf)
        // 配置替换rn的页面
        await setRnPageInfo(true)
        // 通知iOS显示上一个RN页面
        willLaunch && (await OCHelper.call('ReactNativeVC.showLastRnPage'))
        // RN初始化完毕
        await OCHelper.call('ReactNativeHelper.launchFinish')
        // RN版本更新完毕，进入首页
        willLaunch &&
          setTimeout(() => {
            OCHelper.launchFinish()
            OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['kRnVersionUpdateFinish'])
          }, 500)
        break
      case 'android':
        await UGSkinManagers.updateSkin(sysConf)
        setProps({ bCodePush: true })
        break
    }

    // 告诉原生RN版本
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then((p) => {
      const verInfo = '(' + p.appVersion + ') ' + p.description
      console.log('当前RN Key：', OCHelper.CodePushKey)
      console.log('当前RN版本信息：', verInfo)
      Platform.OS == 'ios' && OCHelper.call('AppDefine.shared.setRnVersion:', [verInfo])
    })
    CodePush.getUpdateMetadata(CodePush.UpdateState.LATEST).then((p) => {
      const verInfo = '(' + p.appVersion + ') ' + p.description
      console.log('最新RN版本信息：', verInfo)
    })

    UGStore.save()
  }

  //倒计时
  let circleProgress = MAX_TIME - counter
  circleProgress = circleProgress < 0 ? 0 : circleProgress

  const height = Platform.OS == 'ios' ? useSafeArea()?.top + 20 : useSafeArea()?.top
  const textProgress = '  ' + text + (progress > 1 ? `${progress}%...` : '') + showNetwork

  return (
    <View style={_styles.container}>
      <Progress.Bar progress={progress} borderWidth={0} borderRadius={0} unfilledColor="transparent" color="#00000055" height={height} width={AppDefine.width} />
      <UGText style={_styles.title}>{textProgress}</UGText>
      <View style={_styles.container_timer}>
        <Progress.Circle
          progress={circleProgress / MAX_TIME}
          size={scale(56)}
          thickness={scale(2)}
          allowFontScaling={true}
          indeterminate={false}
          showsText={false}
          direction={'counter-clockwise'}
          color={'#b2cde0'}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            setProps({ clickCount: clickCount + 1 })
            ugLog('clickCount=' + clickCount)
            //第3次就测网速
            if (clickCount % 3 == 2) {
              testNetwork()
            }
          }}>
          <View style={_styles.counter_container}>
            <UGText style={_styles.title_counter}>{circleProgress + '秒'}</UGText>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  container_timer: {
    flex: 1,
    paddingTop: scale(8),
    paddingRight: scale(4),
    justifyContent: 'flex-end',
    position: 'absolute',
    alignItems: 'flex-start',
  },
  content: {
    width: '100%',
    marginBottom: 300,
  },
  subComponent: {
    marginTop: scale(10),
    backgroundColor: 'white',
  },
  coupon_title: {
    backgroundColor: 'white',
  },
  title: {
    width: '100%',
    color: '#fff',
    fontWeight: '500',
    fontSize: scale(18),
    marginTop: -20
  },
  counter_container: {
    position: 'absolute',
    width: scale(56),
    height: scale(56),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_counter: {
    color: '#b2cde0',
    fontWeight: '500',
    fontSize: scale(16),
  },
})
