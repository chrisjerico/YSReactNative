import Swiper from "react-native-swiper";
import { Dimensions, Image, View, TouchableWithoutFeedback } from "react-native";
import * as React from "react";
import PushHelper from "../../../../public/define/PushHelper";

const width = Dimensions.get("screen").width;

interface BannerViewProps {
    list: any[],
}
export const BannerView = ({ list }: BannerViewProps) => {
    return (
        <View style={{ height: 200 }}>
            <Swiper
                style={{ height: 200 }}
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
                    <TouchableWithoutFeedback onPress={() => {
                        PushHelper.pushCategory(item.linkCategory, item.linkPosition)
                    }}>
                        <Image style={{ width, height: 200 }}
                            source={{ uri: item.pic }} />
                    </TouchableWithoutFeedback>)}
            </Swiper>
        </View>
    )
}
