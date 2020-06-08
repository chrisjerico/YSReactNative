import {UGBasePageProps, basePageDefaultProps} from '../base/UGBasePageProps';
import {mergeProps} from '../../public/tools/FUtils';
import {ActionType, UGAction} from '../../redux/store/ActionTypes';
import {IGlobalState} from '../../redux/store/UGStore';
import {Res} from '../../Res/icon/Resources';
import UGSysConfModel from '../../redux/model/全局/UGSysConfModel';
import { Skin1 } from '../../public/theme/UGSkinManagers';

// 声明Props
export interface ZHTYRegisterProps extends UGBasePageProps {
  isAgent?: boolean; // 是否代理注册
  accountErr?: string; // 用户名错误信息
  sysConf?: UGSysConfModel;
}

// Props默认值
const defaultProps = mergeProps<ZHTYRegisterProps>(basePageDefaultProps, {
  actType: ActionType.ZHTYRegisterPage_SetProps,
  navbarOpstions: {backgroundColor: 'transparent', hideUnderline: true, back: true},
  isAgent: false,
  accountErr: null,
});

// 更新Props到全局数据
export function ZHTYRegisterReducer(prevState: ZHTYRegisterProps = defaultProps, act: UGAction<ZHTYRegisterProps>): ZHTYRegisterProps {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.ZHTYRegisterReducer};
  if (act.type === ActionType.ZHTYRegisterPage_SetProps) return {...prevState, ...act.props};

  return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function ZHTYRegisterStateToProps(state: IGlobalState): ZHTYRegisterProps {
  return mergeProps(state.ZHTYRegisterReducer, {
    sysConf: state.SysConfReducer,
    backgroundColor: Skin1.bgColor,
    backgroundImage: Res.zhtyLoginBg.uri,
  });
}
