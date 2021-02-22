import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../../base/CommStyles'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import UsePK10GFWF from './UsePK10GFWF'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../../public/tools/Ext'
import LotteryEBall from '../../../widget/LotteryEBall'
import { BALL_CONTENT_HEIGHT, SingleOption } from '../../../const/LotteryConst'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'


/**
 * 官方玩法
 *
 * @param navigation
 * @constructor
 */
const PK10GFWFComponent = ({ playOddData, style }: ILotteryRouteParams) => {


  const {
    setPlayOddData,
    optionArray,
    optionIndex,
    setOptionIndex,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UsePK10GFWF()

  //当前这一页的数据
  const currentPageData = playOddData?.pageData?.groupTri[tabIndex]

  useEffect(() => {
    setPlayOddData(playOddData)
  }, [])
  const key = 'lottery page' + playOddData?.code

  /**
   * 单个TAB
   * @param item
   * @param index
   * @param tabLen 总共有多少个TAB
   */
  const renderTabItem = (item?: Array<PlayGroupData>, index?: number, tabLen?: number) =>
    <TouchableWithoutFeedback key={key + item[0]?.alias}
                              style={CommStyles.flex}
                              onPress={() => {
                                // setOptionIndex(SingleOption.SINGLE)
                                setTabIndex(index)
                              }}>
      <View key={key + item[0]?.alias}
            style={[
              _styles.tab_item,
              index == tabIndex ? { backgroundColor: `${Skin1.themeColor}dd` } : null,
              tabLen > 3 ? null : { width: scale(400 / tabLen) },//tab 少于4个 就平均分配空间
            ]}>
        <Text key={key + item[0]?.alias}
              style={[
                _styles.tab_title_item_text,
                index == tabIndex ? { color: `white` } : null,
              ]}>{item[0]?.alias}</Text>
      </View>
    </TouchableWithoutFeedback>

  /**
   * 绘制tab
   */
  const renderTab = () => {
    const tabLen = arrayLength(playOddData?.pageData?.groupTri)//tab数量

    return <View key={key + 'tab'}
                 style={_styles.tab_title_container}>
      <ScrollView key={key + 'sv'}
                  style={_styles.sv_tab_container}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
        <View key={key + 'content'}
              style={_styles.tab_title_content}>
          {playOddData?.pageData?.groupTri?.map(
            (item, index) => renderTabItem(item, index, tabLen),
          )}
        </View>
      </ScrollView>
      {
        tabLen > 3 && <Icon size={scale(36)}
                            color={Skin1.themeColor}
                            name={'angle-double-left'}/>
      }
    </View>
  }

  /**
   * 绘制 球
   * @param item
   * @param ballInfo 手动生成的数据
   */
  const renderEBall = (item?: PlayGroupData, ballInfo?: PlayData) =>
    <LotteryEBall key={key + 'renderEBall' + ballInfo?.id + ballInfo?.name}
                  item={{
                    ...ballInfo,
                    odds: null,
                  }}
                  selectedBalls={selectedBalls}
                  ballType={{ size: scale(46) }}
                  ballStyle={{ flexDirection: 'column' }}
                  callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>

  /**
   * 绘制 单式 复式 选项
   * @param item
   * @param index
   */
  const renderOption = (item?: string, index?: number) =>
    <TouchableWithoutFeedback key={item}
                              onPress={() => setOptionIndex(index)}>
      <View style={_styles.option_item}>
        {
          optionIndex == index
            ?
            <Icon key={key + `${index}_select true`}
                  size={scale(36)}
                  color={Skin1.themeColor}
                  name={'check-circle'}/>
            :
            <Icon key={key + `${index}_select false`}
                  size={scale(36)}
                  name={'circle-o'}/>
        }
        <Text style={_styles.option_item_text}>{optionArray[index]}</Text>
      </View>
    </TouchableWithoutFeedback>

  /**
   * 绘制 官方玩法
   * @param groupData
   * @param index
   */
  const renderGFWF = (groupData?: PlayGroupData, index?: number) =>
    <View key={key + ' renderGFWF' + groupData?.id + groupData?.exPlays[0]?.alias}
          style={CommStyles.flex}>

      {//显示赔率标题
        index == 0 && <View key={key + ' sub renderGFWF 2 = ' + groupData?.id}
                            style={_styles.sub_big_title_container}>
          <Text key={key + ' text renderGFWF' + groupData?.id}
                style={[
                  _styles.sub_big_title_text,
                  { color: Skin1.themeColor },
                ]}>{`赔率: ${groupData?.exPlays[0]?.odds}`}</Text>
        </View>
      }

      {//显示赔率提醒文字
        index == 0 && !anyEmpty(groupData?.exHint) && <View key={key + ' sub renderGFWF 2 = ' + groupData?.id}
                                                            style={_styles.sub_big_hint_container}>
          <Text key={key + ' text renderGFWF' + groupData?.id}
                style={_styles.sub_big_hint_text}>{groupData?.exHint}</Text>
        </View>
      }

      <View key={key + ' sub renderGFWF 2 =' + groupData?.id}
            style={_styles.sub_title_container}>
        <Text key={key + ' text renderGFWF' + groupData?.id}
              style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{groupData?.exPlays[0]?.alias}</Text>
      </View>

      <View key={key + ' ball renderGFWF' + groupData?.id}
            style={_styles.ball_parent_container}>
        {groupData?.exPlays.map((item, index) => renderEBall(groupData, item))}
      </View>
    </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => {
    let pageData = currentPageData
    if (tabIndex == 1 || tabIndex == 2) {//猜前二 猜前三 有选项
      if (optionIndex == 0) {//单式
        pageData = currentPageData?.slice(0, 1)
      } else {//复式
        pageData = currentPageData?.slice(1)
      }
    }

    return <View style={_styles.content_container}>
      {pageData?.map(renderGFWF)}
    </View>
  }

  return (
    <ScrollView key={key}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={[_styles.sv_container, style]}>
      {renderTab()}
      {//猜前二 猜前三 有选项
        (tabIndex == 1 || tabIndex == 2) && <View style={_styles.option}>
          {optionArray?.map(renderOption)}
        </View>
      }
      {renderAllBall()}
    </ScrollView>

  )
}

const _styles = StyleSheet.create({
  sv_container: {
    flex: 1,
    height: BALL_CONTENT_HEIGHT,
  },
  content_container: {
    flex: 1,
    paddingBottom: scale(120),
  },
  sub_big_title_container: {
    alignItems: 'center',
    padding: scale(6),
  },
  sub_big_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    paddingHorizontal: scale(1),
  },
  sub_big_hint_container: {
    alignItems: 'center',
    paddingHorizontal: scale(4),
    paddingBottom: scale(6),
  },
  sub_big_hint_text: {
    color: UGColor.TextColor3,
    fontSize: scale(19),
    paddingHorizontal: scale(1),
  },
  sub_title_container: {
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(4),
    padding: scale(6),
  },
  sub_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(22),
    paddingHorizontal: scale(1),
  },
  ball_parent_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
  },
  ball_odds: {
    width: scale(76),
    color: UGColor.TextColor7,
    fontSize: scale(18),
    paddingHorizontal: scale(1),
  },
  tab_title_tb: {
    width: '100%',
    alignItems: 'center',
  },
  tab_title: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    padding: scale(6),
  },
  tab_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
  },
  sv_tab_container: {
    flex: 1,
  },
  tab_title_content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tab_item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(4),
    paddingVertical: scale(8),
    paddingHorizontal: scale(30),
  },
  tab_title_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },
  option_item: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: scale(16),
    paddingHorizontal: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  option_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },
  option: {
    flexDirection: 'row',
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.LineColor4,
  },


})

export default PK10GFWFComponent
