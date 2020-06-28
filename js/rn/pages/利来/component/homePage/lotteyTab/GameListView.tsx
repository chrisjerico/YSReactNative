import {FlatList} from "react-native";
import * as React from "react";
import {useSelector} from "react-redux";
import {ImageButton} from "../../../../乐橙/component/ImageButton";
import {fillArray} from "../../../utils/fillArray";
import {List} from "../../../../../public/network/Model/HomeGamesModel";
import PushHelper from "../../../../../public/define/PushHelper";
import {push} from "../../../../../public/navigation/RootNavigation";
import {PageName} from "../../../../../public/navigation/Navigation";
import {IGlobalState} from "../../../../../redux/store/UGStore";
import useGetHomeInfo from "../../../../../public/hooks/useGetHomeInfo";

export const GameListView = ({list}: {list: List[]}) => {
    const {homeGames} = useGetHomeInfo()
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const { uid = "" } = userStore

    const thirdPartGamePress = (id: string, gameID?: string) => {
        if (uid != "") {
            const result = homeGames.data.icons.filter((res) => res.id == id)
            if (gameID && result.length > 0) {
                const gameData = result[0].list.filter((res) => res.id == gameID)
                //@ts-ignore
                PushHelper.pushHomeGame(gameData[0])
            } else if (!gameID && result.length > 0) {

            } else {

            }
        } else {
            push(PageName.ZLLoginPage)
        }


    }
    return (
        <FlatList scrollEnabled={false} style={{height:375}} keyExtractor={(item, index) => `boardGame-${index}`}
                  numColumns={2} data={fillArray(list, 2)} renderItem={({item, index}) => {
            return (
                <ImageButton imgStyle={{height: 105, margin: 10, flex:1 }} uri={item.icon} onPress={() => thirdPartGamePress( item.id, item.gameId)}/>
            )
        }}/>
    )
}
