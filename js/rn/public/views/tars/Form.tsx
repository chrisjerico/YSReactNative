import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import { Icon, Input } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'
import APIRouter from '../../network/APIRouter'
import { ToastError, ToastSuccess } from '../../tools/tars'
import Button from './Button'

interface Form {
  onChangeText?: any;
  value?: string;
  placeholder: string;
  showRightIcon?: boolean;
  label?: string;
  show: boolean;
  containerStyle?: ViewStyle;
  enableLabel?: boolean;
  renderRightIcon?: () => any;
  renderLeftIcon?: () => any;
  maxLength?: number;
  leftIcon?: LeftIcon;
  labelTextStyle?: TextStyle | TextStyle;
  showLeftIcon?: boolean;
  inputContainerStyle?: ViewStyle | ViewStyle;
  inputStyle?: ViewStyle | ViewStyle;
  formStyle?: ViewStyle | ViewStyle;
  defaultValue?: string;
  rightIconType?: 'eye' | 'imgCaptcha' | 'touchImgCaptcha' | 'sms';
}

interface LeftIcon {
  type?: string;
  name?: string;
  reverse?: boolean;
  containerStyle?: ViewStyle;
  reverseColor?: string;
  color?: string;
}

const ImgCaptcha = ({ onPress, correctImageCode }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <FastImage
      source={{ uri: correctImageCode }}
      resizeMode={'contain'}
      style={{ width: scale(150), height: '100%' }}
    />
  </TouchableWithoutFeedback>
)

const Form = ({
  value,
  onChangeText,
  placeholder,
  showRightIcon = false,
  label,
  show,
  containerStyle,
  enableLabel = true,
  renderRightIcon,
  renderLeftIcon,
  maxLength,
  leftIcon,
  labelTextStyle,
  showLeftIcon = true,
  inputContainerStyle,
  inputStyle,
  formStyle,
  defaultValue,
  rightIconType,
}: Form) => {
  const [showContent, setShowContent] = useState(true)
  const [correctImageCode, setCorrectImageCode] = useState('')
  const phoneNumber = useRef('')

  useEffect(() => {
    if ((rightIconType = 'imgCaptcha')) {
      fetchImgCaptcha()
    }
  }, [])

  const fetchSms = async () => {
    try {
      const { data } = await APIRouter.secure_smsCaptcha(phoneNumber.current)
      const { code, msg } = data ?? {}
      if (code != 0) {
        throw { message: msg }
      } else {
        ToastSuccess(msg)
      }
    } catch (error) {
      ToastError(error?.message)
    }
  }

  const fetchImgCaptcha = () => {
    APIRouter.secure_imgCaptcha()
      .then((value) => {
        setCorrectImageCode(value?.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getRightIcon = () => {
    if (showRightIcon) {
      if (renderRightIcon) {
        return renderRightIcon()
      } else {
        switch (rightIconType) {
          case 'eye':
            return (
              <Icon
                type={'ionicon'}
                name={showContent ? 'ios-eye' : 'ios-eye-off'}
                size={scale(40)}
                color={showContent ? '#84C1FF' : '#d9d9d9'}
                onPress={() => setShowContent(!showContent)}
              />
            )
          case 'imgCaptcha':
            return (
              <ImgCaptcha
                onPress={fetchImgCaptcha}
                correctImageCode={correctImageCode}
              />
            )
          case 'sms':
            return (
              <Button
                title={'获取验证码'}
                onPress={fetchSms}
                titleStyle={{ fontSize: scale(20) }}
                containerStyle={{
                  aspectRatio: 4,
                  width: scale(150),
                  backgroundColor: '#F1E1FF',
                  borderRadius: scale(5),
                }}
              />
            )
          default:
            return null
        }
      }
    } else {
      return null
    }
  }
  if (show) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Input
          style={[
            {
              height: '50%',
              width: '100%',
            },
            formStyle,
          ]}
          defaultValue={defaultValue}
          inputContainerStyle={inputContainerStyle}
          inputStyle={inputStyle}
          maxLength={maxLength}
          placeholder={placeholder}
          containerStyle={[
            {
              paddingLeft: 0,
              paddingRight: 0,
            },
          ]}
          leftIcon={
            showLeftIcon
              ? renderLeftIcon
                ? renderLeftIcon()
                : {
                  name: 'user',
                  type: 'feather',
                  color: '#d9d9d9',
                  size: scale(30),
                  ...leftIcon,
                }
              : null
          }
          rightIcon={getRightIcon}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          value={value}
          onChangeText={
            rightIconType == 'sms'
              ? (value) => {
                phoneNumber.current = value
                onChangeText && onChangeText()
              }
              : onChangeText
          }
          secureTextEntry={!showContent}
          onFocus={() => {
            if (correctImageCode == '' && rightIconType == 'touchImgCaptcha') {
              fetchImgCaptcha()
            }
          }}
        />
        {enableLabel ? (
          <Text style={[styles.labelText, labelTextStyle]}>{label}</Text>
        ) : null}
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 5,
  },
  labelText: {
    fontSize: scale(15),
    paddingTop: scale(5),
    color: 'red',
  },
  leftIconContainerStyle: {
    marginLeft: 0,
    marginRight: 5,
    alignItems: 'center',
    width: scale(40),
  },
})

export default Form
