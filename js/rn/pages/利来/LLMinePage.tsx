import * as React from "react";
import {useEffect, useState} from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {UGStore} from "../../redux/store/UGStore";
import Icon from "react-native-vector-icons/FontAwesome"
import PushHelper from "../../public/define/PushHelper";
import useMemberItems from "../../public/hooks/useMemberItems";
import useLoginOut from "../../public/hooks/useLoginOut";
import {PageName} from "../../public/navigation/Navigation";
import APIRouter from "../../public/network/APIRouter";
import {httpClient} from "../../public/network/httpClient";
import UGUserModel from "../../redux/model/全局/UGUserModel";
import AppDefine from "../../public/define/AppDefine";

const LLMinePage = ({navigation, setProps}) => {
    const {usr, curLevelGrade, nextLevelGrade, curLevelInt, nextLevelInt, balance, avatar} = UGStore.globalProps.userInfo
    const {UGUserCenterItem} = useMemberItems()
    const [levelWidth, setLevelWidth] = useState(193)
    const [depositItem, setDepositItem] = useState<any>()
    const [withdrawItem, setWithdrawItem] = useState<any>()
    const [transferItem, setTransferItem] = useState<any>()
    const [missionItem, setMissionItem] = useState<any>()
    const [loading, setLoading] = useState(false)
    const {loginOut} = useLoginOut(PageName.LLHomePage)

    const getLevelWidth = () => {
        setLevelWidth(193 * parseInt(curLevelInt) / parseInt(nextLevelInt))
    }

    const refresh = async () => {
        setLoading(true)
        const {data: userInfo} = await APIRouter.user_info()
        UGStore.dispatch({type: 'merge', props: userInfo?.data});
        setProps()
        setLoading(false)
        UGStore.save();
    }

    useEffect(() => {
        navigation.addListener('focus', async () => {
            setLoading(true)
            const {data: userInfo} = await APIRouter.user_info()
            UGStore.dispatch({type: 'merge', props: userInfo?.data});
            setProps()
            setLoading(false)
            UGStore.save();
        });

        return (() => {
            navigation.removeListener('focus', null);
        })
    }, [])

    useEffect(() => {
        if (UGUserCenterItem) {
            setDepositItem(UGUserCenterItem.find((item) => item.name == '存款'))
            setWithdrawItem(UGUserCenterItem.find((item) => item.name == '取款'))
            setTransferItem(UGUserCenterItem.find((item) => item.name == '额度转换'))
            setMissionItem(UGUserCenterItem.find((item) => item.name == '任务中心'))
        }
    }, [UGUserCenterItem])

    useEffect(() => {
        curLevelInt && nextLevelInt && parseInt(curLevelInt) > 0 && parseInt(nextLevelInt) > 0 && getLevelWidth()
    }, [curLevelInt, nextLevelInt])

    return (
        <>
            {loading && <ActivityIndicator
                style={{
                    position: "absolute",
                    width: AppDefine.width,
                    height: AppDefine.height,
                    alignSelf: "center",
                    zIndex: 22,
                    backgroundColor: "rgba(0,0,0,0.2)"
                }} color={"grey"} animating={true}/>}
            <ScrollView bounces={false} style={{}}>
                <SafeAreaView style={{backgroundColor: "#39150D", height: 172}}>
                    <Image style={{alignSelf: "flex-end", width: 28, height: 28, marginRight: 8}}
                           source={{uri: httpClient.defaults.baseURL + "/views/mobileTemplate/20/images/zxkf.png"}}/>
                    <View style={{
                        backgroundColor: "#F3745B",
                        marginHorizontal: 8,
                        marginVertical: 12,
                        height: 159,
                        borderRadius: 6,
                    }}>
                        <View style={{flexDirection: "row", marginHorizontal: 8, marginVertical: 16}}>
                            <Image style={{width: 50, height: 50}}
                                   source={{uri: avatar}}/>
                            <View style={{marginLeft: 12}}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{color: "#ffffff", lineHeight: 20, fontSize: 14}}>{usr}</Text>
                                    <LinearGradient colors={['#FFEAC3', '#FFE09A']} start={{x: 0, y: 1}}
                                                    end={{x: 1, y: 1}}
                                                    style={{
                                                        marginLeft: 8,
                                                        marginTop: 1,
                                                        borderRadius: 3,
                                                        width: 42,
                                                        height: 17
                                                    }}>
                                        <Text style={{
                                            marginTop: 0.5,
                                            textAlign: 'center',
                                            color: '#8F6832',
                                            fontStyle: 'italic',
                                            fontWeight: '600',
                                            fontSize: 13
                                        }}>{curLevelGrade}</Text>
                                    </LinearGradient>
                                </View>
                                <View style={{flexDirection: "row", alignItems: 'center'}}>
                                    <View style={{
                                        backgroundColor: "#FFFFFF",
                                        width: 193,
                                        height: 8,
                                        borderRadius: 4
                                    }}/>
                                    <View style={{
                                        position: "absolute",
                                        backgroundColor: "#3F64D8",
                                        width: levelWidth,
                                        height: 8,
                                        borderRadius: 4
                                    }}/>
                                    <Text
                                        style={{color: "#ffffff", lineHeight: 20, fontSize: 14}}>{nextLevelGrade}</Text>
                                </View>
                                {levelWidth === 193 &&
                                <Text style={{color: "#ffffff", fontSize: 14}}>恭喜您已经是最高等级!</Text>}
                            </View>
                        </View>
                        <View style={{marginHorizontal: 16, marginTop: 16}}>
                            <Text style={{fontSize: 13, color: "#ffffff"}}>总余额（元）</Text>
                            <View style={{flexDirection: "row", alignItems: "center", marginTop: 8}}>
                                <Text style={{
                                    fontSize: 22,
                                    fontWeight: "bold",
                                    color: "#ffffff",
                                    alignSelf: "center",
                                    textAlign: "center"
                                }}>{isNaN(parseInt(balance))? 0 : parseInt(balance).toFixed(0)}</Text>
                                <View style={{flex: 1}}/>
                                <Icon size={18} style={{color: "#ffffff"}} name={"refresh"} onPress={() => refresh()}/>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
                <View style={{
                    marginTop: 100,
                    flexDirection: "row",
                    width: Dimensions.get("screen").width - 16,
                    marginHorizontal: 8
                }}>
                    <TouchableWithoutFeedback onPress={() => PushHelper.pushUserCenterType(depositItem.code)}>
                        <View style={{alignItems: "center", flex: 1}}>
                            <Image style={{width: 36, height: 28}}
                                   source={{uri: "http://test05.6yc.com/views/mobileTemplate/20/images/Cdeposit.png"}}/>
                            <Text style={{color: "#666666", fontSize: 14, marginTop: 4}}>充值</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => PushHelper.pushUserCenterType(withdrawItem.code)}>
                        <View style={{alignItems: "center", flex: 1}}>
                            <Image style={{width: 36, height: 28}}
                                   source={{uri: "http://test05.6yc.com/views/mobileTemplate/20/images/Cwithdraw.png"}}/>
                            <Text style={{color: "#666666", fontSize: 14, marginTop: 4}}>提现</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => PushHelper.pushUserCenterType(transferItem.code)}>
                        <View style={{alignItems: "center", flex: 1}}>
                            <Image style={{width: 36, height: 28}}
                                   source={{uri: "http://test05.6yc.com/views/mobileTemplate/20/images/Cconversion.png"}}/>
                            <Text style={{color: "#666666", fontSize: 14, marginTop: 4}}>额度转换</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => PushHelper.pushUserCenterType(missionItem.code)}>
                        <View style={{alignItems: "center", flex: 1}}>
                            <Image style={{width: 36, height: 28}}
                                   source={{uri: "http://test05.6yc.com/views/mobileTemplate/20/images/Ctask.png"}}/>
                            <Text style={{color: "#666666", fontSize: 14, marginTop: 4}}>任务中心</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <SafeAreaView>
                    <FlatList
                        scrollEnabled={false}
                        style={{borderTopWidth: 1, borderTopColor: '#E0E0E0', marginTop: 20, marginBottom: 90}}
                        keyExtractor={(item, index) => `mine-${index}`}
                        data={UGUserCenterItem}
                        ListFooterComponent={() => (
                            <View style={{
                                flexDirection: "row",
                                flex: 1,
                                marginLeft: 20,
                                height: 47,
                                alignItems: "center",
                                borderBottomWidth: 1,
                                borderBottomColor: '#E0E0E0'
                            }}>
                                <TouchableOpacity style={{flexDirection: "row", flex: 1,}} onPress={loginOut}>
                                    <Image style={{height: 29, width: 29, marginRight: 10}}
                                           source={{uri: httpClient.defaults.baseURL + `/views/mobileTemplate/20/images/Csignout.png`}}/>
                                    <Text style={{alignSelf: "center", color: "#47535B", flex: 1}}>退出登录</Text>
                                    <View style={{marginRight: 20}}>
                                        <Icon size={20} name={'angle-right'}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        renderItem={({item}) => (
                            <View style={{
                                flexDirection: "row",
                                flex: 1,
                                marginLeft: 20,
                                height: 47,
                                alignItems: "center",
                                borderBottomWidth: 1,
                                borderBottomColor: '#E0E0E0'
                            }}>
                                <TouchableOpacity style={{flexDirection: "row", flex: 1,}} onPress={() => {
                                    PushHelper.pushUserCenterType(item.code)
                                }}>
                                    <Image style={{height: 29, width: 29, marginRight: 10}}
                                           source={{uri: item.logo}}/>
                                    <Text style={{alignSelf: "center", color: "#47535B", flex: 1}}>{item.name}</Text>
                                    <View style={{marginRight: 20}}>
                                        <Icon size={20} name={'angle-right'}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}/>
                </SafeAreaView>
            </ScrollView>
        </>
    )
}

export default LLMinePage
