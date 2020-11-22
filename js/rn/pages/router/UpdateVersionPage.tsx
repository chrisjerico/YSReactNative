import React, { useEffect } from 'react'
import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import CodePush from 'react-native-code-push'
import * as Progress from 'react-native-progress'
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

// 声明Props
export interface UpdateVersionProps extends UGBasePageProps<UpdateVersionProps> {
  progress?: number
  text?: string
  bCodePush?: boolean //codepush是否OK
  bBanner?: boolean //banner是否播放完
  counter?: number //计数器
  clickCount?: number //点击倒计时次数
  showNetwork?: string //显示网络状态
}
const MAX_TIME = 8 //最多8秒倒计时
export const UpdateVersionPage = (props: UpdateVersionProps) => {
  const { setProps, progress = 0, counter = 0, clickCount = 0, showNetwork = '', text = '正在努力更新中...', bCodePush = false, bBanner = false } = props

  //网络状态的回调
  const testResult = (str: string) => {
    let net = ' ' + AppDefine.host + ' ' + str
    ugLog('try: ' + net)
    setProps({ showNetwork: net })
  }
  const { testNetwork, testSite } = UseVersion({ testResult })

  useEffect(() => {
    console.log('OCHelper.CodePushKey = ', OCHelper.CodePushKey)

    let options = {}
    switch (Platform.OS) {
      case 'ios':
        options = {
          deploymentKey: OCHelper.CodePushKey == 'LocalCode' ? 'iwDsp1YB7bcBov7KIaxDP9tLbuUQ4ksvOXqog' : OCHelper.CodePushKey,
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
        break
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
        break
    }

    // 超时时间20秒
    const timer = setTimeout(() => {
      clearTimeout(timer)

      switch (Platform.OS) {
        case 'ios':
          OCHelper.launchFinish()
          break
        case 'android':
          ANHelper.callAsync(CMD.LAUNCH_GO)
          break
      }
    }, 8000)

    setProps({
      navbarOpstions: { hidden: true },
    })

    CodePush.sync(
      options,
      (status) => {
        let isNewest = false
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
            clearTimeout(timer)
            break
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            console.log('rn正在安装热更新')
            //此时不能强制跳转
            clearTimeout(timer)
            break
          case CodePush.SyncStatus.UNKNOWN_ERROR:
            console.log('rn热更新出错❌')
            setProps({ progress: 1, text: '更新出错...' })
            break
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            console.log('rn热更新安装成功，正在重启RN')
            setProps({ progress: 1, text: '安装成功...' })
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
      }
    )

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
    testSite()

    return () => {
      // ugLog("clear timer")
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // ugLog('bCodePush=', bCodePush, ', bBanner=', bBanner)
    switch (Platform.OS) {
      case 'ios':
        break
      case 'android':
        bCodePush && bBanner && ANHelper.callAsync(CMD.LAUNCH_GO)
        break
    }
  }, [bCodePush, bBanner])

  useEffect(() => {
    //设置一个计数器给用户倒计时
    const interval = setInterval(() => {
      ugLog('counter=', counter)
      setProps({ counter: counter + 1 })
    }, 1000)
    return () => {
      // ugLog('clear interval')
      clearInterval(interval)
    }
  }, [counter])

  const initConfig = async (sysConf: UGSysConfModel) => {
    UGStore.dispatch({ type: 'merge', sysConf: sysConf })
    sysConf = UGStore.globalProps.sysConf

    switch (Platform.OS) {
      case 'ios':
        console.log('初始化RN模板', '替换原生页面')
        // 设置皮肤
        await UGSkinManagers.updateSkin(sysConf)
        // 配置替换rn的页面
        setRnPageInfo()
        // 通知iOS进入首页
        await OCHelper.call('ReactNativeVC.showLastRnPage')
        // 请求系统配置数据（从原生获取的配置数据被原生处理过，不太好用）
        UGSysConfModel.updateFromNetwork()
        // 等待原生皮肤UI刷新完再进入首页
        setTimeout(() => {
          OCHelper.launchFinish()
        }, 500);
        break
      case 'android':
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

  return (
    <View style={_styles.container}>
      <View style={_styles.content}>
        <Progress.Bar progress={progress} borderWidth={0} borderRadius={0} unfilledColor="#aaa" color="white" height={4} width={AppDefine.width} />
        <Text style={_styles.title}>{text + showNetwork}</Text>
      </View>
      <View style={_styles.container_timer}>
        <Progress.Circle
          progress={circleProgress / 10}
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
            <Text style={_styles.title_counter}>{circleProgress + '秒'}</Text>
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
    backgroundColor: '#0000003f',
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
