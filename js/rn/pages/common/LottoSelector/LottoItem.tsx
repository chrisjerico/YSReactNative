import { View, Text, Image, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image"
import { List } from "../../../public/network/Model/LottoGamesModel"
import moment from 'moment';
import { Skin1 } from '../../../public/theme/UGSkinManagers';
import React, { memo, useMemo, useState } from 'react'
import { useDimensions } from "@react-native-community/hooks";
import { useLottoContext } from "../LottoBetting/LottoContext";
const LottoItem = memo(({ item, index, currentTimeStamp }: { item: List, index: number, currentTimeStamp: moment.Moment }) => {
  const [imgError, setImgError] = useState(false)
  const { width } = useDimensions().screen
  const { setlottoData, setShowModal } = useLottoContext()
  const memoFastImage = useMemo(() => {
    return <FastImage
      onLoad={e => {
        if (e?.nativeEvent?.width == 0 || e?.nativeEvent?.height == 0) {
          setImgError(true)
        }
      }}
      onError={() => {
        setImgError(true)
      }} style={{ height: 60, width: 60 }} source={{ uri: item.pic, cache: 'cacheOnly' }} />
  }, [])
  const onPress = () => {
    setlottoData(item)
    setShowModal(false)
  }
  return (<TouchableOpacity onPress={onPress} style={{
    width: (width - 30) / 2,
    backgroundColor: Skin1.themeColor,
    borderRadius: 8, flexDirection: 'row',
    paddingVertical: 20, paddingLeft: 10,
    marginRight: index % 2 == 0 ? 10 : 0,
    marginBottom: 5
  }}>
    {imgError ? <Image source={{ uri: "loading" }} style={{ width: 60, height: 60 }} /> : memoFastImage}

    <View style={{ flexDirection: 'column', marginLeft: 5 }}>
      <Text style={{ color: 'white', marginBottom: 5 }}>{item.title}</Text>
      <Text style={{ color: 'green', fontSize: 14 }}>{item.openCycle}</Text>
      <TimeLabel isInstant={item.isInstant} curCloseTime={item.curCloseTime} currentTimeStamp={currentTimeStamp} />
    </View>
  </TouchableOpacity>)
})
const TimeLabel = ({ isInstant, currentTimeStamp, curCloseTime }: { isInstant: string, currentTimeStamp, curCloseTime }) => {
  const getTimeDiff = (a, end) => {
    const b = moment(end)
    if (b.diff(a, 'seconds') <= 0) {
      return "00:00"
    }
    const minutes = b.diff(a, 'minutes') % 60 >= 10 ? b.diff(a, 'minutes') % 60 : "0" + b.diff(a, 'minutes') % 60
    const seconds = (b.diff(a, 'seconds') % 60) >= 10 ? (b.diff(a, 'seconds') % 60) : "0" + (b.diff(a, 'seconds') % 60)
    const hours = (b.diff(a, 'hours') % 24) >= 10 ? (b.diff(a, 'hours') % 24) : "0" + (b.diff(a, 'hours') % 24)
    const days = (b.diff(a, 'days') % 30) >= 10 ? (b.diff(a, 'days') % 30) : "0" + (b.diff(a, 'days') % 30)
    if (days > 0) {
      return days + "天" + hours + ":" + minutes + ":" + seconds
    } else if (hours > 0) {
      return hours + ":" + minutes + ":" + seconds
    } else {
      return minutes + ":" + seconds
    }

  }
  return <Text style={{ color: 'red' }}>{isInstant == "0" ? getTimeDiff(currentTimeStamp, curCloseTime) : ""}</Text>
}
export default LottoItem