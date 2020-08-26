import * as React from "react";
import {useEffect, useState} from "react";
import {Dimensions, Text, TouchableWithoutFeedback, View} from "react-native";
import {List} from "../../../../../public/network/Model/HomeGamesModel";
import {MarqueeView} from "../MarqueeView";
import {ImageButton} from "../../ImageButton";
import PushHelper from "../../../../../public/define/PushHelper";
import {UGStore} from "../../../../../redux/store/UGStore";
import {BannerModel} from "../../../../../public/network/Model/BannerModel";
import {useDimensions} from "@react-native-community/hooks";
import Carousel from "react-native-banner-carousel";
import FastImage from "react-native-fast-image";
import useGetHomeInfo from "../../../../../public/hooks/useGetHomeInfo";
import {push} from "../../../../../public/navigation/RootNavigation";
import {PageName} from "../../../../../public/navigation/Navigation";

export const RecommendTabView = ({list, marquee, banner, onlineNum}: { list: List[], marquee: any[], banner: BannerModel, onlineNum: number }) => {
    const onPress = (list: List) => {
        list.seriesId != '1' ? PushHelper.pushHomeGame(list) :
            list.gameId ?
                PushHelper.pushCategory(list.seriesId, list.gameId) :
                PushHelper.pushCategory(list.seriesId, list.subType[0]?.gameId)
    }

    return (
        <View style={{paddingTop: 10, flex: 1}}>
            {banner ? <Banner onlineNum={onlineNum} bannerData={banner} /> :
                <View style={{height: 150, marginHorizontal: 8, width: Dimensions.get("screen").width - 16}}/>
            }
            <MarqueeView textArr={marquee}/>
            <View style={{marginHorizontal: 12, flex: 1}}>
                <Text style={{color: "#3C3C3C", fontSize: 18, fontWeight: "bold", paddingVertical: 8}}>真人娱乐</Text>
                <ImageButton imgStyle={{height: 140, resizeMode: "stretch"}}
                             uri={list[0]?.icon}
                             onPress={() => onPress(list[0])}/>
                <ImageButton imgStyle={{height: 140, marginTop: 8, resizeMode: "stretch"}}
                             uri={list[1]?.icon}
                             onPress={() => onPress(list[1])}/>
                <View style={{flexDirection: "row", marginTop: 8, flex: 1}}>
                    <ImageButton imgStyle={{flex: 2/3, height: 100, width: "auto", resizeMode: "stretch"}}
                                 uri={list[2]?.icon || list[2]?.subType[0]?.icon}
                                 onPress={() => onPress(list[2])}/>
                    <ImageButton imgStyle={{flex: 1/3, height: 100, width: "auto", marginLeft: 4, resizeMode: "stretch"}}
                                 uri={list[3]?.icon || list[3]?.subType[0]?.icon}
                                 onPress={() => onPress(list[3])}/>
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
        return <View style={{height: (Dimensions.get("screen").width) / 2,}}/>
    }

}
