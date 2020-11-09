import * as React from 'react'
import {Text, TouchableWithoutFeedback, View} from "react-native"
import {Play} from "../../../../../../public/network/Model/PlayOddDataModel"
import {UGStore} from "../../../../../../redux/store/UGStore"
import {getHKballColor} from "../../lottoSetting"
import {BettingReducerActions} from "../../../../../../redux/reducer/BettingReducer"

const TMItem = ({data, setProps }: { data: Play, setProps?: any}) => {
    const {bettingResult} = UGStore.globalProps.BettingReducer;
    const borderColor = getHKballColor(data.name)
    return (
        <TouchableWithoutFeedback onPress={() => {
            if (data.enable != "0") {
                UGStore.dispatch({type: BettingReducerActions.itemPress, value: data});
                setProps && setProps()
            }
        }}>
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: bettingResult[data.id] ? '#aaa' : "#00000000"
            }}>
                <View style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    borderColor: borderColor,
                    borderWidth: 1,
                    backgroundColor: bettingResult[data.id] ? borderColor : "white",
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 5
                }}>
                    <Text style={{color: bettingResult[data.id] ? "white" : "black"}}>{data.name}</Text>
                </View>
                <Text>{data.odds.replace(".0000", "").replace(".00", "").replace("00", "")}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default TMItem
