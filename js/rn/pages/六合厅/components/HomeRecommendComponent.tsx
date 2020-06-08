import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PushHelper from '../../../public/define/PushHelper';
import {scale} from '../helpers/function';
import NavCircle from '../views/NavCircle';
import ScoreCircle from '../views/ScoreCircle';

interface HomeRecommendProps {
  customerServiceLogo: string;
  markSixLogo: string;
  advertisement: string;
  navs: any[];
  lotterys: Lottery[];
  containerStyle?: ViewStyle;
}

interface Lottery {
  number?: string;
  color?: string;
  sx?: string;
  showMore?: boolean;
}

const HomeRecommendComponent = ({navs = [], lotterys = [], advertisement = '', markSixLogo = '', customerServiceLogo = '', containerStyle}: HomeRecommendProps) => {
  const gotoSavePoint = () => PushHelper.pushLogin();
  const gotoGetPoint = () => PushHelper.pushLogin();
  const gotoCustomerService = () => PushHelper.pushLogin();
  const goToBetPage = () => PushHelper.pushCategory(9, 0);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.topContainer}>
        <View style={styles.topLeftContainer}>
          <Text>{'余额'}</Text>
          <Text>{'0.00'}</Text>
          <Icon name={'autorenew'} size={30} color={'#4F8EF7'} />
        </View>
        <View style={styles.topRightContainer}>
          <Button title={'充值'} buttonStyle={[styles.button, {backgroundColor: '#ff8610'}]} titleStyle={styles.title} onPress={gotoSavePoint} />
          <Button title={'提现'} buttonStyle={[styles.button, {backgroundColor: '#4285f4'}]} titleStyle={styles.title} onPress={gotoGetPoint} />
          <TouchableOpacity style={styles.smileImageContainer} onPress={gotoCustomerService}>
            <Image
              style={styles.smileImage}
              source={{
                uri: customerServiceLogo,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.titleLeftContainer}>
          <Image style={styles.recommendImage} source={{uri: markSixLogo}} />
          <Text style={{paddingLeft: scale(5)}}>{'六合彩推荐资讯'}</Text>
        </View>
        <View style={styles.awardsContainer}>
          <Text>{'第 '}</Text>
          <Text style={{color: '#ff861b'}}>{'2020008'}</Text>
          <Text>{' 期开奖结果'}</Text>
        </View>
      </View>
      <View style={styles.scoreCircleCintainer}>
        {lotterys.map((lottery, index) => {
          const {number, color, sx} = lottery;
          return <ScoreCircle key={index} score={number} color={color} text={sx} showMore={index == 6} />;
        })}
      </View>
      <TouchableOpacity style={{flex: 90}} onPress={goToBetPage}>
        <Image resizeMode={'contain'} style={styles.adImage} source={{uri: advertisement}} />
      </TouchableOpacity>
      <View style={styles.navsContainer}>
        {navs.map((nav: any, index) => {
          const {icon, name, logo} = nav;
          return (
            <View style={styles.navContainer}>
              <NavCircle key={index} logo={icon ? icon : logo} title={name} nav={nav} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 580,
    backgroundColor: '#ffffff',
    borderRadius: scale(15),
    paddingLeft: scale(15),
    paddingRight: scale(15),
  },
  topContainer: {
    flexDirection: 'row',
    flex: 55,
    justifyContent: 'space-between',
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
  topLeftContainer: {
    flex: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightContainer: {
    flex: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    borderRadius: scale(20),
  },
  title: {
    fontSize: 13,
  },
  titleContainer: {
    flex: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    height: '100%',
    width: '100%',
  },
  navsContainer: {
    flex: 270,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  navContainer: {
    width: '25%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreCircleCintainer: {
    flex: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeRecommendComponent;
