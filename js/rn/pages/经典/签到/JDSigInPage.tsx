
import { View, Text, FlatList, StyleSheet, RefreshControl, Image, ImageBackground, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import AppDefine from '../../../public/define/AppDefine';
import { UGImageHost, useHtml5Image } from '../../../public/tools/tars';
import React, { useEffect, useRef, useState, Component } from 'react'
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { UGcheckinBonusModel, UGCheckinListModel, UGSignInModel } from '../../../redux/model/other/UGcheckinBonusModel';
import moment from "moment/moment";
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import { Toast } from '../../../public/tools/ToastUtils';
import { hideLoading, showLoading } from '../../../public/widget/UGLoadingCP';
import { setProps } from '../../base/UGPage';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import LinearGradient from 'react-native-linear-gradient'
import { JDSignInHistoryCP } from '../cp/JDSignInHistoryCP';
import chroma from 'chroma-js';


const { getHtml5Image, img_platform } = useHtml5Image(UGImageHost.test10)

const JDSigInPage = () => {

    const [list, setList] = useState<Array<UGCheckinListModel>>([])//签到FastList 数据
    const [checkinListModel, setCheckinListModel] = useState<UGSignInModel>({})//签到数据（全部）
    const [hide1, setHide1] = useState<boolean>(false)//控制连续签到5天View 隐藏
    const [hide2, setHide2] = useState<boolean>(false)//控制连续签到7天View 隐藏
    const [bonus1, setBonus1] = useState<string>('')//连续签到5天View 显示的礼包数
    const [bonus2, setBonus2] = useState<string>('')//连续签到7天View 显示的礼包数
    const [checkinBonusModel1, setCheckinBonusModel1] = useState<UGcheckinBonusModel>({})//连续签到5天View 数据
    const [checkinBonusModel2, setCheckinBonusModel2] = useState<UGcheckinBonusModel>({})//连续签到7天View 数据
    const [kisCheckIn, setKisCheckIn] = useState<boolean>(false)// true '今日已签' :  false '马上签到'

    const { current: v } = useRef<JDSignInHistoryCP>({})

    //AD时间把'2012-12-31' 转成对应格式 'MM月dd日' 字符串
    function formatTime(numberStr, format) {
        const date = moment(numberStr).toDate();//转Date
        var nowtime = date.format(format); //调用
        return nowtime;
    }

    function checkinTime(item: UGSignInModel) {

        var returnStr: string = item?.checkinMoney?.toString();

        return returnStr;
    }

    function lqbtnOpacity(item: UGcheckinBonusModel) {

        var returnStr = 1.0;
        if (!item.isComplete && item.isCheckin) {
            returnStr = 1;
        }
        else {
            returnStr = 0.5;
        }
        return returnStr;
    }


    function btnOpacity(item: boolean) {

        var returnStr = 1.0;
        if (item) {
            returnStr = 0.8;
        }
        else {
            returnStr = 1.0;
        }
        return returnStr;
    }


    function btnTitle(item: UGcheckinBonusModel) {

        var returnStr = '';
        if (item.isComplete) {
            returnStr = '已领取';
        }
        else {
            returnStr = '领取';
        }
        return returnStr;
    }


    function checkinState(item: UGCheckinListModel) {

        var returnStr = '';
        if (item.isCheckin) {
            returnStr = '已签到';
        }
        else {

            if (item.whichDay >= checkinListModel.serverTime) {
                returnStr = '签到';
            }
            else {
                returnStr = '补签';
            }
        }
        return returnStr;
    }

    function imgbgCheckinState(item: UGCheckinListModel) {

        var returnStr = '';
        if (item.isCheckin) {
            returnStr = 'https://appstatic.guolaow.com/assets/signInGrey.png';
        }
        else {
            if (item.whichDay >= checkinListModel.serverTime) {
                returnStr = 'https://appstatic.guolaow.com/assets/signIn_blue.png';
            }
            else {
                if (checkinListModel.mkCheckinSwitch && item.isMakeup) {
                    returnStr = 'https://appstatic.guolaow.com/assets/signIn_red.png';
                }
                else {
                    returnStr = 'https://appstatic.guolaow.com/assets/signInGrey.png';
                }
            }
        }
        return returnStr;
    }

    function checkinImgBg(item: UGCheckinListModel) {

        var returnStr = '';
        if (item.isCheckin) {
            returnStr = 'https://appstatic.guolaow.com/web/static/vueTemplate/vue/images/my/userInfo/sign/signed.png';
        }
        else {
            returnStr = 'https://appstatic.guolaow.com/web/static/vueTemplate/vue/images/my/userInfo/sign/nosign.png';
        }
        return returnStr;
    }
    // 今日签到
    function mUGSignInButtonClicked() {
        console.log('checkinListModel.serverTime==', checkinListModel.serverTime);

        checkinDataWithType('0', checkinListModel.serverTime);
    }
    // cell 点击方法
    function itemAction(item: UGCheckinListModel) {

        console.log('点击item=', item);

        if (item.isCheckin) {
            return;
        }
        if (item.whichDay >= checkinListModel.serverTime) {
            checkinDataWithType('0', item.whichDay);
        }
        else {

            if (checkinListModel.mkCheckinSwitch && item.isMakeup) {
                for (const k in checkinListModel.checkinList) {
                    const clm = checkinListModel.checkinList[k];
                    if (clm == item) {
                        checkinDataWithType('1', item.whichDay);
                        break;
                    }
                    if (!clm.isCheckin) {
                        Toast('必须从前往后补签')
                        break;
                    }
                }
            }
            else {
                Toast('补签通道已关闭')
            }
        }

    }

   /**
   * 得到领取连续签到奖励数据
   * 
   */
    function checkinBonusData(type: string) {
        console.log('123');

        showLoading()
        api.task.checkinBonus(type).useSuccess(({ data, msg }) => {
            hideLoading()
            // console.log('签到总开关', data.checkinSwitch);
            // console.log('签到数据：=', data);
            checkinList();
            Alert.alert('温馨提示', msg, [{ text: '确认' }])
        });
    }

   /**
   * 用户签到（签到类型：0是签到，1是补签）
   * 
   */
    function checkinDataWithType(type: string, date: string) {
        api.task.checkin(type, date).useSuccess(({ data, msg }) => {
            // console.log('签到总开关', data.checkinSwitch);
            // console.log('签到数据：=', data);
            checkinList();
            Alert.alert('温馨提示', msg, [{ text: '确认' }])
            OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationGetUserInfo'])

        });
    }

   /**
   * 用户签到列表
   * 
   */
    function checkinList() {
        api.task.checkinList().useSuccess(({ data }) => {
            // console.log('签到总开关', data.checkinSwitch);
            // console.log('签到数据：=', data);

            setCheckinListModel(data)
            setList(data.checkinList)

            let checkinBonusArray = data.checkinBonus;

            if (checkinBonusArray.length >= 2) {

                let obj = checkinBonusArray[0];
                let obj2 = checkinBonusArray[1];

                setHide1(Boolean(obj.switch))
                setHide2(Boolean(obj2.switch))

                setBonus1('5天礼包(' + obj.int + ')')
                setBonus2('7天礼包(' + obj2.int + ')')

                setCheckinBonusModel1(obj)
                setCheckinBonusModel2(obj2)

            }

            let isOk = false
            for (const key in data.checkinList) {
                const clm = data.checkinList[key];
                if (clm.whichDay == data.serverTime) {
                    isOk = clm.isCheckin
                    setKisCheckIn(isOk)
                    break
                }
            }

        });
    }




    useEffect(() => {

        checkinList()
        setProps({
            navbarOpstions: { hidden: false, title: '签到' },
            didFocus: () => {
                AppDefine.checkHeaderShowBackButton((show) => {
                    setProps({ navbarOpstions: { back: show } });
                })
            }
        })

    }, [])


    // 渲染列表项
    const _renderItem = ({ index, item }) => {
        console.log(index);
        console.log('img = ', img_platform(undefined, 'static/vueTemplate/vue/images/my/userInfo/signed'));

        return (
            <View key={item.key} style={styles.itemViewStyle}>
                <Text style={[styles.itemTextStyle, styles.itemTextSizeStyle]}>{formatTime(item?.whichDay, 'MM月dd日')}</Text>
                <Text style={[styles.itemTextStyle, styles.itemTextSizeStyle]}>{item?.week}</Text>

                <TouchableOpacity onPress={() => {
                    itemAction(item)
                }}>
                    <ImageBackground style={[styles.itemImageStyle, { borderRadius: 5, overflow: 'hidden', }]} source={{ uri: checkinImgBg(item) }}>
                        <Text style={[styles.itemImageTextStyle, styles.itemTextSizeStyle]}>{'+' + item?.integral}</Text>
                        <Image style={[styles.itemImageImageStyle,]} source={{ uri: 'https://appstatic.guolaow.com/web/static/vueTemplate/vue/images/my/userInfo/sign/gold.png' }} />
                        <ImageBackground style={[styles.itemImageImage2Style,]} source={{ uri: imgbgCheckinState(item) }}>
                            <Text style={[styles.itemImageImageTextStyle, styles.itemImageImageTextSizeStyle, { marginTop: 2 }]}>{checkinState(item)}</Text>
                        </ImageBackground>
                    </ImageBackground>

                </TouchableOpacity>
            </View>
        );
    }

    const _renderListEmptyComp = () => {
        return (
            <View>
                <Text>没有数据!</Text>
            </View>
        );
    }

    const bgColor = chroma(Skin1.bgColor[0]).name() == 'white' ? ['#ccc', '#ccc'] : Skin1.bgColor
    return (
        [<LinearGradient style={{ flex: 1, }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={bgColor}>
            {/* 签到记录 */}
            <View style={[{ height: 40, }]}>
                <View style={{ marginLeft: AppDefine.width - 70 - 15, justifyContent: 'center', marginTop: 5, }}>
                    <Button title={'签到记录'} containerStyle={{ width: 70, height: 30, borderRadius: 5, overflow: 'hidden' }} titleStyle={{ color: 'white', fontSize: 13 }}
                        onPress={() => {

                            console.log('签到记录点击了')
                            v?.showSalaryAlert && v?.showSalaryAlert()
                        }} />
                </View>
            </View>
            <ScrollView onScroll={() => { }}>
                {/* 签到领积分 */}
                <View style={[{ height: 110, }]}>
                    <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>
                        <Text style={[{ fontSize: 41, color: '#FBF2D5' }]}>{'签到领积分'}</Text>
                        <View style={[{ marginTop: 16, backgroundColor: '#FFAA2F', borderRadius: 5, }]}>
                            <Text style={[{ fontSize: 13, color: 'white', marginHorizontal: 10, marginVertical: 5, }]}>{'用 积 分 兑 换 现 金'}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'center', }}>
                        <Text style={[{ fontSize: 18, color: Skin1.textColor1 }]}>{'已连续'}</Text>
                        <Text style={[{ fontSize: 27, color: 'red', marginVertical: -7 }]}>{checkinListModel.checkinTimes}</Text>
                        <Text style={[{ fontSize: 18, color: Skin1.textColor1 }]}>{'天签到'}</Text>

                    </View>
                </View>
                {/* faselist */}
                <View style={[{
                    borderRadius: 5, overflow: 'hidden', borderColor: '#EDFAFE', height: 400, borderWidth: 4, marginLeft: 5,
                    marginRight: 5, backgroundColor: Skin1.isBlack ? Skin1.homeContentColor : 'white'
                }]}>
                    <FlatList
                        style={[{ flex: 1, marginLeft: 10, marginRight: 10, }]}
                        data={list} // 数据源
                        renderItem={_renderItem} // 从数据源中挨个取出数据并渲染到列表中
                        showsVerticalScrollIndicator={false} // 当此属性为true的时候，显示一个垂直方向的滚动条，默认为: true
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false} // 当此属性为true的时候，显示一个水平方向的滚动条，默认为: true
                        ListEmptyComponent={_renderListEmptyComp()} // 列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element
                        numColumns={4}
                    />

                </View>

                {/* 马上签到 */}
                <View style={{ alignItems: 'center', marginTop: -20, justifyContent: 'center' }}>
                    <Button title={kisCheckIn ? '今日已签' : '马上签到'} containerStyle={{ width: 140, height: 40, backgroundColor: '#0000FF', borderRadius: 25, overflow: 'hidden', opacity: btnOpacity(kisCheckIn) }} titleStyle={{ color: 'white', fontSize: 22 }}
                        onPress={() => {
                            console.log('马上签到点击了')

                            if (kisCheckIn) {
                                return
                            }
                            mUGSignInButtonClicked()
                        }} />
                </View>

                {/* 签到礼包 */}
                {hide1 && hide2 && <View style={[{ height: 200, backgroundColor: Skin1.homeContentColor }]}>
                    <Text style={[{ fontSize: 18, color: Skin1.textColor1, marginLeft: 12, marginTop: 10 }]}>{'连续签到礼包'}</Text>
                    <View style={[{ marginTop: 10, marginHorizontal: 12 }]}>

                        {hide1 && <View>
                            <View style={[{ height: 1, backgroundColor: '#F4F4F4' }]}></View>
                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', height: 60 }}>
                                <Image style={[{ height: 40, width: 40, }]} source={{ uri: 'https://appstatic.guolaow.com/web/static/vueTemplate/vue/images/my/userInfo/sign/award5.png' }} />
                                <View style={[]}>
                                    <Text style={[{ fontSize: 17, color: Skin1.textColor1, marginHorizontal: 10, marginVertical: 5, }]}>{bonus1}</Text>
                                    <Text style={[{ fontSize: 13, color: Skin1.textColor2, marginHorizontal: 10, marginVertical: 5, }]}>{'连续签到5天即可领取'}</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                                {/* <View style={[{backgroundColor: 'yellow', height:60, width:100}]}> */}
                                <Button title={btnTitle(checkinBonusModel1)} containerStyle={{ width: 100, height: 34, borderRadius: 5, overflow: 'hidden', opacity: lqbtnOpacity(checkinBonusModel1) }} titleStyle={{ color: 'white', fontSize: 13 }}
                                    onPress={() => {
                                        console.log('领取点击了')
                                        checkinBonusData('5')
                                    }} />
                            </View>
                        </View>}
                        {hide2 && <View>
                            <View style={[{ height: 1, backgroundColor: '#F4F4F4' }]}></View>
                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', height: 60 }}>
                                <Image style={[{ height: 40, width: 40, }]} source={{ uri: 'https://appstatic.guolaow.com/web/static/vueTemplate/vue/images/my/userInfo/sign/award5.png' }} />


                                <View style={[]}>
                                    <Text style={[{ fontSize: 17, color: Skin1.textColor1, marginHorizontal: 10, marginVertical: 5, }]}>{bonus2}</Text>
                                    <Text style={[{ fontSize: 13, color: Skin1.textColor2, marginHorizontal: 10, marginVertical: 5, }]}>{'连续签到7天即可领取'}</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                                {/* <View style={[{backgroundColor: 'yellow', height:60, width:100}]}> */}
                                <Button title={btnTitle(checkinBonusModel2)} containerStyle={{ width: 100, height: 34, borderRadius: 5, overflow: 'hidden', opacity: lqbtnOpacity(checkinBonusModel1) }} titleStyle={{ color: 'white', fontSize: 13 }}
                                    onPress={() => {
                                        console.log('领取2点击了')
                                        checkinBonusData('7')
                                    }} />
                            </View>

                        </View>}


                    </View>

                </View>}

                <View style={[{ height: 200, }]}>
                </View>
            </ScrollView>

        </LinearGradient>,
        <JDSignInHistoryCP {...{ c_ref: v, c_name: checkinTime(checkinListModel), c_money: checkinListModel?.checkinMoney }} />]
    )

}


