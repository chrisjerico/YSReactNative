import React from 'react'
import {
  ScrollView,
  StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import PushHelper from '../../public/define/PushHelper'
import useMemberItems from '../../public/hooks/useMemberItems'
import { PageName } from '../../public/navigation/Navigation'
import { navigate } from '../../public/navigation/RootNavigation'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import GameButton from '../../public/views/tars/GameButton'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import UGSysConfModel, { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { IGlobalState } from '../../redux/store/UGStore'
import ButtonGroup from './components/ButtonGroup'
import HomeHeader from './components/HomeHeader'
import ProfileBlock from './components/ProfileBlock'
import ToolBlock from './components/ToolBlock'

const WNZMinePage = () => {
  const { balance, usr, taskRewardTitle, taskReward, taskRewardTotal }: UGUserModel = useSelector(
    (state: IGlobalState) => state.UserInfoReducer
  )
  const { mobile_logo }: UGSysConfModel = useSelector(
    (state: IGlobalState) => state.SysConfReducer
  )
  const { UGUserCenterItem } = useMemberItems()
  const headTools = UGUserCenterItem.filter((ele) =>
    [UGUserCenterType.存款, UGUserCenterType.取款].includes(ele.code)
  )
  const usuallyTools = UGUserCenterItem.filter((ele) =>
    [
      UGUserCenterType.额度转换,
      UGUserCenterType.全民竞猜,
      UGUserCenterType.利息宝,
      UGUserCenterType.建议反馈,
      UGUserCenterType.开奖走势,
      UGUserCenterType.资金明细,
    ].includes(ele.code)
  )

  const userTools = UGUserCenterItem.filter((ele) =>
    [UGUserCenterType.个人信息].includes(ele.code)
  )

  const recordTools = UGUserCenterItem.filter((ele) =>
    [UGUserCenterType.六合彩, UGUserCenterType.其他注单记录].includes(ele.code)
  )

  const activityTools = UGUserCenterItem.filter((ele) =>
    [UGUserCenterType.任务中心].includes(ele.code)
  )

  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <HomeHeader
          name={usr}
          logo={mobile_logo}
          balance={balance}
          onPressMenu={() => { }}
          onPressComment={() => {
            console.log('去六合彩')
          }}
          onPressUser={() => navigate(PageName.WNZMinePage, {})}
        />
      </SafeAreaHeader>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControlComponent onRefresh={() => { }} />}
      >
        <ProfileBlock
          taskReward={taskReward}
          taskRewardTotal={taskRewardTotal}
          taskRewardTitle={taskRewardTitle}
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
                    imageStyle={{ width: '30%' }}
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
