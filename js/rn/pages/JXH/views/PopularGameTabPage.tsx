import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'

const HalfButton = ({ title, subTitle, logo }) => (
  <View style={{ flex: 1, aspectRatio: 2, backgroundColor: '#282828', borderRadius: scale(5), flexDirection: 'row', marginTop: '2%' }}>
    <View style={{ flex: 1 }}>
      <Text style={{ color: '#ffffff', fontSize: scale(30), margin: scale(10) }}>{title}</Text>
      <View style={{ flex: 1, justifyContent: 'center', paddingLeft: scale(10) }}>
        <Text style={{ color: '#ffffff' }} numberOfLines={1}>
          {subTitle}
        </Text>
      </View>
    </View>

    <View style={{ flex: 1 }}>
      <FastImage source={{ uri: logo }} style={{ aspectRatio: 1, height: '100%' }} resizeMode={'contain'} />
    </View>
  </View>
)

const RowButton = ({ data, title, logo }) => (
  <View style={{ backgroundColor: '#282828', aspectRatio: 4, borderRadius: scale(5), flexDirection: 'row', marginTop: scale(10), width: '100%' }}>
    <View style={{ flex: 2 }}>
      <Text style={{ color: '#ffffff', fontSize: scale(30), margin: scale(10) }}>{title}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
        {data?.list?.slice(0, 6)?.map((item: any, index: number) => (
          <View key={index} style={{ width: '33%', height: '50%', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: scale(10) }}>
            <Text style={{ color: '#ffffff' }} numberOfLines={1}>
              {item?.name || item?.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
    <View style={{ flex: 1 }}>
      <FastImage source={{ uri: logo }} style={{ aspectRatio: 1, height: '100%' }} resizeMode={'contain'} />
    </View>
  </View>
)

const PopularGameTabPage = ({ homeGames }) => {
  return (
    <>
      <RowButton data={homeGames[0]} title={homeGames[0]?.name} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/01.png'} />
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <HalfButton title={homeGames[1]?.name} subTitle={homeGames[1]?.list[0]?.name || homeGames[1]?.list[0]?.title} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/02.png'} />
        <View style={{ width: '2%' }} />
        <HalfButton title={homeGames[2]?.name} subTitle={homeGames[2]?.list[0]?.name || homeGames[2]?.list[0]?.title} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/03.png'} />
      </View>
      <RowButton data={homeGames[3]} title={homeGames[3]?.name} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/04.png'} />
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <HalfButton title={homeGames[5]?.name} subTitle={homeGames[5]?.list[0]?.name || homeGames[5]?.list[0]?.title} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/05.png'} />
        <View style={{ width: '2%' }} />
        <HalfButton title={homeGames[6]?.name} subTitle={homeGames[6]?.list[0]?.name || homeGames[6]?.list[0]?.title} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/06.png'} />
      </View>
      <RowButton data={homeGames[7]} title={homeGames[7]?.name} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/07.png'} />
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <HalfButton title={homeGames[8]?.name} subTitle={homeGames[8]?.list[0]?.name || homeGames[8]?.list[0]?.title} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/08.png'} />
        <View style={{ width: '2%' }} />
        <HalfButton title={homeGames[9]?.name} subTitle={homeGames[9]?.list[0]?.name || homeGames[9]?.list[0]?.title} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/09.png'} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({})

export default PopularGameTabPage
