import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
import {scale} from '../helpers/function';
import {recommendImage, smileImage, adImage, defaultCircleButtons} from '../helpers/config';

const CircleButton = ({uri = null, title = ''}) => (
  <TouchableOpacity style={{width: '25%', height: '50%', alignItems: 'center'}}>
    <Image resizeMode={'contain'} style={{width: '65%', aspectRatio: 1}} source={{uri: uri}} />
    <Text style={{paddingVertical: 5}}>{title}</Text>
  </TouchableOpacity>
);

interface IProps {
  containerStyle: {};
  //reducerData: INoticeBean;
}
/**
 * 主页公告,信息 等等内容
 */
class HomeRecommendComponent extends Component<IProps> {
  /**
   * 绘制 公告,信息 等等内容
   * @private
   */

  render(): React.ReactNode {
    const {containerStyle} = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.topBlock}>
          <View style={styles.topBlockLeft}>
            <Text>{'余额'}</Text>
            <Text>{'0.00'}</Text>
            <Icon name={'autorenew'} size={30} color={'#4F8EF7'} />
          </View>
          <View style={styles.topBlockRight}>
            <Button title={'充值'} buttonStyle={[styles.button, {backgroundColor: '#ff8610'}]} titleStyle={styles.title} />
            <Button title={'提现'} buttonStyle={[styles.button, {backgroundColor: '#4285f4'}]} titleStyle={styles.title} />
            <Image
              style={styles.image}
              source={{
                uri: smileImage,
              }}
            />
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
        <View style={{flex: 90}} />
        <View style={{flex: 90}}>
          <Image resizeMode={'contain'} style={styles.adImage} source={{uri: adImage}} />
        </View>
        <View style={styles.circleButtonBlock}>
          {defaultCircleButtons.map((ele, index) => (
            <CircleButton key={index} {...ele} />
          ))}
        </View>
      </View>
    );
  }
}

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
  image: {
    width: '15%',
    aspectRatio: 1,
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
