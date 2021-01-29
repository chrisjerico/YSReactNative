import { Dimensions, FlatList, RefreshControl, StyleSheet, Text, TouchableWithoutFeedback, View, Image, Platform } from 'react-native'
import * as React from 'react'
import CommStyles from '../../base/CommStyles'
import { UGYYGames } from '../Model/UGYYGames'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { anyEmpty } from '../../../public/tools/Ext'
import EmptyView from '../../../public/components/view/empty/EmptyView'
import { FastImagePlaceholder, ImagePlaceholder } from '../tools/ImagePlaceholder'
import { push } from '../../../public/navigation/RootNavigation'
import { PageName } from '../../../public/navigation/Navigation'
import { ugLog } from '../../../public/tools/UgLog'
import { OCHelper } from '../../../public/define/OCHelper/OCHelper'

interface IXLGameList {
  gameData?: Array<UGYYGames> //所有数据

}


/**
 * 2级系列游戏大厅列表
 * @param navigation
 * @constructor
 */
const JDGameListCP = ({
  gameData
}: IXLGameList) => {


  /**
  * 绘制彩票信息
  * @param item
  */
  const renderItemContent = (item: UGYYGames) => {

    return (
      <TouchableWithoutFeedback onPress={() => {

        if (item?.isPopup) {
          push(PageName.TwoLevelGames, { game: item, showBackButton: true })
        } else {
          
          switch (Platform.OS) {
            case 'ios':
              const dict = {
                "real": 2,
                "fish": 3,
                "game": 4,
                "card": 5,
                "sport": 6,
              }
              let linkCategory:number = dict[item?.category];
              
              ugLog('item.id==',item.id)
              ugLog('item.gameid==',item.gameId)
              if (!anyEmpty(linkCategory)) {
                OCHelper.call('UGNavigationController.current.pushViewControllerWithLinkCategory:linkPosition:', [linkCategory, item.id])
              }

              break
            case 'android':
              //TODO android 游戏界面
              break
          }
        }

      }}>
        <View style={[_styles.game_item_container, { backgroundColor: Skin1.homeContentColor, }]}>
          <FastImagePlaceholder
            style={{ width: 60, height: 60, marginRight: 10, marginTop: 10, marginLeft: 10, }}
            source={{ uri: item.pic }} />
          <View>
            <Text
              style={[_styles.category_name, { color: Skin1.textColor1, width: scale(100), marginTop: 18, },]}
            >{item.title}</Text>
            <Text
              style={[_styles.play_now, { position: 'absolute', marginTop: scale(80), },]}
            >立即游戏</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>


    )
  }

  /**
* Foot页面
* 
*/
  const _renderListFootComp = () => {
    return (
      <View style={{
        height: 100,
      }}>
      </View>
    );
  }

  return (
    <View style={[CommStyles.flex, _styles.container,]}>
      {
        [
          anyEmpty(gameData)
            ? <EmptyView style={{ flex: 1 }} />
            : <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.category + index}
              data={gameData}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  renderItemContent(item)
                )
              }}
              ListFooterComponent={() => _renderListFootComp()}
            />,
        ]

      }
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  game_item_container: {
    flexDirection: 'row',
    marginHorizontal: scale(16),
    marginVertical: scale(16),
    width: scale(230),
    height: scale(130),
    borderRadius: scale(10),

  },
  category_name: {
    fontWeight: 'bold',
    fontSize: scale(20),
    marginTop: scale(5),
    marginBottom: scale(15)

  },
  play_now: {
    fontWeight: 'bold',
    fontSize: scale(18),
    color: 'red'
  }
})

export default JDGameListCP
