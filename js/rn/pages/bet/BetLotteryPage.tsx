import {
  FlatList, Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback, TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import * as React from 'react'
import FastImage from 'react-native-fast-image'
import WebView from 'react-native-webview'
import UseBetLottery from './UseBetLottery'
import Modal from 'react-native-modal'
import { useEffect, useState } from 'react'
import { BaseScreen } from '../乐橙/component/BaseScreen'
import * as Animatable from 'react-native-animatable'
import { scale } from '../../public/tools/Scale'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { pop } from '../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../base/CommStyles'
import { ugLog } from '../../public/tools/UgLog'
import { UGColor } from '../../public/theme/UGThemeColor'
import LhcTMComponent from './lhc/tm/LhcTMComponent'
import BetLotteryContext from './BetLotteryContext'
import { PlayOddData, PlayOddDetailData } from '../../public/network/Model/lottery/PlayOddDetailModel'
import TimeComponent from './tm/TimeComponent'
import LotteryConst from './const/LotteryConst'
import LhcLMComponent from './lhc/lm/LhcLMComponent'
import LhcZMComponent from './lhc/zm/LhcZMComponent'
import LhcZM1T6Component from './lhc/zm1t6/LhcZM1T6Component'
import LhcZTComponent from './lhc/zt/LhcZTComponent'
import { getBankIcon } from '../bank/list/UseManageBankList'
import { Res } from '../../Res/icon/Res'
import { BankConst } from '../bank/const/BankConst'
import LhcLMAComponent from './lhc/lma/LhcLMAComponent'

interface IRouteParams {
  lotteryId: string //当前彩票 id
}

/**
 * 彩票下注
 * @param navigation
 * @constructor
 */
const BetLotteryPage = ({ navigation, route }) => {

  const { lotteryId } = route?.params

  const {
    setLotteryId,
    nextIssueData,
    playOddDetailData,
    requestNextData,
    requestLotteryData,
  } = UseBetLottery()

  useEffect(() => {
    setLotteryId(lotteryId)
  }, [lotteryId])

  const [textSize, setTextSize] = useState(scale(22))
  const [tabIndex, setTabIndex] = useState(0) //当前选中哪个tab，投注0 还是游戏1
  const [gameTabIndex, setGameTabIndex] = useState(0) // 彩票和聊天切换TAB
  const [leftColumnIndex, setLeftColumnIndex] = useState(0) // 左边大类选择了哪个，特码 正码 双面


  /**
   * 绘制顶部的标题栏
   */
  const renderTopBar = () => <View key={'renderTopBar'} style={[_styles.top_bar_container,
    { backgroundColor: Skin1.themeColor }]}>
    <TouchableOpacity onPress={() => pop()}>
      <View style={_styles.back_bt_container}>
        <Icon size={scale(32)}
              name={'angle-left'}
              color={Skin1.navBarTitleColor}/>
      </View>
    </TouchableOpacity>
    <Text style={[_styles.top_game_name,
      { color: Skin1.navBarTitleColor }]}>{nextIssueData?.title}</Text>
    <Icon size={scale(28)}
          name={'caret-down'}
          color={Skin1.navBarTitleColor}/>
    <View style={CommStyles.flex}/>
    <Text style={[_styles.top_money,
      { color: Skin1.navBarTitleColor }]}>{'1002'}</Text>
    <Icon size={scale(24)}
          name={'undo'}
          color={Skin1.navBarTitleColor}/>
    <TouchableOpacity onPress={() => pop()}>
      <View style={_styles.back_bt_container}>
        <Icon size={scale(32)}
              name={'bars'}
              color={Skin1.navBarTitleColor}/>
      </View>
    </TouchableOpacity>

  </View>

  /**
   * 绘制左边列表 特码 双面 正码 等等
   */
  const renderLeftColumn = () => <View key={playOddDetailData?.playOdds?.toString()}>
    <ScrollView showsVerticalScrollIndicator={false}>
      {
        playOddDetailData?.playOdds?.map((item, index) => {
          return <TouchableOpacity key={item?.code}
                                   onPress={() => setLeftColumnIndex(index)}>
            <View style={[
              {
                width: scale(140),
                alignItems: 'center',
                justifyContent: 'center',
                height: scale(52),
                borderRadius: scale(8),
                borderWidth: leftColumnIndex == index ? scale(3) : scale(1),
              },
              {
                borderColor: leftColumnIndex == index ? Skin1.themeColor : UGColor.LineColor4,
              },
            ]}>
              <Text style={{
                color: UGColor.TextColor7,
                fontSize: scale(22),
              }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        })
      }
    </ScrollView>
  </View>

  /**
   * 绘制右边彩票区域，彩球 等等
   */
  const renderRightContent = () => {
    // ugLog('playOddDetailData?.playOdds[leftColumnIndex]=', playOddDetailData?.playOdds[leftColumnIndex])

    let lotteryCode = playOddDetailData?.playOdds[leftColumnIndex]?.code

    // return <View style={CommStyles.flex}>
    //   <LhcTMComponent style={lotteryCode == LotteryConst.TM ? null : { display: 'none' }}
    //                   key={LotteryConst.TM}/>
    //   <LhcLMComponent style={lotteryCode == LotteryConst.LM ? null : { display: 'none' }}
    //                   key={LotteryConst.LM}/>
    //   <LhcZMComponent style={lotteryCode == LotteryConst.ZM ? null : { display: 'none' }}
    //                   key={LotteryConst.ZM}/>
    //   <LhcZM1T6Component style={lotteryCode == LotteryConst.ZM1_6 ? null : { display: 'none' }}
    //                      key={LotteryConst.ZM1_6}/>
    //   <LhcLMAComponent style={lotteryCode == LotteryConst.ZT ? null : { display: 'none' }}
    //                   key={LotteryConst.ZT}/>
    // </View>

    switch (lotteryCode) {
      case LotteryConst.TM: {
        return <LhcTMComponent/>
      }
      case LotteryConst.LM: {
        return <LhcLMComponent/>
      }
      case LotteryConst.ZM: {
        return <LhcZMComponent/>
      }
      case LotteryConst.ZM1_6: {
        return <LhcZM1T6Component/>
      }
      case LotteryConst.ZT: {
        return <LhcZTComponent/>
      }
      case LotteryConst.LMA: {
        return <LhcLMAComponent/>
      }

    }

    return null
  }

  /**
   * 绘制游戏聊天切换tab
   */
  const renderGameTab = () => <View key={'renderGameTab'} style={[_styles.game_tab_container,
    { backgroundColor: Skin1.themeColor }]}>

    <TouchableOpacity style={CommStyles.flex}
                      onPress={() => setGameTabIndex(0)}>
      <View style={[
        _styles.game_tab,
        _styles.game_tab_left,
        gameTabIndex == 0 ? { backgroundColor: '#ffffff44' } : null]}>
        <Text style={_styles.tab_text}>{'投注区'}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={CommStyles.flex}
                      onPress={() => setGameTabIndex(1)}>
      <View style={[
        _styles.game_tab,
        _styles.game_tab_right,
        gameTabIndex == 1 ? { backgroundColor: '#ffffff44' } : null]}>
        <Text style={_styles.tab_text}>{'主房间'}</Text>
      </View>
    </TouchableOpacity>

  </View>

  return (
    <BetLotteryContext.Provider value={{
      nextIssueData: () => nextIssueData,
      playOddDetailData: () => playOddDetailData,
      curPlayOddData: () => playOddDetailData?.playOdds[leftColumnIndex],
    }}>
      <BaseScreen screenName={''}
                  style={{ backgroundColor: UGColor.BackgroundColor1 }}
                  hideBar={true}>

        {/*<Text>{lotteryId}</Text>*/}
        {/*<Animatable.Text animation="pulse" easing="linear" iterationDelay={1000} iterationCount="infinite" style={{ textAlign: 'center', backgroundColor: 'yellow' }}>{new Date().format('yyyy年MM月dd日 hh时mm分')}️</Animatable.Text>*/}

        {/*<Animatable.Text style={{backgroundColor: 'red'}} animation="slideInDown" iterationCount="infinite" direction="alternate">Up and down you go</Animatable.Text>*/}
        {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="zoomInUp" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
        {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeIn" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
        {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInDown" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
        {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInDownBig" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
        {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInUp" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
        {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInUpBig" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
        {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInLeft" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
        {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInLeftBig" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
        {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInRight" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
        {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInRightBig" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}

        {/*<TouchableOpacity onPress={() => setTextSize(textSize + 5)}>*/}
        {/*  <Animatable.Text transition="fontSize" style={{fontSize: textSize}}>Size me up, Scotty</Animatable.Text>*/}
        {/*</TouchableOpacity>*/}

        {/*<Modal isVisible={!anyEmpty(bigPic)}*/}
        {/*       style={_styles.modal_content}*/}
        {/*       onBackdropPress={() => setBigPic(null)}*/}
        {/*       onBackButtonPress={() => setBigPic(null)}*/}
        {/*       animationIn={'fadeIn'}*/}
        {/*       animationOut={'fadeOut'}*/}
        {/*       backdropOpacity={0.3}>*/}
        {/*  <FastImage source={{ uri: bigPic }}*/}
        {/*             style={{ aspectRatio: 1, width: scale(500) }}*/}
        {/*             resizeMode={'contain'}/>*/}
        {/*</Modal>*/}

        {
          [
            renderTopBar(),
            renderGameTab(),
            <TimeComponent key={nextIssueData?.curIssue}/>,
            <View style={{ flexDirection: 'row', flex: 1 }}>
              {renderLeftColumn()}
              {renderRightContent()}
            </View>,
          ]
        }
      </BaseScreen>
    </BetLotteryContext.Provider>

  )
}

const _styles = StyleSheet.create({
  modal_content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  back_bt_container: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top_bar_container: {
    width: scale(540),
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


})

export default BetLotteryPage
