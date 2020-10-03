import {StyleSheet} from "react-native";
import {scale} from "../../../../../public/tools/Scale";
import * as React from "react";

const BALL_ITEM_HEIGHT = scale(60) //格子的高度

//TAB 的颜色
const TAG_COLOR = (cur, item) => cur == item ? "#e6e6e6" : "#dbdbdb"

const BALL_STYLES = StyleSheet.create({
    tab_container: {
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    tab: {//TAB，如万定位，千定位
      paddingHorizontal: scale(18),
      paddingTop: scale(30),
      paddingBottom: scale(15),
      fontSize: scale(22),
    },
    ball_title_odds: {//球的标题赔率
      textAlign: 'center',
      paddingVertical: scale(15),
      color: "#c8222f",
      backgroundColor: "#eee",
      borderBottomWidth: scale(1),
      borderBottomColor: 'grey',
    },
    ball_title: {//球的标题颜色，如万定位
      textAlign: 'center',
      paddingVertical: scale(15),
      color: "#c8222f",
      backgroundColor: "#eee"
    },
    ball_grid: {//球的格子
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    grid_item: {//每个格子
      borderBottomWidth: scale(1),
      borderRightWidth: scale(1),
      borderColor: 'grey',
      height: BALL_ITEM_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    grid_ball: {//格子里面的球
      width: scale(45),
      height: scale(45),
      borderRadius: 999,
      borderWidth: scale(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    grid_ball_rect: {//格子里面的球，方格
      width: scale(45),
      height: scale(45),
      borderRadius: scale(8),
      borderWidth: scale(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
  }
)

export {BALL_STYLES, TAG_COLOR}
