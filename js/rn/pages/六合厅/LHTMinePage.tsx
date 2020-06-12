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
import Profile from './views/mines/Profile';

const LHTMinePage = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    Promise.all([APIRouter.user_info(), APIRouter.user_centerList()]).then(response => {
      // console.log('--------response-----', response[0]?.data);
      setResponse({
        user: response[0]?.data?.data,
        userCenterLists: response[1],
      });
      setLoading(false);
    }).catch(
      error => {
        console.log('------error-----', error)
      })
  }, []);

  const user = response?.user ?? {}
  // user
  const level = user.curLevelGrade
  const name = user.usr
  const avatar = user.avatar
  const balance = user.balance
  // userCenterLists
  const features: any[] = response?.userCenterLists ?? defaultFeatures;
  //

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
              <Profile profileButtons={defaultProfileButtons} name={name} avatar={avatar} level={level} balance={balance} onPressProfileButton={({ userCenterType }) => {
                gotoUserCenter(userCenterType)
              }} />
              {features.map((list, index) => {
                const { name, logo, code } = list;
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
