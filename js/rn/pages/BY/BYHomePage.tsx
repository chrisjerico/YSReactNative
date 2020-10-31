import React, { useRef } from 'react'
import MenuModalComponent from '../../public/components/tars/MenuModalComponent'
import TabComponent from '../../public/components/tars/TabComponent'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import { scale } from '../../public/tools/Scale'
import { goToUserCenterType } from '../../public/tools/tars'
import GameButton from '../../public/views/tars/GameButton'
import HomePage from '../../public/views/tars/HomePage'
import List from '../../public/views/tars/List'
import config from './config'
import GameRowButton from './views/GameRowButton'
import HomeHeader from './views/HomeHeader'
import Menu from './views/Menu'

const onPressSignIn = () => push(PageName.BYSignInPage)
const onPressSignUp = () => push(PageName.BYSignUpPage)

const BYHomePage = () => {
  const menu = useRef(null)

  const { refresh, value, sign, goTo } = useHomePage({
    onSuccessSignOut: () => {
      menu?.current?.close()
    },
  })
  const { loading, refreshing, userInfo, sysInfo, homeInfo } = value

  const { homeGames } = homeInfo
  const { uid, usr, balance } = userInfo
  const { mobile_logo, balanceDecimal } = sysInfo

  const { signOut, tryPlay } = sign

  const menus = config.menus.map((ele) => {
    const { onPress, title } = ele
    return Object.assign({}, ele, {
      onPress: () => {
        if (title == '退出登录') {
          signOut()
        } else {
          menu?.current?.close()
          onPress()
        }
      },
    })
  })

  return (
    <HomePage
      {...homeInfo}
      {...userInfo}
      {...sysInfo}
      {...goTo}
      pagekey={'BYHomePage'}
      headerColor={'#ffffff'}
      loading={loading}
      refreshing={refreshing}
      refresh={refresh}
      items={homeGames}
      renderHeader={() => (
        <HomeHeader
          logo={mobile_logo}
          uid={uid}
          onPressSignIn={onPressSignIn}
          onPressSignUp={onPressSignUp}
          onPressTryPlay={tryPlay}
          onPressMenu={() => menu?.current?.open()}
          onPressMessege={goToUserCenterType.站内信}
        />
      )}
      renderListHeaderComponent={() => (
        <>
          <List
            uniqueKey={'BYHomePage_Navs'}
            horizontal={true}
            scrollEnabled={true}
            data={homeGames}
            style={{ backgroundColor: '#ffffff', borderRadius: scale(10), marginHorizontal: '1%', marginTop: scale(10) }}
            renderItem={({ item }) => {
              const { logo, name } = item
              return (
                <GameButton
                  logo={logo}
                  title={name}
                  showSubTitle={false}
                  enableCircle={false}
                  titleContainerStyle={{ aspectRatio: 5 }}
                  containerStyle={{
                    marginBottom: scale(30),
                    marginTop: scale(10),
                  }}
                  onPress={() => {
                    PushHelper.pushHomeGame(item)
                  }}
                />
              )
            }}
          />
          <TabComponent
            numColumns={1}
            tabGames={homeGames}
            renderScene={({ item, index }) => (
              <List
                uniqueKey={'BYHomePageTabComponent' + index}
                data={item}
                renderItem={({ item }) => (
                  <GameRowButton
                    {...item}
                    onPress={() => {
                      PushHelper.pushHomeGame(item)
                    }}
                  />
                )}
              />
            )}
            itemHeight={scale(150)}
            focusTabColor={'#387ef5'}
            containerStyle={{ backgroundColor: '#ffffff', marginHorizontal: '1%', marginTop: scale(10), borderRadius: scale(10) }}
          />
        </>
      )}
      renderItem={() => null}
      renderRestComponent={() => (
        <MenuModalComponent
          ref={menu}
          direction={'left'}
          listStyle={{ marginTop: 0, marginBottom: 0 }}
          renderMenu={() => <Menu menus={menus} balanceDecimal={balanceDecimal} balance={balance} usr={usr} uid={uid} />}
        />
      )}
    />
  )
}

export default BYHomePage
