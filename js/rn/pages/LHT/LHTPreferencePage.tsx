import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Button } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { pop } from '../../public/navigation/RootNavigation'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { ToastError } from '../../public/tools/tars'
import MineHeader from '../../public/views/tars/MineHeader'

interface PreferenceButtonProps {
  title: string;
  selected?: boolean;
  onPress?: () => any;
}

interface Preference {
  title: string;
  selected: boolean;
  gameId: boolean;
  logo: string;
  gameType: string;
  des: string;
}

const PreferenceButton = ({
  title,
  selected = false,
  onPress,
}: PreferenceButtonProps) => {
  return (
    <View style={{ width: '30%', marginBottom: scale(40) }}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[
            styles.buttonContainer,
            {
              backgroundColor: selected ? '#c21632' : '#D0D0D0',
            },
          ]}
        >
          <Text
            style={{
              fontSize: scale(25),
              color: selected ? '#ffffff' : '#7B7B7B',
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {selected && (
        <AntDesign
          name={'checkcircle'}
          style={{ position: 'absolute', right: scale(-5), top: scale(-25) }}
          size={scale(25)}
          color={'#c21632'}
        />
      )}
    </View>
  )
}
const LHTPreferencePage = ({ route }) => {
  const { onPressConfirm, initPreferences } = route?.params ?? {}
  const [preferences, setPreferences] = useState(initPreferences)

  useEffect(() => {
    setPreferences(initPreferences)
  }, [initPreferences])

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaHeader
        headerColor={LHThemeColor.六合厅.themeColor}
        containerStyle={{ paddingHorizontal: scale(10) }}
      >
        <MineHeader
          title={'偏好设置'}
          onPressLeftTool={pop}
          showRightTool={false}
          showBackBtn={true}
        />
      </SafeAreaHeader>
      <View style={{ flex: 1, backgroundColor: '#E0E0E0' }}>
        <Text style={styles.title}>{'选择您感兴趣的彩种'}</Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
        >
          {preferences?.map((item, index) => {
            const { title, selected } = item
            return (
              <PreferenceButton
                key={index}
                title={title}
                selected={selected}
                onPress={() => {
                  const newPreferences = preferences?.map((ele: any, _index: number) => {
                    if (index == _index) {
                      return Object.assign({}, item, {
                        selected: !ele?.selected,
                      })
                    } else {
                      return ele
                    }
                  })
                  const selectedPreferences = newPreferences.filter(
                    (ele: any) => ele?.selected
                  )
                  if (selectedPreferences?.length > 11) {
                    ToastError('最多设置11个常用资讯')
                  } else if (selectedPreferences?.length < 2) {
                    ToastError('最少设置2个常用资讯')
                  } else {
                    setPreferences(newPreferences)
                  }
                }}
              />
            )
          })}
        </View>
        <Button
          title={'确定'}
          buttonStyle={{
            backgroundColor: '#ff8610',
            marginHorizontal: scale(15),
          }}
          onPress={() => {
            pop()
            onPressConfirm && onPressConfirm(preferences)
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
  title: {
    fontSize: scale(40),
    color: '#6C6C6C',
    textAlign: 'center',
    paddingVertical: scale(30),
  },
  buttonContainer: {
    width: '100%',
    aspectRatio: 2,
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LHTPreferencePage
