import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import APIRouter from '../../../public/network/APIRouter';
import Header from "./Header";
import { LottoGamesModel } from '../../../public/network/Model/LottoGamesModel';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import LottoItem from './LottoItem';
import { useLottoContext } from '../LottoBetting/LottoContext';
const LottoSelector = () => {
  const [lottoData, setLottoData] = useState<LottoGamesModel>()
  const [reloadTime, setReloadTime] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const init = async () => {
    try {

      const { data, status } = await APIRouter.game_lotteryGames()
      setLottoData(data)
      const timeStampList = []
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        element.list.map((res) => {
          timeStampList.push(moment(res.curCloseTime).unix())
        })
      }
      timeStampList.sort()
      if (timeStampList.length > 0) {
        setReloadTime(timeStampList[0] + 3)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }
  const [currentTimeStamp, setCurrentTimeStamp] = useState(moment())
  useEffect(() => {
    if (currentTimeStamp.unix() >= reloadTime && reloadTime != 0 && isLoading == false) {
      setIsLoading(true)
      init()
    }
  }, [reloadTime, currentTimeStamp])
  useEffect(() => {
    init()
    const timer = setInterval(() => {
      setCurrentTimeStamp(moment())
    }, 1000)
    return (() => { clearInterval(timer), console.log("deinit") })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header />
      <FlatList keyExtractor={(item, index) => index.toString()} data={lottoData?.data ?? []} style={{ flex: 1 }} renderItem={({ item }) => {
        return <>
          <Text style={{ fontSize: 18, marginLeft: 20, marginVertical: 10, fontWeight: "bold" }}>{item.gameTypeName}</Text>
          <FlatList data={item.list}
            numColumns={2}
            columnWrapperStyle={{ paddingHorizontal: 10 }}
            renderItem={({ item, index }) => {
              return <LottoItem currentTimeStamp={currentTimeStamp} item={item} index={index} />
            }} />
        </>
      }} />
    </View>
  )
}

export default LottoSelector