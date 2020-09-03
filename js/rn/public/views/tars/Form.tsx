import React, { useState } from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import { scale } from '../../../public/tools/Scale'

interface Form {
  onChangeText?: any;
  value?: string;
  placeholder: string;
  rightIconProps?: any;
  // showContent?: boolean;
  showRightIcon?: boolean;
  label?: string;
  show: any;
  containerStyle?: ViewStyle;
  enableLabel?: boolean;
  renderRightIcon?: () => any;
  renderLeftIcon?: () => any;
  onFocus?: () => any;
  maxLength?: number;
  leftIcon?: LeftIcon;
  labelTextStyle?: TextStyle | TextStyle;
  valid?: boolean;
  showLeftIcon?: boolean;
  inputContainerStyle?: ViewStyle | ViewStyle;
  inputStyle?: ViewStyle | ViewStyle;
  formStyle?: ViewStyle | ViewStyle;
  defaultValue?: string;
}

interface LeftIcon {
  type?: string;
  name?: string;
  reverse?: boolean;
  containerStyle?: ViewStyle;
  reverseColor?: string;
  color?: string;
}

const Form = ({
  value,
  onChangeText,
  placeholder,
  rightIconProps = {},
  // showContent = true,
  showRightIcon = false,
  label,
  show,
  containerStyle,
  enableLabel = true,
  renderRightIcon,
  renderLeftIcon,
  onFocus,
  maxLength,
  leftIcon,
  labelTextStyle,
  valid,
  showLeftIcon = true,
  inputContainerStyle,
  inputStyle,
  formStyle,
  defaultValue
}: Form) => {
  const [showContent, setShowContent] = useState(true)
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
          rightIcon={
            showRightIcon ? (
              renderRightIcon ? (
                renderRightIcon()
              ) : (
                  <Icon
                    {...rightIconProps}
                    type={'ionicon'}
                    name={showContent ? 'ios-eye' : 'ios-eye-off'}
                    size={scale(40)}
                    color={showContent ? '#84C1FF' : '#d9d9d9'}
                    onPress={() => setShowContent(!showContent)}
                  />
                )
            ) : null
          }
          leftIconContainerStyle={{
            marginLeft: 0,
            marginRight: 5,
            alignItems: 'center',
            width: scale(40),
          }}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showContent}
          onFocus={onFocus}
        />
        {enableLabel ? (
          <Text
            style={[
              styles.labelText,
              valid ? { color: 'green' } : { color: 'red' },
              labelTextStyle,
            ]}
          >
            {label}
          </Text>
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
  },
})

export default Form
