import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import PushHelper, { PushRightMenuFrom } from '../../public/define/PushHelper'
import useMemberItems from '../../public/hooks/useMemberItems'
import { navigationRef } from '../../public/navigation/RootNavigation'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import { getHtml5Image } from '../../public/tools/tars'
import GameButton from '../../public/views/tars/GameButton'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import UGSysConfModel, { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { UGStore } from '../../redux/store/UGStore'
import ButtonGroup from './views/ButtonGroup'
import HomeHeader from './views/HomeHeader'
import ProfileBlock from './views/ProfileBlock'
import ToolBlock from './views/ToolBlock'

const WNZMinePage = (props) => {

  const { setProps } = props
  const {
    uid,
    balance,
    usr,
    taskRewardTitle,
    taskReward,
    taskRewardTotal,
  }: UGUserModel = UGStore.globalProps.userInfo
  const { mobile_logo }: UGSysConfModel = UGStore.globalProps.sysConf
  const { UGUserCenterItem } = useMemberItems()
  const tools = UGUserCenterItem?.sort((a, b) => a?.code - b?.code) ?? []
  const headTools = tools?.slice(0, 2) ?? []
  const resetTools = tools?.slice(2, tools?.length ?? 2) ?? []

  const usuallyTools = resetTools?.filter((ele) =>
    [
      UGUserCenterType.额度转换,
      UGUserCenterType.全民竞猜,
      UGUserCenterType.利息宝,
      UGUserCenterType.建议反馈,
      UGUserCenterType.开奖走势,
      UGUserCenterType.在线客服,
      UGUserCenterType.QQ客服,
    ].includes(ele.code)
  )

  const userTools = resetTools?.filter((ele) =>
    [
      UGUserCenterType.个人信息,
      UGUserCenterType.安全中心,
      UGUserCenterType.站内信,
      UGUserCenterType.聊天室,
      UGUserCenterType.银行卡管理,
      UGUserCenterType.存款纪录,
      UGUserCenterType.取款纪录,
      UGUserCenterType.资金明细,
    ].includes(ele.code)
  )

  const recordTools = resetTools?.filter((ele) =>
    [
      UGUserCenterType.开奖网,
      UGUserCenterType.其他注单记录,
      UGUserCenterType.活动彩金,
      UGUserCenterType.彩票注单记录,
      UGUserCenterType.长龙助手,
    ].includes(ele.code)
  )

  const activityTools = resetTools?.filter((ele) =>
    [
      UGUserCenterType.任务中心,
      UGUserCenterType.游戏大厅,
      UGUserCenterType.推荐收益,
    ].includes(ele.code)
  )

  const [showBackBtn, setShowBackBtn] = useState(false)

  useEffect(() => {
    setProps({
      didFocus: async () => {
        OCHelper.call(
          'UGNavigationController.current.viewControllers.count'
        ).then((ocCount) => {
          const show =
            ocCount > 1 ||
            navigationRef?.current?.getRootState().routes.length > 1
          setShowBackBtn(show)
        })
      },
    })
  }, [])

  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <HomeHeader
          showBackBtn={showBackBtn}
          showBalance={uid ? true : false}
          name={usr}
          logo={mobile_logo}
          balance={balance}
          onPressMenu={() => {
            PushHelper.pushRightMenu(PushRightMenuFrom.首頁)
          }}
          onPressComment={() => {
            PushHelper.pushHomeGame({ "category": "44", "gameCode": "-1", "gameId": "70", "gameType": "lhc", "hotIcon": "https://cdn01.v-denche.cn/upload/t061/customise/picture/system/mobileIcon/28463cb7ab027d440dd3d91ab602c7ea.gif", "icon": "https://cdn01.v-denche.cn/upload/t061/customise/picture/system/mobileIcon/66a245511ce065b985ba3f8aac8b54cd.jpg", "id": "302", "isClose": "0", "isInstant": "0", "isSeal": "0", "levelType": "1", "logo": "https://cdn01.v-denche.cn/open_prize/images/icon/70.png?v=1597739611", "name": "香港六合彩", "openWay": "0", "realName": "", "seriesId": "1", "sort": "-50", "subId": "70", "subtitle": "一天一期", "tipFlag": "4", "title": "香港六合彩", "url": "" })
          }}
          onPressUser={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.我的页)
          }}
        />
      </SafeAreaHeader>
      <ScrollView
        style={styles.container}
      >
        <ProfileBlock
          taskReward={taskReward}
          taskRewardTotal={taskRewardTotal}
          taskRewardTitle={taskRewardTitle}
          backgroundImage={getHtml5Image(23, 'userBg')}
        />
        <ButtonGroup
          leftLogo={headTools[0]?.logo}
          rightLogo={headTools[1]?.logo}
          leftTitle={headTools[0]?.name}
          rightTitle={headTools[1]?.name}
          onPressLeftButton={() =>
            PushHelper.pushUserCenterType(headTools[0]?.code)
          }
          onPressRightButton={() =>
            PushHelper.pushUserCenterType(headTools[1]?.code)
          }
        />
        {[
          {
            title: '常用工具',
            tools: usuallyTools,
          },
          {
            title: '个人信息',
            tools: userTools,
          },
          {
            title: '投注记录',
            tools: recordTools,
          },
          {
            title: '优惠活动',
            tools: activityTools,
          },
        ].map((item, index) => {
          const { title, tools } = item
          return (
            <ToolBlock
              key={index}
              title={title}
              tools={tools}
              contentContainer={{
                marginBottom: index == 3 ? scaleHeight(70) : 0,
              }}
              renderTool={(item, index) => {
                const { code, name, logo } = item
                return (
                  <GameButton
                    key={index}
                    logo={logo}
                    title={name}
                    containerStyle={{ width: '25%', marginTop: scale(20) }}
                    imageContainerStyle={{ width: '30%' }}
                    titleContainerStyle={{ aspectRatio: 3 }}
                    enableCircle={false}
                    onPress={() => PushHelper.pushUserCenterType(code)}
                  />
                )
              }}
            />
          )
        })}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0D0D0',
  },
  imageBackgroundContainer: {
    width: '100%',
    aspectRatio: 500 / 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default WNZMinePage
