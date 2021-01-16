import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import LotteryConst, { BALL_CONTENT_HEIGHT, LEFT_ITEM_HEIGHT } from './const/LotteryConst'
import LhcZTComponent from './lhc/zt/LhcZTComponent'
import LhcLMAComponent from './lhc/lma/LhcLMAComponent'
import LhcSBComponent from './lhc/sb/LhcSBComponent'
import LhcPTYXComponent from './lhc/ptyx/LhcPTYXComponent'
import LhcHXComponent from './lhc/hx/LhcHXComponent'
import LhcZXBZComponent from './lhc/zxbz/LhcZXBZComponent'
import BetBoardComponent from './board/BetBoardComponent'
import { anyEmpty, arrayLength } from '../../public/tools/Ext'
import BetRecordHeaderComponent from './red/BetRecordHeaderComponent'
import { ugLog } from '../../public/tools/UgLog'

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
    loadedLottery,
    setLoadedLottery,
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
   * 绘制左边列表 特码 双面 正码 等等
   */
  const renderLeftColumn = () => <View key={'renderLeftColumn' + playOddDetailData?.playOdds?.toString()}
                                       style={_styles.left_column_container}>
    <ScrollView key={'renderLeftColumn' + playOddDetailData?.playOdds?.toString()}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
      <View key={'renderLeftColumn' + playOddDetailData?.playOdds?.toString()}
            style={_styles.left_column_content}>
        {
          playOddDetailData?.playOdds?.map((item, index) => {
            return <TouchableOpacity key={'renderLeftColumn' + item?.code}
                                     onPress={() => setLeftColumnIndex(index)}>
              <View key={'renderLeftColumn' + item?.code}
                    style={[
                      _styles.left_column_item,
                      {
                        borderWidth: leftColumnIndex == index ? scale(3) : scale(1),
                        borderColor: leftColumnIndex == index ? Skin1.themeColor : UGColor.LineColor4,
                      },
                    ]}>
                <Text key={'renderLeftColumn' + item?.code}
                      style={_styles.left_column_text}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          })
        }
      </View>
    </ScrollView>
  </View>

  /**
   * 加载彩票对象
   * @param targetLotteryCode 目标彩票
   * @param currentLotteryCode 当前选中的彩票
   * @constructor
   */
  const LotteryComponent = (targetLotteryCode?: string, currentLotteryCode?: string) => {

    // <LhcTMComponent key={LotteryConst.TM + (LotteryConst.TM == targetLotteryCode)}
    //                 style={targetLotteryCode == LotteryConst.TM ? null : { display: 'none' }}
    //                 targetLotteryCode={LotteryConst.TM}/>

    const isEqual = targetLotteryCode == currentLotteryCode //加载的彩票和选中的彩票是否相同
    // const key = targetLotteryCode + isEqual
    // ugLog('current key key={key} =', targetLotteryCode, currentLotteryCode, key)
    switch (targetLotteryCode) {
      case LotteryConst.TM: { //特码
        return <LhcTMComponent key={targetLotteryCode}
                               lotteryCode={targetLotteryCode}
                               style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
        />
      }
      case LotteryConst.ZM: //正码
      case LotteryConst.ZT: { //正特
        return <LhcZTComponent key={targetLotteryCode}
                               lotteryCode={targetLotteryCode}
                               style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
        />
      }
      case LotteryConst.LMA: { //连码
        return <LhcLMAComponent key={targetLotteryCode}
                                lotteryCode={targetLotteryCode}
                                style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
        />
      }
      case LotteryConst.LM: //两面
      case LotteryConst.ZM1_6: //正码1T6
      case LotteryConst.SB: //色波
      case LotteryConst.ZOX://总肖
      case LotteryConst.WX: { //五行
        return <LhcSBComponent key={targetLotteryCode}
                               lotteryCode={targetLotteryCode}
                               style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
        />
      }
      case LotteryConst.YX: //平特一肖
      case LotteryConst.WS: //平特尾数
      case LotteryConst.TWS: //头尾数
      case LotteryConst.TX: //特肖
      case LotteryConst.LX: //连肖
      case LotteryConst.LW: //连尾
      case LotteryConst.ZX: { //正肖
        return <LhcPTYXComponent key={targetLotteryCode}
                                 lotteryCode={targetLotteryCode}
                                 style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
        />
      }
      case LotteryConst.HX: { //合肖
        return <LhcHXComponent key={targetLotteryCode}
                               lotteryCode={targetLotteryCode}
                               style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
        />
      }
      case LotteryConst.ZXBZ: { //自选不中
        return <LhcZXBZComponent key={targetLotteryCode}
                                 lotteryCode={targetLotteryCode}
                                 style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
        />
      }

    }

    return null
  }

  /**
   * 绘制右边彩票区域，彩球 等等
   */
  const renderRightContent = (lotteryCode?: string) => {
    // ugLog('playOddDetailData?.playOdds[leftColumnIndex]=', playOddDetailData?.playOdds[leftColumnIndex])

    // let lotteryCode = playOddDetailData?.playOdds[leftColumnIndex]?.code
    ugLog('------------------lotteryCode---------------------------------', lotteryCode)
    // return <View style={CommStyles.flex}>
    //   {
    //     Object.values(LotteryConst)?.map((item) => LotteryComponent(item, lotteryCode))
    //   }
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
   * 绘制右边彩票区域，彩球 等等
   */
  const renderRightContentList = () => {
    ugLog('---------------------------------------------------')

    return (
      <FlatList key={'page balls renderDataList'}
                style={_styles.right_content_list}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                initialNumToRender={2}
                keyExtractor={(item, index) => `${item?.code}-${index}`}
                data={playOddDetailData?.playOdds}
                renderItem={({ item, index }) => (renderRightContent(item?.code))}/>
    )
  }

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
    <BetLotteryContext.Provider value={{
      nextIssueData: () => nextIssueData,
      playOddDetailData: () => playOddDetailData,
      curPlayOddData: () => playOddDetailData?.playOdds[leftColumnIndex],
    }}>
      <BaseScreen key={'lottery BaseScreen'}
                  screenName={''}
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
        <View key={'lottery content'}
              style={_styles.bs_container}>
          {renderTopBar()}
          {renderGameTab()}
          <ScrollView key={'lottery middle content'}
                      style={_styles.sv_container}>
            {renderHistory()}
            {<TimeComponent key={'TimeComponent' + nextIssueData?.curIssue}/>}
            <View key={'lottery bet content'}
                  style={_styles.middle_content_container}>
              {renderLeftColumn()}
              {renderRightContentList()}
            </View>
            <View style={{height: scale(240), backgroundColor: 'red'}}/>
          </ScrollView>
          <BetBoardComponent key={'lottery board'}
                             locked={false}
                             lockStr={'封盘中...'}/>
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
  sv_container: {
    flex: 1,
  },
  middle_content_container: {
    flexDirection: 'row',
    height: BALL_CONTENT_HEIGHT,
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
  left_column_container: {
    height: BALL_CONTENT_HEIGHT,
  },
  right_content_list: {
    height: BALL_CONTENT_HEIGHT,
  },
  left_column_content: {

  },
  left_column_text: {
    color: UGColor.TextColor7,
    fontSize: scale(22),
  },
  left_column_item: {
    width: scale(140),
    alignItems: 'center',
    justifyContent: 'center',
    height: LEFT_ITEM_HEIGHT,
    borderRadius: scale(8),
  },
})

export default BetLotteryPage
