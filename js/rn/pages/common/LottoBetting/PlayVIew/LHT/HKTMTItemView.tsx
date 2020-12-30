import {Text, View} from "react-native"
import * as React from 'react'
import {PlayGroup} from "../../../../../public/network/Model/PlayOddDataModel"
import {useDimensions} from "@react-native-community/hooks"
import LMItem from "./balls/LMItem"
import {UGStore} from "../../../../../redux/store/UGStore";

const itemSize = 40
const HKTMTItemView = ({data, setProps}: { data: PlayGroup, setProps: any }) => {
    const {width} = useDimensions().screen
    const {bettingResult} = UGStore.globalProps.BettingReducer;
    return (
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{
                textAlign: 'center', paddingVertical: 10, width: "100%", color: "#c8222f",
                backgroundColor: "#eee"
            }}>{data.alias}</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    data.plays.map((data, index) => {
                        if (index > 1) {
                            return <View
                                key={data.from_id + data.isBan + data.code + data.name + data.alias}
                                style={{
                                    width: Math.floor(((width / 4 * 3) - 5) / 3),
                                    height: itemSize,
                                    alignItems: "center",
                                    backgroundColor: bettingResult[data.id] ? "#999999" : "white"
                                }}>
                                <LMItem setProps={setProps} fix={1} data={data}/>
                            </View>
                        } else {
                            return <View
                                key={data.from_id + data.isBan + data.code + data.name + data.alias}
                                style={{
                                    width: Math.floor(((width / 4 * 3) - 5) / 2),
                                    height: itemSize,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#d1d0d0",
                                    alignItems: "center",
                                    backgroundColor: bettingResult[data.id] ? "#999999" : "white"
                                }}>
                                <LMItem setProps={setProps} fix={1} data={data}/>
                            </View>
                        }
                    })
                }
            </View>
        </View>
    )
}
export default HKTMTItemView
