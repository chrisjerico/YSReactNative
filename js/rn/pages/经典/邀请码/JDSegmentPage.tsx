
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SegmentedControl from "rn-segmented-control";
import AppDefine from '../../../public/define/AppDefine';
import { scale } from '../../../public/tools/Scale';
import { UGImageHost, useHtml5Image } from '../../../public/tools/tars';
import { Res } from '../../../Res/icon/Res';
import { UGBasePageProps } from '../../base/UGPage';
import { JDCLInfoText, JDCLText, JDCLView } from '../cp/JDCLInfoText';
const { getHtml5Image, img_platform, img_home, img_assets, img_mobileTemplate } = useHtml5Image(UGImageHost.test5)





const JDSegmentPage = ({ route, setProps }: UGBasePageProps) => {

  const [tabIndex, setTabIndex] = React.useState(1);
  const { img_assets } = useHtml5Image(UGImageHost.test5)
  const [imgError, setImgError] = useState(false);
  let [shwoDefaultImage, setShwoDefaultImage] = React.useState(false);

  const handleTabsChange = (index: number) => {
    // console.log('index ==',index);

    setTabIndex(index);

    // setShwoDefaultImage(!shwoDefaultImage)
    // var date = moment('2016-10-11 18:06:03')
    //     console.log('date ==',date);

    //     let timestamp = moment(date).format("X");
    //     console.log('timestamp ==',timestamp);

    //     let timestamp2 = moment('2016-10-11 18:06:03').format("X");
    //     console.log('timestamp2 ==',timestamp2);




    // console.log('相差多少年',moment('2016-10-11 18:06:03').diff(moment('2015-10-11 18:06:03'), 'years'))
    // console.log('相差多少月',moment('2016-10-11 18:06:03').diff(moment('2015-10-11 18:06:03'), 'months'))
    // console.log('相差多少小时',moment('2015-10-11 19:07:03').diff(moment('2015-10-11 21:06:03'), 'hours'))
    // console.log('相差多少分',moment('2016-10-11 18:09:03').diff(moment('2016-10-11 18:06:03'), 'minutes')) 
    // console.log('相差多少秒',moment('2016-10-11 18:07:03').diff(moment('2016-10-11 18:06:03'), 'seconds')) 
    // let diff =   moment('2016-10-11 18:07:02') >= moment('2016-10-11 18:07:03')
    // console.log('diff==',diff);

    // var str="1.900"

    // console.log(str.split('.'));
    // var now = moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss');

    // var now2 = moment().format('YYYY-MM-DD HH:mm:ss');

    // console.log('now',now);
    // console.log('now2',now2);

    // console.log('相差多少秒',moment('2021-01-14 12:51:30').diff(moment(now2), 'seconds')) 
    // console.log('相差多少秒',moment(now2).diff(moment('2021-01-14 12:51:30'), 'seconds')) 
    // var now3 = moment().add(7, 'd');

    // console.log('now3',now3);

    // var now4 = moment().subtract(7, 's').format('YYYY-MM-DD HH:mm:ss');
    // console.log('now',now);
    // console.log('now4',now4);

    // console.log('相差多少天',moment(now4).diff(moment('2015-10-11 18:06:03'), 'days'))
    https://appstatic.guolongling.com/assets/gengduo.png

    console.log('图片路径：', img_assets('gengduo'));
    console.log('图片路径：', Res.gengduo);



    Image.getSize('https://appstatic.guolaow.com/web/images/zxkf.png', (width, height) => {
      console.log('width==', width);

    })
  };
  /**
 * 初始化
 * @param item
 */
  //初始化
  useEffect(() => {
    setProps({
      navbarOpstions: { hidden: false, title: '红包扫雷', back: true },
      didFocus: () => {




      }
    })

  }, [])


  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <SegmentedControl
        tabs={["按钮1", "按钮2",]}
        onChange={handleTabsChange}
        currentIndex={tabIndex}
        paddingVertical={8}
        width={AppDefine.width - 90}
        containerStyle={{
          marginVertical: 20,
        }}
        textStyle={{
          fontWeight: "300",
          fontSize: 16,
        }}
        theme={'DARK'}
      />


      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={[{ width: 50, height: 50, zIndex: 1 },]}
          source={{
            uri: img_assets('money-2'),
            // uri: 'https://appstatic.guolaow.com/web/images/zxkf.png'

          }}
          onError={() => {
            console.log('onError:true');
            setImgError(true)
            setShwoDefaultImage(true)
          }}
        />




            {/* // <Image source={{ uri: img_assets('load') }} style={[{ position: 'absolute', width: 50, height: 50, zIndex: 2 },]} /> */}
        <View style={{ position: 'absolute', width: 50, height: 50, }}>
          {shwoDefaultImage && <AntDesign
            name={'picture'}
            color={'#FF69B4'}
            size={scale(50)}
          />}
        </View>



      </View>
    </View >
  )

}


export default JDSegmentPage
