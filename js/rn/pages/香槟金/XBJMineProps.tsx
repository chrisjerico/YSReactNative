import React from 'react';
import {Skin1} from '../../public/theme/UGSkinManagers';
import {UGAction, ActionType} from '../../redux/store/ActionTypes';
import {IGlobalState} from '../../redux/store/UGStore';
import {UGUserCenterItem, UGUserCenterType} from '../../redux/model/全局/UGSysConfModel';
import UGUserModel from '../../redux/model/全局/UGUserModel';
import {PageName} from '../../public/navigation/Navigation';
import {UGBasePageProps, basePageDefaultProps} from '../base/UGBasePageProps';
import {mergeProps} from '../../public/tools/FUtils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import AppDefine from '../../public/define/AppDefine';
import PushHelper from '../../public/define/PushHelper';

// 定义Props
export interface XBJMineProps extends UGBasePageProps {
  dataArray?: Array<UGUserCenterItem>;
  userInfo?: UGUserModel;
}

// Props默认值
const defaultProps = mergeProps<XBJMineProps>(basePageDefaultProps, {
  actType: ActionType.XBJMine_SetProps,
  pageName: PageName.XBJMinePage,
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
export function XBJMineReducer(prevState: XBJMineProps = defaultProps, act: UGAction<XBJMineProps>): XBJMineProps {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.XBJMineReducer};
  if (act.type === ActionType.XBJMine_SetProps) return {...prevState, ...act.props};

  return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function XBJMineStateToProps(state: IGlobalState): XBJMineProps {
  return mergeProps(state.XBJMineReducer, {
    userInfo: state.UserInfoReducer,
    backgroundColor: Skin1.bgColor,
  });
}
