import {View, Text, TouchableWithoutFeedback} from "react-native"
import * as React from 'react'
import {PlayGroup} from "../../../../../public/network/Model/PlayOddDataModel"
import {useDimensions} from "@react-native-community/hooks"
import LMItem from "./balls/LMItem"
import {UGStore} from "../../../../../redux/store/UGStore";
import {BettingReducerActions} from "../../../../../redux/reducer/BettingReducer";

const itemSize = 40
const HKSBItemView = ({data, frameWidth, setProps}: { data: PlayGroup, frameWidth?: number, setProps: any }) => {
    const {width} = useDimensions().screen
    const {bettingResult} = UGStore.globalProps.BettingReducer;
    return (
        <View style={{flex: 1, flexWrap: 'wrap'}}>
            <Text style={{
                textAlign: 'center',
                width: "100%",
                color: "#c8222f",
                backgroundColor: "#eee",
                paddingVertical: 8,
                flex: 1
            }}>{data.alias}</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                {
                    data.plays.map((data, index) => {
                        return <TouchableWithoutFeedback
                            key={`HKSB-${index}`}
                            onPress={() => {
                                if (data.enable != "0") {
                                    UGStore.dispatch({type: BettingReducerActions.itemPress, value: data});
                                    setProps && setProps()
                                }
                            }}>
                            <View
                                key={data.from_id + data.isBan + data.code + data.name + data.alias}
                                style={{
                                    width: Math.floor(((width / 4 * 3) - 4) / 2),
                                    height: itemSize,
                                    alignItems: "center",
                                    backgroundColor: bettingResult[data.id] ? '#9a9a9a' : "#00000000"
                                }}>
                                <LMItem setProps={setProps} fix={1} data={data}/>
                            </View>
                        </TouchableWithoutFeedback>
                    })
                }
            </View>
        </View>
    )
}
export default HKSBItemView
