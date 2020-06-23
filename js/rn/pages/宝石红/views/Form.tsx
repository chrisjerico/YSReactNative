import React from 'react'
import { Icon, Input } from 'react-native-elements'
import { scale } from '../../../helpers/function'
import { TextStyle } from 'react-native'

interface Form {
  onChangeText?: any;
  value?: string
  placeholder: string;
  iconName: string;
  rightIconProps?: any;
  secureTextEntry?: boolean;
  showRightIcon?: boolean
  label?: string
  labelStyle?: TextStyle
}

const Form = ({
  value,
  onChangeText,
  placeholder,
  iconName,
  rightIconProps = {},
  secureTextEntry = false,
  showRightIcon = false,
  label,
  labelStyle
}: Form) => (
    <Input
      label={label}
      labelStyle={labelStyle}
      placeholder={placeholder}
      containerStyle={{ paddingLeft: 0, paddingRight: 0, height: scale(60), justifyContent: 'center' }}
      leftIcon={{
        type: 'font-awesome',
        name: iconName,
        color: '#d9d9d9',
        size: scale(30),
      }}
      rightIcon={
        showRightIcon ? <Icon
          {...rightIconProps}
          type={'font-awesome'}
          name={'eye-slash'}
          size={scale(30)}
        /> : null
      }
      leftIconContainerStyle={{
        marginLeft: 0,
        marginRight: 5,
        alignItems: 'center',
        width: scale(40),
      }}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  )

export default Form