import React from 'react'
import { ScrollView, StyleSheet, FlatList, Text } from 'react-native'
import GameLobbyTabComponent, { Scene } from '../../public/components/tars/GameLobbyTabComponent'
import PushHelper from '../../public/define/PushHelper'
import { pop } from '../../public/navigation/RootNavigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import GameButton from '../../public/views/tars/GameButton'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { SeriesId } from '../../redux/model/全局/UGSysConfModel'

const BZHGameLobbyPage = ({ route }) => {
  const { initialTabIndex, tabGames } = route?.params ?? {}
  return (
    <>
      <SafeAreaHeader
        containerStyle={{
          aspectRatio: 540 / 50,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
        headerColor={BZHThemeColor.宝石红.themeColor}
      >
        <MineHeader
          showBackBtn={true}
          onPressLeftTool={pop}
          shoeRightTool={false}
          title={'游戏大厅'}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <GameLobbyTabComponent
          initialTabIndex={initialTabIndex}
          baseHeight={scale(70)}
          rowHeight={scale(170)}
          tabGames={tabGames}
          focusTabColor={BZHThemeColor.宝石红.themeColor}
          tabTextStyle={{ fontSize: scale(20) }}
          renderScene={({ games, tab, index }) => {
            return (
              <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                style={{ backgroundColor: '#ffffff', marginTop: scale(10), width: '100%' }}
                contentContainerStyle={{ paddingTop: scale(20), width: '100%' }}
                numColumns={3}
                data={games as any}
                renderItem={({ item }) => {
                  const {
                    title,
                    pic,
                    id
                  } = item
                  return (
                    <GameButton
                      key={index}
                      resizeMode={'contain'}
                      containerStyle={styles.gameContainer}
                      imageContainerStyle={{ width: '40%' }}
                      enableCircle={false}
                      logo={pic}
                      title={title}
                      showSubTitle={false}
                      titleStyle={{
                        fontSize: scale(16),
                      }}
                      subTitleStyle={{
                        fontSize: scale(20),
                      }}
                      titleContainerStyle={{
                        marginTop: scale(5),
                        aspectRatio: 2.5,
                      }}
                      onPress={() =>
                        PushHelper.pushHomeGame(Object.assign({}, item, {
                          seriesId: SeriesId[tab],
                          "gameId": id,
                          subId: id,
                        }))
                      }
                    />

                  )
                }}
              />)
          }}

        />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BZHThemeColor.宝石红.homeContentSubColor,
  },
  gameContainer: {
    width: '33.3%',
    height: null,
    alignSelf: 'center',
    marginBottom: scale(20),
  },
})

export default BZHGameLobbyPage

              // <Scene
              //   key={index}
              //   data={games}
              //   containerStyle={{ marginTop: scale(10) }}
              //   renderItem={(item, index) => {
              //     const {
              //       title,
              //       pic,
              //       name,
              //       id
              //     } = item
              //     return (
              //       <GameButton
              //         key={index}
              //         resizeMode={'contain'}
              //         containerStyle={[
              //           styles.gameContainer,
              //           {
              //             marginLeft: index % 3 == 1 ? '5%' : 0,
              //             marginRight: index % 3 == 1 ? '5%' : 0,
              //           },
              //         ]}
              //         imageContainerStyle={{ width: '40%' }}
              //         enableCircle={false}
              //         logo={pic}
              //         title={title}
              //         subTitle={name}
              //         showSubTitle={false}
              //         titleStyle={{
              //           fontSize: scale(16),
              //         }}
              //         subTitleStyle={{
              //           fontSize: scale(20),
              //         }}
              //         titleContainerStyle={{
              //           marginTop: scale(5),
              //           aspectRatio: 2.5,
              //         }}
              //         onPress={() =>
              //           PushHelper.pushHomeGame(Object.assign({}, item, {
              //             seriesId: SeriesId[tab],
              //             "gameId": id,
              //             subId: id,
              //           }))
              //         }
              //       />
              //     )
              //   }}
              // />