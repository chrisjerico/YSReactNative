import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';

const defaultCircleButtons = [
  {
    uri: 'https://7478.com/img/img_xstj.1c6a8ad8.png',
    title: '小心推荐'
  },
  {
    uri: 'https://7478.com/img/img_lhds.7bc9420c.png',
    title: '六合大神'
  },
  {
    uri: 'https://7478.com/img/img_lhtk.5ac9bdb6.png',
    title: '六合图库'
  },
  {
    uri: 'https://7478.com/img/img_gssh.b3d55b8e.png',
    title: '公式杀号'
  },
  {
    uri: 'https://7478.com/img/img_zbkj.baa51f42.png',
    title: '直播开奖'
  },
  {
    uri: 'data:image/png;base64,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',
    title: '历史开奖'
  },
  {
    uri: 'https://7478.com/img/img_lts.d0db9070.png',
    title: '聊天室'
  },
  {
    uri: 'https://7478.com/img/img_tmzs.6ca018b9.png',
    title: '挑码助手'
  }
]

const CircleButton = ({ uri = null, title = '' }) => <View style={{ width: '25%', alignItems: 'center' }}>
  <Image resizeMode={'contain'} style={{ width: '80%', aspectRatio: 1 }} source={{ uri: uri }} />
  <Text style={{ paddingVertical: 5 }}>{title}</Text>
</View>

interface IProps {
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

  /*
        <View style={styles.noticeContainer}>
        <Image resizeMode="stretch" style={styles.noticeTextImage} source={Res.gd} />
        <Text style={styles.noticeDesText}>{StringUtils.getInstance().deleteHtml(noticeArr[0].content)}</Text>
      </View>
      */

  render(): React.ReactNode {
    return (
      <View style={{ width: '100%', aspectRatio: 540 / 570, backgroundColor: '#ffffff', borderRadius: 15, paddingLeft: 15, paddingRight: 15 }}>
        <View style={{ flexDirection: 'row', flex: 55, justifyContent: 'space-between', borderBottomColor: '#d9d9d9', borderBottomWidth: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>
              {"余额"}
            </Text>
            <Text>
              {"0.00"}
            </Text>
            <Icon name={"autorenew"} size={30} color={"#4F8EF7"} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button title={'充值'} buttonStyle={{ backgroundColor: '#ff8610', aspectRatio: 3.25 / 1.5625, borderRadius: 20 }} titleStyle={{ fontSize: 15 }} />
            <Button title={'提现'} buttonStyle={{ backgroundColor: '#4285f4', aspectRatio: 3.25 / 1.5625, borderRadius: 20 }} titleStyle={{ fontSize: 15 }} />
          </View>
        </View>
        <View style={{ flex: 65, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>{"六合彩推荐资讯"}</Text>
          <View style={{ width: 170, backgroundColor: '#eeeeee', aspectRatio: 3.25 / 0.5625, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
            <Text>{"第 "}</Text>
            <Text style={{ color: '#ff861b' }}>{"2020008"}</Text>
            <Text>{" 期开奖结果"}</Text>
          </View>
        </View>
        <View style={{ flex: 90 }}>
        </View>
        <View style={{ flex: 90 }}>
          <Image resizeMode={'contain'} style={{ height: '100%', width: '100%' }} source={{ uri: "http://hall-cp.zk01.cc/image/ad-photo/2020-02-03/e84146c2-fc6b-43e0-99ad-ca269cd3e899.gif" }} />
        </View>
        <View style={{ flex: 270, flexDirection: 'row', flexWrap: 'wrap' }}>
          {defaultCircleButtons.map((ele, index) => <CircleButton key={index} {...ele} />)}
        </View>
      </View>
    );
  }
}

export default HomeRecommendComponent