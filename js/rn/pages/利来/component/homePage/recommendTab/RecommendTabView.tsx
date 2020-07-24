import * as React from "react";
import {Dimensions, Text, TouchableWithoutFeedback, View} from "react-native";
import {List} from "../../../../../public/network/Model/HomeGamesModel";
import {MarqueeView} from "../MarqueeView";
import {ImageButton} from "../../ImageButton";
import PushHelper from "../../../../../public/define/PushHelper";
import {useSelector} from "react-redux";
import {IGlobalState} from "../../../../../redux/store/UGStore";
import {BannerModel} from "../../../../../public/network/Model/BannerModel";
import {BannerView} from "./BannerView";
import {useDimensions} from "@react-native-community/hooks";
import Carousel from "react-native-banner-carousel";
import {useEffect, useState} from "react";
import FastImage from "react-native-fast-image";
import useGetHomeInfo from "../../../../../public/hooks/useGetHomeInfo";

const screenWidth = Dimensions.get("screen").width
export const RecommendTabView = ({list, marquee, banner, onlineNum}: { list: List[], marquee: any[], banner: BannerModel, onlineNum: number }) => {
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const {uid = ""} = userStore
    const thirdPartGamePress = (id: string, gameID?: string) => {
        if (uid != "") {
            if (gameID) {
                const gameData = list.filter((res) => res.id == gameID)
                //@ts-ignore
                PushHelper.pushHomeGame(gameData[0])
            } else if (!gameID) {

            } else {

            }
        } else {
            PushHelper.pushLogin();
        }
    }
    return (
        <View style={{paddingTop: 10}}>
            {banner ? <Banner onlineNum={onlineNum} bannerData={banner} /> :
                <View style={{height: 150, marginHorizontal: 8, width: Dimensions.get("screen").width - 16}}/>
            }
            <MarqueeView textArr={marquee}/>
            <View style={{marginHorizontal: 12}}>
                <Text style={{color: "#3C3C3C", fontSize: 18, fontWeight: "bold", paddingVertical: 8}}>真人娱乐</Text>
                <ImageButton imgStyle={{height: 140}}
                             uri={list[0].icon}
                             onPress={() => thirdPartGamePress(list[0].id, list[0].gameId)}/>
                <ImageButton imgStyle={{height: 140, marginTop: 8}}
                             uri={list[1].icon}
                             onPress={() => thirdPartGamePress(list[1].id, list[1].gameId)}/>
                <View style={{flexDirection: "row", marginTop: 8}}>
                    <ImageButton imgStyle={{height: 80, width: screenWidth * (2 / 3) - 16}}
                                 uri={list[2].icon}
                                 onPress={() => thirdPartGamePress(list[0].id, list[0].gameId)}/>
                    <ImageButton imgStyle={{height: 80, width: screenWidth * (1 / 3) - 12, marginLeft: 4}}
                                 uri={list[3].icon}
                                 onPress={() => thirdPartGamePress(list[0].id, list[0].gameId)}/>
                </View>
            </View>
        </View>
    )
}


const Banner = ({ bannerData, onlineNum = 0 }: { bannerData: BannerModel, onlineNum: number }) => {
    const { width, } = useDimensions().window
    const BannerRef = React.useRef<Carousel>()
    const [height, setHeight] = useState(100)
    useEffect(() => {
        const timer = setInterval(() => {
            //@ts-ignore
            BannerRef?.current?.gotoNextPage()
        }, 2000);
        return (() => {
            clearInterval(timer)
        })
    }, [bannerData])
    if (bannerData?.data?.list?.length > 0) {
        return (
            <View style={{ marginBottom: 10, }}>

                <Carousel
                    autoplay
                    index={0}
                    ref={BannerRef}
                    loop
                    pageSize={width}
                >
                    {bannerData?.data?.list?.map((res, index) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => {
                                PushHelper.pushCategory(res.linkCategory, res.linkPosition)
                            }}>
                                <FastImage onLoad={(e) => {
                                    console.log(e.nativeEvent.height, e.nativeEvent.width, e.nativeEvent.height * ((width) / e.nativeEvent.width))
                                    setHeight(e.nativeEvent.height * ((width) / e.nativeEvent.width))

                                }} key={'banner' + index} style={{ width: width, height: height, }} source={{ uri: res.pic }} >

                                </FastImage>
                            </TouchableWithoutFeedback>)
                    })}
                </Carousel>
                <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 5 }}>
                    <Text style={{ color: 'white' }}>当前在线:{onlineNum}</Text>
                </View>
            </View>
        )

    } else {
        return <View style={{ height: (Dimensions.get("screen").width) / 2, }}></View>
    }

}
