import React, { useRef, useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Datum } from '../../../public/network/Model/SystemAvatarListModel'
import { scale } from '../../../public/tools/Scale'
import Avatar from '../../views/tars/Avatar'
import ProgressCircle from '../../views/tars/ProgressCircle'

interface PickAvatarComponentProps {
  visible: boolean;
  avatars: Datum[];
  onPressSave: (avatar: IAvatar) => any;
  onPressCancel: () => any;
  loading: boolean;
  initAvatar: string;
  color: string;
}

interface IAvatar {
  url: string;
  filename: string;
}

const PickAvatarComponent = ({
  visible,
  avatars,
  onPressSave,
  onPressCancel,
  loading,
  initAvatar,
  color,
}: PickAvatarComponentProps) => {
  const [avatar, setAvatar] = useState(initAvatar)
  const [fileName, setfileName] = useState('')
  const scrollView = useRef(null)
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.pickerBlock}>
          <View style={styles.avatarContainer}>
            <Avatar uri={avatar} size={200} />
            <Text style={{ marginTop: scale(10) }}>{'头像预览'}</Text>
          </View>
          {loading ? (
            <ProgressCircle />
          ) : (
              <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
              >
                <AntDesign
                  name={'left'}
                  color={'#9D9D9D'}
                  size={scale(30)}
                  style={{ paddingHorizontal: scale(10) }}
                  onPress={() =>
                    scrollView.current.scrollTo({ x: 0, y: 0, animated: true })
                  }
                />
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ref={scrollView}
                >
                  {avatars?.map((item, index) => {
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
                <AntDesign
                  name={'right'}
                  color={'#9D9D9D'}
                  size={scale(30)}
                  style={{ paddingHorizontal: scale(10) }}
                  onPress={() =>
                    scrollView.current.scrollToEnd({ x: 0, y: 0, animated: true })
                  }
                />
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
              onPress={() =>
                onPressSave({
                  url: avatar,
                  filename: fileName,
                })
              }
            />
            <Button
              activeOpacity={1}
              title={'取消'}
              buttonStyle={{ backgroundColor: '#D0D0D0', width: scale(200) }}
              titleStyle={{ color: '#ffffff' }}
              onPress={onPressCancel}
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

export default PickAvatarComponent
