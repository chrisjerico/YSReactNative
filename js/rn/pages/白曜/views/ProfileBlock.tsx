import React from 'react'
import {StyleSheet, Text, View, ViewStyle} from 'react-native'
import {BZHThemeColor} from '../../../public/theme/colors/BZHThemeColor'
import {scale} from '../../../public/tools/Scale'
import Avatar from '../../../public/views/temp/Avatar'
import LinearBadge from '../../../public/views/temp/LinearBadge'
import ReLoadBalanceComponent from '../../../public/components/temp/ReLoadBalanceComponent'
import {BYThemeColor} from "../../../public/theme/colors/BYThemeColor";
import CommStyles from "../../base/CommStyles";

interface ProfileBlockProps {
  balance: string | number;
  taskRewardTotal: string;
  features: any[];
  renderFeature: (item: any, index: number) => any;
  avatar: string;
  containerStyle?: ViewStyle;
  name: string;
  level: string;
  onPressAvatar: () => any;
}

const ProfileBlock = ({
                        avatar,
                        balance,
                        taskRewardTotal,
                        features,
                        renderFeature,
                        containerStyle,
                        name,
                        level,
                        onPressAvatar
                      }: ProfileBlockProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.redBlock}></View>
      <View style={styles.whiteBlock}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Avatar uri={avatar} onPress={onPressAvatar}/>
            <View style={styles.infoContainer}>
              <Text style={styles.text}>{name}</Text>
              <LinearBadge
                containerStyle={{borderRadius: scale(5), width: scale(80)}}
                textStyle={{paddingHorizontal: scale(10)}}
                title={level}
                colors={['#0080FF', '#97CBFF']}
                showIcon={false}
              />

            </View>
          </View>
          <View style={styles.possessions}>
            <View style={styles.possessions_left_item}>
              <Text style={styles.possessions_left_title}>{'余额 >'}</Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: scale(10)
              }}>
                <ReLoadBalanceComponent
                  animatedContainerStyle={{marginTop: scale(3)}}
                  titleStyle={{fontSize: scale(26)}}
                  balance={balance}
                  balanceStyle={{
                    color: BYThemeColor.白曜.textColor2,
                    fontSize: scale(22)
                  }}
                  color={BYThemeColor.白曜.themeColor}
                  size={24}
                />
              </View>
            </View>
            <View style={styles.possessions_right_item}>
              <Text style={styles.possessions_left_title}>{'积分 >'}</Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: scale(10)
              }}>
                <Text style={styles.possessions_right_text}>{taskRewardTotal}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.featureContainer}>
          {features.map(renderFeature)}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: BYThemeColor.白曜.homeContentSubColor,
    paddingBottom: scale(30)
  },
  whiteBlock: {
    height: '100%',
    position: 'absolute',
    marginHorizontal: scale(15),
    top: scale(10),
    paddingTop: scale(15),
    width: '95%',
    alignSelf: 'center',
  },
  profileContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: scale(35),
    backgroundColor: '#ffffff',
    borderRadius: scale(10),
  },
  avatarContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(35),
    backgroundColor: '#ffffff',
    borderRadius: scale(10),
    marginTop: scale(16),
    paddingVertical: scale(16),
  },
  possessions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopColor: '#E0E0E0',
    borderTopWidth: scale(1),
  },
  possessions_left_item: {
    flex: 1,
    borderRightColor: '#E0E0E0',
    borderRightWidth: scale(1),
    marginRight: scale(8),
  },
  possessions_right_item: {
    flex: 1,
    marginLeft: scale(8),
  },
  possessions_left_title: {
    fontSize: scale(22),
    color: 'grey',
  },
  possessions_left_text: {
    fontSize: scale(22),
    color: BYThemeColor.白曜.textColor2,
  },
  possessions_right_text: {
    fontSize: scale(22),
    color: BYThemeColor.白曜.themeColor,
  },
  redBlock: {
    width: '100%',
    height: '50%',
    backgroundColor: BYThemeColor.白曜.themeColor,
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  text: {
    fontSize: scale(25),
    fontWeight: '400',
    color: BYThemeColor.白曜.textColor1,
    paddingRight: scale(10)
  },
  infoContainer: {
    flex: 1,
    paddingLeft: scale(30),
    paddingBottom: scale(10),
  },
})

export default ProfileBlock
