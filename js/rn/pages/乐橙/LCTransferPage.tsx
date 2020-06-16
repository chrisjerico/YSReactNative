import {BaseScreen} from "./component/BaseScreen";
import * as React from "react";
import {useState} from "react";
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {LoadButton} from "./component/transferPage/LoadButton";
import ModalDropdown from 'react-native-modal-dropdown';
import {QuickSelectView} from "./component/transferPage/QucikSelectView";
import {TransferUserInfo} from "./component/transferPage/TransferUserInfo";

const arr = ['视讯', '棋牌', '电子', '电竞', '捕鱼', '体育']

const LCTransferPage = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [transOut, setTransOut] = useState<any>('请选择钱包');
    const [transIn, setTransIn] = useState<any>('请选择钱包');
    const [amount, setAmount] = useState('0');

    return (
        <BaseScreen screenName={"额度转换"}>
            <TransferUserInfo />
            <View style={{
                borderBottomColor: "#DEDEDE", borderBottomWidth: 1,
                flexDirection: 'row',
                backgroundColor: "#ffffff",
                justifyContent: 'center',
                width: Dimensions.get("screen").width
            }}>
                <TouchableWithoutFeedback onPress={() => {
                }}>
                    <View
                        style={{borderBottomColor: "#FF9900", borderBottomWidth: 2, width: 130, alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 14,
                            color: "#FF9900",
                            fontWeight: "bold",
                            paddingVertical: 10
                        }}>额度转换</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                }}>
                    <View style={{width: 130, alignItems: 'center'}}>
                        <Text style={{fontSize: 14, color: "#000000", paddingVertical: 10}}>转换记录</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <FlatList keyExtractor={(item, index) => `tab-${index}`} numColumns={6} data={arr}
                      renderItem={({item, index}) =>
                          <TouchableWithoutFeedback onPress={() => {
                              setActiveTabIndex(index)
                          }}>
                              <View
                                  style={activeTabIndex == index ? tabStyle.active : tabStyle.unActive}>
                                  <Text style={{
                                      color: activeTabIndex == index ? "#FF9900" : "#444444",
                                      fontSize: 14,
                                      paddingVertical: 8
                                  }}>{item}</Text>
                              </View>
                          </TouchableWithoutFeedback>}
            />
            <FlatList data={[1, 2, 3, 4, 5, 6]} numColumns={3} renderItem={() =>
                <View style={{
                    flex: 1 / 3,
                    backgroundColor: "#ffffff",
                    borderColor: "#DEDEDE",
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    alignItems: 'center',
                    paddingVertical: 10
                }}>
                    <Text>123</Text>
                    <LoadButton/>
                </View>
            }/>
            <View style={{flexDirection: 'row', justifyContent: "center", paddingTop: 20}}>
                <View style={{flexDirection: 'row', alignItems: "center"}}>
                    <Text style={{marginRight: 10}}>转出:</Text>
                    <ModalDropdown
                        defaultValue={'请选择钱包'}
                        onSelect={(value, index) => setTransOut(value)}
                        textStyle={{textAlign: 'center', width: 100, paddingVertical: 10, alignSelf: 'center'}}
                        dropdownStyle={{width: 100}}
                        style={{
                            backgroundColor: "#ffffff",
                            alignItems: 'center',
                            width: 100,
                        }} options={arr}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: "center", paddingLeft: 20}}>
                    <Text style={{marginRight: 10}}>转入:</Text>
                    <ModalDropdown
                        defaultValue={'请选择钱包'}
                        onSelect={(value, index) => setTransIn(value)}
                        textStyle={{textAlign: 'center', width: 100, paddingVertical: 10, alignSelf: 'center'}}
                        dropdownStyle={{width: 100}}
                        style={{
                            backgroundColor: "#ffffff",
                            alignItems: 'center',
                            width: 100,
                        }} options={arr}/>
                </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 20, marginLeft: 10}}>
                <Text style={{marginRight: 10}}>转入金额:</Text>
                <View style={{backgroundColor: "#ffffff"}}>
                    <TextInput keyboardType={'numeric'} style={{height: 34, width: 78}}
                               onChangeText={(text) => setAmount(text)} value={amount}/>
                </View>
                <Text style={{marginLeft: 10}}>元</Text>
            </View>
            <QuickSelectView setAmount={setAmount}/>
            <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'center', paddingTop: 20}}>
                <TouchableOpacity style={{backgroundColor: "#F9942D", paddingHorizontal: 12, paddingVertical: 12, borderRadius: 4}}>
                    <Text style={{color: "white", fontSize: 16}}>开始转换</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 20, backgroundColor: "#F9942D", paddingHorizontal: 12, paddingVertical: 12, borderRadius: 4}}>
                    <Text style={{color: "white", fontSize: 16}}>一键提取</Text>
                </TouchableOpacity>
            </View>
        </BaseScreen>
    )
}

export default LCTransferPage

const tabStyle = StyleSheet.create({
    active: {
        borderBottomWidth: 2, borderBottomColor: "#FF9900", flex: 1 / 6, alignItems: "center"
    },
    unActive: {
        borderBottomWidth: 1, borderBottomColor: "#DEDEDE", flex: 1 / 6, alignItems: "center"
    }
});
