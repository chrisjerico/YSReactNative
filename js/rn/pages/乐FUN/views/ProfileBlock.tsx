import React from 'react'
import {StyleSheet, Text, View, ViewStyle} from 'react-native'
import {scale} from '../../../public/tools/Scale'
import Avatar from '../../../public/views/temp/Avatar'
import LinearBadge from '../../../public/views/temp/LinearBadge'
import ReLoadBalanceComponent from '../../../public/components/temp/ReLoadBalanceComponent'
import CommStyles from "../../base/CommStyles";
import { skinColors } from '../../../public/theme/const/UGSkinColor'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

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
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Avatar uri={avatar} onPress={onPressAvatar}/>
          <View style={styles.infoContainer}>
            <View style={{flexDirection: 'row'}}>
              <UGText style={styles.text}>{name}</UGText>
              <View style={CommStyles.flex}/>
              <LinearBadge
                containerStyle={{borderRadius: scale(5), width: scale(80)}}
                textStyle={{paddingHorizontal: scale(10)}}
                title={level}
                colors={[skinColors.textColor2.乐FUN,
                  skinColors.themeColor.乐FUN]}
                showIcon={false}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <UGText style={styles.text_money_title}>{'金额: '}</UGText>
              <ReLoadBalanceComponent
                animatedContainerStyle={{marginTop: scale(3)}}
                titleStyle={{fontSize: scale(26)}}
                titleHintStyle={{
                  color: skinColors.textColor2.乐FUN,
                  fontSize: scale(22)
                }}
                titleHint={'元'}
                balance={balance}
                balanceStyle={{
                  color: 'red',
                  fontSize: scale(22)
                }}
                color={skinColors.textColor2.乐FUN}
                size={24}
              />
            </View>
          </View>
        </View>

      </View>
      <View style={styles.featureContainer}>
        {features.map(renderFeature)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: skinColors.homeContentSubColor.乐FUN,
    paddingBottom: scale(30)
  },
  profileContainer: {
    flex: 1,
    width: '100%',
    paddingVertical: scale(26),
    paddingHorizontal: scale(35),
    backgroundColor: skinColors.themeColor.乐FUN,
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
    color: skinColors.textColor2.乐FUN,
  },
  possessions_right_text: {
    fontSize: scale(22),
    color: skinColors.themeColor.乐FUN,
  },
  text: {
    fontSize: scale(24),
    fontWeight: '400',
    color: skinColors.textColor2.乐FUN,
    paddingRight: scale(10)
  },
  text_money_title: {
    fontSize: scale(22),
    fontWeight: '400',
    color: skinColors.textColor2.乐FUN,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: scale(30),
    paddingBottom: scale(10),
  },
})

export default ProfileBlock
