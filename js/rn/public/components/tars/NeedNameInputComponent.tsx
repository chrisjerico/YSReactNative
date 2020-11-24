import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import DialogInput from 'react-native-dialog-input'

interface NeedNameInputComponentProps {
  onSubmitFullName?: (text: string) => any
}

const NeedNameInputComponent = ({ onSubmitFullName }: NeedNameInputComponentProps, ref: any) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  useImperativeHandle(ref, () => ({
    reload: () => {
      setIsDialogVisible(true)
    },
  }))

  const submitInput = (text: string) => {
    setIsDialogVisible(false)
    onSubmitFullName && onSubmitFullName(text)
  }

  return (
    <DialogInput
      isDialogVisible={isDialogVisible}
      title={'请输入绑定的真实姓名'}
      hintInput={'请输入真实姓名'}
      cancelText={'关闭'}
      submitText={'确定'}
      submitInput={submitInput}
      closeDialog={() => {
        setIsDialogVisible(false)
      }}></DialogInput>
  )
}

export default forwardRef(NeedNameInputComponent)
