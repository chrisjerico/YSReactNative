import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import * as React from 'react'
import { useState } from 'react'
import { UGText } from '../../../doy/public/Button之类的基础组件/DoyButton'

export const ChooseGameModal = ({showModal, setShowModal, setCurrentGame, games}) => {
    const [chosen, setChosen] = useState()
    return (
        <Modal
            hideModalContentWhileAnimating={false}
            hasBackdrop={false}
            swipeDirection={null}
            style={{margin: 0, justifyContent: "center", alignItems: "center"}}
            isVisible={showModal}
        >
            <View style={{width: Dimensions.get("screen").width - 24, borderRadius: 8}}>
                <View style={{
                    backgroundColor: "#f5f5f5",
                    alignItems: "center",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                }}>
                    <UGText style={{fontSize: 16, paddingVertical: 16}}>选择彩种</UGText>
                </View>
                <FlatList
                    style={{height: 340, backgroundColor: "white", paddingVertical: 2, paddingHorizontal: 2}}
                    numColumns={3}
                    keyExtractor={(item, index) => `games-${index}`} data={games}
                    renderItem={({item, index}) => (
                        <TouchableOpacity
                            key={`games-items-${index}`}
                            style={{
                                justifyContent: "center",
                                backgroundColor: item === chosen ? "#387EF5" : "white",
                                borderWidth: 1,
                                borderColor: item === chosen ? "#387EF5" : "#ddd",
                                borderRadius: 8,
                                height: 40,
                                width: 120,
                                flex: 1,
                                maxWidth: 120,
                                marginHorizontal: 4,
                                marginVertical: 4,
                            }} onPress={() => setChosen(item)}>
                            <UGText style={{
                                textAlign: "center",
                                fontSize: 13,
                                color: item === chosen ? "white" : "black"
                            }}>{item.title}</UGText>
                        </TouchableOpacity>
                    )}/>
                <View style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                    paddingHorizontal: 6,
                    paddingVertical: 8,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8
                }}>
                    <TouchableOpacity style={{
                        flex: 1 / 2,
                        justifyContent: "center",
                        borderColor: "#ddd",
                        borderWidth: 1,
                        borderRadius: 8,
                        height: 40,
                        marginRight: 4,
                    }} onPress={() => setShowModal(false)}>
                        <UGText style={{textAlign: "center"}}>取消</UGText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginLeft: 4,
                        flex: 1 / 2,
                        justifyContent: "center",
                        borderColor: "#387EF5",
                        borderWidth: 1,
                        borderRadius: 8,
                        height: 40,
                        backgroundColor: "#387EF5",
                    }} onPress={() => {
                        setShowModal(false)
                        chosen && setCurrentGame(chosen)
                    }}>
                        <UGText style={{textAlign: "center", color: "white"}}>确定</UGText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
