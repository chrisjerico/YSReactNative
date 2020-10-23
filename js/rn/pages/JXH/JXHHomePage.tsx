import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import TabComponent from '../../public/components/tars/TabComponent'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { KSThemeColor } from '../../public/theme/colors/KSThemeColor'
import { scale } from '../../public/tools/Scale'
import { goToUserCenterType } from '../../public/tools/tars'
import HomePage from '../../public/views/tars/HomePage'
import List from '../../public/views/tars/List'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import TouchableImage from '../../public/views/tars/TouchableImage'
import ProfileBlock from './views/ProfileBlock'

const JXHHomePage = () => {
  const { goTo, refresh, value, sign } = useHomePage({})

  const { goToJDPromotionListPage } = goTo
  const { loading, refreshing, userInfo, sysInfo, homeInfo } = value

  const { bannersInterval, onlineNum, banners, notices, announcements, homeGames, coupons, rankLists, floatAds, redBag, redBagLogo, roulette } = homeInfo
  const { uid, usr, balance, isTest, curLevelTitle, unreadMsg, avatar } = userInfo
  const { mobile_logo, webName, showCoupon, rankingListType } = sysInfo

  const lotterys = homeGames[0]?.list ?? []

  const { tryPlay } = sign

  const renderGame = useCallback(({ item }) => {
    const { logo, icon } = item
    return (
      <TouchableImage
        pic={icon || logo}
        onPress={() => {
          PushHelper.pushHomeGame(item)
        }}
        containerStyle={{ width: '50%', height: scale(180), marginVertical: scale(10), flex: null }}
        resizeMode={'contain'}
      />
    )
  }, [])

  const renderScene = useCallback(({ item, index }) => {
    return <List uniqueKey={'JXHHomePageTabComponent' + index} style={{}} data={item} renderItem={renderGame} numColumns={2} />
  }, [])

  return (
    <HomePage
      {...homeInfo}
      {...userInfo}
      {...sysInfo}
      {...goTo}
      loading={loading}
      refreshing={refreshing}
      refresh={refresh}
      pagekey={'JXHHomePage'}
      themeColor={''}
      containerStyle={styles.container}
      couponBlockStyles={couponBlockStyles}
      couponStyles={couponStyles}
      animatedRankComponentStyles={animatedRankComponentStyles}
      bottomLogoStyles={bottomLogoStyles}
      renderHeader={() => null}
      renderListHeaderComponent={() => (
        <>
          <NoticeBlock
            containerStyle={{ backgroundColor: KSThemeColor.凯时.themeColor, borderRadius: 0 }}
            bgContainerStyle={{ backgroundColor: KSThemeColor.凯时.themeColor }}
            logoTextStyle={{
              color: '#95979f',
              fontSize: scale(18),
              paddingHorizontal: scale(5),
            }}
            textStyle={{
              color: '#95979f',
              fontSize: scale(18),
            }}
            notices={notices}
            onPressNotice={({ content }) => {
              PushHelper.pushNoticePopUp(content)
            }}
          />
          <ProfileBlock
            {...(userInfo as any)}
            onPressTryPlay={tryPlay}
            onPressLeftButton={goToUserCenterType.存款}
            onPressRightButton={goToUserCenterType.取款}
            onPressExchange={() =>
              goToJDPromotionListPage({
                backgroundColor: '#282828',
              })
            }
          />
          <TabComponent
            tabBarBackgroundColor={'#000000'}
            tabTextColor={'#ffffff'}
            numColumns={2}
            initialTabIndex={0}
            focusTabColor={'#cfa461'}
            tabGames={homeGames}
            itemHeight={scale(200)}
            renderScene={renderScene}
          />
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingHorizontal: '1%',
  },
})

const couponBlockStyles = StyleSheet.create({
  containerStyle: {
    marginTop: scale(10),
    width: null,
  },
  titleContainerStyle: {
    backgroundColor: '#3a3a41',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  listContainerStyle: {
    backgroundColor: '#3a3a41',
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
  },
  titleStyle: {
    color: '#ffffff',
  },
})

const couponStyles = StyleSheet.create({
  titleStyle: {
    alignSelf: 'center',
    color: '#ffffff',
  },
  containerStyle: {
    borderColor: '#d9d9d9',
    borderWidth: scale(1),
    marginBottom: scale(20),
    padding: scale(5),
    borderRadius: scale(5),
    paddingBottom: scale(20),
  },
})

const animatedRankComponentStyles = StyleSheet.create({
  iconTitleStyle: {
    color: '#ffffff',
  },
  containerStyle: {
    marginTop: scale(10),
    backgroundColor: '#282828',
    borderRadius: scale(10),
  },
  contentTitleStyle: {
    color: '#ffffff',
  },
  iconTitleContainerStyle: {
    backgroundColor: '#282828',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  contentContainerStyle: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: scale(20),
    backgroundColor: '#282828',
  },
  iconStyle: {
    color: '#ffffff',
  },
})

const bottomLogoStyles = StyleSheet.create({
  containerStyle: {
    marginBottom: scale(5),
  },
  titleStyle: {
    color: '#ffffff',
  },
  subTitleStyle: {
    color: '#97989d',
  },
})

export default JXHHomePage
