import {Text, TouchableOpacity, View} from "react-native";
import * as React from "react";

export const QuickSelectView = ({setAmount}: { setAmount: (text: string) => void }) => {
    return (
        <>
            <View style={{paddingTop: 10}}>
                <View style={{flexDirection: 'row', borderTopWidth: 1, borderColor: "#DEDEDE"}}>
                    <TouchableOpacity onPress={() => {
                    }} style={{flex: 1 / 3, backgroundColor: "#ffffff", alignItems: 'center', paddingVertical: 12}}>
                        <Text>全部</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAmount('100')} style={{
                        borderColor: "#DEDEDE",
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        flex: 1 / 3,
                        backgroundColor: "#ffffff",
                        alignItems: 'center',
                        paddingVertical: 12
                    }}>
                        <Text>100</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAmount('500')} style={{
                        flex: 1 / 3,
                        backgroundColor: "#ffffff",
                        alignItems: 'center',
                        paddingVertical: 12
                    }}>
                        <Text>500</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 1, borderColor: "#DEDEDE"}}>
                    <TouchableOpacity onPress={() => setAmount('1000')} style={{
                        flex: 1 / 3,
                        backgroundColor: "#ffffff",
                        alignItems: 'center',
                        paddingVertical: 12
                    }}>
                        <Text>1000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAmount('5000')} style={{
                        borderColor: "#DEDEDE",
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        flex: 1 / 3,
                        backgroundColor: "#ffffff",
                        alignItems: 'center',
                        paddingVertical: 12
                    }}>
                        <Text>5000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAmount('10000')} style={{
                        flex: 1 / 3,
                        backgroundColor: "#ffffff",
                        alignItems: 'center',
                        paddingVertical: 12
                    }}>
                        <Text>10000</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
