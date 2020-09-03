import React from 'react'
import { StyleSheet, Text } from 'react-native'
import FormComponent, { FormComponentProps } from '../../../public/components/tars/FormComponent'
import { scale } from '../../../public/tools/Scale'

const WNZFormComponent = (props: FormComponentProps & { title: string }) => {
  const { title } = props
  return (
    <FormComponent
      {...props}
      inputContainerStyle={styles.inputContainerStyle}
      leftIconContainerStyle={styles.leftIconContainerStyle}
      rightIconContainerStyle={{ marginRight: scale(10) }}
      renderLeftIcon={() => <Text style={styles.inputText}>{title}</Text>}
    />
  )
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: scale(1),
    borderRadius: scale(10),
    backgroundColor: '#ffffff',
    borderColor: '#d9d9d9',
    height: scale(63),
  },
  inputTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontSize: scale(23),
  },
  leftIconContainerStyle: {
    width: scale(130),
    marginLeft: 0,
    marginRight: 0,
    alignItems: 'flex-start',
    paddingLeft: scale(20),
  },
})

export default WNZFormComponent
