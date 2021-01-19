import { Text, TouchableOpacity, View } from 'react-native'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { pop } from '../../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { scale } from '../../../public/tools/Scale'
import CommStyles from '../../base/CommStyles'
import { anyEmpty } from '../../../public/tools/Ext'
import { UGColor } from '../../../public/theme/UGThemeColor'
import * as React from 'react'
import BetRecordHeaderComponent from '../red/BetRecordHeaderComponent'

/**
 * 顶部功能区域 开奖区域 历史记录 等等
 */
class TopAreaComponent {

  /**
   * 绘制顶部的标题栏
   */
  const renderTopBar = () => <View key={'renderTopBar'} style={[_styles.top_bar_container,
    { backgroundColor: Skin1.themeColor }]}>
    <TouchableOpacity key={'renderTopBar left back'}
                      onPress={() => pop()}>
      <View key={'renderTopBar left back'}
            style={_styles.back_bt_container}>
        <Icon key={'renderTopBar left back'}
              size={scale(32)}
              name={'angle-left'}
              color={Skin1.navBarTitleColor}/>
      </View>
    </TouchableOpacity>
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
    <TouchableOpacity key={'renderTopBar bar'}
                      onPress={() => pop()}>
      <View style={_styles.back_bt_container}>
        <Icon key={'renderTopBar bar'}
              size={scale(32)}
              name={'bars'}
              color={Skin1.navBarTitleColor}/>
      </View>
    </TouchableOpacity>

  </View>

  /**
   * 绘制游戏聊天切换tab
   */
  const renderGameTab = () => <View key={'renderGameTab'}
                                    style={[_styles.game_tab_container, { backgroundColor: Skin1.themeColor }]}>

    <TouchableOpacity key={'renderGameTab left'}
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
    </TouchableOpacity>
    <TouchableOpacity key={'renderGameTab right'}
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
    </TouchableOpacity>

  </View>

  /**
   * 绘制游戏开奖记录
   */
  const renderHistory = () => (
    <BetRecordHeaderComponent key={'renderHistory=' + nextIssueData}/>
  )

  return (

  )
}

export {TopAreaComponent}
