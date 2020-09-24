import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AppDefine from '../../../public/define/AppDefine'
import { scale } from '../../../public/tools/Scale'
import { useHtml5Image } from '../../../public/tools/tars'

const { getHtml5Image } = useHtml5Image('http://test10.6yc.com')

const tabs = [
  {
    name: '官方玩法',
    logo: getHtml5Image(23, 'home/gfwf'),
  },
  {
    name: '信用玩法',
    logo: getHtml5Image(23, 'home/xywf'),
  },
]

const Tab = ({ logo, name, focused, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <>
        <View style={styles.tabContainer}>
          <View style={styles.titleContainer}>
            <FastImage
              source={{ uri: logo }}
              style={{ width: scale(55), aspectRatio: 1 }}
              resizeMode={'contain'}
            />
            <Text style={styles.titleText}>{name}</Text>
          </View>
          {name == '官方玩法' && <View style={styles.grayLineContainer} />}
        </View>
        <View
          style={[
            styles.bottomLineContainer,
            {
              backgroundColor: focused ? name == '官方玩法' ? '#80c025' : '#f44600' : 'transparent',
            },
          ]}
        />
      </>
    </TouchableWithoutFeedback>
  )
}

const TabBar = ({ activeTab, goToPage }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {
        tabs?.map((item, index) => {
          const { logo, name } = item
          return <Tab key={index} logo={logo} name={name} focused={index == activeTab} onPress={() => goToPage(index)} />
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    width: AppDefine.width / 2,
    flexDirection: 'row',
    height: scale(80)
  },
  titleText: {
    paddingLeft: scale(10),
    fontSize: scale(23),
    fontWeight: '300',
  },
  grayLineContainer: {
    width: scale(1),
    backgroundColor: '#d9d9d9',
    height: '80%',
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

export default TabBar
