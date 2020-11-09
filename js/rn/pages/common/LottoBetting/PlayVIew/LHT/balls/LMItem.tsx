import {Text, TouchableWithoutFeedback, View} from "react-native"
import * as React from 'react'
import {Play} from "../../../../../../public/network/Model/PlayOddDataModel"
import {UGStore} from "../../../../../../redux/store/UGStore"
import {BettingReducerActions} from "../../../../../../redux/reducer/BettingReducer"

const LMItem = ({data, fix = 2, width, setProps}: { data: Play, fix: number, width?: number, setProps?: any }) => {
    const {bettingResult} = UGStore.globalProps.BettingReducer;
    return (
        <TouchableWithoutFeedback onPress={() => {
            if (data.enable != "0") {
                UGStore.dispatch({type: BettingReducerActions.itemPress, value: data});
                setProps && setProps()
            }
        }}>
            <View style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: 'row',
                width
            }}>
                <Text style={{color: bettingResult[data.id] ? "white" : "black", marginLeft: 8, alignSelf: "center"}}>
                    {data.name} {data.enable == "0" ? "--" : parseFloat(data.odds).toFixed(fix)}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default LMItem
