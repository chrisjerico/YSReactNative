import { createContext, useState, useContext, ReactElement, useEffect } from "react";
import React from 'react'
import { List } from "../../../public/network/Model/LottoGamesModel";
import APIRouter from "../../../public/network/APIRouter";
import { PlayOddDataModel, PlayGroup, PlayOdd } from "../../../public/network/Model/PlayOddDataModel";
import LottoBetting from ".";
interface ContextProps {
  showModal: boolean,
  lottoData: List,
  currentOddsData: PlayOddDataModel,
  setShowModal: (value: boolean) => void,
  setlottoData: (value: List) => void,

  bettingResult: any,
  setBettingResult: (value: string[]) => void,
}
export const LottoContext = createContext({
  showModal: true,
  lottoData: undefined,
  currentOddsData: undefined,

  setBettingResult: (value) => { },
  setShowModal: (value) => { },
  setlottoData: (value) => { },
} as ContextProps)
export const LottoResultContext = createContext(
  {})
export const LottoContextProvider = ({ lottoIdProps, children }: { lottoIdProps?: string, children: ReactElement }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [lottoData, setLottoData] = useState<List>()
  const [currentOddsData, setCurrentOddsData] = useState<PlayOddDataModel>()
  const [bettingResult, setBettingResult] = useState({})
  const getBettingData = async () => {
    if (!lottoData?.id)
      return
    try {
      const { data, status } = await APIRouter.game_playOdds(lottoData.id)
      setCurrentOddsData(data)
    } catch (error) {

    }
  }
  useEffect(() => {
    getBettingData()
  }, [lottoData])
  return <LottoContext.Provider value={{
    showModal: modalVisible,
    lottoData,
    setlottoData: (value) => {
      setLottoData(value)
    },
    setShowModal: (value) => {
      setModalVisible(value)
    },
    currentOddsData: currentOddsData,
    setBettingResult: (value) => {
      setBettingResult(value)
    },
    bettingResult
  }}>
    {children}
  </LottoContext.Provider>

}
export const useLottoContext = () => {
  const value = useContext(LottoContext)
  return value
}
export const useBettingResult = () => {
  const value = useContext(LottoResultContext)
  return value
}
