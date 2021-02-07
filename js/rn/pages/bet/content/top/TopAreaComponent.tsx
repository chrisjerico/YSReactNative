import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { pop } from '../../../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { scale } from '../../../../public/tools/Scale'
import CommStyles from '../../../base/CommStyles'
import { anyEmpty, dicNull } from '../../../../public/tools/Ext'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import * as React from 'react'
import BetRecordHeaderComponent from '../counter/lhc/red/BetRecordHeaderComponent'
import { useState } from 'react'
import UseTopArea from './UseTopArea'
import { syncUserInfo } from '../../../../public/tools/user/UserTools'
import { GameTab } from '../../const/LotteryConst'
import { UGStore } from '../../../../redux/store/UGStore'
import { currentChatRoomName } from '../../board/tools/chat/ChatTools'

/**
 * 顶部功能区域 标题栏，游戏聊天切换 等等
 */
const TopAreaComponent = () => {

  const {
    userInfo,
    systemInfo,
    gameTabIndex,
    setGameTabIndex,
    playOddDetailData,
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
    <Text key={'renderTopBar title' + playOddDetailData?.game?.title}
          style={[_styles.top_game_name,
            { color: Skin1.navBarTitleColor }]}>{playOddDetailData?.game?.title}</Text>
    <Icon key={'renderTopBar down'}
          size={scale(28)}
          name={'caret-down'}
          color={Skin1.navBarTitleColor}/>
    <View key={'renderTopBar space'}
          style={CommStyles.flex}/>
    <TouchableWithoutFeedback onPress={() => syncUserInfo(true)}>
      <Text key={'renderTopBar money' + userInfo?.balance}
            style={[_styles.top_money,
              { color: Skin1.navBarTitleColor }]}>{!dicNull(userInfo) && userInfo?.balance}</Text>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={() => syncUserInfo(true)}>
      <Icon key={'renderTopBar refresh'}
            size={scale(24)}
            name={'refresh'}
            color={Skin1.navBarTitleColor}/>
    </TouchableWithoutFeedback>
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
                      onPress={() => {
                        UGStore.dispatch({type: 'reset', gameTabIndex: GameTab.LOTTERY})
                        setGameTabIndex(GameTab.LOTTERY)
                      }}>
      <View key={'renderGameTab left'}
            style={[
              _styles.game_tab,
              _styles.game_tab_left,
              gameTabIndex == GameTab.LOTTERY ? { backgroundColor: UGColor.transparent2 } : null]}>
        <Text key={'renderGameTab 投注区'}
              style={_styles.tab_text}>{'投注区'}</Text>
      </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback key={'renderGameTab right'}
                      style={CommStyles.flex}
                      onPress={() => {
                        UGStore.dispatch({type: 'reset', gameTabIndex: GameTab.CHAT})
                        setGameTabIndex(GameTab.CHAT)
                      }}>
      <View key={'renderGameTab right'}
            style={[
              _styles.game_tab,
              _styles.game_tab_right,
              gameTabIndex == GameTab.CHAT ? { backgroundColor: UGColor.transparent2 } : null]}>
        <Text key={'renderGameTab 主房间'}
              style={_styles.tab_text}>{currentChatRoomName()}</Text>
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
    borderTopRightRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },
  game_tab_right: {
    borderTopLeftRadius: scale(8),
    borderBottomLeftRadius: scale(8),
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
