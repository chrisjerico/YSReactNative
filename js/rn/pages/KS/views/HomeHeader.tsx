import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface HomeHeaderProps {
  logo: string
}

const HomeHeader = ({ logo }: HomeHeaderProps) => {
  return (
    <View style={styles.container}>
      <FastImage source={{ uri: logo }} style={{ aspectRatio: 1, height: '100%', marginLeft: '2%' }} resizeMode={'contain'} />
      <View style={{ width: '10%', height: '100%', justifyContent: 'space-evenly', alignItems: 'center', borderLeftWidth: scale(1), borderColor: '#95979f', marginLeft: '2%' }}>
        <UGText style={{ color: '#cea458' }}>{'特别'}</UGText>
        <UGText style={{ color: '#cea458' }}>{'赞助'}</UGText>
      </View>
      <View style={styles.brandContainer}>
        <FastImage resizeMode={'contain'} style={styles.image} source={{ uri: 'https://a06frontweb.cathayfund.com/cdn/A06FM/img/sponsor_wgjj.26f0b33.png' }} />
        <UGText style={styles.title}>维冈竞技</UGText>
      </View>
      <View style={styles.brandContainer}>
        <FastImage resizeMode={'contain'} style={styles.image} source={{ uri: 'https://a06frontweb.cathayfund.com/cdn/A06FM/img/sponsor_lwks.8418f60.png' }} />
        <UGText style={styles.title}>勒沃库森</UGText>
      </View>
      <View style={styles.brandContainer}>
        <FastImage resizeMode={'contain'} style={styles.image} source={{ uri: 'https://a06frontweb.cathayfund.com/cdn/A06FM/img/sponsor_flmns.02406e3.png' }} />
        <UGText style={styles.title}>弗鲁米嫩塞</UGText>
      </View>
      <View style={styles.brandContainer}>
        <FastImage resizeMode={'contain'} style={styles.image} source={{ uri: 'http://test10.fhptdev.com/views/mobileTemplate/22/images/aggb.png' }} />
        <UGText style={styles.title}>奥格斯堡</UGText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    aspectRatio: 7,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingBottom: scale(10),
  },
  title: {
    fontSize: scale(15),
    color: '#bbbbbb',
  },
  brandContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
    height: '100%',
  },
  image: { width: '40%', aspectRatio: 1 },
})

export default HomeHeader
