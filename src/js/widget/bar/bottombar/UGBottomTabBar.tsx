import * as React from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import BaseWidget from "../../base/BaseWidget";
import UGTheme from "../../../theme/UGTheme";
import IBaseWidgetState from "../../base/IBaseWidgetState";
import {Divider} from "react-native-elements";
import UGDefaultTabBar from './UGDefaultTabBar';
import IUGBottomTabBarProps from "./IUGBottomTabBarProps";

/**
 * 底部 tab bar
 */
const {colorBackground, primary, colorText} = UGTheme.getInstance().currentTheme();
export default class UGBottomTabBar extends BaseWidget<IUGBottomTabBarProps, IBaseWidgetState> {

  constructor(props) {
    super(props);
  }

  /**
   * 绘制每个tab
   *
   * @param name 名字
   * @param page  索引
   * @param isTabActive 是否激活选中
   * @param onPressHandler  选中回调方法
   * @private
   */
  _renderTab = (name, page, isTabActive, onPressHandler) => {
    // const {activeTextColor, inactiveTextColor, textStyle} = this.props;
    const {tabs} = this.props;
    const curTab = tabs[page];
    const textColor = isTabActive ? 'white' : colorText;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return <TouchableHighlight underlayColor='#00000000'
                               style={_styles.tabContainer}
                               onPress={() => onPressHandler(page)}>
      <View
        style={_styles.tabContainer}
        key={name}>
        <Image source={curTab.icon}
               style={[
                 _styles.tabIcon,
                 {tintColor: isTabActive ? 'white' : null}
               ]}/>
        <Text numberOfLines={1}
              style={[
                _styles.tabText,
                {color: textColor, fontWeight}
              ]}>{name}</Text>
      </View>
    </TouchableHighlight>;
  };

  render(): React.ReactNode {
    const {tabs} = this.props;

    return (
      <ScrollableTabView
        style={_styles.container}
        renderTabBar={() => <UGDefaultTabBar renderTab={this._renderTab}/>}
        tabBarActiveTextColor={primary}
        tabBarInactiveTextColor={colorText}
        tabBarBackgroundColor={primary}
        tabBarUnderlineStyle={[
          _styles.underlineStyle,
          {backgroundColor: primary},
        ]}
        tabBarPosition='bottom'
      >
        {
          tabs.map((tab) =>
            <View key={tab.title}
                  style={_styles.content}
                  tabLabel={tab.title}>
              {
                tab.page
              }
              <Divider/>
            </View>)
        }
      </ScrollableTabView>
    );
  }

}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 50,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  underlineStyle: {
    height: 0,
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
  },
  tabIcon: {
    width: 25,
    height: 25,
  },
});
