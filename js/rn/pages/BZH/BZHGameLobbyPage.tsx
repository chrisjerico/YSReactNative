import React, { useEffect } from 'react'
import { FlatList, RefreshControl, ScrollView, StyleSheet } from 'react-native'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import MineHeader from '../../public/views/tars/MineHeader'
import { pop } from '../../public/navigation/RootNavigation'
import GameLobbyTabComponent from '../../public/components/tars/GameLobbyTabComponent'
import { scale } from '../../public/tools/Scale'
import GameButton from '../../public/views/tars/GameButton'
import PushHelper from '../../public/define/PushHelper'

const BZHGameLobbyPage = ({ homeGames }) => {

  console.log("--------homeGames------", homeGames)
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
          baseHeight={scale(70)}
          sceneContainerStyle={{ marginTop: scale(10) }}
          rowHeight={scale(200)}
          tabGames={homeGames ?? []}
          focusTabColor={BZHThemeColor.宝石红.themeColor}
          renderScene={(item, index) => {
            const { logo, icon, title, hotIcon, tipFlag, subType } = item
            const showFlag = parseInt(tipFlag)
            return (
              <GameButton
                key={index}
                circleColor={'#b3cde6'}
                showRightTopFlag={showFlag > 0 && showFlag < 4}
                showCenterFlag={showFlag == 4}
                showSecondLevelIcon={subType}
                flagIcon={hotIcon}
                logo={icon || logo}
                title={title}
                showSubTitle={false}
                containerStyle={{
                  width: '33.3%',
                  height: scale(180),
                  marginBottom: scale(20),
                }}
                titleContainerStyle={{
                  marginTop: scale(5),
                  aspectRatio: 3,
                }}
                titleStyle={{ fontSize: scale(23) }}
                subTitleStyle={{ fontSize: scale(23) }}
                onPress={() => PushHelper.pushHomeGame(item)}
              />
            )
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
})

export default BZHGameLobbyPage
