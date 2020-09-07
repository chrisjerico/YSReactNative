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

const WNZGameLobbyPage = ({ route }) => {
  const { title } = route?.params ?? {}

  const gameLobby = UGStore.globalProps.gameLobby
  const banner = UGStore.globalProps.banner
  const bannersInterval = parseInt(banner?.interval)
  const banners = banner?.list ?? []
  const games = gameLobby?.find((ele: any) => title.includes(ele?.categoryName))?.games

  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <MineHeader showBackBtn={true} onPressBackBtn={pop} title={title} />
      </SafeAreaHeader>
      <ScrollView>
        <BannerBlock
          containerStyle={{ aspectRatio: 540 / 240 }}
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
          data={games}
          numColumns={4}
          renderItem={({ item }) => {
            const { title, pic } = item
            return <GameButton
              title={title}
              enableCircle={false}
              logo={pic}
              containerStyle={{ width: '25%' }}
            />
          }}
        />
      </ScrollView>
    </>
  )
}

export default WNZGameLobbyPage
