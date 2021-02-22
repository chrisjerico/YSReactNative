import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle, StyleProp } from 'react-native'
import FastImage from 'react-native-fast-image'
import ReLoadBalanceComponent from '../../../public/components/tars/ReLoadBalanceComponent'
import { skinColors } from '../../../public/theme/const/UGSkinColor'
import { scale } from '../../../public/tools/Scale'
import Button from '../../../public/views/tars/Button'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface NavBlockProps {
  customerServiceLogo: string
  lotteryLogo: string
  advertisement: string
  navs: any[]
  lotterys: Lottery[]
  containerStyle?: StyleProp<ViewStyle>
  date: string
  onPressSavePoint: () => any
  onPressGetPoint: () => any
  onPressAd: () => any
  onPressSmileLogo: () => any
  renderNav: (item: any, index: number) => any
  renderLottery: (item: Lottery, index: number) => any
  balance: string
  renderAd?: () => any
  balanceLogo: string
  currency: string
  showK?: boolean
  balanceDecimal: number
}

interface Lottery {
  number?: string
  color?: string
  sx?: string
  showMore?: boolean
}

const NavBlock = ({
  renderNav,
  renderLottery,
  onPressSmileLogo,
  onPressAd,
  onPressSavePoint,
  onPressGetPoint,
  date = '',
  navs = [],
  lotterys = [],
  advertisement = '',
  lotteryLogo = '',
  customerServiceLogo = '',
  containerStyle,
  balance,
  renderAd,
  balanceLogo,
  currency,
  showK,
  balanceDecimal,
}: NavBlockProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.topContainer}>
        <View style={styles.topLeftContainer}>
          <UGText>{'余额'}</UGText>
          <FastImage style={styles.balanceLogo} source={{ uri: balanceLogo }} />
          <ReLoadBalanceComponent iconColor={'#ff861b'} balance={balance} currency={currency} showK={showK} balanceDecimal={balanceDecimal} />
        </View>
        <View style={styles.topRightContainer}>
          <Button title={'充值'} containerStyle={[styles.button, { backgroundColor: '#ff8610' }]} titleStyle={styles.title} onPress={onPressSavePoint} />
          <Button title={'提现'} containerStyle={[styles.button, { backgroundColor: skinColors.themeColor.六合厅 }]} titleStyle={styles.title} onPress={onPressGetPoint} />
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
          <FastImage style={styles.lotteryLogo} source={{ uri: lotteryLogo }} />
          <UGText style={{ paddingLeft: scale(5) }}>{'六合彩推荐资讯'}</UGText>
        </View>
        <View style={styles.awardsContainer}>
          <UGText style={styles.awardsText}>{'第 '}</UGText>
          <UGText style={[styles.awardsText, { color: '#ff861b' }]}>{date}</UGText>
          <UGText style={styles.awardsText}>{' 期开奖结果'}</UGText>
        </View>
      </View>
      <View style={styles.lotterysCintainer}>{lotterys.map(renderLottery)}</View>
      {renderAd ? (
        renderAd()
      ) : (
        <TouchableWithoutFeedback onPress={onPressAd}>
          <View style={{ flex: 90, alignItems: 'center' }}>
            <FastImage resizeMode={'contain'} style={styles.adImage} source={{ uri: advertisement }} />
          </View>
        </TouchableWithoutFeedback>
      )}
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
    width: scale(70),
    aspectRatio: 2,
    borderRadius: scale(25),
    marginRight: scale(10),
  },
  title: {
    fontSize: scale(20),
    color: '#ffffff',
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
    aspectRatio: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(20),
  },
  lotteryLogo: {
    width: '10%',
    aspectRatio: 1,
    marginHorizontal: scale(5),
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
  awardsText: {
    fontWeight: '600',
  },
  balanceLogo: {
    width: scale(22),
    aspectRatio: 1,
    marginHorizontal: scale(5),
  },
})

export default NavBlock
