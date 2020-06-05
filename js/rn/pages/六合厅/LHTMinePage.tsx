import React from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import MineHeaderComponent from './components/MineHeaderComponent';
import MineListComponent from './components/MineListComponent';
import MineProfileComponent from './components/MineProfileComponent';

const LHTMinePage = () => {
  return (
    <>
      <MineHeaderComponent />
      <ScrollView style={styles.container} scrollEnabled={true} refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}>
        <MineProfileComponent />
        <MineListComponent />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});

export default LHTMinePage;
