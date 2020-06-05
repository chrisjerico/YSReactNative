import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import PushHelper from '../../../public/define/PushHelper';
import {scale} from '../helpers/function';
import {useSafeArea} from 'react-native-safe-area-context';

const HomeHeaderComponent = () => {
  const {top} = useSafeArea();

  return (
    <View
      style={{
        paddingTop: top,
        width: '100%',
        height: 50 + top,
        backgroundColor: '#2894FF',
        flexDirection: 'row',
        paddingHorizontal: scale(25),
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
        <Image
          resizeMode={'contain'}
          style={{width: '100%', height: '80%'}}
          source={{
            uri:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIkAAAA2CAMAAADEZkpbAAAAaVBMVEVMaXH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+kYmrZAAAAInRSTlMACi+6wNDaQqB++KcpmHGQsmYaijZP46si8hMDPEiEWcfrdWhu+QAABDtJREFUeNrl1+uysjYAheEVjgYBAYFyUmDd/0XWgEEFRO3Yz870+eFGzAzvJJiNeEUW+G/I2GFU40fCFhcJyRAX4izwIwENAA4vUgA28SsxvQIBlRKIaONXQjKXHO0D/rDkzEc9fiUzHwX4/xBYqPGJGl+SObY1Cce4nWNpEjAsy0xw7Kw1diTwJULyJsKg4cQEMpIdGq474Xt8h9oOoyS/O+PyIkbIFZ6Pb6r38xJU+ayEFRwupfiy0JuVoHJmJSYKLjSYC6WUPlZPt3hHNC+BOythC1kq12ivLHMXC6u3zsmmEhR4bb8oaeYlJiAUk4NAiBo3iTvKSUr3ThYHNjVLxpm7rsHor9dzsn8cesSDkNt2rcNtn5dEHBw+KOn3LlDH1h8pSY/Hs5TyfFTkxfHqHLY+rqomViOUnPQCeSf8TsnnIrLEzNdKMsdxYlwkl4MIo9CZK6CYquTg3NhPS07TBQsOglclsT7rk8wx2nHOuJXYb9wnvmg4sM/nPQfO+bwrtkpakhIY0zudZ8/d5qQ+Orbdkywvp7v1kswTPpd68WpOYlyIkrSxzSS9CheSpPn0PslIGFyqsFUSTtt/d1udLJhLPiiJyXKtJMZmSaAmHMqRZKJPzhnvl4QkvZUSG9sl+fT9SklmGEjO+e+W1JLrJWWyXeLfPSQ4ZHAr6Yyr02OJ2C5x+VBiNk343n5yIK27zcirp5IIV/WtxCZzbJdkjyUB4OvPNksKkgm0PRksLySmEuHpAeHTkpMu+WyPTRyyxaTOyXZRkk0lme4W6srWN0tiUuJOUdLRJV5+RV1S5ddv4rHnRbcsOfzjkrMKmaXg4rC6O6ZkCMWicl6WRID7qmSKftDGmCmkWNntTR+qxGwwkOrcAcsSdn7xoqTudclL9Sc/PG8lWudtl2TUJd+nS7TtkuhfLuneLREe9dtHIk30QaVfXDdNXdeAlrSZwKBq2/GoUANRp9Ogtn+zJNYDMjxqGOjli4ETw2lLtO4fG3pjWuJsXAz1ccgSWnV4r8TiwCowkz6UuKpE+L5J108wKmhXBVkDCfMkyZmMm3EFOMxxY0RvlCQcSCyk+s45MQN8hlB2rKFJpkC8F0BIF2iGIZFHCZ9lP3sk3i7Ri+M02Cxxus5hDGXPBNqRxrQNpipWArAcs8cu3xOPpPeipCMZ1NguyW07f7fE7F0WvTwSM8lusyQh+wyrUsrZ6sxLQqZAGAkg5ul6K8EkHMcTe2KhsTZKdowqrGsYNU0j7u5YJRpKqjAFUNDxG7IGKpaG4bECYBExO9jEijh/VpJ4RzyT6n+0J12i52T6XrUkxx9ebkmWLsY5EYyflECcydUSv8FTovB9wxCA8K8vSuLXUO8qKCJzcXU6YZAUQFGrP+uMvUjnJRZ+oz7NS2L8iAjL+5LIx+9UwVjSkPYJv5WatIDWC/F74QHwC/wJfwPWPxEStlYEvQAAAABJRU5ErkJggg==',
          }}
        />
      </View>
      <View style={{flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Image
          style={{width: scale(40), aspectRatio: 1}}
          resizeMode={'contain'}
          source={{
            uri:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAMAAAC5dNAvAAADAFBMVEVMaXHNVS63Pyv36KufMynPWi+tOSjdhTeOLCbwzJHVcULLUC346665b1HWdEbSYjbcgFiPLCaVLSb02Jj025336Kvfiznprm336azJZzrZdEiSLSbbfEmQLSfXczy/UDjdhTjor2736KrwyIfxz5DmpmSRLSaRLCaOLCWYLyf46qzTZzH25KflpGHlqmnorWz25KfbfzblpWXad0jXdTSPKya9RCvRYTCkQTD36a3jp2j35afwzpHuv3vuvXrtvn7356rbeVrPWS/lpmWTLif025uIKSXTblHMUi7wzo7WaU/JSi3mqWWIHx/SYyz02ZvuxYX37LDz15jst3OwQCrbeVqWLifko2XdiF3bfjbei16VLie2PSq0PCrZezayPCqZLyiOLCbcgzffjl/z2Ze4PSuRLCbQXi/RYDDPWy/bfFv13p/x0ZH14KHdhjfSZjH57KzxzYz35KacMCjwy4r246PRYzD02prYdjTz1pbvyon03J2vOyqTLSedMCjmp2XptHH24aL36KnvyIf36Kr57rDy05T35qj46qvx0Y7fkGDst3Pxz4/cf1vy1JDz1pPbgTfuxoXvxYPjoWTPWS/58bS5PyvdhFzYeTXTaTHuvHb69LfglGHuwoDrsm3135zXczTVbzPz1pjtw4bNVi74667vy4b797rtvnvwzpLjnmPprmrilWfUazL46q3glVvjmlTknlqtUDrxwXjCWT7ZdVXPWSGzMiOfPC/tunfMUS7gjDrhj2TjmmrYck/su4LWcSzeiTnQXyWoLyDkh2TmqWytKBzkoWbuyY7ornXUayvlol3ekFTcg1S2NiaxLB+LGhz79LHeh0L9/LzPUy7TZirhk03im1/mpmDbgkDdi1OXKyfehTHUakzgjkbVbTHMUB/ejE/lo3C6RC/+/8OpNinggF+gMinKX0SQGx3qtHndh1eNISDae1KQIiDfkFmuNybaeVXmqXH87KT13Z/chEzafT7z0YnYeUXafC71yX63RDDZezecHxyUJSLLh17oIXrVAAAAVXRSTlMA+fim8fjznr0LN/VoBVBvzVkiHT0t8yjuEhzIfJH7/vM+wMDr7qaA3vHVkVaSXdWEw2/gt0CM0dn5t8mp5mxO5aG2rN7asavjcJi5wPXo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',
          }}
        />
        <Text style={styles.text}>{' | '}</Text>
        <Text style={styles.text} onPress={PushHelper.pushLogin}>
          {'登入'}
        </Text>
        <Text style={styles.text}>{' | '}</Text>
        <Text style={styles.text} onPress={PushHelper.pushRegister}>
          {'註冊'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: scale(20),
    color: '#ffffff',
  },
});

export default HomeHeaderComponent;
