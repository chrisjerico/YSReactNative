import React, { useRef } from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import BackBtnComponent from '../../public/components/tars/BackBtnComponent'
import MenuModalComponent from '../../public/components/tars/MenuModalComponent'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, push } from '../../public/navigation/RootNavigation'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import { goToUserCenterType, useHtml5Image } from '../../public/tools/tars'
import GameButton from '../../public/views/tars/GameButton'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { JDSalaryListCP } from '../经典/cp/JDSalaryListCP'
import config from './config'
import ButtonGroup from './views/ButtonGroup'
import HomeHeader from './views/HomeHeader'
import MenuButton from './views/MenuButton'
import ProfileBlock from './views/ProfileBlock'
import ToolBlock from './views/ToolBlock'

const { getHtml5Image } = useHtml5Image('http://test05.6yc.com/')

const WNZMinePage = () => {
  const { current: v } = useRef<{} & JDSalaryListCP>({})

  const menu = useRef(null)

  const openMenu = () => {
    menu?.current?.open()
  }

  const closeMenu = () => {
    menu?.current?.close()
  }

  const { value, sign, rightMenus, show } = useMinePage({
    homePage: PageName.WNZHomePage,
    onSuccessSignOut: closeMenu,
    defaultUserCenterLogos: config.defaultUserCenterLogos,
  })

  const { userInfo, sysInfo } = value

  const { uid, usr, curLevelInt, nextLevelInt, taskRewardTotal, curLevelTitle, nextLevelTitle, unreadMsg, balance, isTest } = userInfo
  const { mobile_logo, userCenterItems } = sysInfo
  const { showBons } = show
  const { signOut } = sign

  // data handle
  const tools = userCenterItems?.sort((a, b) => a?.sorts - b?.sorts) ?? []
  const headrTools = tools?.slice(0, 2) ?? []
  const otherTools = tools?.slice(2, tools?.length ?? 2) ?? []

  const usuallyTools = otherTools?.filter((ele) =>
    [UGUserCenterType.额度转换, UGUserCenterType.全民竞猜, UGUserCenterType.利息宝, UGUserCenterType.开奖走势, UGUserCenterType.建议反馈, UGUserCenterType.存款, UGUserCenterType.取款].includes(
      ele?.code
    )
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
    ].includes(ele?.code)
  )

  const recordTools = otherTools?.filter((ele) =>
    [UGUserCenterType.开奖网, UGUserCenterType.其他注单记录, UGUserCenterType.活动彩金, UGUserCenterType.彩票注单记录, UGUserCenterType.长龙助手].includes(ele?.code)
  )

  const activityTools = otherTools?.filter((ele) => [UGUserCenterType.任务中心, UGUserCenterType.游戏大厅, UGUserCenterType.推荐收益].includes(ele?.code))
  // @ts-ignore
  const configMenus = uid ? config.menuSignOut.concat(config.menus) : config.menuSignIn.concat(config.menus)
  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <BackBtnComponent
          homePage={PageName.WNZHomePage}
          renderHeader={(props) => {
            return (
              <HomeHeader
                {...props}
                uid={uid}
                name={usr}
                logo={mobile_logo}
                balance={balance}
                onPressMenu={openMenu}
                onPressComment={goToUserCenterType.聊天室}
                onPressUser={goToUserCenterType.我的页}
              />
            )
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ProfileBlock
          showBonsTag={showBons}
          curLevelInt={curLevelInt}
          nextLevelInt={nextLevelInt}
          taskRewardTotal={taskRewardTotal}
          curLevelTitle={curLevelTitle}
          nextLevelTitle={nextLevelTitle}
          backgroundImage={getHtml5Image(23, 'userBg')}
          signImage={getHtml5Image(23, 'qiaodao')}
          onPressSign={goToUserCenterType.每日签到}
          onPressBonsTag={() => {
            v?.showSalaryAlert && v?.showSalaryAlert()
          }}
        />
        <ButtonGroup
          leftLogo={headrTools[0]?.logo}
          rightLogo={headrTools[1]?.logo}
          leftTitle={headrTools[0]?.name}
          rightTitle={headrTools[1]?.name}
          onPressLeftButton={() => PushHelper.pushUserCenterType(headrTools[0]?.code)}
          onPressRightButton={() => PushHelper.pushUserCenterType(headrTools[1]?.code)}
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
                    showUnReadMsg={code == UGUserCenterType.站内信 && unreadMsg > 0}
                    unreadMsg={unreadMsg || 0}
                    containerStyle={{ width: '25%', marginTop: scale(20) }}
                    imageContainerStyle={{ width: '30%' }}
                    titleContainerStyle={{ aspectRatio: 3 }}
                    enableCircle={false}
                    onPress={() => {
                      if (isTest && (code == UGUserCenterType.个人信息 || code == UGUserCenterType.推荐收益)) {
                        Alert.alert('温馨提示', '请先登录您的正式帐号', [
                          {
                            text: '取消',
                          },
                          {
                            text: '马上登录',
                            onPress: () => {
                              push(PageName.WNZSignInPage)
                            },
                          },
                        ])
                      } else if (code == UGUserCenterType.个人信息) {
                        navigate(PageName.UserInfoPage)
                      } else if (code == UGUserCenterType.站内信) {
                        navigate(PageName.UserMessagePage)
                      } else if (code == UGUserCenterType.活动彩金) {
                        navigate(PageName.ActivityRewardPage)
                      } else {
                        PushHelper.pushUserCenterType(code)
                      }
                    }}
                  />
                )
              }}
            />
          )
        })}
      </ScrollView>
      <MenuModalComponent
        ref={menu}
        menus={rightMenus?.length > 0 ? rightMenus : configMenus}
        renderMenuItem={({ item }) => {
          const { name, gameId, title, onPress } = item
          return (
            <MenuButton
              title={name ?? title}
              onPress={() => {
                if (gameId == 31) {
                  signOut()
                } else {
                  closeMenu()
                  if (onPress) {
                    onPress()
                  } else {
                    PushHelper.pushHomeGame(item)
                  }
                }
              }}
            />
          )
        }}
      />
      <JDSalaryListCP c_ref={v} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
  },
})

export default WNZMinePage
