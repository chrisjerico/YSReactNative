import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import TabComponent from '../../public/components/temp/TabComponent'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import PushHelper from '../../public/define/PushHelper'
import { SeriesId } from '../../public/models/Enum'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, pop } from '../../public/navigation/RootNavigation'
import { scale } from '../../public/tools/Scale'
import BottomGap from '../../public/views/temp/BottomGap'
import GameButton from '../../public/views/temp/GameButton'
import List from '../../public/views/temp/List'
import MineHeader from '../../public/views/temp/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGStore } from '../../redux/store/UGStore'
import { skinColors } from '../../public/theme/const/UGSkinColor'

const LEFGameLobbyPage = ({ route }) => {
  const gameLobby = UGStore.globalProps.gameLobby
  const { initialTabIndex } = route?.params ?? {}

  return (
    <>
      <GameLobbyPageHeader />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TabComponent
          containerStyle={{
            marginVertical: scale(10),
          }}
          numColumns={3}
          initialTabIndex={initialTabIndex ? initialTabIndex : 0}
          baseHeight={scale(130)}
          itemHeight={scale(130)}
          tabGames={gameLobby}
          focusTabColor={skinColors.themeColor.乐FUN}
          tabTextStyle={{ fontSize: scale(20) }}
          renderScene={({ item, tab, index }) => {
            return (
              <List
                uniqueKey={'LEFGameLobbyPage' + index.toString()}
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
                data={item}
                renderItem={({ item }) => {
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
        <BottomGap />
      </ScrollView>
    </>
  )
  //}
}

const GameLobbyPageHeader = () => (
  <SafeAreaHeader headerColor={skinColors.themeColor.乐FUN}>
    <MineHeader
      showBackBtn={true}
      onPressBackBtn={() => {
        OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]).then(() => {
          navigate(PageName.LEFHomePage, {})
        })
      }}
      showCustomerService={false}
      title={'游戏大厅'}
    />
  </SafeAreaHeader>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: skinColors.homeContentSubColor.乐FUN,
    // marginBottom: scale(20),
  },
  gameContainer: {
    width: '33.3%',
    height: scale(130),
    alignSelf: 'center',
  },
})

export default LEFGameLobbyPage
