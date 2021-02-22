import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { chunkArray } from '../tools/ChunkArr'
import { getTrendData } from '../utils/getTrendData'
import { TrendData } from '../interface/trendData'
import Svg, { Line } from 'react-native-svg'
import APIRouter from '../network/APIRouter'
import { ChooseGameModal } from './ChooseGameModal'
import PushHelper from '../define/PushHelper'
import { BaseScreen } from '../../pages/乐橙/component/BaseScreen'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { hideLoading, showLoading } from '../widget/UGLoadingCP'
import { getGameList } from '../utils/getGameList'
import { anyEmpty } from '../tools/Ext'
import { scale } from '../tools/Scale'
import { httpClient } from '../network/httpClient'
import { UGBasePageProps } from '../../pages/base/UGPage'
import { UGNextIssueModel } from '../network/Model/LottoGamesModel'
import { UGText } from '../../../doy/public/Button之类的基础组件/DoyButton'

const TrendView = ({ navigation, setProps }: UGBasePageProps) => {
  const [trendData, setTrendData] = useState<TrendData>()
  const [headerArr, setHeaderArr] = useState([])
  const { width: screenWidth } = Dimensions.get('screen')
  const itemWidth = screenWidth / 6 - 4
  const [showModal, setShowModal] = useState(false)
  const [defaultNumber, setDefaultNumber] = useState(0)
  const [currentGame, setCurrentGame] = useState<UGNextIssueModel>()
  let [games, setGames] = useState<UGNextIssueModel[]>([])

  useEffect(() => {
    currentGame && games.length > 0 && getData()
  }, [defaultNumber, currentGame, games])

  useEffect(() => {
    let list: UGNextIssueModel[]

    async function findCurrentGame() {
      if (!list) {
        APIRouter.game_lotteryGames().then(async ({ data: res }) => {
          let arr: UGNextIssueModel[] = []
          res.data.map((item) => {
            arr = arr.concat(item.list)
          })
          list = getGameList(arr)
          setGames(list)
          findCurrentGame()
        })
        return
      }

      if (Platform.OS == 'ios') {
        // 如果上一个页面是下注页，则取出其gameId
        const cnt: number = await OCHelper.call('UGNavigationController.current.viewControllers.count')
        const gameId: string = await OCHelper.call('UGNavigationController.current.viewControllers.objectAtIndex:.gameId', [cnt - 2])
        // 查看当前下注游戏的走势图
        const ret = list.filter((v) => {
          if (v.id == gameId) return v
        })
        if (ret?.length) {
          setCurrentGame(ret[0])
          return
        }
      }
      setCurrentGame(list[0])
    }

    findCurrentGame()
    setProps({ didFocus: findCurrentGame }, false)
  }, [])

  // useEffect(() => {
  //     // OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
  //     // const unsubscribe = navigation.addListener('focus', () => {
  //     //     OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
  //     // }, []);
  //     OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
  //     // const _unsubscribe = navigation.addListener('blur', () => {
  //     //     OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
  //     // }, []);
  //
  //     // Return the function to unsubscribe from the event so it gets removed on unmount
  //     // return _unsubscribe;
  // }, [])

  useEffect(() => {
    if (trendData) {
      setHeaderArr(chunkArray(trendData.header, 6))
    }
  }, [trendData])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      switch (Platform.OS) {
        case 'ios':
          OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true])
          break
        case 'android':
          break
      }
    })
    return unsubscribe
  }, [])

  const getData = () => {
    showLoading(undefined, ['#0005', '#0005'])//数量必须>1，否则Android控件出问题
    APIRouter.getTrendData(currentGame.id.toString()).then((result) => {
      hideLoading()
      if (anyEmpty(result?.data?.data?.list)) {
        setTrendData(null)
      } else {
        setTrendData(getTrendData(defaultNumber, currentGame.gameType, result.data.data.list))
      }
    })
  }

  const getHeaderIndex = (fromName: string, index) => {
    switch (fromName) {
      case 'gdkl10':
      case 'xync':
      case 'xyft':
      case 'pk10':
      case 'pk10nn':
      case 'jsk3':
      case 'gd11x5':
        return index < 10 ? `0${index}` : index
      case 'pcdd':
      case 'cqssc':
      case 'qxc':
        return index < 11 ? `0${index - 1}` : index - 1
    }
  }
  return (
    <BaseScreen style={{ backgroundColor: '#ffffff' }} screenName={'开奖走势'}>
      <View style={{ paddingVertical: 8, backgroundColor: '#f3f3f3' }}>
        {headerArr.map((item, index) => {
          return (
            <View
              key={`btnView-${index}`}
              style={{
                flexDirection: 'row',
                width: Dimensions.get('screen').width,
                marginTop: index != 0 ? 8 : 0,
              }}>
              {item.map((text, contentIndex) => (
                <View
                  key={`${index}-${contentIndex}`}
                  style={{
                    flex: 1 / item.length,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderRadius: 4,
                      borderColor: '#999999',
                      height: 32,
                      marginHorizontal: 2,
                      width: itemWidth,
                      backgroundColor: defaultNumber == index * 6 + contentIndex ? '#f39b67' : 'rgba(255,255,255,0.2)',
                    }}
                    onPress={() => {
                      setDefaultNumber(index * 6 + contentIndex)
                    }}>
                    <UGText
                      style={{
                        color: defaultNumber == index * 6 + contentIndex ? '#ffffff' : '#999999',
                        fontSize: 15,
                        marginVertical: 6,
                        textAlign: 'center',
                      }}>
                      {text}
                    </UGText>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )
        })}
      </View>
      {trendData && trendData.data ?
        <ScrollView bounces={false}>
          <ScrollView horizontal={true} bounces={false}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  {trendData?.data[0].map((item, index) => {
                    return index == 0 ? (
                      <UGText
                        style={{
                          backgroundColor: '#c2adac',
                          borderWidth: 0.5,
                          borderColor: '#ccc',
                          color: '#ffffff',
                          paddingVertical: 8,
                          width: GRID_LEFT_HEADER_WIDTH,
                          textAlign: 'center',
                        }}>
                        期数
                      </UGText>
                    ) : (
                      <UGText
                        key={`header-${index}`}
                        style={{
                          textAlign: 'center',
                          width: GRID_ITEM_WIDTH,
                          backgroundColor: '#c2adac',
                          borderWidth: 0.5,
                          borderColor: '#ccc',
                          color: '#ffffff',
                          paddingVertical: 8,
                        }}>
                        {getHeaderIndex(currentGame.gameType, index)}
                      </UGText>
                    )
                  })}
                </View>
              </View>
              {trendData?.data.map((item, index) => (
                <View key={`row-${index}`} style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    {item.map((data, i) => {
                      return i == 0 ? (
                        <UGText
                          key={`${index}-${i}`}
                          style={{
                            backgroundColor: '#c2adac',
                            borderWidth: 0.5,
                            borderColor: '#ccc',
                            color: '#ffffff',
                            paddingVertical: 8,
                            width: GRID_LEFT_HEADER_WIDTH,
                            textAlign: 'center',
                            height: GRID_ITEM_HEIGHT,
                          }}
                        >
                          {data}
                        </UGText>
                      ) : (
                        <View
                          style={{
                            backgroundColor: '#d4d4ed',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {typeof data === 'string' ? (
                            <>
                              <View
                                style={{
                                  width: 28,
                                  height: 28,
                                  backgroundColor: '#409fdc',
                                  borderRadius: 14,
                                  position: 'absolute',
                                }}
                              />
                              <UGText
                                style={{
                                  height: GRID_ITEM_HEIGHT,
                                  textAlign: 'center',
                                  width: GRID_ITEM_WIDTH,
                                  borderWidth: 0.5,
                                  borderColor: '#ccc',
                                  color: '#ffffff',
                                  fontSize: 14,
                                  paddingVertical: 8,
                                }}>
                                {data}
                              </UGText>
                            </>
                          ) : (
                            <UGText
                              style={{
                                height: GRID_ITEM_HEIGHT,
                                textAlign: 'center',
                                width: GRID_ITEM_WIDTH,
                                borderWidth: 0.5,
                                borderColor: '#ccc',
                                color: '#aaa',
                                paddingVertical: 8,
                                fontSize: 14,
                              }}>
                              {data}
                            </UGText>
                          )}
                        </View>
                      )
                    })}
                  </View>
                </View>
              ))}
              <>
                <View style={{ flexDirection: 'row' }}>
                  {trendData?.totalTimes.map((item, index) => {
                    return index == 0 ? (
                      <UGText
                        key={`header-${index}`}
                        style={{
                          backgroundColor: '#c2adac',
                          borderWidth: 0.5,
                          borderColor: '#ccc',
                          color: '#ffffff',
                          paddingVertical: 8,
                          width: GRID_LEFT_HEADER_WIDTH,
                          textAlign: 'center',
                        }}>
                        {item}
                      </UGText>
                    ) : (
                      <UGText
                        key={`header-${index}`}
                        style={{
                          textAlign: 'center',
                          width: GRID_ITEM_WIDTH,
                          backgroundColor: '#c2adac',
                          borderWidth: 0.5,
                          borderColor: '#ccc',
                          color: '#ffffff',
                          paddingVertical: 8,
                        }}>
                        {item}
                      </UGText>
                    )
                  })}
                </View>
                <View style={{ flexDirection: 'row' }}>
                  {trendData?.averageOmission.map((item, index) => {
                    return index == 0 ? (
                      <UGText
                        key={`header-${index}`}
                        style={{
                          backgroundColor: '#c2adac',
                          borderWidth: 0.5,
                          borderColor: '#ccc',
                          color: '#ffffff',
                          paddingVertical: 8,
                          width: GRID_LEFT_HEADER_WIDTH,
                          textAlign: 'center',
                        }}>
                        {item}
                      </UGText>
                    ) : (
                      <UGText
                        key={`header-${index}`}
                        style={{
                          textAlign: 'center',
                          width: GRID_ITEM_WIDTH,
                          backgroundColor: '#c2adac',
                          borderWidth: 0.5,
                          borderColor: '#ccc',
                          color: '#ffffff',
                          paddingVertical: 8,
                        }}>
                        {item}
                      </UGText>
                    )
                  })}
                </View>
                <View style={{ flexDirection: 'row' }}>
                  {trendData?.maximumOmission.map((item, index) => {
                    return index == 0 ? (
                      <UGText
                        key={`header-${index}`}
                        style={{
                          backgroundColor: '#c2adac',
                          borderWidth: 0.5,
                          borderColor: '#ccc',
                          color: '#ffffff',
                          paddingVertical: 8,
                          width: GRID_LEFT_HEADER_WIDTH,
                          textAlign: 'center',
                        }}>
                        {item}
                      </UGText>
                    ) : (
                      <UGText
                        key={`header-${index}`}
                        style={{
                          textAlign: 'center',
                          width: GRID_ITEM_WIDTH,
                          backgroundColor: '#c2adac',
                          borderWidth: 0.5,
                          borderColor: '#ccc',
                          color: '#ffffff',
                          paddingVertical: 8,
                        }}>
                        {item}
                      </UGText>
                    )
                  })}
                </View>
                <View style={{ flexDirection: 'row' }}>
                  {trendData?.maximumConnection.map((item, index) => {
                    return index == 0 ? (
                      <UGText
                        key={`header-${index}`}
                        style={{
                          backgroundColor: '#c2adac',
                          borderWidth: 0.5,
                          borderColor: '#ccc',
                          color: '#ffffff',
                          paddingVertical: 8,
                          width: GRID_LEFT_HEADER_WIDTH,
                          textAlign: 'center',
                        }}>
                        {item}
                      </UGText>
                    ) : (
                      <UGText
                        key={`header-${index}`}
                        style={{
                          textAlign: 'center',
                          width: GRID_ITEM_WIDTH,
                          backgroundColor: '#c2adac',
                          borderWidth: 0.5,
                          borderColor: '#ccc',
                          color: '#ffffff',
                          paddingVertical: 8,
                        }}>
                        {item}
                      </UGText>
                    )
                  })}
                </View>
              </>
            </View>
            {trendData?.positionArr && trendData?.positionArr?.length > 0 && (
              <Svg height={'100%'} width={'100%'} style={{ position: 'absolute', flex: 1 }}>
                {trendData?.positionArr.map((item, index) => {
                  return index != 0 &&
                    <Line key={index} x1={item.x} y1={item.y} x2={trendData?.positionArr[index - 1].x}
                          y2={trendData?.positionArr[index - 1].y} stroke="#409fdc" strokeWidth="1" />
                })}
              </Svg>
            )}
          </ScrollView>
        </ScrollView> :
        <View style={{ flex: 1, backgroundColor: '#f3f3f3', justifyContent: 'center' }}>
          <UGText style={{ alignSelf: 'center', color: '#cccccc', fontSize: 18 }}>此彩种暂无走势资料</UGText>
        </View>}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ backgroundColor: '#d7213a', height: 44, width: 160, justifyContent: 'center' }}
                          onPress={() => setShowModal(true)}>
          <UGText
            style={{
              textAlign: 'center',
              color: 'white',
              paddingHorizontal: 16,
            }}>
            {currentGame ? currentGame.title : ''}
          </UGText>
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: 'row', paddingRight: 8, alignItems: 'center' }}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{
              backgroundColor: '#e74d39',
              marginVertical: 6,
              width: 33,
              height: 26,
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => getData()}>
            <Image style={{ width: 20, height: 20 }}
                   source={{ uri: httpClient.defaults.baseURL + '/images/kj_refresh.png' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#e77d21',
              marginVertical: 6,
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 4,
            }}
            onPress={() => setShowModal(true)}>
            <UGText style={{ color: 'white', paddingHorizontal: 8, paddingVertical: 4, fontSize: 14 }}>选择彩种</UGText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#e74d39',
              marginVertical: 6,
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 4,
            }}
            onPress={() => PushHelper.pushCategory(1, currentGame.id)}>
            <UGText style={{ color: 'white', paddingHorizontal: 8, paddingVertical: 4, fontSize: 14 }}>去下注</UGText>
          </TouchableOpacity>
        </View>
        <ChooseGameModal
          setCurrentGame={(game) => {
            setDefaultNumber(0)
            setCurrentGame(game)
          }}
          games={games}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      </View>
      {
        Platform.OS == 'ios' ? <View style={{ flexDirection: 'row', height: 30 }}>
          <View style={{ backgroundColor: '#d7213a', height: 50, width: 160, position: 'absolute' }} />
        </View> : null
      }
    </BaseScreen>
  )
}

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default TrendView
