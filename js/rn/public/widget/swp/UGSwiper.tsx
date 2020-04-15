import * as React from 'react';
import IBaseWidgetState from '../base/IBaseWidgetState';
import Swiper, {SwiperProps} from 'react-native-swiper';
import {UGColor} from '../../theme/UGThemeColor';
import {Skin1} from '../../theme/UGSkinManagers';
import BaseWidget from '../base/BaseWidget';

/**
 * 轮播
 */
export default class UGSwiper extends BaseWidget<SwiperProps, IBaseWidgetState> {
  render(): React.ReactNode {
    return <Swiper autoplay showsPagination={false} autoplayTimeout={5} activeDotColor={Skin1.themeColor} dotColor={UGColor.TextColor2} {...this.props} />;
  }
}
