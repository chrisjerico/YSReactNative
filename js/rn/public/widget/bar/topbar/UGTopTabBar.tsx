import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import BaseWidget from '../../base/BaseWidget';
import IUGTopTabBarProps from './IUGTopTabBarProps';
import IBaseWidgetState from '../../base/IBaseWidgetState';
import {UGColor} from '../../../theme/UGThemeColor';
import {Skin1} from '../../../theme/UGSkinManagers';

/**
 * 顶部 tab bar
 */
export default class UGTopTabBar extends BaseWidget<IUGTopTabBarProps, IBaseWidgetState> {
  constructor(props) {
    super(props);
  }

  render(): React.ReactNode {
    const {tabs} = this.props;
    return (
      <ScrollableTabView
        style={_styles.container}
        renderTabBar={() => <ScrollableTabBar />}
        tabBarActiveTextColor={Skin1.themeColor}
        tabBarInactiveTextColor={UGColor.TextColor1}
        tabBarBackgroundColor={UGColor.placeholderColor2}
        tabBarUnderlineStyle={{backgroundColor: Skin1.themeColor}}
        tabBarPosition="overlayTop">
        {tabs.map((tab) => (
          <View key={tab.title} style={_styles.content} tabLabel={tab.title}>
            {tab.page}
          </View>
        ))}
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
  },
});