export default JDSigInPage

const styles = StyleSheet.create({

    itemViewStyle: {
        height: 185,
        width: (AppDefine.width - 50 - 20) / 4,
        // borderWidth: 1,
        // borderRadius: 10,
        marginTop: 5,
        marginLeft: 4,
        marginRight: 4,
        // justifyContent: 'center',//控制子元素垂直居中
        alignItems: 'center'
    },
    itemTextStyle: {
        color: Skin1.textColor1,
        fontSize: 13
    },
    itemTextSizeStyle: {
        marginTop: 8,
        alignItems: 'center'//控制子元素水平居中
    },
    itemImageStyle: {
        height: 98,
        width: 80,
        marginTop: 5,
        resizeMode: "stretch",
        alignItems: 'center',
        // borderWidth: 1,
        // borderRadius: 10,
    },
    itemImageTextStyle: {
        color: 'white',
        fontSize: 15
    },
    itemImageImageStyle: {
        height: 27,
        width: 33,
        marginTop: 5,
        resizeMode: "stretch",
    },
    itemImageImage2Style: {
        height: 18,
        width: 60,
        marginTop: 10,
        resizeMode: "stretch",
        alignItems: 'center'
    },
    itemImageImageTextStyle: {
        color: 'white',
        fontSize: 13
    },
    itemImageImageTextSizeStyle: {
        alignItems: 'center',//控制子元素水平居中
        justifyContent: 'center',//控制子元素垂直居中
    },
    separatorStyle: {
        borderColor: '#A4A4A4',
        borderBottomWidth: 2,
        marginTop: 5
    }
});

