import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import { Icon, Input } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import APIRouter from '../../network/APIRouter'
import { scale } from '../../tools/Scale'
import { ToastError, ToastSuccess } from '../../../Res/icon'
import Button from '../../views/tars/Button'
import {anyEmpty} from "../../tools/Ext";
import {ugLog} from "../../tools/UgLog";
import {hideLoading, showLoading, UGLoadingType} from "../../widget/UGLoadingCP";

export interface FormComponentProps {
  onChangeText?: any;
  value?: string;
  placeholder: string;
  extra?: string;//某些时候需要一个额外的值
  showRightIcon?: boolean;
  label?: string;
  show: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  enableLabel?: boolean;
  renderRightIcon?: () => any;
  renderLeftIcon?: () => any;
  maxLength?: number;
  labelTextStyle?: TextStyle | TextStyle[];
  showLeftIcon?: boolean;
  inputContainerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: ViewStyle | ViewStyle[];
  formStyle?: ViewStyle | ViewStyle[];
  defaultValue?: string;
  rightIconType?: 'eye' | 'imgCaptcha' | 'touchImgCaptcha' | 'sms';
  leftIconContainerStyle?: ViewStyle | ViewStyle[];
  rightIconContainerStyle?: ViewStyle | ViewStyle[];
  leftIconName?: string;
  leftIcon?: LeftIcon;
  placeholderTextColor?: string;
  rightIconStyle?: RightIconStyle;
}

interface RightIconStyle {
  highColor?: string; //高亮颜色
  color?: string; //非高亮颜色
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

const RightIcon = ({
  showRightIcon,
  rightIconType,
  renderRightIcon,
  showContent,
  onPressEye,
  onPressImgCaptcha,
  correctImageCode,
  onPressSms,
  rightIconStyle,
}) => {
  if (showRightIcon) {
    if (renderRightIcon) {
      return renderRightIcon()
    } else {
      //高亮颜色
      let highColor = anyEmpty(rightIconStyle?.highColor) ? '#84C1FF' : rightIconStyle?.highColor;
      let color = anyEmpty(rightIconStyle?.color) ? '#d9d9d9' : rightIconStyle?.color;
      // ugLog('rightIconStyle?.highColor=', rightIconStyle?.highColor)
      // ugLog('rightIconStyle?.color=', rightIconStyle?.color)
      switch (rightIconType) {
        case 'eye':
          return (
            <Ionicons
              name={showContent ? 'ios-eye' : 'ios-eye-off'}
              size={scale(40)}
              color={showContent ? highColor : color}
              onPress={onPressEye}
            />
          )
        case 'imgCaptcha':
          return (
            <ImgCaptcha
              onPress={onPressImgCaptcha}
              correctImageCode={correctImageCode}
            />
          )
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

const LeftIcon = ({ leftIcon, showLeftIcon, renderLeftIcon, leftIconName }) => {
  if (showLeftIcon) {
    if (renderLeftIcon) {
      return renderLeftIcon()
    } else {
      return (
        <Icon
          name={leftIconName}
          type={'feather'}
          color={'#d9d9d9'}
          size={scale(30)}
          {...leftIcon}
        />
      )
    }
  } else {
    return null
  }
}

const FormComponent = ({
  value,
  onChangeText,
  placeholder,
  extra,
  showRightIcon = false,
  label,
  show,
  containerStyle,
  enableLabel = true,
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
  leftIcon,
  placeholderTextColor = '#000000',
  rightIconStyle,
}: FormComponentProps) => {
  const [showContent, setShowContent] = useState(false)
  const [correctImageCode, setCorrectImageCode] = useState('')
  // const phoneNumber = useRef('')

  useEffect(() => {
    if ((rightIconType = 'imgCaptcha')) {
      fetchImgCaptcha()
    }
  }, [])

  const fetchSms = async () => {
    try {
      showLoading();
      const { data } = await APIRouter.secure_smsCaptcha(extra)
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

  const fetchImgCaptcha = () => {
    APIRouter.secure_imgCaptcha()
      .then((value) => {
        setCorrectImageCode(value?.data)
      })
      .catch((error) => {
        console.log(error)
      })
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
          leftIcon={
            <LeftIcon
              leftIcon={leftIcon}
              leftIconName={leftIconName}
              renderLeftIcon={renderLeftIcon}
              showLeftIcon={showLeftIcon}
            />
          }
          rightIcon={
            <RightIcon
              showContent={showContent}
              showRightIcon={showRightIcon}
              rightIconType={rightIconType}
              onPressEye={() => setShowContent(!showContent)}
              onPressImgCaptcha={fetchImgCaptcha}
              onPressSms={fetchSms}
              renderRightIcon={renderRightIcon}
              correctImageCode={correctImageCode}
              rightIconStyle={rightIconStyle}
            />
          }
          leftIconContainerStyle={[
            styles.leftIconContainerStyle,
            leftIconContainerStyle,
          ]}
          rightIconContainerStyle={rightIconContainerStyle}
          value={value}
          onChangeText={

            rightIconType == 'sms'
              ? (value) => {
                onChangeText && onChangeText(value)
              }
              : onChangeText
          }
          secureTextEntry={rightIconType == 'eye' ? !showContent : false}
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
  },
  labelText: {
    fontSize: scale(15),
    color: 'red',
    fontWeight: '100',
    marginTop: scale(10)
  },
  leftIconContainerStyle: {
    marginLeft: 0,
    marginRight: 5,
    alignItems: 'center',
    width: scale(40),
  },
  inputStyle: {
    fontSize: scale(19),
    fontWeight: '300',
    color: '#000000'
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

export default FormComponent
