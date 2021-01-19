import {FlatList, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import * as React from "react";
import {HomeGameModel, List, SubType} from "../../../public/network/Model/HomeGamesModel";
import PushHelper from "../../../public/define/PushHelper";
import {fillArray} from "../../利来/utils/fillArray";
import {ImageButton} from "../../利来/component/ImageButton";
import {scale} from "../../../public/tools/Scale";
import CommStyles from "../../base/CommStyles";
import FastImage from "react-native-fast-image";
import {ugLog} from "../../../public/tools/UgLog";
import Button from "../../../public/views/temp/Button";
import AntDesign from "react-native-vector-icons/AntDesign";
import {anyEmpty, anyLength} from "../../../public/tools/Ext";
import {useEffect, useState} from "react";
import {useDimensions} from "@react-native-community/hooks";
import {PushHomeGame} from "../../../public/models/Interface";
import { skinColors } from "../../../public/theme/const/UGSkinColor";
// import {ImageButton} from "../../../../乐橙/component/ImageButton";
// import {fillArray} from "../../../utils/fillArray";
// import {List} from "../../../../../public/network/Model/HomeGamesModel";
// import PushHelper from "../../../../../public/define/PushHelper";
// import {push} from "../../../../../public/navigation/RootNavigation";
// import {PageName} from "../../../../../public/navigation/Navigation";
// import {UGStore} from "../../../../../redux/store/UGStore";
// import useGetHomeInfo from "../../../../../public/hooks/useGetHomeInfo";

export const GAME_ITEM_HEIGHT = scale(130) //游戏条目高度
export const GAME_SUB_ITEM_HEIGHT = scale(80) //游戏子条目高度

/**
 * 点击索引数据
 */
interface IClickData {
  clickIndex: number,
  partIndex: number,
}

interface IGameList {
  listData: List[]
  refreshHeight: (height: number) => void
  tabLabel?: string
}

/**
 * 游戏栏目
 * @param list 游戏列表
 * @constructor
 */
export const GameListView = ({listData, refreshHeight}: IGameList) => {
  //第一部分游戏
  const [firstGames, setFirstGames] = useState([])
  //第二部分游戏
  const [subGames, setSubGames] = useState([])
  //第二部分游戏
  const [secondGames, setSecondGames] = useState([])

  //当前点击的索引数据
  const [clickData, setClickData] = useState<IClickData>()

  const {width, height} = useDimensions().screen

  useEffect(() => {
    setFirstGames(listData)
    setClickData({
      clickIndex: -1,
      partIndex: -1,
    })
  }, [])

  useEffect(()=>{
    refreshContentHeight()
  })
  const refreshContentHeight = () => {
    let gamesCount = Math.ceil(anyLength(listData) / 2);
    let subGamesCount = Math.ceil(anyLength(subGames) / 3);
    //ugLog('数据: ', gamesCount, anyLength(listData), subGamesCount, anyLength(subGames))
    refreshHeight(gamesCount * GAME_ITEM_HEIGHT + subGamesCount * GAME_SUB_ITEM_HEIGHT)
  }

  /**
   *
   * @param item 点击的游戏条目
   * @param index 点击的游戏索引
   * @param partIndex 点击了第几部分的游戏
   */
  const onPress = (listItem: List, index: number, partIndex: number) => {
    //有二级游戏列表显示二级
    if (!anyEmpty(listItem?.subType)) {
      if (anyEmpty(subGames)
        || (clickData.partIndex != partIndex)//点击了不同部分的游戏
        || (clickData.clickIndex != index && clickData.partIndex == partIndex)) {//点击相同部分的不同游戏
        setClickData({
          clickIndex: index,
          partIndex: partIndex
        });

        let compoundIndex = 0
        if (partIndex == 0) {//点击了第1部分的游戏
          compoundIndex = index
        } else {//点击了第2部分的游戏
          compoundIndex = anyLength(firstGames) + index
        }
        //把数组切成 3部分
        if (compoundIndex % 2 == 0) {
          if (compoundIndex < listData.length - 1) {
            setFirstGames(listData.slice(0, compoundIndex + 2))
            setSubGames(listItem.subType)
            setSecondGames(listData.slice(compoundIndex + 2))
          } else {//点击了最后一条
            setFirstGames(listData)
            setSubGames(listItem.subType)
            setSecondGames([])
          }
        } else {
          setFirstGames(listData.slice(0, compoundIndex + 1))
          setSubGames(listItem.subType)
          setSecondGames(listData.slice(compoundIndex + 1))
        }
      } else {//重置
        setClickData({
          clickIndex: -1,
          partIndex: -1
        });
        setFirstGames(listData)
        setSubGames([])
        setSecondGames([])
      }
    } else {
      _gotoGame(listItem)
    }
  }

  /**
   * 跳转游戏
   * @param subItem
   */
  const _gotoGame = (subItem: PushHomeGame) => {
    subItem.seriesId != '1' ? PushHelper.pushHomeGame(subItem) :
      subItem.gameId ?
        PushHelper.pushCategory(subItem.seriesId, subItem.gameId) :
        PushHelper.pushCategory(subItem.seriesId, subItem.gameId)
  }

  //绘制游戏图标
  const renderFlagItem = (item: List) => {
    switch (item?.tipFlag) {
      case "4"://中大奖
        return (
          <View style={_styles.container_flag}>
            <FastImage style={_styles.flag_zdj}
                       resizeMode={'contain'}
                       source={{uri: item.hotIcon}}/>
          </View>
        )
      default://1热门，2活动，3大奖，4中大奖
        return (
          <View style={_styles.container_flag}>
            <View style={CommStyles.flex}/>
            <FastImage style={_styles.flag_other}
                       resizeMode={'contain'}
                       source={{uri: item.hotIcon}}/>
          </View>
        )
    }
  }

  /**
   * 绘制一级游戏条目
   * @param item 点击的游戏条目
   * @param index 点击的游戏索引
   * @param partIndex 点击了第几部分的游戏
   */
  const renderItem = (item : HomeGameModel, index, partIndex) => {
    return <TouchableWithoutFeedback key={'renderItem_' + index + "_" + partIndex}
                                     onPress={() => onPress(item, index, partIndex)}>
      <View style={[_styles.container_item, {width: width / 2}]}>
        <View style={_styles.container_content}>
          <View style={_styles.list_item}>
            <FastImage style={_styles.list_icon}
                       resizeMode={'stretch'}
                       source={{uri: item.icon}}/>
            <View style={CommStyles.flex}>
              <Text style={_styles.list_title}>
                {anyEmpty(item?.name) ? item?.title : item?.name}
              </Text>
            </View>
            <AntDesign
              name={anyEmpty(item?.subType) ? 'right' : 'appstore1'}
              color={'grey'}
              size={scale(20)}
              // onPress={onPressLeftTool}
            />
          </View>
        </View>
        {
          renderFlagItem(item)
        }
      </View>
    </TouchableWithoutFeedback>
  }

  /**
   * 绘制二级游戏子栏目
   * @param item
   * @param index
   */
  const renderSubGamesItem = (item: SubType, index: number) => {
    //ugLog('item item =', item)
    return (
      <TouchableWithoutFeedback key={'renderSubGamesItem_' + index}
                                onPress={() => {
                                  _gotoGame(item)
                                }}>
        <View style={[_styles.sub_item_container, {width: width / 3}]}>
          <View style={_styles.sub_item}>
            <Text style={_styles.sub_title}>{anyEmpty(item?.name) ? item?.title : item?.name}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  /**
   * 绘制二级游戏栏目
   * @param item
   * @param index
   */
  const renderSubGames = () => {
    return (
      <View style={[_styles.sub_container, {width: width}]}>
        {
          subGames.map(renderSubGamesItem)
        }
      </View>
    )
  }

  return (
    <View style={_styles.wrap_content}>
      {
        firstGames.map((item, index) => renderItem(item, index, 0))
      }
      {
        renderSubGames()
      }
      {
        secondGames.map((item, index) => renderItem(item, index, 1))
      }
    </View>
  )
}

const _styles = StyleSheet.create({
  // row: {
  //   flex: 1,
  //   justifyContent: "space-around",
  // },
  wrap_content: {
    flexWrap: 'wrap',
    flexDirection: "row",
    backgroundColor: 'white',
  },
  container_item: {
    height: GAME_ITEM_HEIGHT,
    aspectRatio: 2,
  },
  container_content: {
    flex: 1,
  },
  container_flag: {
    width: '100%',
    height: '100%',
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    padding: scale(4),
  },
  flag_zdj: {
    height: '100%',
    aspectRatio: 1,
  },
  flag_other: {
    height: GAME_ITEM_HEIGHT * 2 / 5,
    aspectRatio: 1
  },
  list_item: {
    margin: scale(4),
    flex: 1,
    paddingHorizontal: scale(4),
    flexDirection: "row",
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: '#9D9D9D33',
    backgroundColor: '#f4f4f4'
  },
  list_icon: {
    width: scale(80),
    aspectRatio: 1,
    marginRight: scale(16),
  },
  list_title: {
    fontSize: scale(24),
    color: skinColors.textColor1.乐FUN,
  },
  list_hint: {
    fontSize: scale(18),
    color: 'grey',
  },
  sub_container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sub_item_container: {
    flexDirection: "row",
    padding: scale(4),
    height: GAME_SUB_ITEM_HEIGHT,
  },
  sub_item: {
    flex: 1,
    marginVertical: scale(6),
    paddingVertical: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: '#9D9D9D33',
    backgroundColor: '#f4f4f4',
    borderTopLeftRadius: scale(72),
    borderBottomRightRadius: scale(72),
  },
  sub_title: {
    fontSize: scale(18),
    color: skinColors.textColor1.乐FUN,
  },
})
