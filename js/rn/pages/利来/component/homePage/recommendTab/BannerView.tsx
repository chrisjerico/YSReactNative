import Swiper from "react-native-swiper";
import {Dimensions, Image, View} from "react-native";
import * as React from "react";

const width = Dimensions.get("screen").width;

interface BannerViewProps {
    list: any[],
}
export const BannerView = ({list}: BannerViewProps) => {
    return (
        <View style={{height: 150, marginHorizontal: 8, width: Dimensions.get("screen").width - 16}}>
            <Swiper
                style={{height: 150, marginHorizontal: 8, width: Dimensions.get("screen").width - 16}}
                autoplay={true}
                loop={true}
                dot={
                    <View
                        style={{
                            backgroundColor: 'rgba(0,0,0,.2)',
                            width: 5,
                            height: 5,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}
                    />
                }
                activeDot={
                    <View
                        style={{
                            backgroundColor: '#000',
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}
                    />
                }
                paginationStyle={{
                    bottom: -23,
                    left: null,
                    right: 10
                }}
            >
                {list.map((item) =>
                    <Image style={{width, height: 150}}
                           source={{uri: item.pic}}/>)}
            </Swiper>
        </View>
    )
}
