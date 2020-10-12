import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {scale} from "../../../public/tools/Scale";
import React from "react";
import GameBlock from "./GameBlock";
import {LEFThemeColor} from "../../../public/theme/colors/LEFThemeColor";
import FastImage from "react-native-fast-image";

const icon1 = 'http://test61a.fhptcdn.com/views/mobileTemplate/30/images/recharge.png'
const icon2 = 'http://test61a.fhptcdn.com/views/mobileTemplate/30/images/recharge.png'
const icon3 = 'http://test61a.fhptcdn.com/views/mobileTemplate/30/images/conversion.png'

export const FuncTab = () => {
  return (
    <View style={[_styles.container]}>
      <View style={_styles.item}>
        <FastImage style={_styles.icon}
                   resizeMode={'contain'}
                   source={{uri: icon1}}/>
                   <Text style={_styles.title}>我要充值</Text>
      </View>
      <View style={[_styles.item, _styles.item_center]}>
        <FastImage style={_styles.icon}
                   resizeMode={'contain'}
                   source={{uri: icon2}}/>
        <Text style={_styles.title}>我要提现</Text>
      </View>
      <View style={_styles.item}>
        <FastImage style={_styles.icon}
                   resizeMode={'contain'}
                   source={{uri: icon2}}/>
        <Text style={_styles.title}>转换额度</Text>
      </View>
    </View>
  )
}


const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: scale(70),
  },
  item: {
    flex: 1,
    marginVertical: scale(8),
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center"
  },
  item_center: {
    borderLeftWidth: scale(1),
    borderRightWidth: scale(1),
    borderColor: LEFThemeColor.乐FUN.textColor3,
  },
  icon: {
    width: scale(40),
    aspectRatio: 1,
  },
  title: {
    fontSize: scale(24),
    marginLeft: scale(4),
    color: LEFThemeColor.乐FUN.textColor1,
  },
})

