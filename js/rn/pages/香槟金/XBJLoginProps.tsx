import {Skin1} from '../../public/theme/UGSkinManagers';
import {UGBasePageProps, basePageDefaultProps} from '../base/UGBasePageProps';
import {ActionType, UGAction} from '../../redux/store/ActionTypes';
import {IGlobalState} from '../../redux/store/UGStore';
import {PageName} from '../../public/navigation/Navigation';
import {mergeProps} from '../../public/tools/FUtils';

// 声明Props
export interface XBJLoginProps extends UGBasePageProps {
  rememberPassword?: boolean; // 是否记住密码
}

// Props默认值
const defaultProps = mergeProps<XBJLoginProps>(basePageDefaultProps, {
  actType: ActionType.XBJLogin_SetProps,
  pageName: PageName.XBJLoginPage,
  navbarOpstions: {backgroundColor: 'transparent', hideUnderline: true, back: true},
  rememberPassword: true,
});

// 更新Props到全局数据
export function XBJLoginReducer(prevState: XBJLoginProps = defaultProps, act: UGAction<XBJLoginProps>): XBJLoginProps {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.XBJLoginReducer};
  if (act.type === ActionType.XBJLogin_SetProps) return {...prevState, ...act.props};

  return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function XBJLoginStateToProps(state: IGlobalState): XBJLoginProps {
  return mergeProps(state.XBJLoginReducer, {
    backgroundColor: Skin1.bgColor,
  });
}
