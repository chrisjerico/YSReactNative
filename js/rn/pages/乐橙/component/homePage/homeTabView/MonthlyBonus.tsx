import { Image, Text, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import NumberFormat from 'react-number-format'
import React, { useEffect, useState } from 'react'

export const MonthlyBonus = () => {
  const [bonus, setBonus] = useState(`¥ 2${(Math.random() * 100000).toFixed(2)}`)
  useEffect(() => {
    const timer = setInterval(() => {
      getRandomString()
    }, 500)
    return () => clearInterval(timer)
  }, [])

  const getRandomString = () => {
    const num = ((2 + Math.random()) * 100000).toFixed(2)
    setBonus('¥ ' + num)
  }
  useEffect(() => {
    AsyncStorage.getItem('LCMonthlyBonus').then((value) => {
      const currentDate = new Date()
      if (currentDate.getDate() != 1 && !isNaN(parseInt(value))) {
        const randomNumber = Math.floor(Math.random() * 10000) + Math.random() * 10000 + 2
        const newValue = (parseInt(value) + randomNumber).toFixed(0).toString()
        AsyncStorage.setItem('LCMonthlyBonus', newValue)
        setBonus(newValue)
      } else {
        const newValue = (Math.floor(Math.random() * 10000) + Math.random() * 10 + 2).toFixed(0)
        AsyncStorage.setItem('LCMonthlyBonus', newValue.toString())
        setBonus(newValue.toString())
      }
    })
  }, [])

  return (
    <View style={{ height: 54, marginTop: 10, alignItems: 'center' }}>
      <Image style={{ height: 44, width: '100%', resizeMode: 'stretch', position: 'absolute', top: 6 }} source={{ uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/bonus.png' }} />
      <Text style={{ color: '#6666FF', fontSize: 12, fontWeight: 'bold' }}>本月已发放红利</Text>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <NumberFormat
          thousandSeparator={','}
          value={bonus}
          displayType={'text'}
          prefix={'￥ '}
          renderText={(value) => {
            return <Text style={{ color: '#6666FF', fontSize: 20 }}>{value}</Text>
          }}
        />
      </View>
    </View>
  )
}
