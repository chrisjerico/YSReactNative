import { FlatList, RefreshControl, StyleSheet, Text, TouchableWithoutFeedback, View ,Image} from 'react-native'
import * as React from 'react'
import { HallGameData, HallGameListData,HallGameModel1} from '../../../../public/network/Model/game/HallGameModel'
import FastImage from 'react-native-fast-image'
import CommStyles from '../../../base/CommStyles'
import { anyEmpty } from '../../../../public/tools/Ext'
import EmptyView from '../../../../public/components/view/empty/EmptyView'
import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import LotteryBall, { BallType } from '../../../../public/components/view/LotteryBall'
import Button from '../../../../public/views/tars/Button'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import PushHelper from '../../../../public/define/PushHelper'
import { SeriesId } from '../../../../public/models/Enum'
import UseFreedomGameList from './UseFreedomGameList'
import UGNavigationBar from '../../../../public/widget/UGNavigationBar'
import LinearGradient from 'react-native-linear-gradient'
import { Res } from '../../../../Res/icon/Res'

interface IHallGameList {
  gameData?: HallGameData //所有数据
}

/**
 * 游戏大厅列表
 * @param navigation
 * @constructor
 */
const OldLetteyGameListComponent = ({
                                    gameData,
                                  }: IHallGameList) => {

  const {
    systemInfo,
    userInfo,
  } = UseFreedomGameList()

  const renderBottomContent =() =>{
    return(
      <FlatList
        data={gameData.list}
        keyExtractor = {(item,index)=>item.id+index}
        numColumns ={2}
        renderItem ={({item,index})=>{
        return(
          renderItemContent(item)
        )
      }}
      >
      </FlatList>
    )
  }
  /**
   * 绘制顶部内容
   */
  const renderTopContent = () => {
    let shape = LeftColumnStyles[gameData?.gameType]
    if (anyEmpty(shape)) {
      shape = LeftColumnStyles['lhc']
    }
    return (
        <View style={_styles.tk_left_column}>
          <Text style={[_styles.tk_left_title,
            { color: UGColor.TextColor7}]}>{gameData?.gameTypeName}</Text>
        </View>
    )
  }

  /**
   * 绘制item信息
   */
  return (
    <View style={CommStyles.flex}>
      {
        [
          anyEmpty(gameData?.list)
            ? null
            : <View style={_styles.tk_container}>
              {
                [
                  renderTopContent(),
                  renderBottomContent(),
                ]
              }
            </View>,
          <LinearGradient colors={['#b1b1b111', '#ffffff00']}
                          style={_styles.linear_gradient}/>,
        ]

      }
    </View>
  )
}

  /**
   * 绘制彩票信息
   * @param item
   */
  /**
   * 绘制彩票信息
   * @param item
   */
  const renderItemContent = (item: HallGameModel1) => {

    return (
      <TouchableWithoutFeedback onPress={() => {
        PushHelper.pushHomeGame(
          Object.assign({}, item, {
            seriesId: '1',
            gameId: item.id,
            subId: item.id,
          }),
        )
      }}> 
      <View style={_styles.game_item_container}> 
      <Image 
          style={{ width: 45, height: 45, marginRight: 10 ,resizeMode :'cover'}} 
          source={{ uri: item.pic}} />
          <View>
            <Text
              style={_styles.category_name}
              >{item.title}</Text>
              <Text
                style={_styles.tk_item_play}
                >立即游戏</Text>
          </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
  
const _styles = StyleSheet.create({
  linear_gradient: {
    flex: 1,
    height: scale(16),
  },
  tk_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tk_left_column: {
    flex: 1,
    paddingLeft:scale(20),
    padding: scale(1),
  },
  tk_left_title: {
    flex: 1,
    color: UGColor.TextColor6,
    fontSize: scale(20),
    textAlign: 'left',
    marginTop:scale(20)
  },
  tk_left_icon: {
    width: scale(80),
    aspectRatio: 1,
  },
  tk_right_column: {
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:scale(20)
  },
  tk_item_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: scale(20),
    padding: scale(20),
    borderRadius: scale(5),
    backgroundColor: '#e7e7e7',

  },
  tk_item_content: {
    width: scale(132),
    paddingHorizontal: scale(6),
    paddingVertical: scale(8),
    borderRadius: scale(8),
    backgroundColor: '#4674cb09',
  },
  tk_item_name: {
    color: UGColor.TextColor2,
    fontSize: scale(19),
    textAlign: 'center',
  },
  tk_item_play: {
    color: 'red',
    fontSize: scale(18),
    marginTop: scale(4),
    textAlign: 'center',
  },
  game_item_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft:scale(20),

    marginTop:scale(10),
    marginBottom:scale(10),
    alignItems:'center',
    padding: scale(15),
    borderRadius: scale(5),
    backgroundColor: '#e7e7e7',
  
  },
  category_name: { 
    fontWeight: 'bold', 
    fontSize: scale(20), 
    color: 'black', 
    marginTop: scale(5), 
    marginBottom: scale(15),
    width:scale(120),
    textAlign:'center',
  },

})

