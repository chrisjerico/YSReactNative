import { StyleSheet } from 'react-native'
import * as React from 'react'
import { BaseScreen } from '../../乐橙/component/BaseScreen'
import { UGColor } from '../../../public/theme/UGThemeColor'
import EmptyView from '../../../public/components/view/empty/EmptyView'

interface IRouteParams {
  picUrl: string //图片地址
}

/**
 * 空界面...
 * @param navigation
 * @constructor
 */
const EmptyPage = ({ navigation, route }) => {

  const intent = route?.params

  return (
    <BaseScreen key={'lottery BaseScreen'}
                screenName={''}
                style={{ backgroundColor: UGColor.BackgroundColor1 }}>

      <EmptyView
        text={'页面正在建设中...'}
        subText={'敬请期待...'}
        imgUrl={intent?.picUrl}
        style={{ flex: 1 }}/>

    </BaseScreen>

  )
}

const _styles = StyleSheet.create({
  bs_container: {
    flex: 1,
    justifyContent: 'flex-end',
  },


})

export default EmptyPage
