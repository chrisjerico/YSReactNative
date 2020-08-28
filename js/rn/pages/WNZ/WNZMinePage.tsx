import React from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import PushHelper, { PushRightMenuFrom } from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import GameButton from '../../public/views/tars/GameButton'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import {
  LotteryType,
  UGUserCenterType,
} from '../../redux/model/全局/UGSysConfModel'
import ButtonGroup from './views/ButtonGroup'
import HomeHeader from './views/HomeHeader'
import ProfileBlock from './views/ProfileBlock'
import ToolBlock from './views/ToolBlock'
import config from './config'

const WNZMinePage = (props: any) => {
  const { setProps } = props
  const { getHtml5Image } = useHtml5Image()
  const {
    uid,
    showBackBtn,
    usr,
    mobile_logo,
    money,
    curLevelInt,
    nextLevelInt,
    taskRewardTotal,
    curLevelTitle,
    nextLevelTitle,
    userCenterItems,
    unreadMsg,
    fetchAvatarList,
  } = useMinePage({
    setProps,
    defaultUserCenterLogos: config.defaultUserCenterLogos,
  })

  // data handle

  const tools = userCenterItems?.sort((a, b) => a?.code - b?.code) ?? []
  const headrTools = tools?.slice(0, 2) ?? []
  const otherTools = tools?.slice(2, tools?.length ?? 2) ?? []

  const usuallyTools = otherTools?.filter((ele) =>
    [
      UGUserCenterType.额度转换,
      UGUserCenterType.全民竞猜,
      UGUserCenterType.利息宝,
      UGUserCenterType.开奖走势,
      UGUserCenterType.建议反馈,
      UGUserCenterType.存款,
      UGUserCenterType.取款,
    ].includes(ele.code)
  )

  const userTools = otherTools?.filter((ele) =>
    [
      UGUserCenterType.个人信息,
      UGUserCenterType.安全中心,
      UGUserCenterType.银行卡管理,
      UGUserCenterType.资金明细,
      UGUserCenterType.站内信,
      UGUserCenterType.聊天室,
      UGUserCenterType.在线客服,
      UGUserCenterType.QQ客服,
    ].includes(ele.code)
  )

  const recordTools = otherTools?.filter((ele) =>
    [
      UGUserCenterType.开奖网,
      UGUserCenterType.其他注单记录,
      UGUserCenterType.活动彩金,
      UGUserCenterType.彩票注单记录,
      UGUserCenterType.长龙助手,
    ].includes(ele.code)
  )

  const activityTools = otherTools?.filter((ele) =>
    [
      UGUserCenterType.任务中心,
      UGUserCenterType.游戏大厅,
      UGUserCenterType.推荐收益,
    ].includes(ele.code)
  )

  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <HomeHeader
          uid={uid}
          showBackBtn={showBackBtn}
          name={usr}
          logo={mobile_logo}
          balance={money}
          onPressMenu={() => {
            PushHelper.pushRightMenu(PushRightMenuFrom.首頁)
          }}
          onPressComment={() => {
            PushHelper.pushLottery(LotteryType.香港六合彩)
          }}
          onPressUser={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.我的页)
          }}
        />
      </SafeAreaHeader>
      <ScrollView
        style={styles.container}
        // refreshControl={<RefreshControlComponent onRefresh={fetchAvatarList} />}
        showsVerticalScrollIndicator={false}
      >
        <ProfileBlock
          curLevelInt={curLevelInt}
          nextLevelInt={nextLevelInt}
          taskRewardTotal={taskRewardTotal}
          curLevelTitle={curLevelTitle}
          nextLevelTitle={nextLevelTitle}
          backgroundImage={getHtml5Image(23, 'userBg')}
          signImage={getHtml5Image(23, 'qiaodao')}
          onPressSign={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.每日签到)
          }}
        />
        <ButtonGroup
          leftLogo={headrTools[0]?.logo}
          rightLogo={headrTools[1]?.logo}
          leftTitle={headrTools[0]?.name}
          rightTitle={headrTools[1]?.name}
          onPressLeftButton={() =>
            PushHelper.pushUserCenterType(headrTools[0]?.code)
          }
          onPressRightButton={() =>
            PushHelper.pushUserCenterType(headrTools[1]?.code)
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
                    showUnReadMsg={code == 9 && unreadMsg != 0}
                    unreadMsg={unreadMsg}
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
    backgroundColor: '#f2f2f2',
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
