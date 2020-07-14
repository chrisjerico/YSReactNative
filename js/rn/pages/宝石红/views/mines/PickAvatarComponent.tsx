import React, { useState, useRef } from 'react'
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text
} from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { scale } from '../../../../public/tools/Scale'
import FastImage from 'react-native-fast-image'
import { BZHThemeColor } from '../../../../public/theme/colors/BZHThemeColor'

interface PickAvatarComponentProps {
  visible: boolean;
  avatars: string[];
  onPressSave: () => any;
  onPressCancel: () => any;
}

const PickAvatarComponent = ({
  visible,
  avatars,
  onPressSave,
  onPressCancel
}: PickAvatarComponentProps) => {

  const [index, setIndex] = useState(0)
  const scrollView = useRef(null)
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.bottomBlock}>
          <View style={styles.avatarContainer}>
            <Avatar size={'xlarge'} rounded source={{ uri: avatars[index] }} />
            <Text style={{ marginTop: scale(10) }}>{'头像预览'}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name={'left'}
              color={'#9D9D9D'}
              size={scale(30)}
              style={{ paddingHorizontal: scale(10) }}
              onPress={() => scrollView.current.scrollTo({ x: 0, y: 0, animated: true })}
            />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ref={scrollView}
            >
              {avatars?.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => setIndex(index)}>
                  <FastImage
                    source={{ uri: item }}
                    style={{
                      width: scale(100),
                      aspectRatio: 1,
                      marginHorizontal: scale(10),
                    }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Icon
              name={'right'}
              color={'#9D9D9D'}
              size={scale(30)}
              style={{ paddingHorizontal: scale(10) }}
              onPress={() => scrollView.current.scrollToEnd({ x: 0, y: 0, animated: true })}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Button
              title={'保存头像'}
              buttonStyle={{
                backgroundColor: BZHThemeColor.宝石红.themeColor,
                width: scale(200),
              }}
              titleStyle={{ color: '#ffffff' }}
              onPress={onPressSave}
            />
            <Button
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
  bottomBlock: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
  },
  avatarContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default PickAvatarComponent
