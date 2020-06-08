import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetworkRequest1 from '../../public/network/NetworkRequest1';
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle';
import MineHeaderComponent from './components/MineHeaderComponent';
import MineProfileComponent from './components/MineProfileComponent';
import { defaultMineButtons, defaultMineLists } from './helpers/config';
import MineList from './views/MineList';

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
  const mineLists: any[] = response?.userCenterLists??defaultMineLists;
  //
  const user = response?.user??{}
  // user
  const level = user.curLevelGrade
  const name = user.usr
  const avatar = user.avatar
  const balance = user.balance

  return (
    <SafeAreaView style={loading ? styles.loadingSafeArea : styles.safeArea}>
    {loading ? (
      <UGProgressCircle />
    ) : (
      <>
      <MineHeaderComponent navigation={navigation}/>
      <ScrollView style={styles.container} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} />}>
        <MineProfileComponent mineButtons={defaultMineButtons} name={name} avatar={avatar} level={ level} balance={balance}/>
        {mineLists.map((list, index) => {
          const {name, logo, code } = list;
          return <MineList key={index} title={name} logo={logo} userCenterType={code}/>;
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
