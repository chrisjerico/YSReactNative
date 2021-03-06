import React, { useEffect } from 'react'
import { Platform, ScrollView } from 'react-native'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import PushHelper from '../../public/define/PushHelper'
import { SeriesId } from '../../public/models/Enum'
import { navigate, pop } from '../../public/navigation/RootNavigation'
import { scale } from '../../public/tools/Scale'
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomGap from '../../public/views/tars/BottomGap'
import GameButton from '../../public/views/tars/GameButton'
import List from '../../public/views/tars/List'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import { UGStore } from '../../redux/store/UGStore'
import { anyEmpty } from '../../public/tools/Ext'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { stringToNumber } from '../../public/tools/tars'
import { setProps } from './UGPage'

const subIds = {
  42: '真人',
  43: '棋牌',
  44: '电子',
  45: '体育',
  46: '电竞',
  47: '彩票',
  48: '捕鱼',
}

const SeriesLobbyPage = ({ route }) => {
  const { subId, name, headerColor, homePage, showBackButton } = route?.params ?? { subId: 43, name: '' }
  const subIdTitle = subIds[subId]
  const gameLobby = UGStore.globalProps.gameLobby
  const banner = UGStore.globalProps.banner
  const bannersInterval = stringToNumber(banner?.interval)
  const banners = banner?.list ?? []
  const item = gameLobby?.find((item: any) => subIdTitle?.includes(item?.categoryName))
  const { games, categoryName } = item ?? {}

  //初始化
  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: name, back: true },
    })

  }, [])
  return (
    <>

      <ScrollView showsVerticalScrollIndicator={false}>
        <BannerBlock
          containerStyle={{ aspectRatio: 540 / 230 }}
          badgeStyle={{ top: scale(-230) }}
          autoplayTimeout={bannersInterval}
          showOnlineNum={false}
          showsPagination={false}
          banners={banners}
          renderBanner={(item, index) => {
            // @ts-ignore
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
          uniqueKey={'SeriesLobbyPage' + subIdTitle}
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

export default SeriesLobbyPage
