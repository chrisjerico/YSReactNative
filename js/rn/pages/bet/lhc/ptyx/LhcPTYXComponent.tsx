import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../base/CommStyles'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseLhcPTYX from './UseLhcPTYX'
import { PlayData, PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import LotteryERect from '../../widget/LotteryERect'
import LotteryLineEBall from '../../widget/LotteryLineEBall'
import { BALL_CONTENT_HEIGHT, ILotteryRouteParams } from '../../const/LotteryConst'
import { findZodiacByName } from '../../util/LotteryUtil'

/**
 * 六合彩 平特一肖, 平特尾数, 头尾数, 特肖 等等
 *
 * @param navigation
 * @constructor
 */
const LhcPTYXComponent = ({ lotteryCode, style }: ILotteryRouteParams) => {


  const {
    setLotteryCode,
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    zodiacData,
    setZodiacData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcPTYX()

  useEffect(() => {
    setLotteryCode(lotteryCode)
  }, [])
  const key = 'lottery page' + lotteryCode


  /**
   * 绘制 单个Tab
   * @param item
   * @param index
   */
  const renderTabItem = (item?: Array<PlayGroupData>, index?: number) => <TouchableOpacity
    key={key + 'tab' + index + item[1]?.id}
    style={CommStyles.flex}
    onPress={() => setTabIndex(index)}>
    <View key={key + 'tab' + index + item[1]?.id}
          style={[
            _styles.tab_item,
            index == tabIndex ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
          ]}>
      <Text key={key + 'tab' + index + item[1]?.id}
            style={[
              _styles.tab_title_item_text,
              index == tabIndex ? { color: `white` } : null,
            ]}>{item[1]?.alias}</Text>
    </View>
  </TouchableOpacity>
  /**
   * 绘制tab，只有1个数据不绘制Tab
   */
  const renderTab = () => arrayLength(pageData) > 1 && <View key={key + 'renderTab'}
                                                             style={_styles.tab_title_container}>
    <ScrollView key={key + 'sv'}
                style={_styles.sv_tab_container}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
      <View key={key + 'renderTab sub'}
            style={_styles.tab_title_content}>
        {
          pageData?.map(renderTabItem)
        }
      </View>
    </ScrollView>
    <Icon key={key + 'tab icon'}
          size={scale(36)}
          color={Skin1.themeColor}
          name={'angle-double-left'}/>
  </View>

  /**
   * 绘制 生肖和球
   * @param item
   * @param index
   */
  const renderEBall = (item?: PlayData, index?: number) => !anyEmpty(zodiacData) &&
    <LotteryLineEBall key={key + 'renderEBall' + item?.id}
                      item={{
                        ...item,
                        zodiacItem: findZodiacByName(zodiacData, item),
                      }}
                      selectedBalls={selectedBalls}
                      callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制 方格式
   * @param item
   * @param index
   */
  const renderERect = (item?: PlayData, index?: number) => <LotteryERect key={key + 'renderEBall' + item?.id}
                                                                         item={item}
                                                                         selectedBalls={selectedBalls}
                                                                         callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制全部的格子
   * @param groupData
   */
  const renderAllRect = (groupData?: PlayGroupData) => !anyEmpty(groupData) &&
    <View key={key + 'renderAllRect' + groupData?.id}
          style={CommStyles.flex}>

      <View key={key + 'renderAllRect sub' + groupData?.id}
            style={_styles.sub_title_container}>
        <Text key={key + 'renderAllRect sub' + groupData?.id}
              style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{groupData?.alias}</Text>
      </View>

      <View key={key + 'renderAllRect sub2' + groupData?.id}
            style={_styles.rect_container}>
        {
          groupData?.plays?.map(renderERect)
        }
      </View>

    </View>

  /**
   * 绘制 一行球
   * @param groupData
   */
  const renderLineBall = (groupData?: PlayGroupData) => !anyEmpty(groupData) &&
    <View key={key + 'renderLineBall' + groupData?.id}
          style={CommStyles.flex}>

      <View key={key + 'renderLineBall' + groupData?.id}
            style={_styles.sub_title_container}>
        <Text key={key + 'renderLineBall text' + groupData?.id}
              style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{groupData?.alias}</Text>
      </View>

      <View key={key + 'renderLineBall sub' + groupData?.id}
            style={_styles.ball_container}>
        {
          groupData?.plays?.map(renderEBall)
        }
      </View>
    </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View key={key + 'renderAllBall'}
                                    style={_styles.content_container}>
    {arrayLength(curData) > 0 && renderAllRect(curData[0])}
    {arrayLength(curData) > 1 && renderLineBall(curData[1])}
  </View>

  return (
    <ScrollView key={key}
                nestedScrollEnabled={true}
                style={[_styles.sv_container, style]}>
      {renderTab()}
      {renderAllBall()}
    </ScrollView>

  )
}

const _styles = StyleSheet.create({
  sv_container: {
    flex: 1,
    height: BALL_CONTENT_HEIGHT,
  },
  sv_tab_container: {
    flex: 1,
  },
  content_container: {
    flex: 1,
    paddingBottom: scale(240),
  },
  sub_title_container: {
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
    padding: scale(6),
  },
  sub_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(22),
    paddingHorizontal: scale(1),
  },
  ball_container: {
    padding: scale(4),
  },
  rect_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
    flex: 1,
  },
  tab_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
  },
  tab_title_content: {
    flexDirection: 'row',
  },
  tab_item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    paddingVertical: scale(8),
    paddingHorizontal: scale(30),
  },
  tab_title_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },
})

export default LhcPTYXComponent
