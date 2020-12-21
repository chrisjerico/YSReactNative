import { FlatList, RefreshControl, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { HallGameData, HallGameListData } from '../../../../public/network/Model/game/HallGameModel'
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
const FreedomGameListComponent = ({
                                    gameData,
                                  }: IHallGameList) => {

  const {
    systemInfo,
    userInfo,
  } = UseFreedomGameList()

  /**
   * 绘制右侧内容
   */
  const renderRightContent = () => {
    return (
      <View style={_styles.tk_right_column}>
        {
          gameData?.list?.map((item) => {
            return (
              <View style={_styles.tk_item_container}>
                <View style={_styles.tk_item_content}>
                  <Text style={_styles.tk_item_name} numberOfLines={1}>{item.title}</Text>
                  <Text style={_styles.tk_item_play}>{'立即游戏'}</Text>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  /**
   * 绘制左侧内容
   */
  const renderLeftContent = () => {
    let shape = LeftColumnStyles[gameData?.gameType]
    if (anyEmpty(shape)) {
      shape = LeftColumnStyles['lhc']
    }

    return (
      <LinearGradient colors={[shape?.startColor,
        shape?.endColor]}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 1 }}>
        <View style={_styles.tk_left_column}>
          <Text style={[_styles.tk_left_title,
            { color: shape?.textColor }]}>{gameData?.gameTypeName}</Text>
          <FastImage style={_styles.tk_left_icon}
                     resizeMode={'contain'}
                     source={{ uri: gameData.list[0].pic }}/>
        </View>
      </LinearGradient>

    )
  }

  return (
    <View style={CommStyles.flex}>
      {
        [
          anyEmpty(gameData?.list)
            ? null
            : <View style={_styles.tk_container}>
              {
                [
                  renderLeftContent(),
                  renderRightContent(),
                ]
              }
            </View>,
        ]
      }
    </View>
  )
}

/**
 * 球的样式
 */
const LeftColumnStyles = {
  'lhc': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //六合彩
  'qxc': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"七星彩系列"
  'cqssc': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"时时彩系列"
  'pk10': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"赛车系列"
  'xyft': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"飞艇系列"
  'yncp': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"越南彩系列"
  'fc3d': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"3D系列"
  'gdkl10': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"快乐10分系列"
  'pk10nn': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"牛牛系列"
  'xync': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"幸运农场系列"
  'bjkl8': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"快乐8系列"
  'dlt': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"大乐透系列"
  'pcdd': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"蛋蛋系列"
  'jsk3': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"快三系列"
  'gd11x5': {
    icon: Res.sz1,
    textColor: '#77ce8b',
    startColor: '#77ce8b',
    endColor: UGColor.BackgroundColor1,
  }, //"11选5系列"
}

const _styles = StyleSheet.create({
  tk_container: {
    flex: 1,
    paddingVertical: scale(8),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tk_left_column: {
    flex: 1,
    width: scale(116),
    alignItems: 'center',
    padding: scale(4),
  },
  tk_left_title: {
    flex: 1,
    color: UGColor.TextColor3,
    fontSize: scale(26),
    textAlign: 'center',
    paddingBottom: scale(16),
  },
  tk_left_icon: {
    width: scale(80),
    aspectRatio: 1,
  },
  tk_right_column: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tk_item_container: {
    padding: scale(2),
  },
  tk_item_content: {
    width: scale(132),
    padding: scale(6),
    borderRadius: scale(8),
    backgroundColor: '#4674cb11',
  },
  tk_item_name: {
    color: UGColor.TextColor2,
    fontSize: scale(18),
    textAlign: 'center',
  },
  tk_item_play: {
    color: UGColor.BlueColor6,
    fontSize: scale(18),
    textAlign: 'center',
  },

})

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default FreedomGameListComponent
