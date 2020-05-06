import React from 'react';
import {UGBasePageProps, basePageDefaultProps} from '../base/UGBasePageProps';
import {mergeProps} from '../../public/tools/FUtils';
import {ActionType, UGAction} from '../../redux/store/ActionTypes';
import {IGlobalState} from '../../redux/store/UGStore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PushHelper from '../../public/define/PushHelper';
import {UGUserCenterType, UGUserCenterItem} from '../../redux/model/全局/UGSysConfModel';
import FastImage from 'react-native-fast-image';
import UGUserModel from '../../redux/model/全局/UGUserModel';

// 声明Props
export interface ZHTYMineProps extends UGBasePageProps {
  dataArray?: Array<UGUserCenterItem>;
  userInfo?: UGUserModel;
}

// Props默认值
const defaultProps = mergeProps<ZHTYMineProps>(basePageDefaultProps, {
  actType: ActionType.ZHTYMinePage_SetProps,
  tabbarOpetions: {unmountOnBlur: false},
  navbarOpstions: {
    title: '我的',
    backgroundColor: 'transparent',
    hideUnderline: true,
    rightComponent: (
      <TouchableOpacity
        onPress={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.站内信);
        }}>
        <FastImage source={{uri: 'https://i.ibb.co/q0Pgt4B/2x.png'}} style={{marginRight: 16, width: 20, height: 20}} />
      </TouchableOpacity>
    ),
  },
  dataArray: [],
});

// 更新Props到全局数据
export function ZHTYMineReducer(prevState: ZHTYMineProps = defaultProps, act: UGAction<ZHTYMineProps>): ZHTYMineProps {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.ZHTYMineReducer};
  if (act.type === ActionType.ZHTYMinePage_SetProps) return {...prevState, ...act.props};

  return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function ZHTYMineStateToProps(state: IGlobalState): ZHTYMineProps {
  return mergeProps(state.ZHTYMineReducer, {userInfo: state.UserInfoReducer});
}
