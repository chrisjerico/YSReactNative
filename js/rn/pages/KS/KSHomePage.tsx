import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import RandomTextComponent from '../../public/components/tars/RandomTextComponent'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { PageName } from '../../public/navigation/Navigation'
import { navigate } from '../../public/navigation/RootNavigation'
import { skinColors } from '../../public/theme/const/UGSkinColor'
import { scale } from '../../public/tools/Scale'
import { UGImageHost, useHtml5Image } from '../../Res/icon'
import BannerBlock from '../../public/views/tars/BannerBlock'
import GameButton from '../../public/views/tars/GameButton'
import HomePage from '../../public/views/tars/HomePage'
import LinearBadge from '../../public/views/tars/LinearBadge'
import List from '../../public/views/tars/List'
import TouchableImage from '../../public/views/tars/TouchableImage'
import CoverButton from './views/CoverButton'
import HomeHeader from './views/HomeHeader'
import MoreGameButton from './views/MoreGameButton'
import ProfileBlock from './views/ProfileBlock'
import { goToUserCenterType } from '../../public/tools/tars'
import { UGText } from '../../../doy/public/Button之类的基础组件/DoyButton'

const buttonHeight = scale(82)
const { getHtml5Image } = useHtml5Image(UGImageHost.t132f)

const KSHomePage = () => {
  const { goTo, refresh, info, sign } = useHomePage({})

  const { loading, refreshing, userInfo, sysInfo, homeInfo } = info

  const { bannersInterval, onlineNum, banners, homeGamesConcat } = homeInfo
  const { mobile_logo } = sysInfo

  const smallGames = homeGamesConcat?.slice(4, 8) ?? []
  const moreGames = homeGamesConcat?.slice(8, homeGamesConcat?.length) ?? []
  const { tryPlay } = sign

  return (
    <HomePage
      {...homeInfo}
      {...userInfo}
      {...sysInfo}
      {...goTo}
      showBannerBlock={false}
      loading={loading}
      refreshing={refreshing}
      refresh={refresh}
      refreshTintColor={'#ffffff'}
      pagekey={'KSHomePage'}
      containerStyle={{ backgroundColor: skinColors.themeColor.凯时 }}
      headerColor={skinColors.themeColor.凯时}
      couponBlockStyles={couponBlockStyles}
      couponStyles={couponStyles}
      animatedRankComponentStyles={animatedRankComponentStyles}
      noticeBlockStyles={noticeBlockStyles}
      bottomLogoStyles={bottomLogoStyles}
      renderHeader={() => null}
      renderListHeaderComponent={() => (
        <>
          <HomeHeader logo={mobile_logo} />
          <ProfileBlock {...userInfo} {...sysInfo} onPressSignUpButton={() => navigate(PageName.KSSignUpPage)} onPressTryPlay={tryPlay} onPressUnReadMsg={goToUserCenterType.站内信} />
          <View style={styles.toolBlock}>
            <LinearBadge
              colors={['#eb5d4d', '#fb7a24']}
              containerStyle={[styles.toolButton, { marginLeft: '1%' }]}
              title={'存款'}
              textStyle={{ color: '#ffffff', fontSize: scale(20) }}
              showIcon={false}
              showLogo={true}
              logo={getHtml5Image(22, 'depositlogo')}
              onPress={goToUserCenterType.存款}
            />
            <LinearBadge
              colors={['#3a3a41', '#3a3a41']}
              containerStyle={styles.toolButton}
              title={'额度转换'}
              textStyle={{ color: '#ffffff', fontSize: scale(20) }}
              showIcon={false}
              showLogo={true}
              logo={getHtml5Image(22, 'xima')}
              onPress={goToUserCenterType.额度转换}
            />
            <LinearBadge
              colors={['#3a3a41', '#3a3a41']}
              containerStyle={[styles.toolButton, { marginRight: '1%' }]}
              title={'取款'}
              textStyle={{ color: '#ffffff', fontSize: scale(20) }}
              showIcon={false}
              showLogo={true}
              logo={getHtml5Image(22, 'withdrawlogo')}
              onPress={goToUserCenterType.取款}
            />
          </View>
          <View style={[styles.toolBlock, { height: scale(158) }]}>
            <View style={{ alignItems: 'center', marginLeft: '1%', marginRight: '0.5%', width: '32%', justifyContent: 'space-between' }}>
              <LinearBadge
                colors={['#3a3a41', '#3a3a41']}
                containerStyle={[styles.toolButton, { marginHorizontal: null, width: '100%', height: scale(76) }]}
                title={'利息宝'}
                textStyle={{ color: '#ffffff', fontSize: scale(20) }}
                showIcon={false}
                showLogo={true}
                logo={getHtml5Image(22, 'lxb')}
                onPress={goToUserCenterType.利息宝}
              />
              <LinearBadge
                colors={['#3a3a41', '#3a3a41']}
                containerStyle={[styles.toolButton, { marginHorizontal: null, width: '100%', height: scale(76) }]}
                title={'游戏大厅'}
                textStyle={{ color: '#ffffff', fontSize: scale(20) }}
                showIcon={false}
                showLogo={true}
                logo={getHtml5Image(22, 'yxdt')}
                onPress={goToUserCenterType.彩票大厅}
              />
            </View>
            <BannerBlock
              containerStyle={{ marginLeft: '0.5%', width: '65%', marginRight: '1%', aspectRatio: null, height: '100%' }}
              autoplayTimeout={bannersInterval}
              badgeStyle={{ top: -scale(150) }}
              onlineNum={onlineNum}
              showOnlineNum={true}
              banners={banners}
              renderBanner={(item, index) => {
                //@ts-ignore
                const { linkCategory, linkPosition, pic } = item
                return (
                  <TouchableImage
                    key={index}
                    pic={pic}
                    containerStyle={{ width: '100%', height: '100%' }}
                    resizeMode={'stretch'}
                    onPress={() => {
                      PushHelper.pushCategory(linkCategory, linkPosition)
                    }}
                  />
                )
              }}
            />
          </View>
          <View style={[styles.toolBlock, { height: scale(212) }]}>
            <CoverButton
              logo={homeGamesConcat[0]?.icon || homeGamesConcat[0]?.logo}
              containerStyle={{ marginLeft: '1%', width: '60%', marginRight: '0.5%', height: '100%', backgroundColor: '#3a3a41', borderRadius: scale(5) }}
              titleStyle={{ fontSize: scale(25) }}
              onPress={() => PushHelper.pushHomeGame(homeGamesConcat[0])}
            />
            <View style={{ alignItems: 'center', marginRight: '1%', marginLeft: '0.5%', width: '37%', justifyContent: 'space-between' }}>
              <CoverButton
                logo={homeGamesConcat[1]?.icon || homeGamesConcat[1]?.logo}
                containerStyle={{ width: '100%', height: scale(102), backgroundColor: '#3a3a41', borderRadius: scale(5) }}
                titleStyle={{ fontSize: scale(25) }}
                onPress={() => PushHelper.pushHomeGame(homeGamesConcat[1])}
              />
              <CoverButton
                logo={homeGamesConcat[2]?.icon || homeGamesConcat[2]?.logo}
                containerStyle={{ width: '100%', height: scale(102), backgroundColor: '#3a3a41', borderRadius: scale(5) }}
                titleStyle={{ fontSize: scale(25) }}
                onPress={() => PushHelper.pushHomeGame(homeGamesConcat[2])}
              />
            </View>
          </View>
          <View style={[styles.toolBlock, { height: scale(205) }]}>
            <View style={{ marginLeft: '1%', width: '77%', marginRight: '0.5%', height: '100%', backgroundColor: '#3a3a41', borderRadius: scale(5) }}>
              <View style={{ flex: 1 }}>
                <ImageBackground source={{ uri: 'https://a06frontweb.cathayfund.com/cdn/A06FM/img/pmd.57681c5.gif' }} style={{ width: '100%', height: '100%' }} resizeMode={'stretch'}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                      <UGText style={{ fontSize: scale(15), color: '#ffffff', marginBottom: scale(5) }}>{'电子娱乐'}</UGText>
                      <UGText style={{ fontSize: scale(15), color: '#ffffff', marginTop: scale(5) }}>{'总奖金池'}</UGText>
                    </View>
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'flex-start' }}>
                      <RandomTextComponent style={{ color: '#ffb029', fontSize: scale(30) }} />
                    </View>
                  </View>
                </ImageBackground>
              </View>
              <View style={{ flex: 1.5, flexDirection: 'row' }}>
                {smallGames?.map((item, index) => {
                  const { logo, name, icon, title } = item
                  return (
                    <GameButton
                      key={index}
                      containerStyle={{ width: '25%', height: '100%', marginTop: scale(5) }}
                      imageContainerStyle={{ width: '70%', aspectRatio: 1 }}
                      titleStyle={{ color: '#97989d' }}
                      enableCircle={false}
                      logo={icon || logo}
                      title={name || title}
                      showSecondLevelIcon={false}
                      showSubTitle={false}
                      showUnReadMsg={false}
                      showCenterFlag={false}
                      showRightTopFlag={false}
                    />
                  )
                })}
              </View>
            </View>
            <CoverButton
              logo={homeGamesConcat[3]?.icon || homeGamesConcat[3]?.logo}
              containerStyle={{ marginRight: '1%', marginLeft: '0.5%', width: '20%', height: '100%', backgroundColor: '#3a3a41', borderRadius: scale(5) }}
              titleStyle={{ fontSize: scale(25) }}
              onPress={() => PushHelper.pushHomeGame(homeGamesConcat[3])}
            />
          </View>
          <View style={[styles.toolBlock, { backgroundColor: '#3a3a41', marginHorizontal: '1%', borderRadius: scale(5), flexDirection: 'column', width: null, height: null, alignItems: 'center' }]}>
            <View style={{ width: '90%' }}>
              <UGText style={{ color: '#ffffff', fontSize: scale(22), marginVertical: scale(20), fontWeight: '500' }}>{'更多游戏'}</UGText>
            </View>
            <List
              uniqueKey={'KSHomePage_MoreGames'}
              data={moreGames}
              renderItem={({ item }) => {
                const { name, logo, title, icon, subtitle } = item
                return (
                  <MoreGameButton
                    title={name || title}
                    subtitle={subtitle}
                    logo={icon || logo}
                    onPress={() => {
                      PushHelper.pushHomeGame(item)
                    }}
                  />
                )
              }}
            />
          </View>
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  toolBlock: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: scale(8),
    height: buttonHeight,
  },
  toolButton: {
    width: '32%',
    borderRadius: scale(5),
    height: '100%',
    marginHorizontal: '0.5%',
  },
})

const noticeBlockStyles = StyleSheet.create({
  containerStyle: { backgroundColor: skinColors.themeColor.凯时, borderRadius: 0 },
  bgContainerStyle: { backgroundColor: skinColors.themeColor.凯时 },
  logoTextStyle: {
    color: '#95979f',
    fontSize: scale(20),
    paddingHorizontal: scale(5),
  },
  textStyle: {
    color: '#95979f',
    fontSize: scale(18),
  },
})

const couponBlockStyles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: '1%',
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
  titleStyle: { color: '#ffffff' },
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
    backgroundColor: '#3a3a41',
    marginHorizontal: '1%',
    borderRadius: scale(10),
  },
  contentTitleStyle: { color: '#ffffff' },
  iconTitleContainerStyle: {
    backgroundColor: '#3a3a41',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  contentContainerStyle: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: scale(20),
    backgroundColor: '#3a3a41',
  },
  iconStyle: {
    color: '#ffffff',
  },
})

const bottomLogoStyles = StyleSheet.create({
  containerStyle: { marginBottom: scale(5) },
  titleStyle: { color: '#ffffff' },
  subTitleStyle: { color: '#97989d' },
})

export default KSHomePage