/**
 * 球的样式
 */
const LeftColumnStyles = {
  'lhc': {
    icon: Res.lh,
    textColor: '#3f5dd7',
    startColor: '#3f5dd722',
    endColor: UGColor.BackgroundColor1,
  }, //六合彩
  'qxc': {
    icon: Res.qxc,
    textColor: '#9c3ed8',
    startColor: '#9c3ed822',
    endColor: UGColor.BackgroundColor1,
  }, //"七星彩系列"
  'cqssc': {
    icon: Res.shishi,
    textColor: '#1d91e6',
    startColor: '#1d91e622',
    endColor: UGColor.BackgroundColor1,
  }, //"时时彩系列"
  'pk10': {
    icon: Res.car,
    textColor: '#169d11',
    startColor: '#169d1122',
    endColor: UGColor.BackgroundColor1,
  }, //"赛车系列"
  'xyft': {
    icon: Res.ft,
    textColor: '#fb7c71',
    startColor: '#fb7c7122',
    endColor: UGColor.BackgroundColor1,
  }, //"飞艇系列"
  'yncp': {
    icon: Res.js,
    textColor: '#1d53d4',
    startColor: '#1d53d422',
    endColor: UGColor.BackgroundColor1,
  }, //"越南彩系列"
  'fc3d': {
    icon: Res.hot,
    textColor: '#e40001',
    startColor: '#e4000122',
    endColor: UGColor.BackgroundColor1,
  }, //"3D系列"
  'gdkl10': {
    icon: Res.happy,
    textColor: '#516bf3',
    startColor: '#516bf322',
    endColor: UGColor.BackgroundColor1,
  }, //"快乐10分系列"
  'pk10nn': {
    icon: Res.nn,
    textColor: '#9e1920',
    startColor: '#9e192022',
    endColor: UGColor.BackgroundColor1,
  }, //"牛牛系列"
  'xync': {
    icon: Res.js,
    textColor: '#1d53d4',
    startColor: '#1d53d422',
    endColor: UGColor.BackgroundColor1,
  }, //"幸运农场系列"
  'bjkl8': {
    icon: Res.other,
    textColor: '#16a0b0',
    startColor: '#16a0b022',
    endColor: UGColor.BackgroundColor1,
  }, //"快乐8系列"
  'dlt': {
    icon: Res.hot,
    textColor: '#e40001',
    startColor: '#e4000122',
    endColor: UGColor.BackgroundColor1,
  }, //"大乐透系列"
  'pcdd': {
    icon: Res.pcdd,
    textColor: '#fea61b',
    startColor: '#fea61b22',
    endColor: UGColor.BackgroundColor1,
  }, //"蛋蛋系列"
  'jsk3': {
    icon: Res.k3,
    textColor: '#d74e02',
    startColor: '#d74e0222',
    endColor: UGColor.BackgroundColor1,
  }, //"快三系列"
  'gd11x5': {
    icon: Res.c11x5,
    textColor: '#8951c4',
    startColor: '#8951c422',
    endColor: UGColor.BackgroundColor1,
  }, //"11选5系列"
}

export default OldLetteyGameListComponent
