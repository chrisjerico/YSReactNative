
import { View, Text, FlatList, StyleSheet, RefreshControl, Image, ImageBackground, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import AppDefine from '../../../public/define/AppDefine';
import { useHtml5Image } from '../../../public/tools/tars';
import React, { useEffect, useRef, useState, Component } from 'react'
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1';
import { UGCheckinListModel, UGSignInModel } from '../../../redux/model/other/UGcheckinBonusModel';
import moment from "moment/moment";
import { OCHelper } from '../../../public/define/OCHelper/OCHelper';
import { Toast } from '../../../public/tools/ToastUtils';
import { hideLoading, showLoading } from '../../../public/widget/UGLoadingCP';
import { setProps } from '../../base/UGPage';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import LinearGradient from 'react-native-linear-gradient'


const { getHtml5Image, getHtml5ImagePlatform } = useHtml5Image('http://test10.6yc.com')

const QDTestPage = () => {

    const [list, setList] = useState<Array<UGCheckinListModel>>([])
    const [checkinListModel, setCheckinListModel] = useState<UGSignInModel>({})

    //把'2012-12-31' 转成对应格式 'MM月dd日' 字符串
    function formatTime(numberStr, format) {
        const date = moment(numberStr).toDate();//转Date
        var nowtime = date.format(format); //调用
        return nowtime;
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
        console.log('checkinListModel.serverTime==',checkinListModel.serverTime);
        
        checkinDataWithType('0',checkinListModel.serverTime);
    }
    // cell 点击方法
    function itemAction(item: UGCheckinListModel) {

        console.log('点击item=',item);
        
        if (item.isCheckin) {
            return;
        }
        if (item.whichDay >= checkinListModel.serverTime) {
            checkinDataWithType('0',item.whichDay);
        }
        else {

            if (checkinListModel.mkCheckinSwitch && item.isMakeup) {
                 for (const k  in checkinListModel.checkinList) {
                     const clm = checkinListModel.checkinList[k];
                     if (clm == item) {
                        checkinDataWithType('1',item.whichDay);
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

    // 网络请求========================================================================================================
      //得到领取连续签到奖励数据
      function checkinBonusData(type:string) {
          console.log('123');
          
          showLoading()
        api.task.checkinBonus(type).setCompletionBlock(({ data, msg }) => {
            hideLoading()
            // console.log('签到总开关', data.checkinSwitch);
            // console.log('签到数据：=', data);
            checkinList();
            Alert.alert('温馨提示', msg, [{text:'确认'}])
        }, (err) => {
            console.log('err = ', err);
            // Toast(err.message)

        });
    }
    //用户签到（签到类型：0是签到，1是补签）
    function checkinDataWithType(type:string, date:string ) {
        api.task.checkin(type,date).setCompletionBlock(({ data, msg }) => {
            // console.log('签到总开关', data.checkinSwitch);
            // console.log('签到数据：=', data);
            checkinList();
            Alert.alert('温馨提示', msg, [{text:'确认'}])
            OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationGetUserInfo'])
            
        }, (err) => {
            console.log('err = ', err);
            // Toast(err.message)

        });
    }

     //用户签到列表
     function checkinList() {
        api.task.checkinList().setCompletionBlock(({ data }) => {
            // console.log('签到总开关', data.checkinSwitch);
            // console.log('签到数据：=', data);

            setCheckinListModel(data)
            setList(data.checkinList)
            
        }, (err) => {
            console.log('err = ', err);
            // Toast(err.message)

        });
    }




    useEffect(() => {

        checkinList()

    }, [])


    // 渲染列表项
    const _renderItem = ({ index, item }) => {
        console.log(index);
        console.log('img = ', getHtml5ImagePlatform(undefined, 'static/vueTemplate/vue/images/my/userInfo/signed'));

        return (
            <View key={item.key} style={styles.itemViewStyle}>
                <Text style={[styles.itemTextStyle, styles.itemTextSizeStyle]}>{formatTime(item?.whichDay, 'MM月dd日')}</Text>
                <Text style={[styles.itemTextStyle, styles.itemTextSizeStyle]}>{item?.week}</Text>

                <TouchableOpacity onPress={() => {
                    itemAction(item)
                }}>
                    <ImageBackground style={[styles.itemImageStyle, { borderRadius: 5, overflow: 'hidden' }]} source={{ uri: checkinImgBg(item) }}>
                        <Text style={[styles.itemImageTextStyle, styles.itemTextSizeStyle]}>{'+' + item?.integral}</Text>
                        <Image style={[styles.itemImageImageStyle]} source={{ uri: 'https://appstatic.guolaow.com/web/static/vueTemplate/vue/images/my/userInfo/sign/gold.png' }} />
                        <ImageBackground style={[styles.itemImageImage2Style,]} source={{ uri: imgbgCheckinState(item) }}>
                            <Text style={[styles.itemImageImageTextStyle, styles.itemImageImageTextSizeStyle]}>{checkinState(item)}</Text>
                        </ImageBackground>
                    </ImageBackground>

                </TouchableOpacity>
            </View>
        );
    }

    const _renderListEmptyComp = () => {
        return (
            <View>
                <Text>没有数据时显示本段文字</Text>
            </View>
        );
    }

    return (
        <LinearGradient style={{ flex: 1, }} start={{x:0,y:1}} end={{x:1,y:1}} colors={Skin1.bgColor}>
            <LinearGradient style={{height: 80,justifyContent: 'center',alignItems: 'center'}} colors={Skin1.navBarBgColor}>
                <Text style={styles.headerTextStyle}>我的APP</Text>
            </LinearGradient>
            {/* 签到记录 */}
            <View style={[{ height: 40, }]}>
                <View style={{ marginLeft: AppDefine.width - 70 - 15, justifyContent: 'center', marginTop: 5, }}>
                    <Button title={'签到记录'} containerStyle={{ width: 70, height: 30, backgroundColor: 'yellow', borderRadius: 5, overflow: 'hidden' }} titleStyle={{ color: 'white', fontSize: 13 }}
                        onPress={() => {
                            console.log('签到记录点击了')
                           
                        }} />
                </View>
            </View>
            <ScrollView onScroll={() => { }}>
                {/* 签到领积分 */}
                <View style={[{ height: 110, backgroundColor: '#0000FF' }]}>
                    <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>
                        <Text style={[{ fontSize: 41, color: '#FBF2D5' }]}>{'签到领积分'}</Text>
                        <View style={[{ marginTop: 16, backgroundColor: '#FFAA2F', borderRadius: 5, }]}>
                            <Text style={[{ fontSize: 13, color: 'white', marginHorizontal: 10, marginVertical: 5, }]}>{'用 积 分 兑 换 现 金'}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'center', }}>
                        <Text style={[{ fontSize: 18, color: '#FBF2D5' }]}>{'已连续'}</Text>
                        <Text style={[{ fontSize: 27, color: 'red', marginVertical: -7 }]}>{checkinListModel.checkinTimes}</Text>
                        <Text style={[{ fontSize: 18, color: '#FBF2D5' }]}>{'天签到'}</Text>

                    </View>
                </View>
                {/* faselist */}
                <View style={[{
                    borderRadius: 5, overflow: 'hidden', borderColor: '#EDFAFE', height: 400, borderWidth: 4, marginLeft: 5,
                    marginRight: 5,
                }]}>
                    <FlatList
                        style={[styles.scrollViewStyle]}
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
                    <Button title={'马上签到'} containerStyle={{ width: 140, height: 40, backgroundColor: '#0000FF', borderRadius: 25, overflow: 'hidden' }} titleStyle={{ color: 'white', fontSize: 22 }}
                        onPress={() => {
                            console.log('马上签到点击了')
                            mUGSignInButtonClicked()
                        }} />
                </View>

                {/* 签到礼包 */}
                <View style={[{ height: 260, backgroundColor: '#0000FF' }]}>
                    <Text style={[{ fontSize: 18, color: '#FBF2D5', marginLeft: 12, marginTop: 10 }]}>{'连续签到礼包'}</Text>
                    <View style={[{ height: 120, backgroundColor: '#0000FF', marginTop: 10, marginHorizontal: 12 }]}>
                        <View style={[{ height: 1, backgroundColor: '#F4F4F4' }]}></View>
                        <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', height: 60 }}>
                            <Image style={[{ height: 40, width: 40, }]} source={{ uri: 'https://appstatic.guolaow.com/web/static/vueTemplate/vue/images/my/userInfo/sign/award5.png' }} />


                            <View style={[]}>
                                <Text style={[{ fontSize: 17, color: 'white', marginHorizontal: 10, marginVertical: 5, }]}>{'5天礼包(3开心乐)'}</Text>
                                <Text style={[{ fontSize: 13, color: '#9A9A9A', marginHorizontal: 10, marginVertical: 5, }]}>{'连续签到5天即可领取'}</Text>
                            </View>
                            <View style={{ flex: 1 }} />
                            {/* <View style={[{backgroundColor: 'yellow', height:60, width:100}]}> */}
                            <Button title={'领取'} containerStyle={{ width: 100, height: 34, borderRadius: 5, overflow: 'hidden' }} titleStyle={{ color: 'white', fontSize: 13 }}
                                onPress={() => {
                                    console.log('领取点击了')
                                    checkinBonusData('5')
                                }} />
                        </View>

                        <View style={[{ height: 1, backgroundColor: '#F4F4F4' }]}></View>
                        <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', height: 60 }}>
                            <Image style={[{ height: 40, width: 40, }]} source={{ uri: 'https://appstatic.guolaow.com/web/static/vueTemplate/vue/images/my/userInfo/sign/award5.png' }} />


                            <View style={[]}>
                                <Text style={[{ fontSize: 17, color: 'white', marginHorizontal: 10, marginVertical: 5, }]}>{'5天礼包(3开心乐)'}</Text>
                                <Text style={[{ fontSize: 13, color: '#9A9A9A', marginHorizontal: 10, marginVertical: 5, }]}>{'连续签到5天即可领取'}</Text>
                            </View>
                            <View style={{ flex: 1 }} />
                            {/* <View style={[{backgroundColor: 'yellow', height:60, width:100}]}> */}
                            <Button title={'领取'} containerStyle={{ width: 100, height: 34, borderRadius: 5, overflow: 'hidden' }} buttonStyle={{ backgroundColor: 'red' }} titleStyle={{ color: 'white', fontSize: 13 }}
                                onPress={() => {
                                    console.log('领取2点击了')
                                    checkinBonusData('7')
                                }} />
                        </View>

                    </View>

                </View>


            </ScrollView>

        </LinearGradient>
    )

}


export default QDTestPage

const styles = StyleSheet.create({
    scrollViewStyle: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        // backgroundColor: '#7B68EE',
    },
    headerViewStyle: {
        height: 50,
        backgroundColor: '#f4511e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextStyle: {
        fontSize: 20,
        color: '#FFFFFF'
    },
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
        color: 'black',
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

