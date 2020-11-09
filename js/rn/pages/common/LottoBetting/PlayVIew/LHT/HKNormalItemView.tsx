import {View, Text, TouchableWithoutFeedback, FlatList} from "react-native"
import * as React from 'react'
import {PlayGroup} from "../../../../../public/network/Model/PlayOddDataModel"
import {useDimensions} from "@react-native-community/hooks"
import LMItem from "./balls/LMItem"
import {UGStore} from "../../../../../redux/store/UGStore";
import {BettingReducerActions} from "../../../../../redux/reducer/BettingReducer";

const itemSize = 40
const HKNormalItemView = ({data, setProps}: { data: PlayGroup, setProps: any }) => {
    const {width} = useDimensions().screen
    const {bettingResult} = UGStore.globalProps.BettingReducer;
    return (
        <View style={{flex: 1,}}>
            <Text style={{
                textAlign: 'center',
                width: "100%",
                color: "#c8222f",
                backgroundColor: "#eee",
                paddingVertical: 8
            }}>{data.alias}</Text>
            <FlatList
                style={{borderTopColor: "#e0e0e0", borderTopWidth: 1}}
                data={data.plays} numColumns={2}
                renderItem={({item, index}) => {
                    return (<TouchableWithoutFeedback onPress={() => {
                        if (item.enable != "0") {
                            UGStore.dispatch({type: BettingReducerActions.itemPress, value: item})
                            setProps && setProps()
                        }
                    }}>
                        <View key={item.from_id + item.isBan + item.code + item.name + item.alias} style={{
                            width: Math.floor(((width / 4 * 3) - 4) / 2),
                            height: itemSize,
                            alignItems: "center",
                            backgroundColor: bettingResult[item.id] ? '#9a9a9a' : "#00000000",
                            borderBottomColor: "#e0e0e0",
                            borderBottomWidth: 1
                        }}>
                            <LMItem setProps={setProps} fix={2} data={item}/>
                        </View>
                    </TouchableWithoutFeedback>)
                }}/>
        </View>
    )
}
export default HKNormalItemView
