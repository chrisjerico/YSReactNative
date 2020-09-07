import React from 'react'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { ScrollView, FlatList } from 'react-native'
import BannerBlock from '../../public/views/tars/BannerBlock'
import TouchableImage from '../../public/views/tars/TouchableImage'
import PushHelper from '../../public/define/PushHelper'
import { scale } from '../../public/tools/Scale'
import MineHeader from '../../public/views/tars/MineHeader'
import { pop } from '../../public/navigation/RootNavigation'
import GameButton from '../../public/views/tars/GameButton'
import { UGStore } from '../../redux/store/UGStore'
import { SeriesId } from '../../redux/model/全局/UGSeriesId'

const WNZGameLobbyPage = ({ route }) => {
  const { title } = route?.params ?? { title: '棋牌游戏' }

  const gameLobby = UGStore.globalProps.gameLobby
  const banner = UGStore.globalProps.banner
  const bannersInterval = parseInt(banner?.interval)
  const banners = banner?.list ?? []
  const item = gameLobby?.find((item: any) => title.includes(item?.categoryName))
  const { games, categoryName } = item

  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <MineHeader showBackBtn={true} onPressBackBtn={pop} title={title} />
      </SafeAreaHeader>
      <ScrollView>
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
        <FlatList
          style={{ marginTop: scale(45) }}
          data={games}
          numColumns={4}
          renderItem={({ item }) => {
            const { title, pic, id } = item
            console.log(item)
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
      </ScrollView>
    </>
  )
}

export default WNZGameLobbyPage
