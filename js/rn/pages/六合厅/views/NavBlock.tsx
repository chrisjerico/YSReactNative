import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'

interface NavBlockProps {
  customerServiceLogo: string;
  lotteryLogo: string;
  advertisement: string;
  navs: any[];
  lotterys: Lottery[];
  containerStyle?: ViewStyle;
  date: string;
  onPressSavePoint: () => any;
  onPressGetPoint: () => any;
  onPressAd: () => any;
  onPressSmileLogo: () => any;
  renderNav: (item: any, index: number) => any;
  renderLottery: (item: Lottery, index: number) => any;
  balance: string;
}

interface Lottery {
  number?: string;
  color?: string;
  sx?: string;
  showMore?: boolean;
}

const NavBlock = ({
  renderNav,
  renderLottery,
  onPressSmileLogo,
  onPressAd,
  onPressSavePoint,
  onPressGetPoint,
  date = 'date',
  navs = [],
  lotterys = [],
  advertisement = '',
  lotteryLogo = '',
  customerServiceLogo = '',
  containerStyle,
  balance,
}: NavBlockProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.topContainer}>
        <View style={styles.topLeftContainer}>
          <Text>{'余额'}</Text>
          <Icon
            type={'material'}
            name={'attach-money'}
            size={scale(25)}
            color={'#ff8610'}
          />
          <Text style={{ color: '#ff8610' }}>{balance}</Text>
        </View>
        <View style={styles.topRightContainer}>
          <Button
            title={'充值'}
            buttonStyle={[styles.button, { backgroundColor: '#ff8610' }]}
            titleStyle={styles.title}
            onPress={onPressSavePoint}
            activeOpacity={1}
          />
          <Button
            title={'提现'}
            buttonStyle={[styles.button, { backgroundColor: '#4285f4' }]}
            titleStyle={styles.title}
            onPress={onPressGetPoint}
            activeOpacity={1}
          />
          <TouchableWithoutFeedback onPress={onPressSmileLogo}>
            <View style={styles.smileImageContainer}>
              <FastImage
                style={styles.smileImage}
                source={{
                  uri: customerServiceLogo,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.titleLeftContainer}>
          <FastImage
            style={styles.recommendImage}
            source={{ uri: lotteryLogo }}
          />
          <Text style={{ paddingLeft: scale(5) }}>{'六合彩推荐资讯'}</Text>
        </View>
        <View style={styles.awardsContainer}>
          <Text>{'第 '}</Text>
          <Text style={{ color: '#ff861b' }}>{date}</Text>
          <Text>{' 期开奖结果'}</Text>
        </View>
      </View>
      <View style={styles.lotterysCintainer}>
        {lotterys.map(renderLottery)}
      </View>
      <TouchableWithoutFeedback onPress={onPressAd}>
        <View style={{ flex: 90, alignItems: 'center' }}>
          <FastImage
            resizeMode={'contain'}
            style={styles.adImage}
            source={{ uri: advertisement }}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.navsContainer}>{navs?.map(renderNav)}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: scale(15),
    paddingHorizontal: scale(15),
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
    paddingVertical: scale(10),
  },
  topLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  smileImageContainer: {
    width: '15%',
    aspectRatio: 1,
  },
  smileImage: {
    width: '100%',
    height: '100%',
  },
  button: {
    aspectRatio: 3.25 / 1.5625,
    borderRadius: scale(25),
    marginRight: scale(10),
  },
  title: {
    fontSize: scale(20),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
  titleLeftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  awardsContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
    aspectRatio: 3.25 / 0.5625,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(20),
  },
  recommendImage: {
    width: '15%',
    aspectRatio: 1,
  },
  adImage: {
    width: '95%',
    aspectRatio: 5,
  },
  navsContainer: {
    flex: 270,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lotterysCintainer: {
    flex: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default NavBlock
