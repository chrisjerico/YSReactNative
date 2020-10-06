import {produce,} from 'immer';
import {
  getShengXiaoString,
  getShengXiaoValue,
  ResultProps,
  ShengXiaoTitle
} from '../../pages/common/LottoBetting/PlayVIew/lottoSetting';
import {Play, PlayOdd} from '../../public/network/Model/PlayOddDataModel';
import {UGStore} from "../store/UGStore";
import {PageName} from "../../public/navigation/Navigation";
import {ugLog} from "../../public/tools/UgLog";

interface bettingResultProps {
  [key: string]: any
}
export interface BettingReducerProps {
  bettingResult: bettingResultProps,
  shengXiaoValue: ResultProps,
  subPlay: string,
  selectedShengXiao: SelectedShengXiao,
  currentPlayOdd: PlayOdd,
  betGroupResult: number[]
}
export enum BettingReducerActions {
  ballPress = "ballPress",
  itemPress = "itemPress",
  shengXiaoPress = "shengXiaoPress",
  subPlayPress = "subPlayPress",
  setCurrentPlayOdd = "setCurrentPlayOdd",
  itemGroupPress = "itemGroupPress",
  cleanBetGroupResult = "cleanBetGroupResult"
}
interface SelectedShengXiao {
  [key: string]: number
}
interface itemPressAction {
  type: BettingReducerActions.itemPress,
  value: Play
}
interface ballPressAction {
  type: BettingReducerActions.ballPress,
  value: string
}
interface shengXiaoPressAction {
  type: BettingReducerActions.shengXiaoPress,
  value: string
}
interface setCurrentPlayOddAction {
  type: BettingReducerActions.setCurrentPlayOdd,
  value: PlayOdd
}
interface itemGroupPressAction {
  type: BettingReducerActions.itemGroupPress,
  value: number
}
interface cleanBetGroupResultAction {
  type: BettingReducerActions.cleanBetGroupResult,
  value: null
}
interface subPlayPressAction {
  type: BettingReducerActions.subPlayPress,
  value: string
}
type Actions = itemPressAction | ballPressAction | shengXiaoPressAction | setCurrentPlayOddAction | itemGroupPressAction | cleanBetGroupResultAction | subPlayPressAction
const initialState: BettingReducerProps = {
  bettingResult: {},
  shengXiaoValue: getShengXiaoValue(),
  selectedShengXiao: {},
  subPlay: "",
  currentPlayOdd: undefined,
  betGroupResult: []
}
function BettingReducer(state = initialState, action: Actions) {
  if (typeof state === 'undefined') {
    return initialState
  }
  return produce<BettingReducerProps>(state, (draftState) => {
    if (action.type == BettingReducerActions.itemPress) {
      const { value } = action
      const fixString = value.code[0] == '0' ? value.code.replace("0", "") : value.code
      const num = parseInt(fixString)
      const shengXiaoString = getShengXiaoString(num)
      if (!draftState.bettingResult[value.id]) {
        draftState.bettingResult[value.id] = value
        draftState.selectedShengXiao[shengXiaoString] = state.selectedShengXiao[shengXiaoString] + 1
      } else {
        delete draftState.bettingResult[value.id]
        draftState.selectedShengXiao[shengXiaoString] = state.selectedShengXiao[shengXiaoString] - 1
      }
    } else if (action.type == BettingReducerActions.ballPress) {
      const { value } = action
      // ugLog('action 2 = $s', action)
      // ugLog('draftState.bettingResult ', draftState.bettingResult)
      const fixString = value?.startsWith('0') ? value.slice(0) : value
      if (!draftState.bettingResult[fixString]) {
        draftState.bettingResult[fixString] = value
      } else {
        delete draftState.bettingResult[fixString]
      }
    } else if (action.type == BettingReducerActions.shengXiaoPress) {
      if (!state.currentPlayOdd)
        return
      const { value } = action
      let isExist = state.selectedShengXiao?.[value] == state.shengXiaoValue[value].length
      //生肖的id陣列
      const checkArray = state.shengXiaoValue[value] ?? []
      //抓取當前特碼資料
      const result = state.currentPlayOdd.playGroups.filter((res) => {
        return res.code == 'TM' && res.alias == state.subPlay
      })
      if (result.length == 0) {
        console.warn("彩種錯誤")
        return
      }
      //抓取特碼及該生肖的資料
      let temp = []
      checkArray.map((res) => {
        temp.push(result[0].plays[res - 1])
      })

      for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        if (state.bettingResult[element.id] == undefined)
          isExist = false
      }
      if (isExist) {
        temp.map((res) => {
          delete draftState.bettingResult[res.id]
          draftState.selectedShengXiao[value] = 0

        })
      } else {
        temp.map((res) => {
          draftState.bettingResult[res.id] = res
        })
        draftState.selectedShengXiao[value] = state.shengXiaoValue[value].length
      }
    } else if (action.type == BettingReducerActions.setCurrentPlayOdd) {
      const { value } = action
      draftState.currentPlayOdd = value
      if (value.code == 'TM') {
        for (let index = 0; index < 12; index++) {
          draftState.selectedShengXiao[ShengXiaoTitle[index]] = 0
        }
      }
      if(value.playGroups && value.playGroups[0]?.alias && value.playGroups[0]?.alias != "" ) {
        draftState.subPlay = value.playGroups[0].alias
      }
    } else if (action.type == BettingReducerActions.itemGroupPress) {
      if (state.betGroupResult.indexOf(action.value)) {
        draftState.betGroupResult.splice(state.betGroupResult.indexOf(action.value), 0)
      } else {
        draftState.betGroupResult.push(action.value)
      }
    } else if (action.type == BettingReducerActions.cleanBetGroupResult) {
      draftState.betGroupResult = []
    } else if (action.type == BettingReducerActions.subPlayPress) {
      draftState.subPlay = action.value
      draftState.betGroupResult = []
      draftState.bettingResult = {}
      draftState.selectedShengXiao = {}
    } else {

    }
    UGStore.dispatch({ type: 'merge', page: PageName.LottoBetting })
    UGStore.save();
  })

}
export default BettingReducer

