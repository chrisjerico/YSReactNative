import {View, Text, StyleSheet} from "react-native"
import * as React from 'react'
import Button from "../../../../../../public/views/tars/Button";
import {scale} from "../../../../../../public/tools/Scale";

const CHOICE_ITEMS = {
  ALL: '所有',
  BIG: '大',
  SMALL: '小',
  UN_EVEN: '奇',
  EVEN: '偶',
  CLEAR: '移除',
}

/**
 * 绘制选择框
 * @param onPress
 */
const PlayChoiceItem = ({onPress}: {onPress?: (item: String) => any}) => {
  return <View style={_styles.choice_container}>
    {
      Object.values(CHOICE_ITEMS).map((item, index) =>
        <Button containerStyle={_styles.choice_button_container}
                title={item}
                onPress={() => onPress(item)}
                titleStyle={_styles.choice_button}/>)
    }
  </View>
}

const _styles = StyleSheet.create({
    choice_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: scale(1),
      borderBottomColor: 'grey',
    },
    choice_button_container: {
      paddingVertical: scale(8),
      paddingHorizontal: scale(12),
      backgroundColor: 'grey',
    },
    choice_button: {
      color: 'black',
    },
  }
)

export default PlayChoiceItem
