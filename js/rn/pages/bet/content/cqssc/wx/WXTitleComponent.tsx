import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../../base/CommStyles'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import UseCqsscWX from './UseCqsscWX'
import { PlayData, PlayGroupData, PlayOddData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../../public/tools/Ext'
import LotteryEBall from '../../../widget/LotteryEBall'
import { BALL_CONTENT_HEIGHT } from '../../../const/LotteryConst'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'
import { UGStore } from '../../../../../redux/store/UGStore'
import { calculateSliderValue } from '../../../util/ArithUtil'
import { ugLog } from '../../../../../public/tools/UgLog'
import { UGText } from '../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface IWXTitleComponent {
  title?: string, //标题
  odds?: string, //赔率
}

/**
 * 五星栏目标题
 *
 * @param navigation
 * @constructor
 */
const WXTitleComponent = ({
                            title,
                            odds,
                          }: IWXTitleComponent) => {
  const sliderValue = UGStore.globalProps?.sliderValue

  ugLog('UGStore.globalProps?.sliderValue = ', sliderValue)

  return (
    <View style={_styles.sub_big_title_container}>
      <UGText style={[
        _styles.sub_big_title_text,
        { color: Skin1.themeColor },
      ]}>{`${title}: ${calculateSliderValue(odds, sliderValue)}`}</UGText>
    </View>

  )
}

const _styles = StyleSheet.create({
  sub_big_title_container: {
    alignItems: 'center',
    padding: scale(6),
  },
  sub_big_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    paddingHorizontal: scale(1),
  },

})

export default WXTitleComponent
