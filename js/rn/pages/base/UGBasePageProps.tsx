import {UGColor} from './../../public/theme/UGThemeColor';
import {ActionType} from '../../redux/store/ActionTypes';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {BottomTabNavigationProp, BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {PageName} from '../../public/navigation/Navigation';
import {UGNavigationBarProps} from '../../public/widget/UGNavigationBar';

export enum UGLoadingType {
  None, // 无
  Loading, // 加载中
  Success, // 成功
  Failed, // 失败
  NoData, // 无数据
}

// Props
export interface UGBasePageProps {
  // React-Navigation
  navigation?: BottomTabNavigationProp<{}> & StackNavigationProp<{}> & DrawerNavigationProp<{}>; // 导航助手
  route?: {name: PageName; params: any};

  // 无需处理的值
  actType?: ActionType; // SetProps的ActionType
  status?: UGLoadingType; // loading状态

  // —————————— 预设值 ——————————
  backgroundColor?: string[]; // 背景色
  backgroundImage?: string;
  navbarOpstions?: UGNavigationBarProps; // 顶部导航条Options
  tabbarOpetions?: BottomTabNavigationOptions; // 底部标签栏Options

  // —————————— 安卓独有参数 ——————————
  fromNative?: string; //当前界面是否由原生打开
}

// 默认Props
export const basePageDefaultProps: UGBasePageProps = {
  actType: ActionType.None,
  status: UGLoadingType.None,
  backgroundColor: [UGColor.BackgroundColor1],
  tabbarOpetions: {unmountOnBlur: true},
};
