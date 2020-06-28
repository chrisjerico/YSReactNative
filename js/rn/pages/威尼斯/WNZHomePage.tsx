import React from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet, View
} from 'react-native'
import { scale } from '../../helpers/function'
import PushHelper from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import BannerBlock from '../../views/BannerBlock'
import GameButton from '../../views/GameButton'
import NoticeBlock from '../../views/NoticeBlock'
import ProgressCircle from '../../views/ProgressCircle'
import TouchableImage from '../../views/TouchableImage'
import TabComponent from './components/TabComponent'
import Header from './views/homes/Header'
import RankBlock from '../../views/RankBlock'

const WNZHomePage = () => {
  const { loading, banner, notice, homeGames } = useGetHomeInfo([
    'system_banners',
    'notice_latest',
    'game_homeGames',
  ])

  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const navs =
    homeGames?.data?.navs?.sort((nav: any) => -nav.sort)?.slice(0, 5) ?? []
  let games = []
  homeGames?.data?.icons?.forEach(
    (item) => (games = games.concat(item?.list) ?? [])
  )
  games = games.sort((game: any) => -game.sort)?.slice(0, 24) ?? []

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <ProgressCircle />
      ) : (
          <>
            <Header />
            <ScrollView
              style={[styles.container]}
              scrollEnabled={true}
              refreshControl={<RefreshControl refreshing={false} />}
            >
              <BannerBlock
                onlineNum={0}
                banners={banners}
                renderBanner={(item, index) => {
                  const { linkCategory, linkPosition, pic } = item
                  return (
                    <TouchableImage
                      key={index}
                      pic={pic}
                      onPress={() => {
                        PushHelper.pushCategory(linkCategory, linkPosition)
                      }}
                    />
                  )
                }}
              />
              <NoticeBlock
                containerStyle={{ borderRadius: 0, marginBottom: scale(10) }}
                iconContainerStyle={{
                  borderColor: 'red',
                  borderWidth: scale(1),
                  marginHorizontal: scale(10),
                  borderRadius: scale(2),
                }}
                notices={notices}
                onPressNotice={({ value }) => PushHelper.pushNoticePopUp(value)}
                logoTextStyle={{ color: 'red' }}
              />
              <View style={{ flexDirection: 'row' }}>
                {navs.map((item, index) => {
                  const { icon, name } = item
                  return (
                    <GameButton
                      key={index}
                      logo={icon}
                      title={name}
                      containerStyle={{
                        width: '20%',
                        backgroundColor: '#ffffff',
                        height: 115,
                        justifyContent: 'center',
                      }}
                      circleColor={'transparent'}
                    />
                  )
                })}
              </View>
              <TouchableImage
                pic={
                  'http://test10.6yc.com/views/mobileTemplate/23/images/home/banner.gif'
                }
                onPress={() => { }}
                containerStyle={{ width: '100%', aspectRatio: 4 }}
              />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {games.map((item, index) => {
                  const { logo, name } = item
                  return (
                    <View
                      key={index}
                      style={{
                        width: '25%',
                        height: scale(125),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <GameButton
                        logo={logo}
                        title={name}
                        containerStyle={{
                          width: '90%',
                          backgroundColor: '#ffffff',
                          height: '90%',
                          borderRadius: scale(10),
                        }}
                        circleColor={'transparent'}
                      />
                    </View>
                  )
                })}
              </View>
              <TabComponent />
              <RankBlock rankLists={[]} rankContainerStyle={{ borderRadius: 0 }} />
            </ScrollView>
          </>
        )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0D0D0',
  },
  safeArea: {
    backgroundColor: '#BF242A',
    flex: 1,
  },
})
export default WNZHomePage
