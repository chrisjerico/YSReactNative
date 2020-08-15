import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Button } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { pop } from '../../public/navigation/RootNavigation'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'

interface PreferenceButtonProps {
  title: string;
  selected?: boolean;
  onPress?: () => any;
}

interface LHTPreferenceProps {
  initPreferences: Preference[];
  onPressConfirm?: (preferences: Preference[]) => any;
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
const LHTPreference = ({
  onPressConfirm,
  initPreferences,
}: LHTPreferenceProps) => {
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
        <AntDesign
          name={'left'}
          color={'#ffffff'}
          size={scale(25)}
          onPress={pop}
        />
        <Text style={styles.headerTitle}>{'偏好设置'}</Text>
        <View />
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
                  const newPreferences = preferences?.map((ele, _index) => {
                    if (index == _index) {
                      return Object.assign({}, item, {
                        selected: !ele?.selected,
                      })
                    } else {
                      return ele
                    }
                  })
                  setPreferences(newPreferences)
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

export default LHTPreference
