import {View, Text} from "react-native"
import * as React from 'react'
import {PlayGroup} from "../../../../../public/network/Model/PlayOddDataModel"
import {useDimensions} from "@react-native-community/hooks"
import LMItem from "./balls/LMItem"
import {UGStore} from "../../../../../redux/store/UGStore";
import { UGText } from '../../../../../../doy/public/Button之类的基础组件/DoyButton'

const itemSize = 40
const HKNormalWithSBView = ({data, setProps}: { data: PlayGroup, setProps: any }) => {
    const {width} = useDimensions().screen
    const {bettingResult} = UGStore.globalProps.BettingReducer;
    return (
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            <UGText style={{
                textAlign: 'center',
                paddingBottom: 10,
                paddingTop: 10,
                width: "100%",
                color: "#c8222f",
                backgroundColor: "#eee"
            }}>{data.alias}</UGText>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    data.plays.map((item, index) => {
                        if (index > data.plays.length - 4) {
                            return <View key={item.from_id + item.isBan + item.code + item.name + item.alias + item.id}
                                         style={{
                                             width: ((width / 4 * 3) - 5) / 3,
                                             borderBottomWidth: 1,
                                             borderColor: '#e0e0e0',
                                             height: itemSize,
                                             backgroundColor: bettingResult[item.id] ? '#aaa' : "white"
                                         }}>
                                <LMItem fix={1} data={item} setProps={setProps}/>
                            </View>
                        } else {
                            return <View key={data.from_id + data.isBan + data.code + data.name + data.alias + item.id}
                                         style={{
                                             width: ((width / 4 * 3) - 5) / 2,
                                             borderBottomWidth: 1,
                                             borderColor: '#e0e0e0',
                                             height: itemSize,
                                             backgroundColor: bettingResult[item.id] ? '#aaa' : "white"
                                         }}>
                                <LMItem fix={2} data={item} setProps={setProps}/>
                            </View>
                        }

                    })
                }
            </View>
        </View>
    )
}
export default HKNormalWithSBView
