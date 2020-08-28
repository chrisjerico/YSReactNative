import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native'
import { scale } from '../../tools/Scale'

interface FeatureListProps {
  logo: string;
  title: string;
  onPress: () => any;
  containerStyle?: ViewStyle;
  showUnreadMsg?: boolean;
  unreadMsg?: number;
}

const FeatureList = ({
  logo = '',
  title,
  onPress,
  containerStyle,
  showUnreadMsg = false,
  unreadMsg,
}: FeatureListProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode={'contain'}
            style={styles.image}
            source={{ uri: logo }}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
        {showUnreadMsg ? (
          <View style={styles.unReadContainer}>
            <Text style={styles.unReadText}>{unreadMsg > 99 ? 99 : unreadMsg}</Text>
          </View>
        ) : (
            <Text style={styles.text}>{'>'}</Text>
          )}
      </View>
    </TouchableWithoutFeedback>
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
    width: scale(35),
    aspectRatio: 1,
  },
  text: {
    fontSize: scale(25),
  },
  title: {
    fontSize: scale(30),
    fontWeight: '400',
    paddingLeft: scale(25),
  },
  unReadContainer: {
    width: scale(30),
    aspectRatio: 1,
    borderRadius: scale(30),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unReadText: {
    color: '#ffffff',
    fontSize: scale(20),
  },
})

export default FeatureList
