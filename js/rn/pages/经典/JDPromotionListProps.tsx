import {UGBasePageProps, basePageDefaultProps} from '../base/UGBasePageProps';
import {UGAction, ActionType} from '../../redux/store/ActionTypes';
import {IGlobalState} from '../../redux/store/UGStore';
import {UGPromoteModel} from '../../redux/model/other/UGPromoteModel';
import {PageName} from '../router/Navigation';
import {mergeProps} from '../../public/tools/FUtils';
import {Skin1} from '../../public/theme/UGSkinManagers';

// 声明Props
export interface JDPromotionListProps extends UGBasePageProps {
  dataArray?: Array<{category?: string; title: string; list: Array<UGPromoteModel>}>;
  style?: 'slide' | 'popup' | 'page'; // slide折叠、popup弹窗、page内页
  showTopBar?: boolean; // 是否显示顶部栏
}

// Props默认值
const defaultProps = mergeProps<JDPromotionListProps>(basePageDefaultProps, {
  actType: ActionType.JDPromotionList_SetProps,
  pageName: PageName.JDPromotionListPage,
  navbarOpstions: {title: '优惠活动', back: true},
  dataArray: [],
  style: 'page',
  showTopBar: false,
});

// 更新Props到全局数据
export function JDPromotionListReducer(prevState: JDPromotionListProps = defaultProps, act: UGAction<JDPromotionListProps>): JDPromotionListProps {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.JDPromotionListReducer};
  if (act.type === ActionType.JDPromotionList_SetProps) return {...prevState, ...act.props};

  return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function JDPromotionListStateToProps(state: IGlobalState): JDPromotionListProps {
  return mergeProps(state.JDPromotionListReducer, {backgroundColor: Skin1.bgColor});
}
