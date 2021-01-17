import {
  PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryListMode, { ItemType } from '../../../../redux/model/game/LotteryListModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import { ugLog } from '../../../../public/tools/UgLog'
import LotteryData from '../../const/LotteryData'

/**
 * 解析六合彩 特码数据
 *
 * @param tmB 特码B 还是 特码 A
 * @param data 数据
 * @param zodiacNums 生肖数据
 */
const parseTMData = (tmB?: boolean,
                     data?: PlayOddData,
                     zodiacNums?: ZodiacNum[]): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []
  if (arrayLength(data?.playGroups) == 6) {
    //特码B A Tab
    const tabs: LotteryListMode = {
      type: ItemType.TAB,
      code: data?.code,
      data: [data?.playGroups[0], data?.playGroups[3]],
    }
    tmArray.push(tabs)

    //12生肖
    const zodiacList: LotteryListMode = {
      type: ItemType.ZODIAC,
      code: data?.code,
      data: zodiacNums,
    }
    tmArray.push(zodiacList)

    //特码BA 有自己的分组方式
    const tmBData = tmB ?
      [data?.playGroups[3], data?.playGroups[4], data?.playGroups[5]] :
      [data?.playGroups[0], data?.playGroups[1], data?.playGroups[2]]

    //标题+彩球
    tmArray.push(...parseGroupData(tmBData, data, 3))

  }

  ugLog('parseTMData tmArray = ', JSON.stringify(tmArray))
  return tmArray
}

/**
 * 解析六合彩 两面，色波，等规则数据，不需要特殊处理
 *
 * @param data 数据
 */
const parseLMData = (data?: PlayOddData): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []
  //格子数据
  tmArray.push(...parseGroupData(data?.playGroups, data, 2, ItemType.LATTICE))

  ugLog('parseLMData tmArray = ', JSON.stringify(tmArray))

  return tmArray
}

/**
 * 解析六合彩 正特 等规则数据
 *
 * @param data 数据
 */
const parseZMData = (data?: PlayOddData): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []

  if (arrayLength(data?.playGroups) % 2 == 0) {//长度是偶数
    if (arrayLength(data?.playGroups) > 2) {//多余2条的数据，有标题TAB
      const tabs: LotteryListMode = {
        type: ItemType.TAB,
        code: data?.code,
        data: data?.playGroups?.filter((item, index) => index % 2 == 0),
      }
      tmArray.push(tabs)
    }

    //每2个数据为1组
    data?.playGroups?.map((item, index, array) => {
      // if (index % 2 == 0) {
      if (index == 2) {
        //彩球数据
        tmArray.push(...parseGroupData([array[index]], data, 3))
        //格子数据
        tmArray.push(...parseGroupData([array[index + 1]], data, 2, ItemType.LATTICE))
      }
    })
  }

  ugLog('parseZMData tmArray = ', JSON.stringify(tmArray))

  return tmArray
}

/**
 * 解析六合彩 连码 等规则数据
 *
 * @param data 数据
 */
const parseLMAData = (data?: PlayOddData): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []

  if (!anyEmpty(data?.playGroups)) {
    //标题TAB
    const tabs: LotteryListMode = {
      type: ItemType.TAB,
      code: data?.code,
      data: data?.playGroups,
    }
    tmArray.push(tabs)


    data?.playGroups?.map((groupData, index) => {
      if (index == 0) {
        //多个赔率的生成47个球，否则49个球
        const ballCount = arrayLength(groupData?.plays) > 1 ? 47 : 49
        const play0 = groupData?.plays[0]
        const odds = arrayLength(groupData?.plays) > 1 ?
          `${play0?.odds}\n${groupData?.plays[1]?.odds}` :
          play0?.odds

        const arr = new Array(
          ballCount,
        ).fill(0).map((item, index) => {
          let ballIndex = ('0' + index).slice(-2)
          const ball: PlayData = {
            ...play0,
            exId: play0?.id + ballIndex,
            exName: ballIndex,
            exOdds: odds,
          }
          return ball
        })

        tmArray.push(...parseGroupData([{ ...groupData, plays: arr }], data, 3))
      }

    })
  }

  ugLog('parseLMAData tmArray = ', JSON.stringify(tmArray))

  return tmArray
}

