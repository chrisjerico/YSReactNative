import {UGBasePageProps, basePageDefaultProps} from './UGBasePageProps';
import {mergeProps} from '../../public/tools/FUtils';
import {ActionType, UGAction} from '../../redux/store/ActionTypes';
import {PageName} from '../../public/navigation/Navigation';
import {IGlobalState} from '../../redux/store/UGStore';
import {Skin1} from '../../public/theme/UGSkinManagers';

// 声明Props
export interface TransitionProps extends UGBasePageProps {
  jumpTo?: PageName;
  pushTo?: PageName;
  props?: any;
}

// Props默认值
const defaultProps = mergeProps<TransitionProps>(basePageDefaultProps, {
  actType: ActionType.Transition_SetProps,
  navbarOpstions: {backgroundColor: 'transparent', hideUnderline: true, back: true},
  tabbarOpetions: {unmountOnBlur: false},
});

// 更新Props到全局数据
export function TransitionReducer(prevState: TransitionProps = defaultProps, act: UGAction<TransitionProps>): TransitionProps {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.TransitionReducer};
  if (act.type === ActionType.Transition_SetProps) return {...prevState, ...act.props};

  return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function TransitionStateToProps(state: IGlobalState): TransitionProps {
  return mergeProps(state.TransitionReducer, {
    backgroundColor: Skin1.bgColor,
  });
}
