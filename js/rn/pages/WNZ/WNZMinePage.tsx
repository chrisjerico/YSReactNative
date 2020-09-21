import React, { useRef } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import GameButton from '../../public/views/tars/GameButton'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { LotteryType } from '../../redux/model/全局/UGLotteryModel'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import MenuModalComponent from './components/MenuModalComponent'
import MineHeaderComponent from './components/MineHeaderComponent'
import config from './config'
import ButtonGroup from './views/ButtonGroup'
import Menu from './views/Menu'
import ProfileBlock from './views/ProfileBlock'
import ToolBlock from './views/ToolBlock'

const { getHtml5Image } = useHtml5Image('http://test05.6yc.com/')

const WNZMinePage = () => {
  const menu = useRef(null)

  const { value, sign } = useMinePage({
    defaultUserCenterLogos: config.defaultUserCenterLogos,
  })

  const {
    uid,
    usr,
    mobile_logo,
    curLevelInt,
    nextLevelInt,
    taskRewardTotal,
    curLevelTitle,
    nextLevelTitle,
    userCenterItems,
    unreadMsg,
    balance,
  } = value

  const { signOut } = sign

  // data handle
  const tools = userCenterItems?.sort((a, b) => a?.sorts - b?.sorts) ?? []
  const headrTools = tools?.slice(0, 2) ?? []
  const otherTools = tools?.slice(2, tools?.length ?? 2) ?? []

  const usuallyTools = otherTools?.filter((ele) =>
    [
      UGUserCenterType.额度转换.toString(),
      UGUserCenterType.全民竞猜.toString(),
      UGUserCenterType.利息宝.toString(),
      UGUserCenterType.开奖走势.toString(),
      UGUserCenterType.建议反馈.toString(),
      UGUserCenterType.存款.toString(),
      UGUserCenterType.取款.toString(),
    ].includes(ele.code.toString())
  )

  const userTools = otherTools?.filter((ele) =>
    [
      UGUserCenterType.个人信息.toString(),
      UGUserCenterType.安全中心.toString(),
      UGUserCenterType.银行卡管理.toString(),
      UGUserCenterType.资金明细.toString(),
      UGUserCenterType.站内信.toString(),
      UGUserCenterType.聊天室.toString(),
      UGUserCenterType.在线客服.toString(),
      UGUserCenterType.QQ客服.toString(),
    ].includes(ele.code.toString())
  )

  const recordTools = otherTools?.filter((ele) =>
    [
      UGUserCenterType.开奖网.toString(),
      UGUserCenterType.其他注单记录.toString(),
      UGUserCenterType.活动彩金.toString(),
      UGUserCenterType.彩票注单记录.toString(),
      UGUserCenterType.长龙助手.toString(),
    ].includes(ele.code.toString())
  )

  const activityTools = otherTools?.filter((ele) =>
    [
      UGUserCenterType.任务中心.toString(),
      UGUserCenterType.游戏大厅.toString(),
      UGUserCenterType.推荐收益.toString(),
    ].includes(ele.code.toString())
  )
  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <MineHeaderComponent
          uid={uid}
          name={usr}
          logo={mobile_logo}
          balance={balance}
          onPressMenu={() => {
            menu?.current?.open()
          }}
          onPressComment={() => {
            PushHelper.pushLottery(LotteryType.香港六合彩)
          }}
          onPressUser={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.我的页)
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
      <MenuModalComponent
        ref={menu}
        menus={
          uid
            ? config?.menus?.concat(config?.menuSignOut)
            : // @ts-ignore
            config?.menuSignIn?.concat(config?.menus)
        }
        renderMenu={({ item }) => {
          const { title, onPress } = item
          return (
            <Menu
              color={WNZThemeColor.威尼斯.themeColor}
              title={title}
              onPress={() => {
                if (title == '安全退出') {
                  signOut()
                } else {
                  menu?.current?.close()
                  onPress && onPress()
                }
              }}
            />
          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
  },
})

export default WNZMinePage
