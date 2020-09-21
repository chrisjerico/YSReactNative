import React from 'react'
import { ScrollView } from 'react-native'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import PushHelper from '../../public/define/PushHelper'
import { SeriesId } from '../../public/models/Enum'
import { PageName } from '../../public/navigation/Navigation'
import { navigate } from '../../public/navigation/RootNavigation'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale } from '../../public/tools/Scale'
import { stringToNumber } from '../../public/tools/tars'
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomGap from '../../public/views/tars/BottomGap'
import GameButton from '../../public/views/tars/GameButton'
import List from '../../public/views/tars/List'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import { UGStore } from '../../redux/store/UGStore'

const WNZGameLobbyPage = ({ route }) => {
  const { title } = route?.params ?? { title: '棋牌游戏' }

  const gameLobby = UGStore.globalProps.gameLobby
  const banner = UGStore.globalProps.banner
  const bannersInterval = stringToNumber(banner?.interval)
  const banners = banner?.list ?? []
  const item = gameLobby?.find((item: any) =>
    title.includes(item?.categoryName)
  )
  const { games, categoryName } = item ?? {}

  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <MineHeader
          showBackBtn={true}
          onPressBackBtn={() => {
            OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [
              0,
            ]).then(() => {
              navigate(PageName.WNZHomePage, {})
            })
          }}
          title={title}
        />
      </SafeAreaHeader>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BannerBlock
          containerStyle={{ aspectRatio: 540 / 230 }}
          badgeStyle={{ top: scale(-230) }}
          autoplayTimeout={bannersInterval}
          showOnlineNum={false}
          showsPagination={false}
          banners={banners}
          renderBanner={(item, index) => {
            const { linkCategory, linkPosition, pic } = item
            return (
              <TouchableImage
                key={index}
                pic={pic}
                resizeMode={'stretch'}
                onPress={() => {
                  PushHelper.pushCategory(linkCategory, linkPosition)
                }}
              />
            )
          }}
        />
        <List
          uniqueKey={'WNZGameLobbyPage' + title}
          style={{ marginTop: scale(45) }}
          data={games}
          numColumns={4}
          renderItem={({ item }) => {
            const { title, pic, id } = item
            return (
              <GameButton
                title={title}
                enableCircle={false}
                logo={pic}
                containerStyle={{ width: '25%', marginBottom: scale(20) }}
                imageContainerStyle={{ width: '60%' }}
                showSubTitle={false}
                titleContainerStyle={{ aspectRatio: 2.5 }}
                titleStyle={{ fontSize: scale(20), fontWeight: '300' }}
                onPress={() => {
                  PushHelper.pushHomeGame(
                    Object.assign({}, item, {
                      seriesId: SeriesId[categoryName],
                      gameId: id,
                      subId: id,
                    })
                  )
                }}
              />
            )
          }}
        />
        <BottomGap />
      </ScrollView>
    </>
  )
}

export default WNZGameLobbyPage
