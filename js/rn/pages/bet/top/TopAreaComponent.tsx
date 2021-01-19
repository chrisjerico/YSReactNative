import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { pop } from '../../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { scale } from '../../../public/tools/Scale'
import CommStyles from '../../base/CommStyles'
import { anyEmpty } from '../../../public/tools/Ext'
import { UGColor } from '../../../public/theme/UGThemeColor'
import * as React from 'react'
import BetRecordHeaderComponent from '../red/BetRecordHeaderComponent'
import { useState } from 'react'
import UseTopArea from './UseTopArea'

/**
 * 顶部功能区域 标题栏，游戏聊天切换 等等
 */
const TopAreaComponent = () => {

  const {
    userInfo,
    systemInfo,
    nextIssueData,
    setNextIssueData,
    gameTabIndex,
    setGameTabIndex,
  } = UseTopArea()

  /**
   * 绘制顶部的标题栏
   */
  const renderTopBar = () => <View key={'renderTopBar'}
                                   style={[_styles.top_bar_container,
    { backgroundColor: Skin1.themeColor }]}>
    <TouchableWithoutFeedback key={'renderTopBar left back'}
                      onPress={() => pop()}>
      <View key={'renderTopBar left back'}
            style={_styles.back_bt_container}>
        <Icon key={'renderTopBar left back'}
              size={scale(32)}
              name={'angle-left'}
              color={Skin1.navBarTitleColor}/>
      </View>
    </TouchableWithoutFeedback>
    <Text key={'renderTopBar title' + nextIssueData?.title}
          style={[_styles.top_game_name,
            { color: Skin1.navBarTitleColor }]}>{nextIssueData?.title}</Text>
    <Icon key={'renderTopBar down'}
          size={scale(28)}
          name={'caret-down'}
          color={Skin1.navBarTitleColor}/>
    <View key={'renderTopBar space'}
          style={CommStyles.flex}/>
    <Text key={'renderTopBar money' + userInfo?.balance}
          style={[_styles.top_money,
            { color: Skin1.navBarTitleColor }]}>{!anyEmpty(userInfo) && userInfo?.balance}</Text>
    <Icon key={'renderTopBar refresh'}
          size={scale(24)}
          name={'refresh'}
          color={Skin1.navBarTitleColor}/>
    <TouchableWithoutFeedback key={'renderTopBar bar'}
                      onPress={() => pop()}>
      <View style={_styles.back_bt_container}>
        <Icon key={'renderTopBar bar'}
              size={scale(32)}
              name={'bars'}
              color={Skin1.navBarTitleColor}/>
      </View>
    </TouchableWithoutFeedback>

  </View>

  /**
   * 绘制游戏聊天切换tab
   */
  const renderGameTab = () => <View key={'renderGameTab'}
                                    style={[_styles.game_tab_container, { backgroundColor: Skin1.themeColor }]}>

    <TouchableWithoutFeedback key={'renderGameTab left'}
                      style={CommStyles.flex}
                      onPress={() => setGameTabIndex(0)}>
      <View key={'renderGameTab left'}
            style={[
              _styles.game_tab,
              _styles.game_tab_left,
              gameTabIndex == 0 ? { backgroundColor: UGColor.transparent2 } : null]}>
        <Text key={'renderGameTab 投注区'}
              style={_styles.tab_text}>{'投注区'}</Text>
      </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback key={'renderGameTab right'}
                      style={CommStyles.flex}
                      onPress={() => setGameTabIndex(1)}>
      <View key={'renderGameTab right'}
            style={[
              _styles.game_tab,
              _styles.game_tab_right,
              gameTabIndex == 1 ? { backgroundColor: UGColor.transparent2 } : null]}>
        <Text key={'renderGameTab 主房间'}
              style={_styles.tab_text}>{'主房间'}</Text>
      </View>
    </TouchableWithoutFeedback>

  </View>

  return (
    <View style={_styles.container}>
      {renderTopBar()}
      {renderGameTab()}
    </View>
  )

}

const _styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  top_bar_container: {
    width: '100%',
    height: scale(72),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  top_game_name: {
    textAlign: 'center',
    fontSize: scale(24),
    color: Skin1.navBarTitleColor,
    paddingHorizontal: scale(8),
  },
  top_money: {
    textAlign: 'center',
    fontSize: scale(24),
    color: Skin1.navBarTitleColor,
    paddingHorizontal: scale(8),
  },
  game_tab_container: {
    width: scale(540),
    height: scale(58),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  game_tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  game_tab_left: {
    borderTopRightRadius: scale(12),
    borderBottomRightRadius: scale(12),
  },
  game_tab_right: {
    borderTopLeftRadius: scale(12),
    borderBottomLeftRadius: scale(12),
  },
  tab_text: {
    fontSize: scale(22),
    color: 'white',
  },
  back_bt_container: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export {TopAreaComponent}
