import React from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import PushHelper from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import { scale } from '../../public/tools/Scale'
import BannerBlock from '../../public/views/tars/BannerBlock'
import GameButton from '../../public/views/tars/GameButton'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import TouchableImage from '../../public/views/tars/TouchableImage'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { IGlobalState } from '../../redux/store/UGStore'
import TabComponent from './components/TabComponent'
import Header from './views/Header'
import RowGameButtom from './views/RowGameButtom'
import UGSysConfModel from '../../redux/model/全局/UGSysConfModel'

const WNZHomePage = () => {
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const SystemStore = useSelector((state: IGlobalState) => state.SysConfReducer)
  const { avatar, balance, usr }: UGUserModel = userStore
  const { mobile_logo }: UGSysConfModel = SystemStore
  const { loading, banner, notice, homeGames, categoryList } = useGetHomeInfo([
    'system_banners',
    'notice_latest',
    'game_homeGames',
    'lhcdoc_categoryList',
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
            <Header name={usr} logo={mobile_logo} />
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
                    <RowGameButtom
                      key={index}
                      logo={icon}
                      name={name}
                      desc={desc}
                      logoBallText={'官'}
                    />
                  )
                }}
                renderRightGame={(item, index) => {
                  const { name, icon, show, id, desc } = item
                  return (
                    <RowGameButtom
                      key={index}
                      logo={icon}
                      name={name}
                      desc={desc}
                      logoBallText={'信'}
                    />
                  )
                }}
              />
              <AnimatedRankComponent
                rankLists={[]}
                rankContainerStyle={{ borderRadius: 0 }}
              />
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
