import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import { scale } from '../../../public/tools/Scale'

interface Form {
  onChangeText?: any;
  value?: string;
  placeholder: string;
  iconName: string;
  rightIconProps?: any;
  secureTextEntry?: boolean;
  showRightIcon?: boolean;
  label?: string;
  show: any;
  containerStyle?: ViewStyle;
  enableLabel?: boolean;
  iconType?: string;
  renderRightIcon?: () => any
  onFocus?: () => any
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
  show,
  containerStyle,
  enableLabel = true,
  iconType = 'font-awesome',
  renderRightIcon,
  onFocus
}: Form) => {
  if (show) {
    return (
      <View
        style={[styles.container, containerStyle]}
      >
        <Input
          style={{
            height: '50%',
            width: '100%',
          }}
          placeholder={placeholder}
          containerStyle={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
          leftIcon={{
            type: iconType,
            name: iconName,
            color: '#d9d9d9',
            size: scale(30),
          }}
          rightIcon={
            showRightIcon ?
              renderRightIcon ? renderRightIcon() :
                (
                  <Icon
                    {...rightIconProps}
                    type={'font-awesome'}
                    name={'eye-slash'}
                    size={scale(30)}
                  />
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
          secureTextEntry={secureTextEntry}
          onFocus={onFocus}
        />
        {
          enableLabel ? <Text style={{ color: 'red', fontSize: scale(15), paddingTop: scale(5) }}>{label}</Text>
            : null
        }
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
  }
})

export default Form
