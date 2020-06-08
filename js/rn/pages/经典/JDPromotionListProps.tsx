import {UGBasePageProps, basePageDefaultProps} from '../base/UGBasePageProps';
import {UGAction, ActionType} from '../../redux/store/ActionTypes';
import {IGlobalState} from '../../redux/store/UGStore';
import {UGPromoteModel} from '../../redux/model/other/UGPromoteModel';
import {PageName} from '../../public/navigation/Navigation';
import {mergeProps} from '../../public/tools/FUtils';
import {Skin1} from '../../public/theme/UGSkinManagers';
import AppDefine from '../../public/define/AppDefine';

// 声明Props
export interface JDPromotionListProps extends UGBasePageProps {
  dataArray?: Array<{category?: string; title: string; list: Array<UGPromoteModel>}>;
  style?: 'slide' | 'popup' | 'page'; // slide折叠、popup弹窗、page内页
  showTopBar?: boolean; // 是否显示顶部栏
}

// Props默认值
const defaultProps = mergeProps<JDPromotionListProps>(basePageDefaultProps, {
  actType: ActionType.JDPromotionList_SetProps,
  navbarOpstions: {title: '优惠活动', back: true},
  tabbarOpetions: {unmountOnBlur: false},
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
  let backgroundColor = Skin1.bgColor;
  if ('c012'.indexOf(AppDefine.siteId) != -1) {
    backgroundColor = Skin1.navBarBgColor;
  }
  return mergeProps(state.JDPromotionListReducer, {backgroundColor: backgroundColor});
}
