import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import ScrollableTabViewComponent from '../../public/components/tars/ScrollableTabViewComponent'
import AppDefine from '../../public/define/AppDefine'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { removeHTMLTag } from '../../public/tools/removeHTMLTag'
import { Toast } from '../../public/tools/ToastUtils'
import Button from '../../public/views/tars/Button'
import List from '../../public/views/tars/List'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import ProgressCircle from '../../public/views/temp/ProgressCircle'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'
import { ugLog } from '../../public/tools/UgLog'

interface ApplyRewardProps {
  tabLabel: string
  titleArray: any[]
  list: any[]
  onPress: () => any
  onPressApply: ({ win_apply_content, quickAmounts, id }: { win_apply_content: string; quickAmounts: string[]; id: string }) => any
}

const RewardList = ({ tabLabel, data, uniqueKey, onPress, onPressApply }) => (
  <List
    uniqueKey={uniqueKey}
    data={data}
    scrollEnabled={true}
    renderItem={({ item }) => {
      const { name, id } = item
      const params = item?.param ?? {}
      const win_apply_content = params?.win_apply_content
      const quickAmounts = [
        params.quickAmount1,
        params.quickAmount2,
        params.quickAmount3,
        params.quickAmount4,
        params.quickAmount5,
        params.quickAmount6,
        params.quickAmount7,
        params.quickAmount8,
        params.quickAmount9,
        params.quickAmount10,
        params.quickAmount11,
      ]
      return (
        <>
          <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ width: '100%', aspectRatio: 3 }}>
              <ImageBackground source={{ uri: 'winapply_default' }} style={{ width: '100%', height: '100%' }}>
                <View style={{ flex: 3 }}></View>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
                  <UGText style={{ color: '#ffffff' }}>{name}</UGText>
                </View>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
          <Button
            title={'点击申请'}
            containerStyle={{ width: 100, height: 30, backgroundColor: Skin1.themeColor, borderRadius: 5, alignSelf: 'center', marginVertical: 10 }}
            titleStyle={{ color: '#ffffff' }}
            onPress={() => onPressApply({ win_apply_content, quickAmounts, id })}
          />
        </>
      )
    }}
  />
)

function dataAction(category: string, list: any[],) {
  if (category === '0') {
    return list;
  } else {
    return list?.filter((item) => item?.category == category)
  }

}

const ApplyReward = ({ tabLabel, titleArray, list, onPress, onPressApply }: ApplyRewardProps) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollableTabView tabBarUnderlineStyle={{ backgroundColor: Skin1.themeColor }} tabBarActiveTextColor={Skin1.themeColor}>
        {
          titleArray?.map((item, index) => {
            return (
              <View tabLabel={item.categoryName}>
                <RewardList uniqueKey={'ApplyReward_' + item.categoryName} data={dataAction(item.category, list)} onPress={onPress} onPressApply={onPressApply} />
              </View>
            )
          },
          )
        }
      </ScrollableTabView>
    </View>
  )
}

const ApplyFeedBack = ({ tabLabel, list }) => {
  return (
    <List
      uniqueKey={'ApplyFeedBack'}
      ListHeaderComponent={() => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomColor: '#d9d9d9', borderBottomWidth: AppDefine.onePx, paddingVertical: 10 }}>
          <UGText style={{ fontWeight: '500' }}>{'申请日期'}</UGText>
          <UGText style={{ fontWeight: '500' }}>{'申请金额'}</UGText>
          <UGText style={{ fontWeight: '500' }}>{'状态'}</UGText>
        </View>
      )}
      data={list}
      scrollEnabled={true}
      renderItem={({ item }) => {
        const { amount, state, updateTime } = item
        return (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomColor: '#d9d9d9', borderBottomWidth: AppDefine.onePx, paddingVertical: 10 }}>
            <Text style={{ flex: 2, textAlign: 'center' }}>{updateTime}</Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>{amount}</Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>{state}</Text>
          </View>
        )
      }}
    />
  )
}

