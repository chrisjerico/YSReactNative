import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {scale} from '../helpers/function';

interface MineButtonProps {
  uri?: string;
}

const MineButton = ({
  uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAhFBMVEVMaXH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8NoezaAAAAK3RSTlMAeT33/kvu+xYCyvIFcim3iKIK1pvrOIIewd5UqV6wWDNm0I4SCETmTpXF+M2xIAAAAT5JREFUeNqN0OeWgyAUBOARjIItxmhM73Xn/d9vj0ZM2UX9/nEY7gD413XsyWN8QZ+UtUCh24aNMbotaQh8y+5O6qyeVQlbJb6NWXGP8RlnwdYD3wI2wtu2c+KOrSKa0tjfFT7p16Y7E6lTntZTl5NzGMaRbWSOhtpka5KLOd4Jl43jahOXZbxLNHCo7yLwMpP8o3jMclbCGYy5xy6hadcLdvvRqMWsSJ9WG1QudfEpyia0WWqo1Sqtr66BTNJGwPy0VwXt5SfQSHWU02oBtryQdjdwGDk86HKQAgEHCaByyQEmAOZr9jsAgHLZx1eobNlnjFoi2WOEJ6f3zcaEna4wos7kAm8cn1YC7/ZBz5NbI0vO3Q8MbmEJetNCknJpBia2oAMg0u1yjW+CNak+zvkJ/sj9qviAJ1V3hzGefgGcsK0Pe5ychwAAAABJRU5ErkJggg==',
}: MineButtonProps) => (
  <TouchableOpacity
    style={{
      width: scale(158),
      aspectRatio: 158 / 60,
      backgroundColor: '#ff861b',
      borderRadius: scale(10),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text style={{paddingRight: scale(5)}}>{'我要充值'}</Text>
    <Image
      style={{width: '15%', aspectRatio: 1, paddingLeft: scale(5)}}
      resizeMode={'contain'}
      source={{
        uri,
      }}
    />
  </TouchableOpacity>
);

export default MineButton;
