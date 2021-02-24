import { ScrollView, StyleSheet, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { BaseScreen } from '../../乐橙/component/BaseScreen'
import WebComponent from './WebComponent'

interface IWebPage {
  url: string //url
}

/**
 * 彩票下注
 * @param navigation
 * @constructor
 */
const WebPage = ({ navigation, route }) => {

  const { url } = route?.params

  return (
    <BaseScreen screenName={''}>
      <View key={'lottery content'}
            style={_styles.bs_container}>
        <WebComponent url={url}/>
      </View>
    </BaseScreen>
  )
}

const _styles = StyleSheet.create({
  bs_container: {
    flex: 1,
  },
})

export default WebPage
export {IWebPage}
