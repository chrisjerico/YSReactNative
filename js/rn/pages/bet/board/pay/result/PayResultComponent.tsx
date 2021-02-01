import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { forwardRef, useMemo } from 'react'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import { scale } from '../../../../../public/tools/Scale'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import LotteryConst from '../../../const/LotteryConst'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ugLog } from '../../../../../public/tools/UgLog'
import UsePayResult from './UsePayResult'
import Icon from 'react-native-vector-icons/Fontisto'
import { anyEmpty } from '../../../../../public/tools/Ext'
import { calculateItemCount, gatherSelectedItems } from '../../tl/BetUtil'
import { SelectedPlayModel } from '../../../../../redux/model/game/SelectedLotteryModel'
import { Res } from '../../../../../Res/icon/Res'
import FastImage from 'react-native-fast-image'
import { LotteryResultData } from '../../../../../public/network/Model/lottery/result/LotteryResultModel'
import LotteryZodiacAndBall from '../../../widget/LotteryZodiacAndBall'

interface IPayResultComponent {
  betData?: LotteryResultData
  showCallback?: () => void //窗口 是否显示 回调
}

/**
 * 下注结果
 * @param menu
 * @param ref
 * @constructor
 */
const PayResultComponent = ({ betData, showCallback }: IPayResultComponent, ref?: any) => {

  const {} = UsePayResult()

  /**
   * 绘制 是否中奖图标
   */
  const renderPrize = () => {
    return <FastImage source={Number.parseFloat(betData?.bonus) > 0 ? { uri: Res.mmczjl } : { uri: Res.mmcwzj }}
                      resizeMode={'contain'}
                      style={_styles.zj}/>
  }

  return (
    <View style={_styles.container}>
      <Modal isVisible={true}
             style={_styles.modal_content}
             animationIn={'fadeIn'}
             animationOut={'fadeOut'}
             backdropOpacity={0.5}>
        <View style={_styles.content}>

          <FastImage source={{ uri: Res.mmcbackpic }}
                     resizeMode={'contain'}
                     style={_styles.mmc_image}/>

          <View style={_styles.text_container}>
            <Text style={_styles.bet_text}>{
              Number.parseFloat(betData?.bonus) > 0 ? '恭喜中奖' : '再接再厉'
            }</Text>
          </View>

          <View style={_styles.zj_container}>
            {renderPrize()}
          </View>

          <View style={_styles.tz_container}>
            <FastImage source={{ uri: Res.mmczdtz }}
                       resizeMode={'contain'}
                       style={_styles.tz}/>

            {/*<FastImage source={{ uri: Res.mmczt }}*/}
            {/*           resizeMode={'contain'}*/}
            {/*           style={_styles.tz}/>*/}

          </View>

          <View style={_styles.ball_container}>
            <LotteryZodiacAndBall ballStr={"09,49,02,40,05,42,07"}
                                  zodiacStr={"龙,鼠,猪,鸡,猴,羊,马"}
                                  gameType={'lhc'}/>
          </View>

          <View style={_styles.close_container}>
            <Icon size={scale(48)}
                  onPress={() => showCallback()}
                  style={_styles.close}
                  color={'white'}
                  name={'close'}/>
          </View>


        </View>
      </Modal>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {},
  modal_content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: scale(600),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mmc_image: {
    width: '100%',
    aspectRatio: 1,
  },
  tz_container: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: scale(42),
    paddingRight: scale(64),
  },
  tz: {//跟注
    width: scale(98),
    aspectRatio: 1,
  },
  zj_container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  zj: {//中奖
    width: scale(186),
    height: scale(64),
    marginTop: scale(288),
  },
  close: {
    marginTop: scale(98),
    marginRight: scale(64),
  },
  close_container: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
  },
  ball_container: {
    position: 'absolute',
    alignItems: 'center',
    paddingBottom: scale(150),
    width: '100%',
    height: '100%',
  },
  text_container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bet_text: {
    color: UGColor.YellowColor1,
    textAlign: 'center',
    marginBottom: scale(80),
    fontSize: scale(30),
  },

})
export default forwardRef(PayResultComponent)

