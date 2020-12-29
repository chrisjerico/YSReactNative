import React from 'react'
import { ugLog } from '../../../public/tools/UgLog'

const CapitalContext = React.createContext({
  refreshTabPage: (pageName: string) => {}, //刷新哪个界面
})

export default CapitalContext
