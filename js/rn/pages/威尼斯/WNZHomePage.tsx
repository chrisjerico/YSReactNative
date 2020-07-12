import React from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { useSelector } from 'react-redux'
import { scale } from '../../helpers/function'
import PushHelper from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { IGlobalState } from '../../redux/store/UGStore'
import BannerBlock from '../../views/BannerBlock'
import GameButton from '../../views/GameButton'
import NoticeBlock from '../../views/NoticeBlock'
import ProgressCircle from '../../views/ProgressCircle'
import RankBlock from '../../views/RankBlock'
import TouchableImage from '../../views/TouchableImage'
import TabComponent from './components/TabComponent'
import Header from './views/Header'
import FastImage from 'react-native-fast-image'
import RowGameButtom from './views/RowGameButtom'

const WNZHomePage = () => {
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { avatar, balance, usr }: UGUserModel = userStore
  const { loading, banner, notice, homeGames, categoryList } = useGetHomeInfo([
    'system_banners',
    'notice_latest',
    'game_homeGames',
    'lhcdoc_categoryList'
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
  const leftGames = categoryList?.data ?? []

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <ProgressCircle />
      ) : (
          <>
            <Header name={usr} />
            <ScrollView
              style={styles.container}
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
              <TabComponent
                leftGames={leftGames}
                rightGames={leftGames}
                renderLeftGame={(item, index) => {
                  const { name, icon, show, id, desc } = item
                  return (
                    <RowGameButtom key={index} logo={icon} name={name} desc={desc} logoBallText={'官'} />
                  )
                }}
                renderRightGame={(item, index) => {
                  const { name, icon, show, id, desc } = item
                  return (
                    <RowGameButtom key={index} logo={icon} name={name} desc={desc} logoBallText={'信'} />
                  )
                }}
              />
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
