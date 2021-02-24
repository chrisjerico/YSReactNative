import {StyleProp, Text, TouchableWithoutFeedback, View, ViewStyle} from "react-native"
import Modal from 'react-native-modal';
import LottoSelector from "../LottoSelector/LottoSelector";
import * as React from 'react'
import {useState} from 'react'
import {LottoContext, LottoContextProvider} from "./LottoContext";
import Headers from './Header';
import {useDimensions} from "@react-native-community/hooks";
import LottoContent from "./LottoContent";
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const LottoBetting = ({setProps}) => {
    const [tab, setTab] = useState(0)
    const {width} = useDimensions().screen
    return (
        <LottoContextProvider>
            <View style={{backgroundColor: 'white', flex: 1,}}>
                <Headers/>
                <View style={{
                    width,
                    height: 45,
                    flexDirection: 'row',
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.5
                }}>
                    <TouchableWithoutFeedback onPress={() => setTab(0)}>
                        <View
                            style={tab == 0 ? activeTabStyle: tabStyle}>
                            <UGText style={{fontSize: 16, fontWeight: "bold", color: tab == 0? '#000000' : "gray"}}>投注区</UGText>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setTab(1)}>
                        <View
                            style={tab == 1 ? activeTabStyle: tabStyle}>
                            <UGText style={{fontSize: 16, fontWeight: "bold", color: tab == 1? '#000000' : "gray"}}>聊天室</UGText>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <LottoContent setProps={setProps} />
                <LottoContext.Consumer>
                    {value => {
                        return (
                            <>
                                <Modal
                                    hideModalContentWhileAnimating={false}
                                    hasBackdrop={false}
                                    swipeDirection={null}
                                    style={{margin: 0}}
                                    isVisible={value.showModal}>
                                    <LottoSelector/>
                                </Modal>
                            </>)
                    }}
                </LottoContext.Consumer>

            </View>
        </LottoContextProvider>
    )
}
export default LottoBetting

const activeTabStyle: StyleProp<ViewStyle> = {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
}
const tabStyle: StyleProp<ViewStyle> = {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
}
