import {Skin1} from '../../public/theme/UGSkinManagers';
import {UGBasePageProps, basePageDefaultProps} from '../base/UGBasePageProps';
import {UGAction, ActionType} from '../../redux/store/ActionTypes';
import {IGlobalState} from '../../redux/store/UGStore';
import UGSysConfModel from '../../redux/model/全局/UGSysConfModel';
import {PageName} from '../../public/navigation/Navigation';
import {mergeProps} from '../../public/tools/FUtils';

// 定义Props
export interface XBJRegisterProps extends UGBasePageProps {
  isAgent?: boolean; // 是否代理注册
  accountErr?: string; // 用户名错误信息
  sysConf?: UGSysConfModel;
}

// Props默认值
const defaultProps = mergeProps<XBJRegisterProps>(basePageDefaultProps, {
  actType: ActionType.XBJRegister_SetProps,
  pageName: PageName.XBJRegisterPage,
  navbarOpstions: {backgroundColor: 'transparent', hideUnderline: true, back: true},
  isAgent: false,
  accountErr: null,
});

// 更新Props到全局数据
export function XBJRegisterReducer(prevState: XBJRegisterProps = defaultProps, act: UGAction<XBJRegisterProps>): XBJRegisterProps {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.XBJRegisterReducer};
  if (act.type === ActionType.XBJRegister_SetProps) return {...prevState, ...act.props};

  return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function XBJRegisterStateToProps(state: IGlobalState): XBJRegisterProps {
  return mergeProps(state.XBJRegisterReducer, {
    sysConf: state.SysConfReducer,
    backgroundColor: Skin1.bgColor,
  });
}
