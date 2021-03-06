import {FlatList, Platform, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native"
import React from 'react'
import SafeAreaHeader from "../../../public/views/tars/SafeAreaHeader";
import {scale} from "../../../public/tools/Scale";
import CommStyles from "../../base/CommStyles";
import PushHelper from "../../../public/define/PushHelper";
import FastImage from "react-native-fast-image";
import AntDesign from "react-native-vector-icons/AntDesign";
import {pop} from "../../../public/navigation/RootNavigation";
import { skinColors } from "../../../public/theme/const/UGSkinColor";
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

/**
 * 所有分类
 * @constructor
 */
const HJGameCategoryPage = (props: any) => {

  const {route: {params: {gameItem}}} = props

  //绘制每一个条目
  const _renderItem = ({item, index}) => {

    return <TouchableWithoutFeedback onPress={() => {
      PushHelper.pushHomeGame(item)
    }}>
      <FastImage
        style={_styles.item}
        source={{uri: item.icon}}>
        <UGText style={_styles.itemText}
              numberOfLines={1} >{item.name}</UGText>
      </FastImage>
    </TouchableWithoutFeedback>
  };

  return (
    <>
      {
        //安卓原生处理过完全区域
        Platform.OS == 'ios' ? <SafeAreaHeader
          containerStyle={{
            aspectRatio: 540 / 50,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
          headerColor={skinColors.themeColor.黑金}
        >
        </SafeAreaHeader> : null
      }

      <ZLHeader/>

      <FlatList style={_styles.list}
                data={gameItem.list}
                numColumns={4}
                renderItem={_renderItem}/>

    </>
  )

}

const ZLHeader = () => {

  return (
    <View style={{
      // width,
      height: scale(76),
      backgroundColor: '#1a1a1e',
      flexDirection: 'row', shadowColor: "white", borderBottomWidth: 0.5, alignItems: 'center',
      paddingHorizontal: scale(20)
    }}>
      <TouchableWithoutFeedback onPress={() => pop()}>
        <View style={_styles.top_bt}>
          <AntDesign
            name={'left'}
            color={'#ffffff'}
            size={scale(25)}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={CommStyles.flex}/>
      <UGText style={_styles.title}>游戏中心</UGText>
      <View style={CommStyles.flex}/>

    </View>
  )
}

const _styles = StyleSheet.create({
  top_bt: {
    width: scale(36),
    height: scale(36)
  },
  title: {
    color: 'white',
    fontSize: scale(24),
  },
  list: {
    flex: 1,
    paddingHorizontal: scale(12),
    backgroundColor: skinColors.homeContentSubColor.黑金,
  },
  item: {
    flex: 1,
    margin: scale(12),
    aspectRatio: 1,
    justifyContent: 'flex-end',
    borderRadius: scale(12),
  },
  itemText: {
    width: '100%',
    marginLeft: scale(4),
    marginBottom: scale(4),
    fontSize: scale(20),
    color: 'white',
    backgroundColor: '#00000022',
  },
})


export default HJGameCategoryPage
