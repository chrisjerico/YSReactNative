import { createContext, useState, useContext, useEffect } from "react"
import React from 'react'
import UGUserModel from "../../redux/model/全局/UGUserModel"
import UGSysConfModel from "../../redux/model/全局/UGSysConfModel"
import { OCHelper } from "../define/OCHelper/OCHelper"
const GlobalContext = createContext({
  userInfo: undefined,
  sysConf: undefined,
})

const GlobalContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UGUserModel>()
  const [sysConf, setSysConf] = useState<UGSysConfModel>()
  const init = async () => {
    await OCHelper.call('UGSystemConfigModel.currentConfig').then((sysConf: UGSysConfModel) => {
      setSysConf(sysConf)
    });
  }
  // useEffect(()=>{
  //   setUserInfo()
  // },[])
  useEffect(() => {
    init()
  }, [])
  return (
    <GlobalContext.Provider value={{ userInfo, sysConf }}>
      {children}
    </GlobalContext.Provider>
  )
}
export default GlobalContextProvider
export const useGlobalContext = () => {
  const value = useContext(GlobalContext)
  return value
}