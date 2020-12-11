import React, { useCallback } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import TabComponent from '../../public/components/tars/TabComponent'
import AppDefine from '../../public/define/AppDefine'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { PageName } from '../../public/navigation/Navigation'
import { navigate } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { scale } from '../../public/tools/Scale'
import { goToUserCenterType } from '../../public/tools/tars'
import HomePage from '../../public/views/tars/HomePage'
import List from '../../public/views/tars/List'
import TouchableImage from '../../public/views/tars/TouchableImage'
import PopularGameTabPage from './views/PopularGameTabPage'
import ProfileBlock from './views/ProfileBlock'

const JXHHomePage = () => {
  const { goTo, refresh, info, sign } = useHomePage({})

  const { goToPromotionPage } = goTo
  const { loading, refreshing, userInfo, sysInfo, homeInfo } = info

  const { homeGames } = homeInfo
  const { isTest, avatar } = userInfo

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

  const renderScene = ({ item, index }) => {
    if (index) {
      return <List uniqueKey={'JXHHomePageTabComponent' + index} style={{}} data={item} renderItem={renderGame} numColumns={2} />
    } else {
      return <PopularGameTabPage games={homeGames[0]} />
    }
  }

  return (
    <ImageBackground source={require('./jxhbackground.png')} style={{ flex: 1 }}>
      <HomePage
        {...homeInfo}
        {...userInfo}
        {...sysInfo}
        {...goTo}
        loading={loading}
        refreshing={refreshing}
        refresh={refresh}
        pagekey={'JXHHomePage'}
        headerColor={'#000000'}
        containerStyle={styles.container}
        noticeBlockStyles={noticeBlockStyles}
        couponBlockStyles={couponBlockStyles}
        couponStyles={couponStyles}
        animatedRankComponentStyles={animatedRankComponentStyles}
        bottomLogoStyles={bottomLogoStyles}
        renderHeader={() => null}
        renderListHeaderComponent={() => (
          <>
            <ProfileBlock
              {...(userInfo as any)}
              avatar={isTest || !avatar ? AppDefine.defaultAvatar : avatar}
              onPressTryPlay={tryPlay}
              onPressLeftButton={goToUserCenterType.存款}
              onPressRightButton={goToUserCenterType.取款}
              onPressExchange={goToPromotionPage}
              onPressSignInButton={() => {
                navigate(PageName.JXHSignInPage)
              }}
              onPressSignUpButton={() => {
                navigate(PageName.JXHSignUpPage)
              }}
              onPressForgetPassword={goToUserCenterType.在线客服}
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
              fixedHeight={scale(900)}
              fixedHeightIndex={[0]}
              enableFixedHeight
            />
          </>
        )}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: '1%',
  },
})

const noticeBlockStyles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  bgContainerStyle: {
    backgroundColor: 'transparent',
  },
  logoTextStyle: {
    color: '#95979f',
    fontSize: scale(18),
    paddingHorizontal: scale(5),
  },
  textStyle: {
    color: '#ffffff',
    fontSize: scale(18),
  },
})

const couponBlockStyles = StyleSheet.create({
  containerStyle: {
    marginTop: scale(10),
    width: null,
    backgroundColor: '#2a2a2a',
  },
  titleContainerStyle: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  listContainerStyle: {
    backgroundColor: '#2a2a2a',
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
    backgroundColor: '#2a2a2a',
  },
})

const animatedRankComponentStyles = StyleSheet.create({
  iconTitleStyle: {
    color: '#ffffff',
  },
  containerStyle: {
    marginTop: scale(10),
    backgroundColor: '#2a2a2a',
    borderRadius: scale(10),
  },
  contentTitleStyle: {
    color: '#ffffff',
  },
  iconTitleContainerStyle: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  contentContainerStyle: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: scale(20),
    backgroundColor: '#2a2a2a',
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
