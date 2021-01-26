import { ScrollView, StyleSheet, View } from 'react-native'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import UseBetLottery from './UseBetLottery'
import { BaseScreen } from '../乐橙/component/BaseScreen'
import { scale } from '../../public/tools/Scale'
import { UGColor } from '../../public/theme/UGThemeColor'
import BetLotteryContext from './BetLotteryContext'
import BetBoardComponent from './board/BetBoardComponent'
import BetRecordHeaderComponent from './counter/red/BetRecordHeaderComponent'
import ListContentComponent from './list/ListContentComponent'
import { TopAreaComponent } from './top/TopAreaComponent'
import { UGStore } from '../../redux/store/UGStore'

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
    playOddDetailData,
    loadedLottery,
    setLoadedLottery,
    requestLotteryData,
  } = UseBetLottery()

  useEffect(() => {
    setLotteryId(lotteryId)

    return () => {//退出清除数据
      UGStore.dispatch({type: 'reset', currentPlayOddData: null})
      UGStore.dispatch({type: 'reset', nextIssueData: null})
      UGStore.dispatch({type: 'reset', playOddDetailData: null})
      UGStore.dispatch({type: 'reset', selectedLotteryModel: null})
    }
  }, [])

  const [textSize, setTextSize] = useState(scale(22))

  return (
    <BetLotteryContext.Provider value={{
      lotteryId: () => lotteryId,
      // nextIssueData: () => nextIssueData,
      playOddDetailData: () => playOddDetailData,
      // curPlayOddData: () => playOddDetailData?.playOdds[leftColumnIndex],
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
          <TopAreaComponent/>
          <ScrollView key={'lottery middle content'}
                      style={_styles.sv_container}>
            <BetRecordHeaderComponent />
            <ListContentComponent/>
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
  modal_content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default BetLotteryPage
