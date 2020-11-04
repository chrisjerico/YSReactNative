import React, { memo, useRef, useState } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import APIRouter from '../../network/APIRouter'
import { scale } from '../../tools/Scale'
import { ToastError, ToastSuccess } from '../../tools/tars'
import Button from '../../views/tars/Button'
import {anyEmpty} from "../../tools/Ext";
import {ugLog} from "../../tools/UgLog";
import {hideLoading, showLoading, UGLoadingType} from "../../widget/UGLoadingCP";

export interface FormComponentProps {
  onChangeText?: any
  value?: string
  placeholder: string
  showRightIcon?: boolean
  label?: string
  visible: boolean
  containerStyle?: StyleProp<ViewStyle>
  showLabel?: boolean
  renderRightIcon?: () => any
  renderLeftIcon?: () => any
  maxLength?: number
  labelTextStyle?: StyleProp<TextStyle>
  showLeftIcon?: boolean
  inputContainerStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  formStyle?: StyleProp<ViewStyle>
  defaultValue?: string
  rightIconType?: 'eye' | 'imgCaptcha' | 'touchImgCaptcha' | 'sms'
  leftIconContainerStyle?: StyleProp<ViewStyle>
  rightIconContainerStyle?: StyleProp<ViewStyle>
  leftIconName?: string
  leftIconProps?: IconProps
  rightIconProps?: IconProps
  placeholderTextColor?: string
  openEyeColor?: string
  closeEyeColor?: string
  onFocus?: (e: unknown) => any
  onBlur?: (e: unknown) => any
}

interface IconProps {
  type?: string
  name?: string
  reverse?: boolean
  containerStyle?: StyleProp<ViewStyle>
  reverseColor?: string
  color?: string
}

const RightIcon = ({ openEyeColor, closeEyeColor, showRightIcon, rightIconType, renderRightIcon, showContent, onPressEye, onPressSms, rightIconProps }) => {
  if (showRightIcon) {
    if (renderRightIcon) {
      return renderRightIcon()
    } else {
      switch (rightIconType) {
        case 'eye':
          return <Ionicons size={scale(40)} {...rightIconProps} name={showContent ? 'ios-eye' : 'ios-eye-off'} color={showContent ? openEyeColor : closeEyeColor} onPress={onPressEye} />
        case 'sms':
          return (
            <Button
              title={'获取验证码'}
              onPress={onPressSms}
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

const LeftIcon = ({ leftIconProps, showLeftIcon, renderLeftIcon, leftIconName }) => {
  if (showLeftIcon) {
    if (renderLeftIcon) {
      return renderLeftIcon()
    } else {
      return <Icon name={leftIconName} type={'feather'} color={'#d9d9d9'} size={scale(30)} {...leftIconProps} />
    }
  } else {
    return null
  }
}

const FormComponent = ({
  value,
  onChangeText,
  placeholder,
  showRightIcon = false,
  label,
  visible,
  containerStyle,
  showLabel = true,
  renderRightIcon,
  renderLeftIcon,
  maxLength,
  leftIconName,
  labelTextStyle,
  showLeftIcon = true,
  inputContainerStyle,
  inputStyle,
  formStyle,
  defaultValue,
  rightIconType,
  leftIconContainerStyle,
  rightIconContainerStyle,
  leftIconProps,
  rightIconProps,
  placeholderTextColor = '#000000',
  openEyeColor = '#84C1FF',
  closeEyeColor = '#d9d9d9',
  onFocus,
  onBlur,
}: FormComponentProps) => {
  const [showContent, setShowContent] = useState(false)
  const phoneNumber = useRef('')

  const fetchSms = async () => {
    try {
      showLoading();
      const { data } = await APIRouter.secure_smsCaptcha(phoneNumber)
      const { code, msg } = data ?? {}

      hideLoading()
      if (code != 0) {
        throw { message: msg }
      } else {
        ToastSuccess(msg)
      }
    } catch (error) {
      hideLoading()
      ToastError(error?.message)
    }
  }

  if (visible) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Input
          style={[
            {
              height: '50%',
              width: '100%',
            },
            styles.zero,
            formStyle,
          ]}
          defaultValue={defaultValue}
          inputContainerStyle={[styles.zero, inputContainerStyle]}
          inputStyle={[styles.inputStyle, inputStyle]}
          maxLength={maxLength}
          placeholder={placeholder}
          containerStyle={[styles.containerStyle]}
          placeholderTextColor={placeholderTextColor}
          leftIcon={<LeftIcon leftIconProps={leftIconProps} leftIconName={leftIconName} renderLeftIcon={renderLeftIcon} showLeftIcon={showLeftIcon} />}
          rightIcon={
            <RightIcon
              openEyeColor={openEyeColor}
              closeEyeColor={closeEyeColor}
              showContent={showContent}
              showRightIcon={showRightIcon}
              rightIconType={rightIconType}
              onPressEye={() => setShowContent(!showContent)}
              onPressSms={fetchSms}
              renderRightIcon={renderRightIcon}
              rightIconProps={rightIconProps}
            />
          }
          leftIconContainerStyle={[styles.leftIconContainerStyle, leftIconContainerStyle]}
          rightIconContainerStyle={[styles.rightIconContainerStyle, rightIconContainerStyle]}
          value={value}
          onChangeText={

            rightIconType == 'sms'
              ? (value) => {
                  phoneNumber.current = value
                  onChangeText && onChangeText()
                }
              : onChangeText
          }
          secureTextEntry={rightIconType == 'eye' ? !showContent : false}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {showLabel ? <Text style={[styles.labelText, labelTextStyle]}>{label}</Text> : null}
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelText: {
    fontSize: scale(15),
    color: 'red',
    fontWeight: '100',
    marginTop: scale(10),
  },
  rightIconContainerStyle: {
    marginRight: scale(10),
  },
  leftIconContainerStyle: {
    marginLeft: 0,
    marginRight: scale(10),
    alignItems: 'center',
    width: scale(40),
  },
  inputStyle: {
    fontSize: scale(19),
    fontWeight: '300',
    color: '#000000',
  },
  zero: {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
  },
  containerStyle: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})

export default memo(FormComponent)
