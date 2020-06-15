import Swiper from "react-native-swiper";
import {Dimensions, Image, View} from "react-native";
import * as React from "react";

const width = Dimensions.get("screen").width;

interface BannerViewProps {
    imgs: string[],
}
export const BannerView = ({imgs}: BannerViewProps) => {
    return (
        <View style={{height: 200}}>
            <Swiper
                style={{height: 200}}
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
                {imgs.map((img) =>
                    <Image style={{width, height: 200}}
                           source={{uri: img}}/>)}

                <Image style={{width, height: 200}}
                       source={{uri: 'https://www.changsclub.com/wp-content/uploads/2016/01/free.jpg'}}/>
                <Image style={{width, height: 200}}
                       source={{uri: 'https://osmhow2s.files.wordpress.com/2018/01/free-converted-01.png?w=2280&h=1762'}}/>
            </Swiper>
        </View>
    )
}
