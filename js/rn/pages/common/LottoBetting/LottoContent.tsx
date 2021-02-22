import * as React from "react"
import { FlatList, Text, TouchableWithoutFeedback, View } from "react-native"
import { useLottoContext } from "./LottoContext"
import { BettingReducerActions } from "../../../redux/reducer/BettingReducer"
import { UGStore } from "../../../redux/store/UGStore"
import { PlayOdd } from "../../../public/network/Model/PlayOddDataModel"
import YXContainer from "./PlayVIew/LHT/YX"
import SBContainer from "./PlayVIew/LHT/SB"
import ZTContainer from "./PlayVIew/LHT/ZT"
import LMAContainer from "./PlayVIew/LHT/LMA"
import WSContainer from "./PlayVIew/LHT/WS"
import TWSContainer from "./PlayVIew/LHT/TWS"
import WXSContainer from "./PlayVIew/LHT/WX"
import LMContainer from "./PlayVIew/LHT/LM"
import ZMContainer from "./PlayVIew/LHT/ZM"
import TMPlayView from "./PlayVIew/LHT/TM"
import ZMContainer16 from "./PlayVIew/LHT/ZM16"
import GFWFContainer from "./PlayVIew/FT/GFWF";
import YZDWContainer from "./PlayVIew/SSC/YZDW";
import EZDWContainer from "./PlayVIew/SSC/EZDW";
import SZDWContainer from "./PlayVIew/SSC/SZDW";
import BDWContainer from "./PlayVIew/SSC/BDW";
import DWDContainer from "./PlayVIew/SSC/DWD";
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

const LottoContent = ({ setProps }) => {
  const value = useLottoContext()
  const borderColor = "red"
  const { currentPlayOdd } = UGStore.globalProps.BettingReducer

  const getPlayView = () => {
    console.log("currentPlayOdd?.code", currentPlayOdd?.code)
    switch (currentPlayOdd?.code) {
      case "TM":
        return <TMPlayView setProps={setProps}/>
      case "LM":
      case "ZOX":
        return <LMContainer setProps={setProps}/>
      case "SB":
        return <SBContainer setProps={setProps}/>
      case "ZM":
        return <ZMContainer setProps={setProps}/>
      case "ZM1-6":
        return <ZMContainer16 setProps={setProps}/>
      case "ZT":
        return <ZTContainer setProps={setProps}/>
      case "LMA":
        return <LMAContainer setProps={setProps}/>
      case "YX":
      case "ZX":
      case "TX":
        return <YXContainer setProps={setProps}/>
      case "WS":
        return <WSContainer setProps={setProps}/>
      case "TWS":
        return <TWSContainer setProps={setProps}/>
      case "WX":
        return <WXSContainer setProps={setProps}/>
      case 'GFWF'://官方玩法
        return <GFWFContainer setProps={setProps}/>
      case 'YZDW'://一字定位玩法
        return <YZDWContainer setProps={setProps}/>
      case 'EZDW'://二字定位玩法
        return <EZDWContainer setProps={setProps}/>
      case 'SZDW'://三字定位玩法
        return <SZDWContainer setProps={setProps}/>
      case 'BDW'://不定位玩法
        return <BDWContainer setProps={setProps}/>
      case 'DWD'://定位胆玩法
        return <DWDContainer setProps={setProps}/>
      default:
        break;
    }
  }
  const onPress = (item: PlayOdd) => {
    UGStore.dispatch({
      type: BettingReducerActions.setCurrentPlayOdd, value: item,
    })
    setProps()
  }
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <FlatList keyExtractor={item => item.name} style={{ flex: 1, borderRightColor: "#d1d0d0", borderRightWidth: 1 }}
                data={value?.currentOddsData?.data?.playOdds ?? []} renderItem={({ item }) => {
        return <TouchableWithoutFeedback onPress={onPress.bind(null, item)}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 40,
            borderWidth: currentPlayOdd?.name == item.name ? 1 : 0,
            borderColor: borderColor,
            borderBottomWidth: currentPlayOdd?.name == item.name ? 2 : 0,
          }}>
            <View style={{
              width: 8,
              height: 8,
              backgroundColor: currentPlayOdd?.name == item.name ? borderColor : "#c3c3c3",
              borderRadius: 4,
              position: "absolute",
              left: 5,
            }}/>
            <UGText style={{
              fontSize: 15,
              fontWeight: currentPlayOdd?.name == item.name ? "bold" : "normal",
              textAlign: "left", color: currentPlayOdd?.name == item.name ? "red" : "#403e3e",
              marginLeft: 5,
            }}>{item.name}</UGText>
          </View>
        </TouchableWithoutFeedback>
      }}/>
      <View style={{ flex: 3 }}>
        {getPlayView()}
      </View>
    </View>
  )
}

export default LottoContent
