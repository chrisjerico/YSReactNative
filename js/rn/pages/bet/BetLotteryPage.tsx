import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import { useEffect, useState } from 'react'
import UseBetLottery from './UseBetLottery'
import { BaseScreen } from '../乐橙/component/BaseScreen'
import { scale } from '../../public/tools/Scale'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { pop } from '../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../base/CommStyles'
import { UGColor } from '../../public/theme/UGThemeColor'
import LhcTMComponent from './lhc/tm/LhcTMComponent'
import BetLotteryContext from './BetLotteryContext'
import TimeComponent from './tm/TimeComponent'
import LotteryConst from './const/LotteryConst'
import LhcZTComponent from './lhc/zt/LhcZTComponent'
import LhcLMAComponent from './lhc/lma/LhcLMAComponent'
import LhcSBComponent from './lhc/sb/LhcSBComponent'
import LhcPTYXComponent from './lhc/ptyx/LhcPTYXComponent'
import LhcHXComponent from './lhc/hx/LhcHXComponent'
import LhcZXBZComponent from './lhc/zxbz/LhcZXBZComponent'
import BetBoardComponent from './board/BetBoardComponent'
import { anyEmpty } from '../../public/tools/Ext'

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
    userInfo,
    systemInfo,
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
      { color: Skin1.navBarTitleColor }]}>{!anyEmpty(userInfo) && userInfo?.balance}</Text>
    <Icon size={scale(24)}
          name={'refresh'}
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
      <View style={_styles.left_column_content}>
        {
          playOddDetailData?.playOdds?.map((item, index) => {
            return <TouchableOpacity key={item?.code}
                                     onPress={() => setLeftColumnIndex(index)}>
              <View style={[
                _styles.left_column_item,
                {
                  borderWidth: leftColumnIndex == index ? scale(3) : scale(1),
                  borderColor: leftColumnIndex == index ? Skin1.themeColor : UGColor.LineColor4,
                },
              ]}>
                <Text style={_styles.left_column_text}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          })
        }
      </View>
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
    //   <LhcHXComponent style={lotteryCode == LotteryConst.ZM ? null : { display: 'none' }}
    //                   key={LotteryConst.ZM}/>
    //   <LhcSBComponent style={lotteryCode == LotteryConst.ZM1_6 ? null : { display: 'none' }}
    //                      key={LotteryConst.ZM1_6}/>
    //   <LhcLMAComponent style={lotteryCode == LotteryConst.ZT ? null : { display: 'none' }}
    //                   key={LotteryConst.ZT}/>
    // </View>

    switch (lotteryCode) {
      case LotteryConst.TM: { //特码
        return <LhcTMComponent key={lotteryCode}
                               lotteryCode={lotteryCode}/>
      }
      case LotteryConst.ZM: //正码
      case LotteryConst.ZT: { //正特
        return <LhcZTComponent key={lotteryCode}
                               lotteryCode={lotteryCode}/>
      }
      case LotteryConst.LMA: { //连码
        return <LhcLMAComponent key={lotteryCode}
                                lotteryCode={lotteryCode}/>
      }
      case LotteryConst.LM: //两面
      case LotteryConst.ZM1_6: //正码1T6
      case LotteryConst.SB: //色波
      case LotteryConst.ZOX://总肖
      case LotteryConst.WX: { //五行
        return <LhcSBComponent key={lotteryCode}
                               lotteryCode={lotteryCode}/>
      }
      case LotteryConst.YX: //平特一肖
      case LotteryConst.WS: //平特尾数
      case LotteryConst.TWS: //头尾数
      case LotteryConst.TX: //特肖
      case LotteryConst.LX: //连肖
      case LotteryConst.LW: //连尾
      case LotteryConst.ZX: { //正肖
        return <LhcPTYXComponent key={lotteryCode}
                                 lotteryCode={lotteryCode}/>
      }
      case LotteryConst.HX: { //合肖
        return <LhcHXComponent key={lotteryCode}
                               lotteryCode={lotteryCode}/>
      }
      case LotteryConst.ZXBZ: { //自选不中
        return <LhcZXBZComponent key={lotteryCode}
                                 lotteryCode={lotteryCode}/>
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
        gameTabIndex == 0 ? { backgroundColor: UGColor.transparent2 } : null]}>
        <Text style={_styles.tab_text}>{'投注区'}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={CommStyles.flex}
                      onPress={() => setGameTabIndex(1)}>
      <View style={[
        _styles.game_tab,
        _styles.game_tab_right,
        gameTabIndex == 1 ? { backgroundColor: UGColor.transparent2 } : null]}>
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

        <View style={_styles.bs_container}>
          {
            [
              renderTopBar(),
              renderGameTab(),
              <TimeComponent key={'TimeComponent' + nextIssueData?.curIssue}/>,
            ]
          }
          <View style={{ flexDirection: 'row', flex: 1 }}>
            {renderLeftColumn()}
            {renderRightContent()}
          </View>
          <BetBoardComponent/>
        </View>
      </BaseScreen>
    </BetLotteryContext.Provider>

  )
}

const _styles = StyleSheet.create({
  bs_container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
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
  left_column_text: {
    color: UGColor.TextColor7,
    fontSize: scale(22),
  },
  left_column_content: {
    paddingBottom: scale(220),
  },
  left_column_item: {
    width: scale(140),
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(52),
    borderRadius: scale(8),
  },


})

export default BetLotteryPage
