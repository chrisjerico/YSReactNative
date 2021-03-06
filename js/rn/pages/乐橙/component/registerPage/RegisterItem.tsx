import { Alert, Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { Icon } from 'react-native-elements'
import { scale } from '../../../../public/tools/Scale'
import Button from '../../../../public/views/tars/Button'
import FastImage from 'react-native-fast-image'
import { useEffect, useState } from 'react'
import { hideLoading, showLoading } from '../../../../public/widget/UGLoadingCP'
import APIRouter from '../../../../public/network/APIRouter'
import { api } from '../../../../public/network/NetworkRequest1/NetworkRequest1'
import { UGText } from '../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const RegisterItem = ({ sms = false, config, placeHolder, iconName, iconType = 'font-awesome', onChangeText, phoneNumber }:
                               { sms?: boolean, config?: any, placeHolder: string, iconName: string, iconType?: string, onChangeText: (text) => void, phoneNumber?: string }) => {
  const [disableSms, setDisableSms] = useState(false)
  const [sec, setSec] = useState(60)

  useEffect(() => {
    let interval
    if (disableSms) {
      let counter = 60
      interval = setInterval(() => {
        if (counter == 0) {
          clearInterval(interval)
          setSec(60)
          setDisableSms(false)
        } else {
          counter = counter - 1
          setSec(counter)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [disableSms])

  const fetchSms = async (phoneNumber) => {
    if (phoneNumber) {
      api.secure.smsCaptcha(phoneNumber).promise.then(({ data }) => {
        hideLoading()
        setDisableSms(true)
      }).catch(() => {
        hideLoading()
      })
    } else {
      Alert.alert('请填写手机号')
    }
  }

  return (
    <>
      {config === false || config == 0 || config == '0' ?
        <></> :
        <View style={{
          flexDirection: 'row',
          paddingVertical: 10,
          borderWidth: 1,
          paddingHorizontal: 12,
          borderColor: '#ddd',
          marginTop: 12,
        }}>
          <Icon type={iconType} size={25} color={'gold'} name={iconName} />
          <TextInput onChangeText={(text) => onChangeText(text)} placeholder={placeHolder}
                     style={{ flex: 1, marginLeft: 12 }} />
          {sms &&
          <TouchableWithoutFeedback onPress={() => disableSms ? null : fetchSms(phoneNumber)}>
            <View style={disableSms ? [styles.disabledContainer] : [styles.container, {
              aspectRatio: 4,
              width: scale(150),
              backgroundColor: '#F1E1FF',
              borderRadius: scale(5),
            }]}>
              <UGText style={[styles.title, { fontSize: scale(20) }]} numberOfLines={1}>
                {disableSms ? '重新获取' + sec : '获取验证码'}
              </UGText>
            </View>
          </TouchableWithoutFeedback>}
        </View>
      }
    </>)
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {},
  disabledContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c6c6c6',
  },
})
