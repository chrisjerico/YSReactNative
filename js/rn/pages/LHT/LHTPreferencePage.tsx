import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { pop } from '../../public/navigation/RootNavigation'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import { ToastError } from '../../public/tools/tars'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import PreferenceButton from './views/PreferenceButton'

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
          onPressBackBtn={pop}
          showCustomerService={false}
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
          {preferences?.map((item: any, index: number) => {
            const { title, selected } = item
            return (
              <PreferenceButton
                key={index}
                title={title}
                selected={selected}
                onPress={() => {
                  const newPreferences = preferences?.map(
                    (ele: any, _index: number) => {
                      if (index == _index) {
                        return Object.assign({}, item, {
                          selected: !ele?.selected,
                        })
                      } else {
                        return ele
                      }
                    }
                  )
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
          containerStyle={{
            backgroundColor: '#ff8610',
            marginHorizontal: scale(15),
            aspectRatio: 9,
            borderRadius: scale(5)
          }}
          titleStyle={{
            color: '#ffffff',
            fontSize: scale(25)
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
  title: {
    fontSize: scale(24),
    color: '#999999',
    textAlign: 'center',
    marginTop: scale(20),
    marginBottom: scale(32),
    fontWeight: '900'
  },
})

export default LHTPreferencePage
