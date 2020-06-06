import React from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import MineHeaderComponent from './components/MineHeaderComponent';
import MineListComponent from './components/MineListComponent';
import MineProfileComponent from './components/MineProfileComponent';
import {SafeAreaView} from 'react-native-safe-area-context';

const LHTMinePage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <MineHeaderComponent />
      <ScrollView style={styles.container} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} />}>
        <MineProfileComponent />
        <MineListComponent />
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
