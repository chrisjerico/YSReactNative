import {UGBasePageProps, basePageDefaultProps} from './UGBasePageProps';
import {mergeProps} from '../../public/tools/FUtils';
import {ActionType, UGAction} from '../../redux/store/ActionTypes';
import {PageName} from '../../public/navigation/Navigation';
import {IGlobalState} from '../../redux/store/UGStore';
import {Skin1} from '../../public/theme/UGSkinManagers';

// 声明Props
export interface LoadingProps extends UGBasePageProps {}

// Props默认值
const defaultProps = mergeProps<LoadingProps>(basePageDefaultProps, {
  actType: ActionType.Loading_SetProps,
  pageName: PageName.LoadingPage,
  navbarOpstions: {backgroundColor: 'transparent', hideUnderline: true, back: true},
  tabbarOpetions: {unmountOnBlur: false},
});

// 更新Props到全局数据
export function LoadingReducer(prevState: LoadingProps = defaultProps, act: UGAction<LoadingProps>): LoadingProps {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.LoadingReducer};
  if (act.type === ActionType.Loading_SetProps) return {...prevState, ...act.props};

  return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function LoadingStateToProps(state: IGlobalState): LoadingProps {
  return mergeProps(state.LoadingReducer, {
    backgroundColor: Skin1.bgColor,
  });
}
