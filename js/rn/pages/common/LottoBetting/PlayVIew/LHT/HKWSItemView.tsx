import {FlatList, Text, TouchableWithoutFeedback, View} from "react-native"
import * as React from 'react'
import {PlayGroup} from "../../../../../public/network/Model/PlayOddDataModel"
import {UGStore} from "../../../../../redux/store/UGStore"
import {getHKballColor} from "../lottoSetting"
import {BettingReducerActions} from "../../../../../redux/reducer/BettingReducer"
import AppDefine from "../../../../../public/define/AppDefine";

const HKWSItemView = ({data, setProps}: { data: PlayGroup, setProps: any }) => {
    const {bettingResult} = UGStore.globalProps.BettingReducer;
    return (
        <View style={{flex: 1}}>
            <Text style={{
                paddingVertical: 8, width: "100%", textAlign: 'center', color: "#c8222f",
                backgroundColor: "#eee"
            }}>{data.alias}</Text>
            <FlatList
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
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            marginHorizontal: 10,
                                            fontSize: 16
                                        }}>{item.name}</Text>
                                    <Text style={{
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        color: "#a9a9a9"
                                    }}>{item.odds.replace("00", "")}</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginLeft: 50,}}>
                                    {Array.from({length: 49}).map((res, index) => index + 1).filter((res) => (res % 10).toString() == item.name.replace("尾", "")).map((res, index) => {
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
                                            <Text
                                                style={{color: bettingResult[item.id] ? "#ffffff" : "#000000"}}>{res < 10 ? "0" + res : res.toString()}</Text>
                                        </View>
                                    })}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>)
                }}/>
        </View>
    )
}
export default HKWSItemView
