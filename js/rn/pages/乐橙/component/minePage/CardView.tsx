import {Dimensions, Image, ImageStyle, StyleProp, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {Icon} from "react-native-elements";
import PushHelper from "../../../../public/define/PushHelper";
import {UGUserCenterType} from "../../../../redux/model/全局/UGSysConfModel";
import useMemberItems from "../../../../public/hooks/useMemberItems";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {IGlobalState} from "../../../../redux/store/UGStore";

export const CardView = () => {
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const {balance, fullName, todayWinAmount, curLevelGrade} = userStore
    const [showBalance, setShowBalance] = useState(false)
    const [depositItem, setDepositItem] = useState<any>()
    const [withdrawItem, setWithdrawItem] = useState<any>()
    const [LXBItem, setLXBItem] = useState<any>()
    const {UGUserCenterItem} = useMemberItems()
    useEffect(() => {
        UGUserCenterItem && setDepositItem(UGUserCenterItem.find((item) => item.name == '存款'))
        UGUserCenterItem && setWithdrawItem(UGUserCenterItem.find((item) => item.name == '取款'))
        UGUserCenterItem && setLXBItem(UGUserCenterItem.find((item) => item.name == '利息宝'))
        console.log("UGUserCenterItemL:", UGUserCenterItem)
    }, [UGUserCenterItem])

    return (
        <View style={{height: 300, width: Dimensions.get("screen").width}}>
            <Image style={{
                width: Dimensions.get("screen").width,
                height: "100%",
                resizeMode: "stretch",
                position: "absolute"
            }}
                   source={{uri: "http://test30.6yc.com/views/mobileTemplate/19/images/assetsBoxbg.png"}}/>
            <View style={{paddingTop: 20}}>
                <View style={{paddingHorizontal: 50, paddingTop: 10, flexDirection: "row"}}>
                    <Text style={{fontSize: 16, fontWeight: "bold", alignSelf: 'center'}}>{fullName}</Text>
                    <View style={{marginLeft: 8, backgroundColor: "#84C1FF", borderRadius: 10}}>
                        <Text style={{
                            color: "#ffffff",
                            fontWeight: "bold",
                            paddingVertical: 2,
                            paddingHorizontal: 6
                        }}>{curLevelGrade}</Text>
                    </View>
                    <TouchableOpacity style={{flex: 1, alignItems: "flex-end"}} onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.利息宝)
                    }}>
                        <Image style={{width: 84, height: 22, resizeMode: "stretch"}}
                               source={{uri: "http://test30.6yc.com/static/vuePublic/images/my/userInfo/missionhall.png"}}/>
                    </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: 50, paddingTop: 10, flexDirection: "row"}}>
                    <Text style={{color: "#65727B", alignSelf: "center", marginRight: 10}}>余额 : </Text>
                    <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                        {showBalance ? <Image source={{
                                width: 22,
                                height: 22,
                                uri: "http://test30.6yc.com/views/mobileTemplate/19/images/moneyicon.png"
                            }}/> :
                            <Image source={{
                                width: 22,
                                height: 22,
                                uri: "https://test30.6yc.com/views/mobileTemplate/19/images/moneyhideicon.png"
                            }}/>}
                    </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: 50, paddingTop: 10, flexDirection: "row", alignItems: "center"}}>
                    {showBalance ? <Text style={{
                        fontSize: 18,
                        paddingRight: 10,
                        fontWeight: "bold",
                        textAlign: "center",
                        alignSelf: "center",
                        lineHeight: 36,
                    }}>{`${balance} RMB`}</Text> : <Text style={{
                        fontSize: 30,
                        paddingRight: 10,
                        fontWeight: "bold",
                        textAlign: "center",
                        alignSelf: "center",
                        lineHeight: 36,
                        top: 5
                    }}>
                        * * * *
                    </Text>}
                    {showBalance && <Icon name={"refresh"}/>}
                </View>
                <View style={{flexDirection: "row", paddingHorizontal: 50, marginTop: 30, alignItems: "center"}}>
                    <CardButton
                        uri={"http://test30.6yc.com/views/mobileTemplate/19/images/deposit.png"}
                        onPress={() => {
                            depositItem && PushHelper.pushUserCenterType(depositItem.code)
                        }} text={"存款"}/>
                    <View style={{backgroundColor: "#9d9d9d", height: 40, width: 1}}/>
                    <CardButton
                        onPress={() => {
                            LXBItem && PushHelper.pushUserCenterType(LXBItem.code)
                        }}
                        imgStyle={{height: 39}}
                        uri={"http://test30.6yc.com/views/mobileTemplate/19/images/bet.png"}
                        text={"利息宝"}
                    />
                    <View style={{backgroundColor: "#9d9d9d", height: 40, width: 1}}/>
                    <CardButton
                        onPress={() => {
                            withdrawItem && PushHelper.pushUserCenterType(withdrawItem.code)
                        }}
                        uri={"http://test30.6yc.com/views/mobileTemplate/19/images/withdraw.png"}
                        text={"提现"}/>
                </View>
            </View>
        </View>
    )
}

const CardButton = ({uri, text, imgStyle, onPress}: { uri: string, text: string, imgStyle?: StyleProp<ImageStyle>, onPress: () => void }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{alignItems: "center", flex: 1 / 3, height: "100%"}}>
            <View style={{height: 39, justifyContent: "center"}}>
                <Image style={[{width: 39, height: 30, resizeMode: "cover"}, imgStyle]}
                       source={{uri}}/>
            </View>
            <View style={{flex: 1}}/>
            <Text style={{marginTop: 20}}>{text}</Text>
        </TouchableOpacity>
    )
}
