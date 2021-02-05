import { ScrollView, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import UseBetLottery from './UseBetLottery'
import { BaseScreen } from '../乐橙/component/BaseScreen'
import { scale } from '../../public/tools/Scale'
import { UGColor } from '../../public/theme/UGThemeColor'
import BetBoardComponent from './board/BetBoardComponent'
import BetRecordHeaderComponent from './content/counter/lhc/red/BetRecordHeaderComponent'
import LotteryContentComponent from './content/LotteryContentComponent'
import { TopAreaComponent } from './content/top/TopAreaComponent'
import { UGStore } from '../../redux/store/UGStore'
import { ugLog } from '../../public/tools/UgLog'
import { anyEmpty, dicNull, mergeObject } from '../../public/tools/Ext'
import FastImage from 'react-native-fast-image'
import { Res } from '../../Res/icon/Res'
import { clearLotteryData } from './util/LotteryUtil'
import InstantLotteryComponent from './content/counter/mmc/InstantLotteryComponent'
import * as Animatable from 'react-native-animatable'

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

  // const [textSize, setTextSize] = useState(scale(22))

  useEffect(() => {
    setLotteryId(lotteryId)
    UGStore.dispatch({ type: 'reset', lotteryId: lotteryId })
    //退出清除数据
    return () => {
      clearLotteryData()
    }
  }, [])

  return (
    <BaseScreen key={'lottery BaseScreen'}
                screenName={''}
                style={{ backgroundColor: UGColor.BackgroundColor1 }}
                hideBar={true}>

      {/*<Animatable.Text animation="pulse" easing="linear" iterationDelay={1000} iterationCount={'infinite'} style={{ textAlign: 'center', backgroundColor: 'yellow' }}>{new Date().format('yyyy年MM月dd日 hh时mm分')}️</Animatable.Text>*/}
      {/*<Animatable.Text animation={zoomOut} iterationCount={1}  style={{ textAlign: 'center', backgroundColor: 'red' }}>Zoom me out</Animatable.Text>*/}
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
        {
          !dicNull(playOddDetailData) ? //有数据才加载
            <ScrollView key={'lottery middle content'}
                        style={_styles.sv_container}>
              {
                //秒秒彩不显示历史记录和倒计时
                playOddDetailData?.game?.isInstant == '1' ? <InstantLotteryComponent/> : <BetRecordHeaderComponent/>
              }
              <LotteryContentComponent/>
            </ScrollView> :
            <View style={_styles.sv_container}/>
        }
        <BetBoardComponent key={'lottery board'}
                           locked={false}
                           lockStr={'封盘中...'}/>
      </View>
    </BaseScreen>
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
