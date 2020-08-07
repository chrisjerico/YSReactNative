import {Dimensions, FlatList, Text, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modal";
import * as React from "react";
import {useEffect, useState} from "react";
import APIRouter from "../network/APIRouter";
import {getGameList} from "../utils/getGameList";

export const ChooseGameModal = ({showModal, setShowModal, setCurrentGame}) => {
    let [games, setGames] = useState([])
    const [chosen, setChosen] = useState()

    useEffect(() => {
        APIRouter.game_lotteryGames().then(({data: res}) => {
            let arr = []
            res.data.map((item) => {
                arr = arr.concat(item.list)
            })
            setGames(getGameList(arr))
        })
    }, [])
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
                    <Text style={{fontSize: 16, paddingVertical: 16}}>选择彩种</Text>
                </View>
                <FlatList
                    style={{height: 340, backgroundColor: "white", paddingVertical: 2, paddingHorizontal: 2}}
                    numColumns={3}
                    keyExtractor={(item, index) => `${index}`} data={games}
                    renderItem={({item, index}) => (
                        <TouchableOpacity style={{
                            justifyContent: "center",
                            backgroundColor: item === chosen ? "#387EF5" : "white",
                            flex: 1 / 3,
                            borderWidth: 1,
                            borderColor: item === chosen ? "#387EF5" : "#ddd",
                            borderRadius: 8,
                            height: 40,
                            marginHorizontal: 4,
                            marginVertical: 4,
                        }} onPress={() => setChosen(item)}>
                            <Text style={{
                                textAlign: "center",
                                fontSize: 13,
                                color: item === chosen ? "white" : "black"
                            }}>{item.title}</Text>
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
                        height: 60,
                        marginRight: 4,
                    }} onPress={() => setShowModal(false)}>
                        <Text style={{textAlign: "center"}}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginLeft: 4,
                        flex: 1 / 2,
                        justifyContent: "center",
                        borderColor: "#387EF5",
                        borderWidth: 1,
                        borderRadius: 8,
                        height: 60,
                        backgroundColor: "#387EF5",
                    }} onPress={() => {
                        setShowModal(false)
                        setCurrentGame(chosen)
                    }}>
                        <Text style={{textAlign: "center", color: "white"}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
