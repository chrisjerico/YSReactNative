import React from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import PushHelper from '../../../public/define/PushHelper'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

const HalfButton = ({ title, data, logo }) => {
  const item = data?.slice(0, 1) ?? {}
  return (
    <View style={{ flex: 1, aspectRatio: 2, backgroundColor: '#282828', borderRadius: scale(5), flexDirection: 'row', marginTop: '2%' }}>
      <View style={{ flex: 1 }}>
        <UGText style={{ color: '#ffffff', fontSize: scale(30), margin: scale(10) }}>{title}</UGText>
        <TouchableWithoutFeedback
          onPress={() => {
            PushHelper.pushHomeGame(item)
          }}>
          <View style={{ flex: 1, justifyContent: 'center', paddingLeft: scale(10) }}>
            <UGText style={{ color: '#ffffff' }} numberOfLines={1}>
              {item?.title}
            </UGText>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 1 }}>
        <FastImage source={{ uri: logo }} style={{ aspectRatio: 1, height: '100%' }} resizeMode={'contain'} />
      </View>
    </View>
  )
}

const RowButton = ({ title, data, logo }) => (
  <View style={{ backgroundColor: '#282828', aspectRatio: 4, borderRadius: scale(5), flexDirection: 'row', marginTop: scale(10), width: '100%' }}>
    <View style={{ flex: 2 }}>
      <UGText style={{ color: '#ffffff', fontSize: scale(30), margin: scale(10) }}>{title}</UGText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
        {data?.slice(0, 6)?.map((item: any, index: number) => (
          <TouchableWithoutFeedback
            onPress={() => {
              PushHelper.pushHomeGame(item)
            }}>
            <View key={index} style={{ width: '33%', height: '50%', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: scale(10) }}>
              <UGText style={{ color: '#ffffff' }} numberOfLines={1}>
                {item?.title || item?.name}
              </UGText>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
    <View style={{ flex: 1 }}>
      <FastImage source={{ uri: logo }} style={{ aspectRatio: 1, height: '100%' }} resizeMode={'contain'} />
    </View>
  </View>
)

const PopularGameTabPage = ({ games }) => {
  const { list } = games
  return (
    <>
      <RowButton data={list[0]?.subType ?? []} title={list[0]?.name} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/01.png'} />
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <HalfButton title={list[1]?.name} data={list[1]?.subType ?? []} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/02.png'} />
        <View style={{ width: '2%' }} />
        <HalfButton title={list[2]?.name} data={list[2]?.subType ?? []} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/03.png'} />
      </View>
      <RowButton data={list[3]?.subType ?? []} title={list[3]?.name} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/04.png'} />
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <HalfButton title={list[4]?.name} data={list[4]?.subType ?? []} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/05.png'} />
        <View style={{ width: '2%' }} />
        <HalfButton title={list[5]?.name} data={list[5]?.subType ?? []} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/06.png'} />
      </View>
      <RowButton data={list[6]?.subType ?? []} title={list[6]?.name} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/07.png'} />
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <HalfButton title={list[7]?.name} data={list[7]?.subType ?? []} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/08.png'} />
        <View style={{ width: '2%' }} />
        <HalfButton title={list[8]?.name} data={list[8]?.subType ?? []} logo={'http://t132f.fhptcdn.com/views/mobileTemplate/18/images/09.png'} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({})

export default PopularGameTabPage
