import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import FastImage from 'react-native-fast-image'
import AppDefine from '../../../public/define/AppDefine'
import { scale } from '../../../public/tools/Scale'

const TabLabel = ({ route, focused }) => {
  const { logo, title } = route ?? {}
  return (
    <>
      <View style={styles.tabContainer}>
        <View style={styles.titleContainer}>
          <FastImage
            source={{ uri: logo }}
            style={{ width: scale(55), aspectRatio: 1 }}
            resizeMode={'contain'}
          />
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {title == '官方玩法' && <View style={styles.grayLineContainer} />}
      </View>
      {focused && (
        <View
          style={[
            styles.bottomLineContainer,
            {
              backgroundColor: title == '官方玩法' ? '#80c025' : '#f44600',
            },
          ]}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    width: AppDefine.width / 2,
    flexDirection: 'row',
  },
  titleText: {
    paddingLeft: scale(10),
    fontSize: scale(23),
    fontWeight: '300',
  },
  grayLineContainer: {
    width: scale(1),
    backgroundColor: '#d9d9d9',
    height: scale(50),
    alignSelf: 'flex-end',
    marginBottom: scale(5),
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(15),
    paddingLeft: scale(15),
  },
  bottomLineContainer: {
    height: scale(2),
    width: '70%',
    borderRadius: scale(100),
    alignSelf: 'center',
  },
})

export default TabLabel