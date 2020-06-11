import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PushHelper from '../../public/define/PushHelper';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle';
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel';
import { defaultMineButtons, defaultFeatures } from './helpers/config';
import FeatureList from './views/FeatureList';
import Header from './views/mines/Header';
import Profile from './views/mines/Profile';

const LHTMinePage = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    NetworkRequest1.mineInfo()
      .then(value => {
        setLoading(false);
        setResponse(value);
        console.log('--------user_info-----', value);
      })
      .catch(error => console.log('------error-----', error));
  }, []);
  // userCenterLists
  const features: any[] = response?.userCenterLists??defaultFeatures;
  //
  const user = response?.user??{}
  // user
  const level = user.curLevelGrade
  const name = user.usr
  const avatar = user.avatar
  const balance = user.balance

  const onPressCustomerService =() => {
    PushHelper.pushUserCenterType(UGUserCenterType.QQ客服)
  }

  const onPressBack = () => {
   navigation.navigate('LHTHomePage')
  }

  const onPressProfileButton = ({userCenterType}) => {
    PushHelper.pushUserCenterType(userCenterType)
  }

  return (
    <SafeAreaView style={loading ? styles.loadingSafeArea : styles.safeArea}>
    {loading ? (
      <UGProgressCircle />
    ) : (
      <>
      <Header onPressBack={onPressBack} onPressCustomerService={onPressCustomerService}/>
      <ScrollView style={styles.container} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} />}>
        <Profile mineButtons={defaultMineButtons} name={name} avatar={avatar} level={level} balance={balance} onPressProfileButton={onPressProfileButton}/>
        {features.map((list, index) => {
          const {name, logo, code } = list;
          return <FeatureList key={index} title={name} logo={logo} userCenterType={code}/>;
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
