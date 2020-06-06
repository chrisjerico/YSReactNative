import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {adImage, defaultCircleButtons, recommendImage, smileImage} from '../helpers/config';
import {scale} from '../helpers/function';
import ScoreCircle from '../views/ScoreCircle';
import CircleButton from '../views/CircleButton';
import PushHelper from '../../../public/define/PushHelper';

const defaultScoreCircles = [{}, {}, {}, {}, {}, {}, {}];

interface HomeRecommendProps {
  containerStyle?: ViewStyle;
}

const HomeRecommendComponent = ({containerStyle}: HomeRecommendProps) => {
  const gotoSavePoint = () => PushHelper.pushLogin();
  const gotoGetPoint = () => PushHelper.pushLogin();
  const gotoCustomerService = () => PushHelper.pushLogin();
  const goToBetPage = () => PushHelper.pushCategory(9, 0);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.topBlock}>
        <View style={styles.topBlockLeft}>
          <Text>{'余额'}</Text>
          <Text>{'0.00'}</Text>
          <Icon name={'autorenew'} size={30} color={'#4F8EF7'} />
        </View>
        <View style={styles.topBlockRight}>
          <Button title={'充值'} buttonStyle={[styles.button, {backgroundColor: '#ff8610'}]} titleStyle={styles.title} onPress={gotoSavePoint} />
          <Button title={'提现'} buttonStyle={[styles.button, {backgroundColor: '#4285f4'}]} titleStyle={styles.title} onPress={gotoGetPoint} />
          <TouchableOpacity style={styles.smileImageContainer} onPress={gotoCustomerService}>
            <Image
              style={styles.smileImage}
              source={{
                uri: smileImage,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.titleBlock}>
        <View style={styles.titleBlockLeft}>
          <Image style={styles.recommendImage} source={{uri: recommendImage}} />
          <Text style={{paddingLeft: scale(5)}}>{'六合彩推荐资讯'}</Text>
        </View>
        <View style={styles.awardsBlock}>
          <Text>{'第 '}</Text>
          <Text style={{color: '#ff861b'}}>{'2020008'}</Text>
          <Text>{' 期开奖结果'}</Text>
        </View>
      </View>
      <View style={{flex: 90, flexDirection: 'row'}}>
        {defaultScoreCircles.map((ele, index) => (
          <ScoreCircle key={index} {...ele} />
        ))}
      </View>
      <TouchableOpacity style={{flex: 90}} onPress={goToBetPage}>
        <Image resizeMode={'contain'} style={styles.adImage} source={{uri: adImage}} />
      </TouchableOpacity>
      <View style={styles.circleButtonBlock}>
        {defaultCircleButtons.map((ele, index) => (
          <CircleButton key={index} {...ele} />
        ))}
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
  topBlock: {
    flexDirection: 'row',
    flex: 55,
    justifyContent: 'space-between',
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
  topBlockLeft: {
    flex: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBlockRight: {
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
  titleBlock: {
    flex: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleBlockLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  awardsBlock: {
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
  circleButtonBlock: {
    flex: 270,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default HomeRecommendComponent;
