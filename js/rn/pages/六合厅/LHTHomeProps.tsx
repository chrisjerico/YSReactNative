
import { mergeProps } from '../../public/tools/FUtils';
import IBannerAdvBean from '../../redux/model/home/IBannerAdvBean';
import INoticeBean from '../../redux/model/home/INoticeBean';
import IUserBean from '../../redux/model/user/IUserBean';
import { ActionType, UGAction } from '../../redux/store/ActionTypes';
import { IGlobalState } from '../../redux/store/UGStore';
import { basePageDefaultProps, UGBasePageProps, UGLoadingType } from '../base/UGBasePageProps';

// 声明Props
export interface LHTHomeProps extends UGBasePageProps {
    banner?: IBannerAdvBean; //广告
    notice?: INoticeBean;
    userInfo?: IUserBean
}

// Props默认值
const defaultProps = mergeProps<LHTHomeProps>(basePageDefaultProps, {
    actType: ActionType.LHTHome_SetProps,
    status: UGLoadingType.Loading, //默认一进入打开 loading
});

// 更新Props到全局数据
export function LHTHomeReducer(prevState: LHTHomeProps = defaultProps, act: UGAction<LHTHomeProps>): LHTHomeProps {
    if (act.type === ActionType.UpdateAll) return { ...prevState, ...act.state.LHTHomeReducer };
    if (act.type === ActionType.LHTHome_SetProps) return { ...prevState, ...act.props };
    return prevState;
}

// 从全局数据中传递到Props（mapStateToProps）
export function LHTHomeStateToProps(state: IGlobalState): LHTHomeProps {
    return mergeProps(state.LHTHomeReducer, {
    });
}