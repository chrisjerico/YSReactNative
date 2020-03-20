import IReducerState from "../../redux/inter/IReducerState";

export default interface IBasePageProps {

  //BEGIN 原生传递的参数
  fromNative?: string, //当前界面是否由原生打开
  //end


  //BEGIN Scene 具有的参数
  title?: string, //标题
  hideHeader?: boolean, //是否隐藏header
  //END

  //TODO 在这里扩展

  reducerData?: IReducerState<any>,    //当前界面的 reducer数据
}
