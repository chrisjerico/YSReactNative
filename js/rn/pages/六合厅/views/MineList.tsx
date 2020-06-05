import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {scale} from '../helpers/function';

interface MineListProps {
  uri?: string;
  text?: string;
}

const MineList = ({
  uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAALVBMVEVMaXE0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNs0mNsxW0r6AAAADnRSTlMAiM27C+1D3JkwHXthsbvXp2IAAADDSURBVHjapZXtDoMgDEUvWsqX8v6POxu3ROKoN9v5YTQ5iIV6ASBt6R4pVxg19SeiApDUCQrQbEQOc7K9aQeWw6vwECtBcFwyfDab28QAHz0cZcTaexRGhLYCRjR+FmXL6zf2sWppcbrhV1HWPucq7ufY5UYcxc20JrgTBlFsnAKPor7vRIsv2lM9eyV4opUSP19aPTFfRGGnZov5b3n4Bee3kG8Kvs34xiWgRfp3pQOAjhQ6pOjYo4OUj2YULuzp4+MFyO4g/6NmsTUAAAAASUVORK5CYII=',
  text = '我的钱包',
}: MineListProps) => (
  <TouchableOpacity
    style={{
      width: '100%',
      aspectRatio: 490 / 75,
      borderBottomColor: '#d9d9d9',
      borderBottomWidth: 1,
      paddingHorizontal: scale(25),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
    <View style={{flexDirection: 'row'}}>
      <Image resizeMode={'contain'} style={{width: scale(25), aspectRatio: 1}} source={{uri}} />
      <Text style={{fontSize: scale(25), paddingLeft: scale(25)}}>{text}</Text>
    </View>
    <Text style={{fontSize: scale(25)}}>{'>'}</Text>
  </TouchableOpacity>
);

export default MineList;
