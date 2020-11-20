import React from 'react'
import {StyleSheet, Text, View, ViewStyle} from 'react-native'
import {BZHThemeColor} from '../../../public/theme/colors/BZHThemeColor'
import {scale} from '../../../public/tools/Scale'
import Avatar from '../../../public/views/temp/Avatar'
import LinearBadge from '../../../public/views/temp/LinearBadge'
import ReLoadBalanceComponent from '../../../public/components/temp/ReLoadBalanceComponent'
import {LEFThemeColor} from "../../../public/theme/colors/LEFThemeColor";
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
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Avatar uri={avatar} onPress={onPressAvatar}/>
          <View style={styles.infoContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>{name}</Text>
              <View style={CommStyles.flex}/>
              <LinearBadge
                containerStyle={{borderRadius: scale(5), width: scale(80)}}
                textStyle={{paddingHorizontal: scale(10)}}
                title={level}
                colors={[LEFThemeColor.乐FUN.textColor2,
                  LEFThemeColor.乐FUN.themeColor]}
                showIcon={false}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text_money_title}>{'金额: '}</Text>
              <ReLoadBalanceComponent
                animatedContainerStyle={{marginTop: scale(3)}}
                titleStyle={{fontSize: scale(26)}}
                titleHintStyle={{
                  color: LEFThemeColor.乐FUN.textColor2,
                  fontSize: scale(22)
                }}
                titleHint={'元'}
                balance={balance}
                balanceStyle={{
                  color: 'red',
                  fontSize: scale(22)
                }}
                color={LEFThemeColor.乐FUN.textColor2}
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
    backgroundColor: LEFThemeColor.乐FUN.homeContentSubColor,
    paddingBottom: scale(30)
  },
  profileContainer: {
    flex: 1,
    width: '100%',
    paddingVertical: scale(26),
    paddingHorizontal: scale(35),
    backgroundColor: LEFThemeColor.乐FUN.themeColor,
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
    color: LEFThemeColor.乐FUN.textColor2,
  },
  possessions_right_text: {
    fontSize: scale(22),
    color: LEFThemeColor.乐FUN.themeColor,
  },
  text: {
    fontSize: scale(24),
    fontWeight: '400',
    color: LEFThemeColor.乐FUN.textColor2,
    paddingRight: scale(10)
  },
  text_money_title: {
    fontSize: scale(22),
    fontWeight: '400',
    color: LEFThemeColor.乐FUN.textColor2,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: scale(30),
    paddingBottom: scale(10),
  },
})

export default ProfileBlock
