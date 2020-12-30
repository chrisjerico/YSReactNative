import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import FastImage from 'react-native-fast-image'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AppDefine from '../../../public/define/AppDefine'
import { scale } from '../../../public/tools/Scale'
import { useHtml5Image } from '../../../public/tools/tars'

const { getHtml5Image } = useHtml5Image('http://t132f.fhptcdn.com')

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

const c245Names = ['热门彩种', '中奖排行']

const Tab = ({ logo, name, focused, onPress, index }) => {
  if (AppDefine.siteId == 'c254' && name == tabs[1]?.name) {
    useEffect(() => {
      setTimeout(() => {
        onPress && onPress()
      }, 500);
    }, [])
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.tabContainer}>
        <View style={styles.titleContainer}>
          <ImageBackground source={{ uri: logo }} style={{ width: scale(55), aspectRatio: 1, justifyContent:'center', alignItems:'center' }} resizeMode={'contain'} >
            <Text style={{marginTop:1,marginLeft:1, padding:1, color:'white', fontSize:14, backgroundColor:index ? '#C84C4E' : '#80c025'}}>{AppDefine.siteId == 'c245' ? (index ? '榜' : '热') : (index ? '信' : '官') }</Text>
          </ImageBackground>
          <Text style={styles.titleText}>{AppDefine.siteId == 'c245' ? c245Names[index] : name}</Text>
        </View>
        {!index && <View style={styles.grayLineContainer} />}
        <View
          style={[
            styles.bottomLineContainer,
            {
              backgroundColor: focused ? (index ? '#f44600' : '#80c025') : 'transparent',
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const TabBar = ({ activeTab, goToPage }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {tabs?.map((item, index) => {
        const { logo, name } = item
        return <Tab key={index} index={index} logo={logo} name={name} focused={index == activeTab} onPress={() => goToPage(index)} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    width: AppDefine.width / 2,
    flexDirection: 'row',
    height: scale(82),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
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
    position: 'absolute',
    bottom: 0,
  },
})

export default TabBar
