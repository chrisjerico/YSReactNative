import {Image, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {Res, RIcons} from "../../../res/Resources";

/**
 * 项目常用的 tab
 * @param focused 是否选中
 * @param title   标题
 * @constructor
 */

export const CommonTabs = ({focused, title}) => {
  return (
    <View style={_styles.container}>
      <Image source={Res.home}
             style={[
               _styles.icon,
               {tintColor : focused ? 'white' : null}
             ]}/>
      <Text numberOfLines={1}
            style={[
              _styles.iconText,
              {color: focused ? 'white' : 'black'}
            ]}>{title}</Text>
    </View>
  );
};

const _styles = StyleSheet.create({
  container: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  iconText: {
    fontSize: 12,
  },
  icon: {
    width: 25,
    height: 25,
  },
});