/**
 * 解析六合彩 平特一肖 等规则数据
 *
 * @param data 数据
 * @param zodiacNums 生肖数据
 */
interface IParsePTYXData {
  data?: PlayOddData
  zodiacNums?: ZodiacNum[]
}
const parsePTYXData = ({ data, zodiacNums }: IParsePTYXData): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []

  if (arrayLength(data?.playGroups) == 1) {
    tmArray.push(...parsePXGroupData([data?.playGroups[0]], data, ItemType.TITLE_AND_BALL, zodiacNums))
  }

  ugLog('parsePTYXData tmArray = ', JSON.stringify(tmArray))

  return tmArray
}

/**
 * 解析六合彩 连肖 等规则数据
 *
 * @param data 数据
 * @param zodiacNums 生肖数据
 */
interface IParseLXData {
  data?: PlayOddData
  zodiacNums?: ZodiacNum[]
}
const parseLXData = ({ data, zodiacNums }: IParseLXData): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []

  if (arrayLength(data?.playGroups) > 0) {
    //tab
    const tabs: LotteryListMode = {
      type: ItemType.TAB,
      code: data?.code,
      data: data?.playGroups,
    }
    tmArray.push(tabs)

    //标题 生肖球数据
    tmArray.push(...parsePXGroupData([data?.playGroups[0]], data, ItemType.TITLE_AND_BALL, zodiacNums))

  }

  ugLog('parsePTYXData tmArray = ', JSON.stringify(tmArray))

  return tmArray
}

/**
 * 解析六合彩 平特尾数 等规则数据
 *
 * @param data 数据
 */
const parsePTWSData = (data?: PlayOddData): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []

  if (arrayLength(data?.playGroups) == 1) {
    //标题 生肖球数据
    tmArray.push(...parsePXGroupData([data?.playGroups[0]], data, ItemType.TITLE_AND_BALL))

  }

  ugLog('parsePTWSData tmArray = ', JSON.stringify(tmArray))

  return tmArray
}

/**
 * 解析六合彩 连尾 等规则数据
 *
 * @param data 数据
 * @param zodiacNums 生肖数据
 */
const parseLWData = (data?: PlayOddData): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []

  if (arrayLength(data?.playGroups) > 0) {
    //tab
    const tabs: LotteryListMode = {
      type: ItemType.TAB,
      code: data?.code,
      data: data?.playGroups,
    }
    tmArray.push(tabs)

    //标题 生肖球数据
    tmArray.push(...parsePXGroupData([data?.playGroups[0]], data, ItemType.TITLE_AND_BALL))

  }

  ugLog('parsePTYXData tmArray = ', JSON.stringify(tmArray))

  return tmArray
}

/**
 * 解析六合彩 头尾数 等规则数据
 *
 * @param data 数据
 */
const parseTWSData = (data?: PlayOddData): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []

  if (arrayLength(data?.playGroups) == 2) {

    //格子数据
    tmArray.push(...parseGroupData([data?.playGroups[0]], data, 2, ItemType.LATTICE))

    //标题 生肖球数据
    tmArray.push(...parsePXGroupData([data?.playGroups[0]], data, ItemType.TITLE_AND_BALL))
  }

  ugLog('parseTWSData tmArray = ', JSON.stringify(tmArray))

  return tmArray
}

/**
 * 解析六合彩 合肖 等规则数据
 *
 * @param data 数据
 */
const parseHXData = (data?: PlayOddData,
                     zodiacNums?: ZodiacNum[]): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []

  if (arrayLength(data?.playGroups) == 2) {

    //格子数据
    tmArray.push(...parseGroupData([data?.playGroups[0]], data, 2, ItemType.LATTICE))

    //标题 生肖球数据
    tmArray.push(...parsePTWSData({ ...data, playGroups: [data?.playGroups[1]] }))
  }

  ugLog('parseTWSData tmArray = ', JSON.stringify(tmArray))

  return tmArray
}

