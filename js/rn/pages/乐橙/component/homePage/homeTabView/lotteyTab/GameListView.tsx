import {FlatList} from "react-native";
import {ImageButton} from "../../../ImageButton";
import * as React from "react";
import {fillArray} from "../../../../utils/fillArray";
import {List} from "../../../../../../public/network/Model/HomeGamesModel";
import PushHelper from "../../../../../../public/define/PushHelper";
import {push} from "../../../../../../public/navigation/RootNavigation";
import {PageName} from "../../../../../../public/navigation/Navigation";
import {IGlobalState, UGStore} from "../../../../../../redux/store/UGStore";
import useGetHomeInfo from "../../../../../../public/hooks/useGetHomeInfo";

export const GameListView = ({list}: {list: List[]}) => {
    const {homeGames} = useGetHomeInfo()
    const userStore = UGStore.globalProps.userInfo;
    const { uid = "" } = userStore

    const thirdPartGamePress = (id: string, gameID?: string) => {
        if (uid != "") {
            console.log(homeGames.data.icons)
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
        <FlatList scrollEnabled={false} style={{flex: 1}} keyExtractor={(item, index) => `boardGame-${index}`}
                  numColumns={2} data={fillArray(list, 2)} renderItem={({item, index}) => {
            return (
                <ImageButton imgStyle={{height: 105, margin: 10, flex: 0.5}} uri={item.icon} onPress={() => thirdPartGamePress( item.id, item.gameId)}/>
            )
        }}/>
    )
}
