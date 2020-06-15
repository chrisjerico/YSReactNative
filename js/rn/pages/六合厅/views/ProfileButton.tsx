import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {scale} from '../helpers/function';

interface ProfileButtonProps {
  title: string;
  logo: string;
  onPress: () => any;
}

const ProfileButton = ({title = 'title', logo = '', onPress}: ProfileButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{paddingRight: scale(5)}}>{title}</Text>
      <Image
        style={styles.image}
        resizeMode={'contain'}
        source={{
          uri: logo,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(158),
    aspectRatio: 158 / 60,
    backgroundColor: '#ff861b',
    borderRadius: scale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '15%',
    aspectRatio: 1,
    paddingLeft: scale(5),
  },
});

export default ProfileButton;
