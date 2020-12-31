import React from 'react'
import { ugLog } from '../../../public/tools/UgLog'
import { Data } from '../../../public/network/Model/YueBaoStatModel'

const CapitalContext = React.createContext({
  refreshTabPage: (pageName: string) => {}, //刷新哪个界面
  getYueBaoInfo: (): Data => null, //得到余额宝信息
})

export default CapitalContext
