import * as React from "react";
import {StyleSheet, View} from "react-native";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import BaseWidget from "../../base/BaseWidget";
import UGTheme from "../../../theme/UGTheme";
import IUGTopTabBarProps from "./IUGTopTabBarProps";
import IBaseWidgetState from "../../base/IBaseWidgetState";

/**
 * 顶部 tab bar
 */
const {colorBackground, primary, colorText} = UGTheme.getInstance().currentTheme();
export default class UGTopTabBar extends BaseWidget<IUGTopTabBarProps, IBaseWidgetState> {

  constructor(props) {
    super(props);
  }

  render(): React.ReactNode {
    const {tabs} = this.props;

    return (
      <ScrollableTabView
        style={_styles.container}
        renderTabBar={() => <ScrollableTabBar/>}
        tabBarActiveTextColor={primary}
        tabBarInactiveTextColor={colorText}
        tabBarBackgroundColor={colorBackground}
        tabBarUnderlineStyle={{backgroundColor: primary}}
        tabBarPosition='overlayTop'
      >
        {
          tabs.map((tab) =>
            <View key={tab.title}
                  style={_styles.content}
                  tabLabel={tab.title}>
              {
                tab.page
              }
            </View>)
        }
      </ScrollableTabView>
    );
  }

}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  }
});
