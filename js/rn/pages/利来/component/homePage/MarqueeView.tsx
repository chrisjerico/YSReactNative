import { Dimensions, View, Text, TouchableOpacity } from 'react-native'
import * as React from 'react'
import { MarqueeHorizontal } from 'react-native-marquee-ab'
import Icon from 'react-native-vector-icons/Foundation'
import Modal from 'react-native-modal'
import { useState } from 'react'
import { UGText } from '../../../../../doy/public/Button之类的基础组件/DoyButton'

const width = Dimensions.get('screen').width

interface MarqueeViewProps {
  textArr: { label: string, value: string, data: string }[]
}

export const MarqueeView = ({ textArr }: MarqueeViewProps) => {
  const [showModal, setShowModal] = useState(false)
  const [clickedItem, setClickItem] = useState<any>()
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      marginVertical: 6,
    }}>
      <Icon size={20} style={{ color: 'red', marginLeft: 10 }} name={'volume'} />
      <MarqueeHorizontal
        textList={textArr}
        separator={width - 90}
        speed={60}
        width={width - 55}
        height={30}
        direction={'left'}
        reverse={false}
        textStyle={{ fontSize: 16, color: '#000000' }}
        onTextClick={(item) => {
          setClickItem(item)
          setShowModal(true)
        }}
      />
      <Modal isVisible={showModal}>
        <View>
          <View style={{
            backgroundColor: '#e7e7e7',
            alignItems: 'center',
            paddingVertical: 16,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
          }}>
            <UGText style={{ color: 'black', fontSize: 16 }}>公告</UGText>
          </View>
          <View style={{
            backgroundColor: 'white', alignItems: 'center', borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
          }}>
            <UGText style={{ paddingVertical: 16, fontSize: 16 }}>{clickedItem?.data || ''}</UGText>
            <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false)
                }}
                style={{
                  borderColor: 'rgb(178, 178, 178)',
                  borderWidth: 1,
                  borderRadius: 6,
                  backgroundColor: '#e7e7e7',
                  paddingVertical: 16,
                  flex: 1,
                  alignItems: 'center',
                  marginHorizontal: 8,
                }}>
                <UGText>取消</UGText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false)
                }}
                style={{
                  backgroundColor: '#d82e2f',
                  alignItems: 'center',
                  borderRadius: 6,
                  paddingVertical: 16,
                  flex: 1,
                  marginHorizontal: 8,
                }}>
                <UGText style={{ color: 'white' }}>确定</UGText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
