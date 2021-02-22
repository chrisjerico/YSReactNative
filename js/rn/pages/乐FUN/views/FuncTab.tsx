import {GestureResponderEvent, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {scale} from "../../../public/tools/Scale";
import React from "react";
import GameBlock from "./GameBlock";
import FastImage from "react-native-fast-image";
import PushHelper from "../../../public/define/PushHelper";
import {UGUserCenterType} from "../../../redux/model/全局/UGSysConfModel";
import { skinColors } from "../../../public/theme/const/UGSkinColor";
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

const icon1 = 'http://test61a.fhptcdn.com/views/mobileTemplate/30/images/recharge.png'
const icon2 = 'http://test61a.fhptcdn.com/views/mobileTemplate/30/images/recharge.png'
const icon3 = 'http://test61a.fhptcdn.com/views/mobileTemplate/30/images/conversion.png'

interface IFuncTab {
  onPress?: (code: number) => void
}

export const FuncTab = ({onPress}: IFuncTab) => {
  return (
    <View style={[_styles.container]}>
      <TouchableWithoutFeedback onPress={()=>onPress(UGUserCenterType.存款)}>
        <View style={_styles.item}>
          <FastImage style={_styles.icon}
                     resizeMode={'contain'}
                     source={{uri: icon1}}/>
          <UGText style={_styles.title}>我要充值</UGText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>onPress(UGUserCenterType.取款)}>
        <View style={[_styles.item, _styles.item_center]}>
          <FastImage style={_styles.icon}
                     resizeMode={'contain'}
                     source={{uri: icon2}}/>
          <UGText style={_styles.title}>我要提现</UGText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>onPress(UGUserCenterType.额度转换)}>
        <View style={_styles.item}>
          <FastImage style={_styles.icon}
                     resizeMode={'contain'}
                     source={{uri: icon3}}/>
          <UGText style={_styles.title}>转换额度</UGText>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}


const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: scale(70),
    borderColor: skinColors.textColor3.乐FUN,
    borderBottomWidth: scale(1),
  },
  item: {
    flex: 1,
    marginVertical: scale(8),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  item_center: {
    borderLeftWidth: scale(1),
    borderRightWidth: scale(1),
    borderColor: skinColors.textColor3.乐FUN,
  },
  icon: {
    width: scale(40),
    aspectRatio: 1,
  },
  title: {
    fontSize: scale(24),
    marginLeft: scale(4),
    color: skinColors.textColor1.乐FUN,
  },
})

