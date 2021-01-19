import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Easing, } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';
import { skin1, Skin1 } from '../../../public/theme/UGSkinManagers';
import { UGBasePageProps } from '../../base/UGPage';
import { scale } from "../../../public/tools/Scale";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import EmptyView from '../../../public/components/view/empty/EmptyView';
import { arrayEmpty } from '../../../public/tools/Ext';
import { ugLog } from '../../../public/tools/UgLog';
import { Button } from 'react-native-elements';
import { UGStore } from '../../../redux/store/UGStore';
import JDLotteryAssistantCP, { JDLotteryAssistantCPAction } from '../cp/JDLotteryAssistantCP';
import JDChanglongBetRecordCP from '../cp/JDChanglongBetRecordCP';
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import { NSValue } from '../../../public/define/OCHelper/OCBridge/OCCall';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import APIRouter from '../../../public/network/APIRouter';
import { Res } from '../../../Res/icon/Res';
import JDBetRecordDetailPage from './JDBetRecordDetailPage';


interface JDChangLongPage {
  tabNames?: Array<string>//tab界面名称数据
  inAnimated?: boolean
  sliderIsOpen?: boolean
}

const
  JDChangLongPage = ({ setProps }: UGBasePageProps) => {

    const { current: vcp } = useRef<{} & JDLotteryAssistantCPAction>({})

    let { current: v } = useRef<JDChangLongPage>(
      {
        tabNames: [
          '最新长龙',
          '我的投注',

        ],
        inAnimated: false,
        sliderIsOpen: false
      })
    const [tabIndex] = useState<number>(0)
    const { userInfo } = UGStore.globalProps
    const [money, setMoney] = useState(userInfo.balance)
    const [spinValue, setSpinValue] = useState(new Animated.Value(0))

    /**
     * 初始化
     * @param item
     */
    useEffect(() => {
      fetchBalance()
      setProps({
        navbarOpstions: {
          hidden: false, title: '长龙助手',
          rightComponent: _renderNavRigth({})

        },
        didFocus: () => {
          AppDefine.checkHeaderShowBackButton((show) => {
            setProps({ navbarOpstions: { back: show } });
          })
          console.log('长龙主页didFocus');
          vcp?.startTime && vcp?.startTime()
        },
        didBlur: () => {
          console.log('长龙主页didBlur');
          vcp?.stopTime && vcp?.stopTime()
        },
      })

    }, [])



    /**
       * 跳到弹窗
       * 
       */
    function rightClicked() {
      OCHelper.call('UGLotteryRulesView.alloc.initWithFrame:[setTitle:][setContent:].show', [NSValue.CGRectMake(30, 120, AppDefine.width - 60, AppDefine.height - 230)], ['游戏规则'], ['   长龙助手是对快3、时时彩、PK10、六合彩、幸运飞艇、北京赛车等特定玩法的“大小单双” 开奖结果进行跟踪统计，并可进行快捷投注的助手工具；\n    每期出现大、小、单、双的概率为50%，如果连续3期及以上的开奖结果相同，称之为“长龙”，通常会采用倍投的方式进行“砍龙”或“顺龙”。\n\n  1、什么是砍龙？\n  如连续开5期“单”，可以选择“双”进行投注，这种投注方案称之为“砍龙”；\n\n  2、什么是顺龙？\n  如连续开5期“单”，继续选择“单”进行投注，这种投注方案称之为“顺龙”；\n\n  3、什么是倍投？\n  倍投是一种翻倍投注方式，是为了保障能够在“砍龙”或“顺龙”的过程中持续盈利的一种投注方式。']);
    }
    /**
     * 刷新个人金钱数据
     * 
     */
    //旋转方法
    function refreshBalance() {
      if (!v.inAnimated) {
        v.inAnimated = true;
        setSpinValue(new Animated.Value(0));
        fetchBalance()
        Animated.timing(spinValue, {
          toValue: v.sliderIsOpen ? 1 : 0, // 最终值 为1，这里表示最大旋转 360度
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          v.sliderIsOpen = !v.sliderIsOpen
          v.inAnimated = false;

        })
      }


    }


    const fetchBalance = async () => {
      try {
        console.log('后');
        const { data } = await APIRouter.user_balance_token()
        const balance = data?.data?.balance
        setMoney(balance)

        console.log('-------balance------', balance)
        UGStore.dispatch({ type: 'merge', userInfo: { balance } })


      } catch (error) {
        console.log('-------error------', error)
      }
    }
    /**
* 导航
* 
*/
    const _renderNavRigth = ({ }) => {
      {
        //映射 0-1的值 映射 成 0 - 360 度  
        const spin = spinValue.interpolate({
          inputRange: [0, 1],//输入值
          outputRange: ['0deg', '360deg'] //输出值
        })

        return (
          <View style={{ alignItems: 'center', flexDirection: 'row', width:146}}>

            <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', }} onPress={() => {
              refreshBalance()
            }}>
              <Text style={{ color: 'white', fontSize: 14, marginRight: 2 }}>
                {money}
              </Text>
              <Animated.View style={[{ width: scale(25) }, { transform: [{ rotateZ: spin }] }]}>
                <FontAwesome name={'refresh'} size={scale(25)} color={'white'} />
              </Animated.View>
              {/* <Animated.Image style={[styles.itemImageImageStyle, { height: 25, width: 25, transform: [{ rotateZ: spin }] }]} source={{ uri: img_assets('shuaxin') }} /> */}
            </TouchableOpacity>
            <View style={{flex:1}}></View>
            <TouchableOpacity style={{ marginLeft:1,marginRight:10 }}  onPress={() => {
              rightClicked()
            }}>
              <Image style={[styles.itemImageImageStyle, { height: 30, width: 24, }]} source={{ uri: Res.gengduo }} />
            </TouchableOpacity>
          </View>
        );
      }
    }
    /**
       * 绘制各列表
       * @param item
       */
    const renderRecordList = (item: string) => {
      switch (item) {
        case '最新长龙':
          return <JDLotteryAssistantCP tabLabel={item} key={item} c_ref={vcp} />
        case '我的投注':
          return <JDChanglongBetRecordCP tabLabel={item} key={item} />

      }
    }

    return (

      <View style={styles.container}>
        {
          [
            arrayEmpty(v.tabNames)
              ? <EmptyView style={{ flex: 1 }} />
              : <ScrollableTabView
                key={'ScrollableTabView'}
                initialPage={tabIndex}//初始化时被选中的Tab下标，默认是0（即第一页）
                onChangeTab={value => {
                  ugLog('tab index=', value?.from, value?.i)
                }}
                // ref={instance => tabController = instance}
                tabBarUnderlineStyle=
                {[styles.tab_bar_underline,
                { backgroundColor: Skin1.themeColor }]}
                tabBarActiveTextColor={Skin1.themeColor}
                tabBarInactiveTextColor={Skin1.textColor2}
                tabBarTextStyle={{ fontSize: scale(20) }}
                style={[{ flex: 1, }]}
                renderTabBar={() => <ScrollableTabBar style={styles.tab_bar} />}>
                {
                  v.tabNames?.map((tabItem) => {
                    return (
                      renderRecordList(tabItem)
                    )
                  },
                  )
                }
              </ScrollableTabView>,
          ]
        }

      </View >
    )

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Skin1.isBlack ? Skin1.CLBgColor : '#F1F2F5'
  },
  tab_bar: {
    backgroundColor: '#f4f4f4',
  },
  tab_bar_underline: {
    height: scale(3),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  itemImageImageStyle: {
    resizeMode: "stretch",
  },

});


export default
  JDChangLongPage