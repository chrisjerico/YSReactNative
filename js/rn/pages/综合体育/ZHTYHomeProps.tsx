import {UGBasePageProps, basePageDefaultProps} from '../base/UGBasePageProps';
import {mergeProps} from '../../public/tools/FUtils';
import {ActionType, UGAction} from '../../redux/store/ActionTypes';
import {IGlobalState} from '../../redux/store/UGStore';

// 声明Props
export interface ZHTYHomeProps extends UGBasePageProps {}

// Props默认值
const defaultProps = mergeProps<ZHTYHomeProps>(basePageDefaultProps, {
  actType: ActionType.ZHTYHomePage_SetProps,
});

// 更新Props到全局数据
export function ZHTYHomeReducer(prevState: ZHTYHomeProps = defaultProps, act: UGAction<ZHTYHomeProps>): ZHTYHomeProps {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.ZHTYHomeReducer};
  if (act.type === ActionType.ZHTYHomePage_SetProps) return {...prevState, ...act.props};

  return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function ZHTYHomeStateToProps(state: IGlobalState): ZHTYHomeProps {
  return mergeProps(state.ZHTYHomeReducer, {});
}
