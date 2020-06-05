import React from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MineListComponent from './components/MineListComponent';
import MineTopComponent from './components/MineTopComponent';

const LHTMinePage = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}>
        <MineTopComponent />
        <MineListComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});

export default LHTMinePage;
