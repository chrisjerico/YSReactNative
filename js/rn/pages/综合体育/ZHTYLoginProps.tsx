import {UGBasePageProps, basePageDefaultProps} from '../base/UGBasePageProps';
import {mergeProps} from '../../public/tools/FUtils';
import {ActionType, UGAction} from '../../redux/store/ActionTypes';
import {IGlobalState} from '../../redux/store/UGStore';
import {Res} from '../../Res/icon/Resources';

// 声明Props
export interface ZHTYLoginProps extends UGBasePageProps {
  rememberPassword?: boolean; // 是否记住密码
}

// Props默认值
const defaultProps = mergeProps<ZHTYLoginProps>(basePageDefaultProps, {
  actType: ActionType.ZHTYLoginPage_SetProps,
  navbarOpstions: {backgroundColor: 'transparent', hideUnderline: true, back: true},
  rememberPassword: true,
});

// 更新Props到全局数据
export function ZHTYLoginReducer(prevState: ZHTYLoginProps = defaultProps, act: UGAction<ZHTYLoginProps>): ZHTYLoginProps {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.ZHTYLoginReducer};
  if (act.type === ActionType.ZHTYLoginPage_SetProps) return {...prevState, ...act.props};

  return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function ZHTYLoginStateToProps(state: IGlobalState): ZHTYLoginProps {
  return mergeProps(state.ZHTYLoginReducer, {
    backgroundImage: Res.zhtyLoginBg.uri,
  });
}
