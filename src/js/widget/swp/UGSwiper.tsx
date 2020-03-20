import BaseWidget from "../base/BaseWidget";
import * as Progress from "react-native-progress";
import UGTheme from "../../theme/UGTheme";
import * as React from "react";
import IBaseWidgetProps from "../base/IBaseWidgetProps";
import IBaseWidgetState from "../base/IBaseWidgetState";
import {Text, View} from "react-native";
import Swiper, { SwiperProps } from "react-native-swiper";

/**
 * 轮播
 */
export default class UGSwiper extends BaseWidget<SwiperProps, IBaseWidgetState> {

  render(): React.ReactNode {
    let {colorAccent, grey} = UGTheme.getInstance().currentTheme();
    return (
      <Swiper autoplay
              showsPagination={false}
              autoplayTimeout={5}
              activeDotColor={colorAccent}
              dotColor={grey}
              {...this.props} />
    );
  }

}
