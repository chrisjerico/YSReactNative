import {ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View,} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import {chunkArray} from "../tools/ChunkArr";
import {getTrendData} from "../utils/getTrendData";
import {TrendData} from "../interface/trendData";
import Svg, {Line, G} from "react-native-svg";
import APIRouter from "../network/APIRouter";
import {ChooseGameModal} from "./ChooseGameModal";
import PushHelper from "../define/PushHelper";
import {BaseScreen} from "../../pages/乐橙/component/BaseScreen";
import AppDefine from "../define/AppDefine";
import {OCHelper} from "../define/OCHelper/OCHelper";

const TrendView = ({navigation}) => {
    const [trendData, setTrendData] = useState<TrendData>()
    const [headerArr, setHeaderArr] = useState([])
    const {width: screenWidth} = Dimensions.get("screen")
    const itemWidth = screenWidth / 6 - 4
    const [showModal, setShowModal] = useState(false)
    const [defaultNumber, setDefaultNumber] = useState(0)
    const [currentGame, setCurrentGame] = useState(defaultGame)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData()
    }, [defaultNumber, currentGame])

    useEffect(() => {
        // OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
        // const unsubscribe = navigation.addListener('focus', () => {
        //     OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
        //     console.log("123456")
        // }, []);
        OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
        // const _unsubscribe = navigation.addListener('blur', () => {
        //     OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
        //     console.log("123456")
        // }, []);

        // Return the function to unsubscribe from the event so it gets removed on unmount
        // return _unsubscribe;
    })

    useEffect(() => {
        if (trendData) {
            setHeaderArr(chunkArray(trendData.header, 6))
        }
    }, [trendData])

    const getData = () => {
        setLoading(true)
        APIRouter.getTrendData(currentGame.id.toString()).then((result) => {
            setTrendData(getTrendData(defaultNumber, currentGame.gameType, result.data.data.list))
            setLoading(false)
        })
    }

    const getHeaderIndex = (fromName: string, index) => {
        switch (fromName) {
            case "gdkl10":
            case "xync":
            case "xyft":
            case "pk10":
            case "pk10nn":
            case "jsk3":
            case "gd11x5":
                return index < 9 ? `0${index}` : index
            case"pcdd":
            case"cqssc":
            case"qxc":
                return index < 9 ? `0${index - 1}` : index - 1
        }
    }
    return (
        <BaseScreen  style={{backgroundColor: "#ffffff"}} screenName={"开奖走势"}>
            <View style={{paddingVertical: 8, backgroundColor: "#f3f3f3"}}>
                {headerArr.map((item, index) => {
                    return <View key={`btnView-${index}`} style={{
                        flexDirection: "row",
                        width: Dimensions.get("screen").width,
                        marginTop: index != 0 ? 8 : 0,
                    }}>
                        {item.map((text, contentIndex) => <View key={`${index}-${contentIndex}`}
                                                                style={{
                                                                    flex: 1 / item.length,
                                                                    alignItems: "center"
                                                                }}>
                            <TouchableOpacity style={{
                                borderWidth: 1,
                                borderRadius: 4,
                                borderColor: "#999999",
                                height: 32,
                                marginHorizontal: 2,
                                width: itemWidth,
                                backgroundColor: defaultNumber == (index * 6) + contentIndex ? "#f39b67" : "rgba(255,255,255,0.2)"
                            }} onPress={() => {
                                setDefaultNumber((index * 6) + contentIndex)
                            }}>
                                <Text style={{
                                    color: defaultNumber == (index * 6) + contentIndex ? "#ffffff" : "#999999",
                                    fontSize: 15,
                                    marginVertical: 6,
                                    textAlign: "center"
                                }}>{text}</Text>
                            </TouchableOpacity>
                        </View>)}
                    </View>
                })}
            </View>
            <ScrollView bounces={false}>
                <ScrollView horizontal={true} bounces={false}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{flexDirection: "row", flex: 1}}>
                                {trendData?.data[0].map((item, index) => {
                                    return index == 0 ? <Text style={{
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8,
                                            width: 120,
                                            textAlign: "center"
                                        }}>期数</Text> :
                                        <Text key={`header-${index}`} style={{
                                            textAlign: "center",
                                            width: (screenWidth - 120) / 6,
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8
                                        }}>{getHeaderIndex("cqssc", index)}</Text>
                                })}
                            </View>
                        </View>
                        {trendData?.data.map((item, index) => <View key={`row-${index}`}
                                                                    style={{flexDirection: "row"}}>
                            <View style={{flexDirection: "row", flex: 1}}>
                                {item.map((data, i) => {
                                        return i == 0 ? <Text
                                                key={`${index}-${i}`}
                                                style={{
                                                    backgroundColor: "#c2adac",
                                                    borderWidth: 0.5,
                                                    borderColor: "#ccc",
                                                    color: "#ffffff",
                                                    paddingVertical: 8,
                                                    width: 120,
                                                    textAlign: "center"
                                                }}>{data}</Text> :
                                            <View style={{
                                                backgroundColor: "#d4d4ed",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}>
                                                {typeof data === "string" ? <>
                                                        <View style={{
                                                            width: 28,
                                                            height: 28,
                                                            backgroundColor: "#409fdc",
                                                            borderRadius: 14,
                                                            position: "absolute"
                                                        }}/>
                                                        <Text style={{
                                                            height: 34.5,
                                                            textAlign: "center",
                                                            width: (screenWidth - 120) / 6,
                                                            borderWidth: 0.5,
                                                            borderColor: "#ccc",
                                                            color: "#ffffff",
                                                            fontSize: 14,
                                                            paddingVertical: 8,
                                                        }}>{data}</Text>
                                                    </> :
                                                    <Text style={{
                                                        height: 34.5,
                                                        textAlign: "center",
                                                        width: (screenWidth - 120) / 6,
                                                        borderWidth: 0.5,
                                                        borderColor: "#ccc",
                                                        color: "#aaa",
                                                        paddingVertical: 8,
                                                        fontSize: 14,
                                                    }}>{data}</Text>}
                                            </View>
                                    }
                                )}
                            </View>
                        </View>)}
                        <>
                            <View style={{flexDirection: "row"}}>
                                {trendData?.totalTimes.map((item, index) => {
                                    return index == 0 ?
                                        <Text style={{
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8,
                                            width: 120,
                                            textAlign: "center"
                                        }}>{item}</Text> : <Text key={`header-${index}`} style={{
                                            textAlign: "center",
                                            width: (screenWidth - 120) / 6,
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8
                                        }}>{item}</Text>
                                })}
                            </View>
                            <View style={{flexDirection: "row"}}>
                                {trendData?.averageOmission.map((item, index) => {
                                    return index == 0 ?
                                        <Text style={{
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8,
                                            width: 120,
                                            textAlign: "center"
                                        }}>{item}</Text> : <Text key={`header-${index}`} style={{
                                            textAlign: "center",
                                            width: (screenWidth - 120) / 6,
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8
                                        }}>{item}</Text>
                                })}
                            </View>
                            <View style={{flexDirection: "row"}}>
                                {trendData?.maximumOmission.map((item, index) => {
                                    return index == 0 ?
                                        <Text style={{
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8,
                                            width: 120,
                                            textAlign: "center"
                                        }}>{item}</Text> : <Text key={`header-${index}`} style={{
                                            textAlign: "center",
                                            width: (screenWidth - 120) / 6,
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8
                                        }}>{item}</Text>
                                })}
                            </View>
                            <View style={{flexDirection: "row"}}>
                                {trendData?.maximumConnection.map((item, index) => {
                                    return index == 0 ?
                                        <Text style={{
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8,
                                            width: 120,
                                            textAlign: "center"
                                        }}>{item}</Text> : <Text key={`header-${index}`} style={{
                                            textAlign: "center",
                                            width: (screenWidth - 120) / 6,
                                            backgroundColor: "#c2adac",
                                            borderWidth: 0.5,
                                            borderColor: "#ccc",
                                            color: "#ffffff",
                                            paddingVertical: 8
                                        }}>{item}</Text>
                                })}
                            </View>
                        </>
                    </View>
                    {trendData?.positionArr && trendData?.positionArr?.length > 0 && <Svg height={"100%"} width={"100%"}
                          style={{position: "absolute", flex: 1}}>
                        {trendData?.positionArr.map((item, index) => {
                            return index != 0 &&
                                <Line x1={item.x} y1={item.y} x2={trendData?.positionArr[index - 1].x}
                                      y2={trendData?.positionArr[index - 1].y}
                                      stroke="#409fdc" strokeWidth="1"/>
                        })}
                    </Svg>}
                </ScrollView>
            </ScrollView>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={{backgroundColor: "#d7213a", height: 44, width: 160, justifyContent: "center"}}
                                  onPress={() => setShowModal(true)}>
                    <Text style={{
                        textAlign: "center",
                        color: "white",
                        paddingHorizontal: 16
                    }}>{currentGame.title}</Text>
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: "row", paddingRight: 8, alignItems: "center"}}>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={{
                        backgroundColor: "#e74d39",
                        marginVertical: 6,
                        width: 33,
                        height: 26,
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center"
                    }} onPress={() => getData()}>
                        <Image style={{width: 20, height: 20}}
                               source={{uri: "https://test10.6yc.com/images/kj_refresh.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: "#e77d21",
                        marginVertical: 6,
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 4
                    }} onPress={() => setShowModal(true)}>
                        <Text style={{color: "white", paddingHorizontal: 8, paddingVertical: 6}}>选择彩种</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: "#e74d39",
                        marginVertical: 6,
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 4
                    }} onPress={() => PushHelper.pushCategory(1, currentGame.id)}>
                        <Text style={{color: "white", paddingHorizontal: 8, paddingVertical: 6}}>去下注</Text>
                    </TouchableOpacity>
                </View>
                <ChooseGameModal setCurrentGame={(game) => {
                    setDefaultNumber(0)
                    setCurrentGame(game)
                }} setShowModal={setShowModal} showModal={showModal}/>
            </View>
            {/*<View style={{flexDirection: "row"}}>*/}
            {/*    <View style={{backgroundColor: "#d7213a", height: 20, width: 160,}}/>*/}
            {/*</View>*/}
            {loading && <View style={{
                justifyContent: "center",
                width: AppDefine.width,
                height: AppDefine.height,
                position: "absolute",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}>
                <ActivityIndicator size={"small"} color={"white"}/>
            </View>}
        </BaseScreen>
    )
}

const defaultGame = {
    "id": 50,
    "changlong": false,
    "title": "北京赛车(PK10)",
    "name": "pk10",
    "sort": 11,
    "cate": 6,
    "open": 0,
    "enable": "1",
    "isSeal": "0",
    "customise": "0",
    "from_type": "0",
    "isInstant": "0",
    "lowFreq": "0",
    "gameType": "pk10",
    "is_own": 0
}

export default TrendView
