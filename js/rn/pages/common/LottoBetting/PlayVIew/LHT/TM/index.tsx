import * as React from 'react'
import {useState} from 'react'
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import {UGStore} from '../../../../../../redux/store/UGStore';
import {ShengXiaoTitle} from '../../lottoSetting';
import {BettingReducerActions} from '../../../../../../redux/reducer/BettingReducer';
import HKBallsView from '../HKBallsView';
import HKSBItemView from '../HKSBItemView';
import HKNormalItemView from '../HKNormalItemView';
import { UGText } from '../../../../../../../doy/public/Button之类的基础组件/DoyButton'

const TMPlayView = ({setProps}) => {
    const {selectedShengXiao, shengXiaoValue, subPlay} = UGStore.globalProps.BettingReducer;
    const [label, setLabel] = useState<"特码A" | "特码B">("特码A")

    return <SafeAreaView style={{marginBottom: 50}}>
        <View>
            <View style={{height: 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        UGStore.dispatch({type: BettingReducerActions.subPlayPress, value: "特码A"})
                        setLabel("特码A")
                        setProps()
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: label == "特码A" ? "#e6e6e6" : "#dbdbdb",
                        height: 40
                    }}>
                    <UGText style={{}}>特码A</UGText>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        UGStore.dispatch({type: BettingReducerActions.subPlayPress, value: "特码B"})
                        setLabel("特码B")
                        setProps()
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: label == "特码B" ? "#e6e6e6" : "#dbdbdb",
                        height: 40
                    }}>
                    <UGText style={{}}>特码B</UGText>
                </TouchableOpacity>
            </View>
            <FlatList style={{height: 40}} keyExtractor={(item, index) => item + index} horizontal={true}
                      data={ShengXiaoTitle} renderItem={({item}) => {
                return (
                    <TouchableWithoutFeedback onPress={() => {
                        UGStore.dispatch({type: BettingReducerActions.shengXiaoPress, value: item})
                        setProps()
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingRight: 20,
                            height: 40
                        }}>
                            <Image style={{width: 20, height: 20}}
                                   source={{uri: selectedShengXiao?.[item] == shengXiaoValue[item].length ? "RadioButton-Selected" : "RadioButton-Unselected"}}/>
                            <UGText>{item}</UGText>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }}/>
        </View>
        <GameGroup label={label} setProps={setProps}/>
    </SafeAreaView>
}

const GameGroup = ({label = "特码A", setProps}: { label?: "特码A" | "特码B", setProps: any }) => {
    const {currentPlayOdd} = UGStore.globalProps.BettingReducer;

    return (
        <ScrollView style={{}}>
            {currentPlayOdd?.playGroups?.filter((res) => res?.alias?.includes(label))?.map((res, index) => {
                switch (index) {
                    case 0:
                        return <HKBallsView setProps={setProps} key={res.id + index} data={res}/>
                    case 1:
                        return <HKNormalItemView setProps={setProps} key={res.id + index} data={res}/>
                    case 2:
                        return <HKSBItemView setProps={setProps} key={res.id + index} data={res}/>
                    default:
                        break;
                }
            })}
        </ScrollView>
    )
}

export default TMPlayView
