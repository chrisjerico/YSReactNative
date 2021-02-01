import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { UGStore } from '../../../../../redux/store/UGStore'
import { anyEmpty, arrayLength, dicNull } from '../../../../../public/tools/Ext'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ugLog } from '../../../../../public/tools/UgLog'
import { api } from '../../../../../public/network/NetworkRequest1/NetworkRequest1'
import { BetLotteryData, IBetLotteryParams } from '../../../../../public/network/it/bet/IBetLotteryParams'
import moment from 'moment'
import LotteryConst from '../../../const/LotteryConst'
import { numberToFloatString } from '../../../../../public/tools/StringUtil'
import { calculateItemCount, gatherSelectedItems, initItemMoney } from '../../tl/BetUtil'
import { zodiacPlayX } from '../../tl/hx/BetHXUtil'
import { playDataX } from '../../tl/zxbz/BetZXBZUtil'
import { SelectedPlayModel } from '../../../../../redux/model/game/SelectedLotteryModel'
import { Toast } from '../../../../../public/tools/ToastUtils'
import { NormalModel } from '../../../../../public/network/Model/NormalModel'
import { hideLoading, showLoading } from '../../../../../public/widget/UGLoadingCP'
import APIRouter from '../../../../../public/network/APIRouter'
import { syncUserInfo } from '../../../../../public/tools/user/UserTools'

/**
 * 下注结果
 *
 * @constructor
 */
const UsePayResult = () => {


  return {
  }
}

export default UsePayResult
