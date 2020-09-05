import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet } from 'react-native'
import GameLobbyTabComponent from '../../public/components/tars/GameLobbyTabComponent'
import PushHelper from '../../public/define/PushHelper'
import { pop } from '../../public/navigation/RootNavigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import GameButton from '../../public/views/tars/GameButton'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { SeriesId } from '../../redux/model/全局/UGSysConfModel'
import APIRouter from '../../public/network/APIRouter'
import ProgressCircle from '../../public/views/tars/ProgressCircle'

const BZHGameLobbyPage = ({ route }) => {
  const { initialTabIndex } = route?.params ?? {}

  const [loading, setLoading] = useState(true)
  const [tabGames, setTabGames] = useState([])
  useEffect(() => {
    APIRouter.game_homeRecommend()
      .then((response) => {
        const tabGames = response?.data?.data
        tabGames && setTabGames(tabGames)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <>
        <GameLobbyPageHeader />
        <ProgressCircle />
      </>
    )
  } else {
    return (
      <>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <GameLobbyPageHeader />
          <GameLobbyTabComponent
            containerStyle={{
              borderBottomRightRadius: scale(10),
              borderBottomLeftRadius: scale(10),
              marginTop: scale(10),
            }}
            numColumns={3}
            initialTabIndex={initialTabIndex}
            baseHeight={scale(130)}
            itemHeight={scale(130)}
            tabGames={tabGames}
            focusTabColor={BZHThemeColor.宝石红.themeColor}
            tabTextStyle={{ fontSize: scale(20) }}
            renderScene={({ item, tab, index }) => {
              return (
                <FlatList
                  listKey={tab + 'BZHGameLobbyPage'}
                  keyExtractor={(_, index) => tab + index.toString()}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  style={{
                    backgroundColor: '#ffffff',
                    marginTop: scale(10),
                    marginHorizontal: scale(10),
                    borderRadius: scale(5),
                  }}
                  contentContainerStyle={{
                    paddingTop: scale(45),
                    width: '100%',
                  }}
                  numColumns={3}
                  //@ts-ignore
                  data={item}
                  renderItem={({ item }) => {
                    //@ts-ignore
                    const { title, pic, id } = item
                    return (
                      <GameButton
                        key={index}
                        resizeMode={'contain'}
                        containerStyle={styles.gameContainer}
                        imageContainerStyle={{ width: '35%' }}
                        enableCircle={false}
                        logo={pic}
                        title={title}
                        showSubTitle={false}
                        titleStyle={{
                          fontSize: scale(16),
                        }}
                        titleContainerStyle={{
                          aspectRatio: 2.8,
                        }}
                        onPress={() =>
                          PushHelper.pushHomeGame(
                            Object.assign({}, item, {
                              seriesId: SeriesId[tab],
                              gameId: id,
                              subId: id,
                            })
                          )
                        }
                      />
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
}

const GameLobbyPageHeader = () => (
  <SafeAreaHeader headerColor={BZHThemeColor.宝石红.themeColor}>
    <MineHeader
      showBackBtn={true}
      onPressBackBtn={pop}
      showCustomerService={false}
      title={'游戏大厅'}
    />
  </SafeAreaHeader>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BZHThemeColor.宝石红.homeContentSubColor,
    marginBottom: scale(20),
  },
  gameContainer: {
    width: '33.3%',
    height: scale(130),
    alignSelf: 'center',
  },
})

export default BZHGameLobbyPage
