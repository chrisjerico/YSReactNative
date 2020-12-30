import { scale } from '../../../../public/tools/Scale'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import DropDownPicker from 'react-native-dropdown-picker'
import * as React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

interface IUGDropdownPicker {
  controller?: (instance: object) => void,
  items: { label: any, value: any, icon?: () => JSX.Element, hidden?: boolean, disabled?: boolean, selected?: boolean }[];
  defaultValue?: any;
  onChangeItem?: (item: any, index: number) => void;
  style?: StyleProp<ViewStyle>;
  onOpen?: () => void;
  onClose?: () => void;
  dropDownMaxHeight?: number;
}
/**
 * 选择器
 * @param props
 * @constructor
 */
const UGDropDownPicker = (props: IUGDropdownPicker) => {

  return (
    <DropDownPicker
      onChangeList={(items, callback) => {
        callback()
      }}
      dropDownMaxHeight={scale(450)}
      containerStyle={{ height: scale(70) }}
      style={_styles.picker}
      itemStyle={{ justifyContent: 'flex-start' }}
      labelStyle={{ fontSize: scale(22) }}
      arrowColor={UGColor.LineColor2}
      arrowSize={scale(32)}
      dropDownStyle={{ backgroundColor: UGColor.BackgroundColor2 }}
      {
        ...props
      }/>
  )
}

const _styles = StyleSheet.create({
  picker: {
    backgroundColor: UGColor.BackgroundColor1,
  },
})

export default UGDropDownPicker
