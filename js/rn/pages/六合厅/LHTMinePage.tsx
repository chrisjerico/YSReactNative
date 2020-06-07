import React from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MineHeaderComponent from './components/MineHeaderComponent';
import MineProfileComponent from './components/MineProfileComponent';
import {defaultMineButtons, defaultMineLists} from './helpers/config';
import MineList from './views/MineList';

const LHTMinePage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <MineHeaderComponent />
      <ScrollView style={styles.container} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} />}>
        <MineProfileComponent mineButtons={defaultMineButtons} />
        {defaultMineLists.map((list, index) => (
          <MineList key={index} {...list} />
        ))}
      </ScrollView>
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
