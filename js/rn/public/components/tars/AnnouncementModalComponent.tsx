import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Scroll } from '../../network/Model/NoticeModel'
import { scale } from '../../tools/Scale'
import StringUtils from '../../tools/StringUtils'
import { Button } from 'react-native-elements'

interface AnnouncementModalComponentProps {
  announcements: Scroll[];
  color: string;
}

interface AnnouncementProps {
  title: string;
  content: string;
  showDetail: boolean;
  onPress?: () => any;
}

const Announcement = ({
  title,
  content,
  showDetail,
  onPress,
}: AnnouncementProps) => {
  return (
    <>
      <View
        style={[
          styles.announcementContainer,
          showDetail ? { borderColor: 'red' } : null,
        ]}
      >
        <Text style={styles.announcementTitle}>{title}</Text>
        <Ionicons
          name={showDetail ? 'ios-arrow-up' : 'ios-arrow-down'}
          size={scale(30)}
          onPress={onPress}
        />
      </View>
      {showDetail ? (
        <View style={styles.detailContainer}>
          <Text>{StringUtils.getInstance().deleteHtml(content)}</Text>
        </View>
      ) : null}
    </>
  )
}

const AnnouncementModalComponent = (
  { announcements, color }: AnnouncementModalComponentProps,
  ref: any
) => {
  const [visible, setVisible] = useState(true)
  const [id, setId] = useState(-1)

  useImperativeHandle(ref, () => ({
    reload: () => {
      setVisible(true)
    },
  }))

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.popContainer}>
          <View style={[styles.titleContainer, { backgroundColor: color }]}>
            <Text style={[styles.title]}>{'平台公告'}</Text>
            <View style={{ position: 'absolute', right: scale(20) }}>
              <Icon
                type={'antdesign'}
                name={'closecircleo'}
                color={'#ffffff'}
                onPress={() => setVisible(false)}
              />
            </View>
          </View>
          <View style={{ flex: 10 }}>
            <ScrollView>
              {announcements?.map((item, index) => {
                return (
                  <Announcement
                    key={index}
                    {...item}
                    showDetail={id == index}
                    onPress={() => {
                      if (index == id) {
                        setId(-1)
                      } else {
                        setId(index)
                      }
                    }}
                  />
                )
              })}
            </ScrollView>
          </View>
          {/* <View style={styles.buttonContainer}>
            <Button
              title={'取消'}
              buttonStyle={[
                styles.button,
                {
                  backgroundColor: '#F0F0F0',
                  borderColor: '#BEBEBE',
                  borderWidth: scale(1),
                },
              ]}
              titleStyle={{ color: '#000000' }}
            />
            <Button
              title={'確定'}
              buttonStyle={styles.button}
              titleStyle={{ color: '#ffffff' }}
            />
          </View> */}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  titleContainer: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    // borderTopRightRadius: scale(10),
    // borderTopLeftRadius: scale(10),
    overflow: 'hidden'
  },
  title: {
    color: '#ffffff',
    fontSize: scale(25),
    fontWeight: '500',
  },
  announcementTitle: {
    fontSize: scale(25),
  },
  announcementContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
    paddingVertical: scale(10),
    borderBottomWidth: scale(1),
    borderColor: '#d9d9d9',
  },
  detailContainer: {
    marginHorizontal: scale(10),
    paddingVertical: scale(10),
    borderBottomWidth: scale(1),
    borderColor: 'red',
  },
  button: {
    width: scale(180),
    paddingVertical: scale(20),
  },
  buttonContainer: {
    flex: 1.5,
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popContainer: {
    width: '85%',
    height: '70%',
    backgroundColor: '#ffffff',
    borderColor: '#5B5B5B',
    borderWidth: scale(1),
    // borderRadius: scale(10),
    overflow: 'hidden'
  },
})

export default forwardRef(AnnouncementModalComponent)
