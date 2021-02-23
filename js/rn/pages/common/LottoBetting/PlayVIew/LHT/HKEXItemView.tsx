import {View, FlatList, Text, TouchableWithoutFeedback} from "react-native"
import * as React from 'react'
import {PlayGroup, Play} from "../../../../../public/network/Model/PlayOddDataModel"
import {IGlobalState, UGStore} from "../../../../../redux/store/UGStore"
import {getHKballColor} from "../lottoSetting"
import {BettingReducerActions} from "../../../../../redux/reducer/BettingReducer"
import AppDefine from "../../../../../public/define/AppDefine";
import { UGText } from '../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const HKEXItemView = ({data, setProps}: { data: PlayGroup, setProps: any }) => {
    const {shengXiaoValue, bettingResult} = UGStore.globalProps.BettingReducer;
    return (
        <View style={{flex: 1}}>
            <UGText style={{
                paddingVertical: 8, width: "100%", textAlign: 'center', color: "#c8222f",
                backgroundColor: "#eee"
            }}>{data.alias}</UGText>
            <FlatList
                style={{borderLeftColor: "#d1d0d0", borderLeftWidth: 1}}
                data={data.plays}
                renderItem={({item}) => {
                return (
                    <TouchableWithoutFeedback onPress={() => {
                        if (data.enable != "0") {
                            UGStore.dispatch({type: BettingReducerActions.itemPress, value: item});
                            setProps && setProps()
                        }
                    }}>
                        <View style={{
                            width: Math.floor(((AppDefine.width / 4 * 3) - 4)),
                            height: 40,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderColor: "#d1d0d0",
                            backgroundColor: bettingResult[item.id] ? '#999999' : "#00000000"
                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <UGText
                                    style={{fontWeight: "bold", marginHorizontal: 10, fontSize: 16}}>{item.name}</UGText>
                                <UGText style={{
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    color: "#a9a9a9"
                                }}>{item.odds.replace("00", "")}</UGText>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginLeft: 60,
                                flex: 1,
                                justifyContent: "flex-end",
                                marginRight: 4
                            }}>
                                {shengXiaoValue[item?.name]?.map((res, index) => {
                                    return <View key={res + index + 3} style={{
                                        marginRight: 3,
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        borderColor: getHKballColor(res < 10 ? "0" + res : res.toString()),
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: bettingResult[item.id] ? getHKballColor(res < 10 ? "0" + res : res.toString()) : "#ffffff"
                                    }}>
                                        <UGText
                                            style={{color: bettingResult[item.id] ? "#ffffff" : "#000000"}}>{res < 10 ? "0" + res : res.toString()}</UGText>
                                    </View>
                                })}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>)
            }}/>
        </View>
    )
}
export default HKEXItemView
