import { createContext, useState, useContext, ReactElement, useEffect } from "react";
import React from 'react'
import { List } from "../../../public/network/Model/LottoGamesModel";

export const LottoContext = createContext({
  showModal: true,
  lottoData: {
    id: "",
    isSeal: "",
    isClose: "",
    enable: "",
    name: "",
    title: "",
    customise: "",
    isInstant: "",
    lowFreq: "",
    gameType: "",
    pic: "",
    openCycle: "",
    curIssue: undefined,
    curOpenTime: "",
    curCloseTime: "",
    displayNumber: undefined,
    serverTime: "",
    serverTimestamp: "",
  },
  setShowModal: (value) => { },
  setlottoData: (value) => { },
})
export const LottoContextProvider = ({ lottoIdProps, children }: { lottoIdProps?: string, children: ReactElement }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [lottoData, setLottoData] = useState<List>({
    "id": "70",
    "isSeal": "0",
    "isClose": "1",
    "enable": "1",
    "name": "lhc",
    "title": "香港六合彩",
    "customise": "0",
    "isInstant": "0",
    "lowFreq": "1",
    "gameType": "lhc",
    "pic": "https://cdn01.mlqman.cn/upload/t060/customise/images/kjw_logo_70.jpg?v=1582712896",
    "openCycle": "2/3天一期",
    "curIssue": "2020009",
    "curOpenTime": "2020-07-21 21:35:00",
    "curCloseTime": "2020-07-21 21:30:00",
    "displayNumber": "2020009",
    "serverTime": "2020-07-05 12:52:42",
    "serverTimestamp": "1593924762416"
  })
  return <LottoContext.Provider value={{
    showModal: modalVisible,
    lottoData,
    setlottoData: (value) => {
      setLottoData(value)
    },
    setShowModal: (value) => {
      setModalVisible(value)
    }
  }}>
    {children}
  </LottoContext.Provider>
}
export const useLottoContext = () => {
  const value = useContext(LottoContext)
  return value
}
