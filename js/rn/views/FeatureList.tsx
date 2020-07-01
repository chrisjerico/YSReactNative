import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { scale } from '../helpers/function'

interface FeatureListProps {
  logo: string;
  title: string;
  onPress: () => any;
  containerStyle?: ViewStyle;
  showUnreadMsg?: boolean;
  unreadMsg?: number;
}

const FeatureList = ({
  logo = 'url',
  title = '我的钱包',
  onPress,
  containerStyle,
  showUnreadMsg = false,
  unreadMsg,
}: FeatureListProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          resizeMode={'contain'}
          style={styles.image}
          source={{ uri: logo }}
        />
        <Text style={[styles.text, { paddingLeft: scale(25) }]}>{title}</Text>
      </View>
      {showUnreadMsg ? (
        <View
          style={{
            width: scale(25),
            aspectRatio: 1,
            borderRadius: scale(25),
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: scale(20) }}>{unreadMsg}</Text>
        </View>
      ) : (
          <Text style={styles.text}>{'>'}</Text>
        )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 490 / 75,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: scale(1),
    paddingHorizontal: scale(25),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    width: scale(25),
    aspectRatio: 1,
  },
  text: {
    fontSize: scale(25),
  },
})

export default FeatureList
