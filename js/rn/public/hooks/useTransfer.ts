import { api } from '../network/NetworkRequest1/NetworkRequest1'
import { Alert } from 'react-native'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import {
  block,
  clockRunning,
  cond,
  debug,
  Easing,
  set,
  startClock,
  stopClock,
  timing,
  Value,
} from 'react-native-reanimated'

const useTransfer = () => {
  const checkBalance = async (id) => {
    const { data } = await api.real.checkBalance(id).promise
    return data
  }

  const transfer = async (transOut, transIn, money, setUpdateWallet) => {
    if ((!transOut || !transIn) || transOut.id === transIn.id) {
      (!transOut || !transIn) ?
        Alert.alert('请选择需要转出和转入的游戏类型') :
        Alert.alert('输入钱包和输出钱包不能一致')
    } else {
      api.real.manualTransfer(transOut.id, transIn.id, money).promise.then(async ({ data }) => {
        const update1 = transIn.id == 0 ? { data: { balance: 0 } } : await checkBalance(transIn.id)
        const update2 = transOut.id == 0 ? { data: { balance: 0 } } : await checkBalance(transOut.id)
        setUpdateWallet([{ id: transIn.id, balance: update1.data.balance }, {
          id: transOut.id,
          balance: update2.data.balance,
        }])
        data && Alert.alert('转入成功')
        UGUserModel.updateFromNetwork()
      }).catch((err) => {
      })
    }
  }

  const autoTransfer = async () => {
    api.real.autoTransferOut().setCompletionBlock((data) => {
      Alert.alert(data.msg)
      UGUserModel.updateFromNetwork()
    })
  }

  const getData = async () => {
    const { data } = await api.game.realGames().promise
    return data.data
  }

  function runTiming(clock, value, dest) {
    const state = {
      finished: new Value(0),
      position: value,
      time: new Value(0),
      frameTime: new Value(0),
    }

    const config = {
      duration: 250,
      toValue: dest,
      easing: Easing.inOut(Easing.cubic),
    }

    return block([

      cond(clockRunning(clock), 0, [

        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]),
      timing(clock, state, config),
      cond(state.finished, debug('stop clock', stopClock(clock))),
      state.position,
    ])
  }

  return {
    checkBalance,
    transfer,
    autoTransfer,
    getData,
    runTiming
  }
}

export default useTransfer
