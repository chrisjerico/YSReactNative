import {View, Text} from "react-native"
import * as React from 'react'
import {PlayGroup} from "../../../../../public/network/Model/PlayOddDataModel"
import {useDimensions} from "@react-native-community/hooks"
import TMItem from "./balls/TMItem"
import {UGStore} from "../../../../../redux/store/UGStore";
import { UGText } from '../../../../../../doy/public/Button之类的基础组件/DoyButton'

const itemSize = 40
const HKBallsView = ({data, setProps}: { data: PlayGroup, setProps: any }) => {
    const {width} = useDimensions().screen
    const {bettingResult} = UGStore.globalProps.BettingReducer;
    return (
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            <UGText style={{
                textAlign: 'center',
                width: "100%",
                color: "#c8222f",
                backgroundColor: "#eee",
                paddingVertical: 8
            }}>{data.alias}</UGText>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    data.plays.map((data, index) => {
                        return <View
                            key={data.from_id + data.isBan + data.code + data.name + data.alias}
                            style={{
                                width: Math.floor(((width / 4 * 3) - 4) / 3),
                                height: itemSize,
                                backgroundColor: bettingResult[data.id] ? '#aaa' : "#00000000"
                            }}>
                            <TMItem setProps={setProps}  data={data}/>
                        </View>
                    })
                }
            </View>
        </View>
    )
}
export default HKBallsView
