import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PushHelper from '../../public/define/PushHelper';
import APIRouter from '../../public/network/APIRouter';
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle';
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import { defaultFeatures, defaultProfileButtons } from './helpers/config';
import FeatureList from './views/FeatureList';
import Header from './views/mines/Header';
import ProfileBlock from './views/mines/ProfileBlock';
import ProfileButton from './views/ProfileButton'
import { IGlobalStateHelper } from '../../redux/store/IGlobalStateHelper';
import { IGlobalState } from '../../redux/store/UGStore';
import { useSelector } from 'react-redux';
import UGUserModel from '../../redux/model/全局/UGUserModel';

const LHTMinePage = ({ navigation }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { avatar, usr, curLevelGrade, balance }: UGUserModel = userStore

  useEffect(() => {
    APIRouter.user_centerList().then(response => {
      setResponse({
        feature: response,
      });
      setLoading(false);
    }).catch(
      error => {
        console.log('------error-----', error)
      })
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('-----成為焦點-----')
      IGlobalStateHelper.updateUserInfo()
    })
    return unsubscribe;
  }, [navigation]);

  // features
  const features: any[] = response?.feature ?? defaultFeatures;

  // functions
  const gotoHome = () => {
    navigation.navigate('LHTHomePage')
  }

  const gotoUserCenter = (userCenterType: UGUserCenterType) => {
    PushHelper.pushUserCenterType(userCenterType);
  }

  return (
    <SafeAreaView style={loading ? styles.loadingSafeArea : styles.safeArea}>
      {loading ? (
        <UGProgressCircle />
      ) : (
          <>
            <Header onPressBack={gotoHome} onPressCustomerService={() => {
              gotoUserCenter(UGUserCenterType.QQ客服)
            }} />
            <ScrollView style={styles.container} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} />}>
              <ProfileBlock
                profileButtons={defaultProfileButtons}
                name={usr}
                avatar={avatar}
                level={curLevelGrade}
                balance={balance}
                renderProfileButton={(item, index) => {
                  const { title, logo, userCenterType } = item
                  return <ProfileButton key={index} title={title} logo={logo} onPress={() => { gotoUserCenter(userCenterType) }} />
                }}
              />
              {features.map((item, index) => {
                const { code, name, logo } = item;
                return <FeatureList key={index} title={name} logo={logo} onPress={() => gotoUserCenter(code)} />;
              })}
            </ScrollView>
          </>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingSafeArea: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  safeArea: {
    backgroundColor: '#2894FF',
    flex: 1,
  },
  container: {
    backgroundColor: '#ffffff',
  },
});

export default LHTMinePage;
