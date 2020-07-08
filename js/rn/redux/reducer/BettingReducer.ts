import { produce, } from 'immer';
import { getShengXiaoValue, ResultProps, ShengXiaoValue, ShengXiaoTitle, getShengXiaoString } from '../../pages/common/LottoBetting/PlayVIew/lottoSetting';
import { Play, PlayOddDataModel, PlayOdd } from '../../public/network/Model/PlayOddDataModel';
interface bettingResultProps {
  [key: string]: any
}
export interface BettingReducerProps {
  bettingResult: bettingResultProps,
  shengXiaoValue: ResultProps,
  selectedShengXiao: SelectedShengXiao,
  currentPlayOdd: PlayOdd
}
export enum BettingReducerActions {
  itemPress = "itemPress",
  shengXiaoPress = "shengXiaoPress",
  setCurrentPlayOdd = "setCurrentPlayOdd"
}
interface SelectedShengXiao {
  [key: string]: number
}
interface itemPressAction {
  type: BettingReducerActions.itemPress,
  value: Play
}
interface shengXiaoPressAction {
  type: BettingReducerActions.shengXiaoPress,
  value: string
}
interface setCurrentPlayOddAction {
  type: BettingReducerActions.setCurrentPlayOdd,
  value: PlayOdd
}
type Actions = itemPressAction | shengXiaoPressAction | setCurrentPlayOddAction
const initialState: BettingReducerProps = {
  bettingResult: {},
  shengXiaoValue: getShengXiaoValue(),
  selectedShengXiao: {},
  currentPlayOdd: undefined
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
    } else if (action.type == BettingReducerActions.shengXiaoPress) {
      if (!state.currentPlayOdd)
        return
      const { value } = action
      let isExist = state.selectedShengXiao?.[value] == state.shengXiaoValue[value].length
      //生肖的id陣列
      const checkArray = state.shengXiaoValue[value] ?? []
      //抓取當前特碼資料
      const result = state.currentPlayOdd.playGroups.filter((res) => {
        return res.code == 'TM'
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
    } else {

    }
  })

}
export default BettingReducer