const ActivityRewardPage = () => {
  const [loading, setLoading] = useState(true)
  const [winApplyList, setWinApplyList] = useState([])//申请活动彩金列表
  const [itemArray, setItemArray] = useState([])//申请活动彩金标题列表
  const [applyWinLog, setApplyWinLog] = useState([])

  const [activityVisible, setActivityVisible] = useState(false)
  const [applyVisible, setApplyVisible] = useState(false)
  const [activityContent, setActivityContent] = useState('')


  // 删除未分类
  function filterByName(aim: [], category: string) {
    return aim.filter(item => item.category !== category)
  }
  // 去掉重复
  function filterCF(jsonArray) {
    //前端对象数组 按某个属性去重
    var obj = {};
    jsonArray = jsonArray.reduce(function (item, next) {
      obj[next.category] ? '' : obj[next.category] = true && item.push(next);
      return item;
    }, []);
    return jsonArray;
  }
  // 只要category 和 categoryName
  function newArrayAction(array) {
    let newArr = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      newArr.push({ 'categoryName': element.categoryName, 'category': element.category })
    }
    return newArr;
  }

  useEffect(() => {
    Promise.all([
      APIRouter.activity_winApplyList().catch((error) => {
        console.log(error)
      }),
      APIRouter.activity_applyWinLog().catch((error) => {
        console.log(error)
      }),
      APIRouter.secure_imgCaptcha().catch((error) => {
        console.log(error)
      }),
    ])
      .then((value) => {
        //@ts-ignore
        const winApplyList = value[0]?.data?.data?.list
        //删除未分类
        let unArray = filterByName(winApplyList, '-1')
        let newArray = newArrayAction(unArray)
        let cfArray = filterCF(newArray)
        cfArray.unshift({ 'categoryName': '全部', 'category': '0' })
        setItemArray(cfArray)//给标题赋值
        //@ts-ignore
        const applyWinLog = value[1]?.data?.data?.list
        //@ts-ignore
        const imgCaptcha = value[2]?.data
        setWinApplyList(winApplyList)
        setApplyWinLog(applyWinLog)
        setImgCaptcha(imgCaptcha)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  function headerTitle() {
    let str: string = '申请反馈';
    if (AppDefine.inSites('c217')) {
      str = '审核进度'
    } else {
      if (AppDefine.inSites('c245')) {
        str = '申请结果'
      }
    }
    return str;
  }



  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'活动彩金(RN)'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <View style={{ flex: 1 }}>
        {loading ? (
          <ProgressCircle />
        ) : (
            <ScrollableTabViewComponent indicatorStyle={{ width: 50 }} tabBarScrollEnabled={false}>
              <ApplyReward
                tabLabel={'申请彩金'}
                titleArray={itemArray}
                list={winApplyList}
                onPress={() => {
                  setActivityVisible(true)
                }}
                onPressApply={({ win_apply_content }) => {
                  setApplyVisible(true)
                  setActivityContent(win_apply_content)
                }}
              />
              <ApplyFeedBack tabLabel={headerTitle()} list={applyWinLog} />
            </ScrollableTabViewComponent>
          )}
      </View>
      <Modal transparent={true} style={{ flex: 1, backgroundColor: 'transparent' }} visible={activityVisible}>
        <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '75%', height: 200, backgroundColor: '#ffffff', borderRadius: 10, alignItems: 'center' }}>
            <UGText style={{ fontSize: 20, fontWeight: '500', marginVertical: 10 }}>{'彩金活动'}</UGText>
            <Image
              source={{
                uri: 'winapply_default',
              }}
              style={{ width: '90%', aspectRatio: 3 }}
              resizeMode={'stretch'}
            />
            <View style={{ flexDirection: 'row', width: '100%', flex: 1, marginTop: 10, borderTopWidth: AppDefine.onePx, borderColor: '#d9d9d9' }}>
              <Button
                title={'确认'}
                containerStyle={{ flex: 1, borderColor: '#d9d9d9', borderRightWidth: AppDefine.onePx }}
                titleStyle={{ color: '#2894FF', fontSize: 20 }}
                onPress={() => {
                  setActivityVisible(false)
                }}
              />
              <Button
                title={'关闭'}
                containerStyle={{ flex: 1 }}
                titleStyle={{ color: '#2894FF', fontSize: 20 }}
                onPress={() => {
                  setActivityVisible(false)
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} style={{ flex: 1, backgroundColor: 'transparent' }} visible={applyVisible}>
        <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '75%', height: '60%', backgroundColor: '#ffffff', borderRadius: 10, alignItems: 'center' }}>
            <UGText style={{ fontSize: 15, marginVertical: 10 }}>{'彩金活动'}</UGText>
            <View style={{ width: '100%', marginVertical: 10, paddingHorizontal: 20 }}>
              <UGText style={{ marginBottom: 10 }}>{'活动说明'}</UGText>
              <UGText>{removeHTMLTag(activityContent)}</UGText>
            </View>
            <View style={styles.title}>
              <Text>{'快捷金额'}</Text>
            </View>
            <View style={[styles.title, { flexDirection: 'row' }]}>
              {quickAmounts?.map((ele, index) => {
                if (ele == '0') {
                  return null
                } else {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => {
                        setApplyMoney(ele)
                      }}>
                      <View style={{ width: 25, aspectRatio: 1, backgroundColor: '#02C874', justifyContent: 'center', alignItems: 'center', marginRight: 5, borderRadius: 5 }}>
                        <Text style={{ color: '#ffffff' }}>{ele}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                }
              })}
            </View>
            <TextInput
              style={{ borderColor: '#d9d9d9', width: '90%', height: 30, paddingHorizontal: 10, borderWidth: AppDefine.onePx, borderRadius: 5, marginBottom: 10 }}
              placeholder={'申请金额'}
              value={applyMoney}
              onChangeText={(text) => {
                setApplyMoney(text?.replace(/[^0-9]/g, ''))
              }}
            />
            <TextInput
              style={{ borderColor: '#d9d9d9', width: '90%', height: 100, paddingHorizontal: 10, borderWidth: AppDefine.onePx, borderRadius: 5 }}
              placeholder={'申请说明'}
              numberOfLines={5}
              onChangeText={(text) => {
                setApplyDescription(text)
              }}
            />
            <View style={{ flexDirection: 'row', marginTop: 10, width: '90%' }}>
              <TextInput
                placeholder={'请输入验证码'}
                style={{ width: 150, borderColor: '#d9d9d9', borderWidth: AppDefine.onePx, borderRadius: 5, height: 30, paddingHorizontal: 3 }}
                onChangeText={(text) => {
                  setApplyImgCaptcha(text)
                }}
              />
              <Image source={{ uri: imgCaptcha }} style={{ width: 170, height: 30 }} resizeMode={'contain'} />
            </View>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'space-around', width: '100%', paddingBottom: 20 }}>
              <Button
                title={'关闭'}
                containerStyle={{ width: '25%', borderWidth: 1, borderColor: '#8E8E8E', borderRadius: 5, height: 30 }}
                onPress={() => {
                  setApplyVisible(false)
                  setApplyMoney(null)
                  setApplyDescription(null)
                  setApplyImgCaptcha(null)
                }}
              />
              <Button
                title={'确认'}
                containerStyle={{ width: '25%', borderWidth: 1, borderColor: 'transparent', borderRadius: 5, height: 30, backgroundColor: Skin1.themeColor }}
                titleStyle={{ color: '#ffffff' }}
                onPress={() => {
                  if (!applyMoney) {
                    Toast('申请金额不能为空')
                  } else if (!applyDescription) {
                    Toast('申请说明不能为空')
                  } else if (!applyImgCaptcha) {
                    Toast('验证码不能为空')
                  } else {
                    showLoading('申请中...')
                    APIRouter.activity_applyWin({ amount: applyMoney, userComment: applyDescription, imgCode: applyImgCaptcha, id: id })
                      .then((value) => {
                        const code = value?.data?.code
                        const msg = value?.data?.msg
                        if (code) {
                          showError(msg?.toString())
                        } else {
                          showSuccess(msg?.toString())
                        }
                      })
                      .finally(() => {
                        setApplyVisible(false)
                        setApplyMoney(null)
                        setApplyDescription(null)
                        setApplyImgCaptcha(null)
                      })
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  title: { width: '100%', marginVertical: 10, paddingHorizontal: 20 },
})

export default ActivityRewardPage
