import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from '../../../public/tools/Scale'
import { UGStore } from '../../../redux/store/UGStore'
import APIRouter from '../../network/APIRouter'
import { ToastSuccess, ToastError } from '../../tools/tars'
import Avatar from '../../views/tars/Avatar'
import ProgressCircle from '../../views/tars/ProgressCircle'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface PickAvatarComponentProps {
  onSaveAvatarSuccess?: () => any
  initAvatar: string
  color: string
}

const PickAvatarComponent = ({ initAvatar, color, onSaveAvatarSuccess }: PickAvatarComponentProps, ref: any) => {
  const [avatar, setAvatar] = useState(initAvatar)
  const [avatarList, setAvatarList] = useState([])
  const [fileName, setfileName] = useState('')
  const scrollView = useRef(null)
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)

  const fetchAvatarList = async () => {
    try {
      setLoading(true)
      const response = await APIRouter.system_avatarList()
      const avatarList = response?.data?.data ?? []
      setAvatarList(avatarList)
    } catch (error) {
      console.log('-------error------', error)
    } finally {
      setLoading(false)
    }
  }

  const saveAvatar = async ({ url, filename }) => {
    try {
      UGStore.dispatch({ type: 'merge', userInfo: { avatar: url } })
      const value = await APIRouter.task_changeAvatar(filename)
      if (value?.data?.code == 0) {
        ToastSuccess('修改头像成功')
        onSaveAvatarSuccess && onSaveAvatarSuccess()
      } else {
        ToastError('修改头像失败')
      }
    } catch (error) {
      ToastError('修改头像失败')
      console.log('-------error------', error)
    } finally {
      setVisible(false)
    }
  }

  useEffect(() => {
    fetchAvatarList()
  }, [])

  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true)
    },
    close: () => {
      setVisible(false)
    },
    fetchAvatarList: fetchAvatarList,
  }))

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.pickerBlock}>
          <View style={styles.avatarContainer}>
            <Avatar uri={avatar} size={200} />
            <UGText style={{ marginTop: scale(10) }}>{'头像预览'}</UGText>
          </View>
          {loading ? (
            <ProgressCircle />
          ) : (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name={'left'} color={'#9D9D9D'} size={scale(30)} style={{ paddingHorizontal: scale(10) }} onPress={() => scrollView.current.scrollTo({ x: 0, y: 0, animated: true })} />
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={scrollView}>
                {avatarList?.map((item, index) => {
                  const { url, filename } = item
                  return (
                    <Avatar
                      key={index}
                      uri={url}
                      size={100}
                      containerStyle={{ marginHorizontal: scale(10) }}
                      onPress={() => {
                        setAvatar(url)
                        setfileName(filename)
                      }}
                    />
                  )
                })}
              </ScrollView>
              <AntDesign name={'right'} color={'#9D9D9D'} size={scale(30)} style={{ paddingHorizontal: scale(10) }} onPress={() => scrollView.current.scrollToEnd({ x: 0, y: 0, animated: true })} />
            </View>
          )}
          <View style={styles.buttonContainer}>
            <Button
              activeOpacity={1}
              title={'保存头像'}
              buttonStyle={{
                backgroundColor: color,
                width: scale(200),
              }}
              titleStyle={{ color: '#ffffff' }}
              onPress={() => saveAvatar({ url: avatar, filename: fileName })}
            />
            <Button
              activeOpacity={1}
              title={'取消'}
              buttonStyle={{ backgroundColor: '#D0D0D0', width: scale(200) }}
              titleStyle={{ color: '#ffffff' }}
              onPress={() => {
                setVisible(false)
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(98, 94, 94, 0.73)',
  },
  pickerBlock: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
  },
  avatarContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default forwardRef(PickAvatarComponent)
