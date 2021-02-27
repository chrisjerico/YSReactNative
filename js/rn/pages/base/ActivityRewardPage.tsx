import React, { useEffect, useRef, useState } from 'react'
import { Alert, Animated, Image, ImageBackground, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import ScrollableTabViewComponent from '../../public/components/tars/ScrollableTabViewComponent'
import AppDefine from '../../public/define/AppDefine'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { removeHTMLTag } from '../../public/tools/removeHTMLTag'
import Button from '../../public/views/tars/Button'
import List from '../../public/views/tars/List'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import ProgressCircle from '../../public/views/temp/ProgressCircle'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'
import { ugLog } from '../../public/tools/UgLog'
import { api } from '../../public/network/NetworkRequest1/NetworkRequest1'
import { scale } from '../../public/tools/Scale'



interface ApplyRewardProps {
  tabLabel: string
  titleArray: any[]
  list: any[]
  onPress: () => any
  onPressApply: ({ win_apply_content }: { win_apply_content: string }) => any
}


const RewardList = ({ data, uniqueKey, onPress, onPressApply }) => (
  <List
    uniqueKey={uniqueKey}
    data={data}
    scrollEnabled={true}
    renderItem={({ item }) => {
      const { name } = item
      const win_apply_content = item?.param?.win_apply_content
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
            onPress={() => onPressApply({ win_apply_content })}
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
      <ScrollableTabView
        tabBarUnderlineStyle={
          { backgroundColor: Skin1.themeColor, height: scale(3), }}
        tabBarActiveTextColor={Skin1.textColor1}
        tabBarInactiveTextColor={Skin1.tabNoSelectColor}
        tabBarTextStyle={{ fontSize: scale(20) }}
      >
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


const ActivityRewardPage = () => {
  const [loading, setLoading] = useState(true)
  const [winApplyList, setWinApplyList] = useState([])//申请活动彩金列表
  const [itemArray, setItemArray] = useState([])//申请活动彩金标题列表
  const [applyWinLog, setApplyWinLog] = useState([])

  const [activityVisible, setActivityVisible] = useState(false)
  const [applyVisible, setApplyVisible] = useState(false)
  const [activityContent, setActivityContent] = useState('')
  const [alertVisible, setAlertVisible] = useState(false)
  const [content, setContent] = useState('')

  // cell 点击方法
  function itemAction(item: any) {
    // applyWinLogDetail
    api.activity.applyWinLogDetail(item.id).useSuccess((data) => {

      let objdata = data['data'];

      let str: string = `
活动名称：${objdata.winName}
申请日期：${objdata.updateTime}
申请金额：${objdata.amount}
申请原因：${objdata.userComment} 
审核结果：${objdata.state} 
审核说明：${objdata.adminComment}
   `
      setContent(str)
      setAlertVisible(true)
    })
  }

  const ApplyFeedBack = ({ tabLabel, list }) => {
    ugLog('list===', list)
    return (
      <List
        uniqueKey={'ApplyFeedBack'}
        ListHeaderComponent={() => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomColor: '#d9d9d9', borderBottomWidth: AppDefine.onePx, paddingVertical: 10 }}>
            <UGText style={{ fontWeight: '500', }}>{'         申请日期          '}</UGText>
            <UGText style={{ fontWeight: '500', }}>{'申请金额'}</UGText>
            <UGText style={{ fontWeight: '500' }}>{'状态'}</UGText>
          </View>
        )}
        data={list}
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomColor: '#d9d9d9', borderBottomWidth: AppDefine.onePx, paddingVertical: 10, }}
              onPress={() => {
                itemAction(item)
              }}>
              <UGText style={{ fontWeight: '500', }}>{item.updateTime}</UGText>
              <UGText style={{ fontWeight: '500', }}>{item.amount}</UGText>
              <UGText style={{ fontWeight: '500' }}>{item.state}</UGText>
            </TouchableOpacity>
          );
        }}
      />
    )
  }
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

        ugLog('applyWinLog====', applyWinLog)
        setWinApplyList(winApplyList)
        setApplyWinLog(applyWinLog)
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
        <MineHeader title={'活动彩金'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <View style={{ flex: 1 }}>
        {loading ? (
          <ProgressCircle />
        ) : (
            <ScrollableTabViewComponent
              indicatorStyle={{ width: 50 }} tabBarScrollEnabled={false}
            >
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
        <View style={{ backgroundColor: '#0005', flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: '#d9d9d9', borderWidth: AppDefine.onePx, }}>
          <View style={{ width: '75%', height: 200, backgroundColor: '#ffffff', borderRadius: 10, alignItems: 'center' }}>
            <UGText style={{ fontSize: 18, fontWeight: '500', marginVertical: 10 }}>{'彩金活动'}</UGText>
            <Image
              source={{
                uri: 'winapply_default',
              }}
              style={{ width: '90%', aspectRatio: 3 }}
              resizeMode={'stretch'}
            />
            <View style={{ flexDirection: 'row', width: '100%', flex: 1, marginTop: 25, borderTopWidth: AppDefine.onePx, borderColor: '#d9d9d9' }}>
              <Button
                title={'确认'}
                containerStyle={{ flex: 1, borderColor: '#d9d9d9', borderRightWidth: AppDefine.onePx }}
                titleStyle={{ color: '#2894FF', fontSize: 18 }}
                onPress={() => {
                  setActivityVisible(false)
                }}
              />
              <Button
                title={'关闭'}
                containerStyle={{ flex: 1 }}
                titleStyle={{ color: '#2894FF', fontSize: 18 }}
                onPress={() => {
                  setActivityVisible(false)
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} style={{ flex: 1, backgroundColor: 'transparent' }} visible={applyVisible}>
        <View style={{ backgroundColor: '#0005', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '75%', height: '60%', backgroundColor: '#ffffff', borderRadius: 10, alignItems: 'center' }}>
            <UGText style={{ fontSize: 15, marginVertical: 10 }}>{'彩金活动'}</UGText>
            <View style={{ width: '100%', marginVertical: 10, paddingHorizontal: 20 }}>
              <UGText style={{ marginBottom: 10 }}>{'活动说明'}</UGText>
              <UGText>{removeHTMLTag(activityContent)}</UGText>
            </View>
            <TextInput style={{ borderColor: '#d9d9d9', width: '90%', height: 30, paddingHorizontal: 10, borderWidth: AppDefine.onePx, borderRadius: 5, marginBottom: 10 }} placeholder={'申请金额'} />
            <TextInput style={{ borderColor: '#d9d9d9', width: '90%', height: 100, paddingHorizontal: 10, borderWidth: AppDefine.onePx, borderRadius: 5 }} placeholder={'申请说明'} numberOfLines={5} />
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'space-around', width: '100%', paddingBottom: 20 }}>
              <Button
                title={'关闭'}
                containerStyle={{ width: '25%', borderWidth: 1, borderColor: '#8E8E8E', borderRadius: 5, height: 30 }}
                onPress={() => {
                  setApplyVisible(false)
                }}
              />
              <Button
                title={'确认'}
                containerStyle={{ width: '25%', borderWidth: 1, borderColor: 'transparent', borderRadius: 5, height: 30, backgroundColor: Skin1.themeColor }}
                titleStyle={{ color: '#ffffff' }}
                onPress={() => {
                  setApplyVisible(false)
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* 申请反馈弹框 */}
      <Modal transparent={true} style={{ flex: 1, backgroundColor: 'transparent' }} visible={alertVisible}>
      <View style={{ backgroundColor: '#0005', flex: 1,width:'100%', justifyContent: 'center', alignItems: 'center', }}>
        <View style={{ width: '75%', backgroundColor: '#ffffff', borderRadius: 10, alignItems: 'center' }}>
          <UGText style={{ fontSize: 18, fontWeight: '500', marginVertical: 10 }}>{'查看详情'}</UGText>
          <View style={{ flexDirection: 'row', }}>
            <UGText style={{ marginHorizontal: 15, }}>{content}</UGText>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', height: 50, borderTopWidth: AppDefine.onePx, borderColor: '#d9d9d9' }}>
            <Button
              title={'关闭'}
              containerStyle={{ flex: 1 }}
              titleStyle={{ color: '#2894FF', fontSize: 18 }}
              onPress={() => {
                setAlertVisible(false)
              }}
            />
          </View>
        </View>
      </View>
      </Modal>
    </>
  )
}




export default ActivityRewardPage
