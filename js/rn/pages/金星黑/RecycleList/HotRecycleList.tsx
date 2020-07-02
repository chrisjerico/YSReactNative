import { View } from "react-native"
import React from 'react'
import { useDimensions } from "@react-native-community/hooks"
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import Hot1x1Cell from "../cell/Hot1x1Cell";
import Hot2x1Cell from "../cell/Hot2x1Cell";
import { hotData } from "../dataConfig.ts/hotData";
import { push } from "../../../public/navigation/RootNavigation";
import { PageName } from "../../../public/navigation/Navigation";
import { useSelector } from "react-redux";
import { IGlobalState } from "../../../redux/store/UGStore";
import { HomeGamesModel } from "../../../public/network/Model/HomeGamesModel";
export enum ViewTypes {
  "2x1",
  "1x1L",
  "1x1R"
}
const dataProvider = new DataProvider((r1, r2) => {
  return r1 !== r2;
});

const HotRecycleList = ({ homeGames }: { homeGames: HomeGamesModel }) => {
  const { width, height } = useDimensions().screen
  const { isTest = false, uid = "" } = useSelector((state: IGlobalState) => state.UserInfoReducer)
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
  const _layoutProvider = new LayoutProvider(
    index => {
      switch (index) {
        case 0:
        case 3:
        case 4:
        case 7:
          return ViewTypes["2x1"]
          break;
        case 1:
        case 5:
          return ViewTypes["1x1L"]
        case 2:
        case 6:
          return ViewTypes["1x1R"]
        default:
          return ViewTypes["2x1"]
          break;
      }
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes["2x1"]:
          dim.width = width - 10;
          dim.height = 134;
          break;
        case ViewTypes["1x1L"]:
        case ViewTypes["1x1R"]:
          dim.width = ((width - 20) / 2);
          dim.height = 114;
          break;
          dim.width = 0;
          dim.height = 0;
      }
    }
  );
  const _rowRenderer = (type, data) => {
    switch (type) {
      case ViewTypes["1x1R"]:
      case ViewTypes["1x1L"]:
        return (
          <Hot1x1Cell homeGames={homeGames} thirdPartGamePress={thirdPartGamePress} data={data} type={type} />
        );
      case ViewTypes["2x1"]:
        return (
          <Hot2x1Cell homeGames={homeGames} thirdPartGamePress={thirdPartGamePress} data={data} />
        );
      default:
        return null;
    }
  }

  return (
    <RecyclerListView scrollViewProps={{
      scrollEnabled: false
    }} layoutProvider={_layoutProvider} dataProvider={dataProvider.cloneWithRows(hotData)} rowRenderer={_rowRenderer} />
  )
}
export default HotRecycleList