/**
 * 解析六合彩 一组平特数据，如 平特一肖
 *
 * @param groupArray 数据列表
 * @param data 特码数据
 * @param zodiacNums 使用设置里面的生肖数据
 * @param ballType 当前是球还是格子 还是 其它
 *
 * return 标题 + 球或格子
 */
const parsePXGroupData = (groupArray?: Array<PlayGroupData>,
                          data?: PlayOddData,
                          ballType?: ItemType,
                          zodiacNums?: ZodiacNum[]): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []
  groupArray?.map((groupData) => {
    //标题栏
    const labelList: LotteryListMode = {
      type: ItemType.LABEL,
      code: data?.code,
      data: groupData,
    }
    tmArray.push(labelList)

    //标题 生肖球数据
    const newData: Array<LotteryListMode> = groupData?.plays?.map((playData, index) => {
      //生肖数据从服务器还是从本地取
      const nums = !anyEmpty(zodiacNums) ?
        zodiacNums?.find((zodiac) => zodiac?.name == playData?.name || zodiac?.name == playData?.alias)?.nums?.map((item) => ('0' + item).slice(-2)) :
        index < LotteryData.WS.length ? LotteryData.WS[index] : null
      const newPlayData: PlayData = {
        ...playData, exNums: nums,
      }

      return ({
        type: ItemType.TITLE_AND_BALL,
        code: data?.code,
        data: newPlayData,
      })
    })

    //每行N个球排列
    tmArray.push(...newData)

  })

  return tmArray
}

/**
 * 解析六合彩 一组数据，如 特码标题栏+球数据
 *
 * @param groupArray 数据列表
 * @param data 特码数据
 * @param N N个数为一组，必须大于 0
 * @param ballType 当前是球还是格子 还是 其它
 *
 * return 标题 + 球或格子
 */
const parseGroupData = (groupArray?: Array<PlayGroupData>,
                        data?: PlayOddData,
                        N?: number,
                        ballType?: ItemType): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []
  groupArray?.map((groupData) => {
    //标题栏
    const labelList: LotteryListMode = {
      type: ItemType.LABEL,
      code: data?.code,
      data: groupData,
    }
    tmArray.push(labelList)

    //每行N个球排列
    tmArray.push(...parseBallData(groupData?.plays, data, N, ballType))

  })

  return tmArray
}

/**
 * 解析六合彩 分组 球的数据 或者 格子数据
 *
 * @param playData 特码球的数据
 * @param data 特码数据
 * @param N N个数为一组，必须大于 0
 * @param ballType 当前是球还是格子 还是 其它
 */
const parseBallData = (playData?: Array<PlayData>,
                       data?: PlayOddData,
                       N?: number,
                       ballType?: ItemType): Array<LotteryListMode> => {
  const playArray: Array<LotteryListMode> = []

  const endCount = arrayLength(playData) % N //不是N的整数倍，有遗漏数据，比如 漏了2个
  const lastIndex = endCount > 0 ? arrayLength(playData) - 1 : -1 // //不是N的整数倍，有遗漏数据

  playData?.map((playData, index, array) => {
    const oppoIndex = index + 1
    let forStart = 0

    if (oppoIndex % N == 0) {//3个球为一组，比如 0 1 2
      forStart = N - 1
    } else if (index == lastIndex) {//最后遗漏的数据 3 4
      forStart = endCount - 1
    }

    if (forStart > 0) {
      const trio = []
      for (let i = forStart; i >= 0; i--) {
        trio.push(array[index - i])
      }
      ugLog('trio = ', JSON.stringify(trio))
      playArray.push({
          type: ballType ?? ItemType.BALLS,
          code: data?.code,
          data: trio,
        },
      )
    }
  })

  return playArray
}

export {
  parseTMData,
  parseLMData,
  parseZMData,
  parseLMAData,
  parsePTYXData,
  parseLXData,
  parsePTWSData,
  parseLWData,
  parseTWSData,
}
