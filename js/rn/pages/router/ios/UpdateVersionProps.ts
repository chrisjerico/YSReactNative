import {UGBasePageProps, basePageDefaultProps} from '../../base/UGBasePageProps';
import {ActionType, UGAction} from '../../../redux/store/ActionTypes';
import {PageName} from '../Navigation';
import {IGlobalState} from '../../../redux/store/UGStore';
import {mergeProps} from '../../../public/tools/FUtils';
import {Skin1} from '../../../public/theme/UGSkinManagers';

// 声明Props
export interface UpdateVersionProps extends UGBasePageProps {
  rnProgress?: number;
  jspProgress?: number;
}

// Props默认值
const defaultProps = mergeProps<UpdateVersionProps>(basePageDefaultProps, {
  actType: ActionType.UpdateVersion_SetProps,
  pageName: PageName.UpdateVersionPage,
  rnProgress: 0,
  jspProgress: 0,
  navbarOpstions: {backgroundColor: 'transparent', hideUnderline: true},
});

// 更新Props到全局数据
export function UpdateVersionReducer(prevState: UpdateVersionProps = defaultProps, act: UGAction<UpdateVersionProps>): UpdateVersionProps {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.UpdateVersionReducer};
  if (act.type === ActionType.UpdateVersion_SetProps) return {...prevState, ...act.props};

  return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function UpdateVersionStateToProps(state: IGlobalState): UpdateVersionProps {
  return mergeProps(state.UpdateVersionReducer, {
    backgroundColor: Skin1.bgColor,
  });
}
