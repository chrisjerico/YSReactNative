import * as React from "react";
import {Dimensions, Text, View} from "react-native";
import {List} from "../../../../../public/network/Model/HomeGamesModel";
import {MarqueeView} from "../MarqueeView";
import {ImageButton} from "../../ImageButton";
import PushHelper from "../../../../../public/define/PushHelper";
import {useSelector} from "react-redux";
import {IGlobalState} from "../../../../../redux/store/UGStore";
import {BannerModel} from "../../../../../public/network/Model/BannerModel";
import {BannerView} from "./BannerView";

const screenWidth = Dimensions.get("screen").width
export const RecommendTabView = ({list, marquee, banner}: { list: List[], marquee: any[], banner: BannerModel }) => {
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
            {banner ? <BannerView list={banner.data.list}/> :
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
