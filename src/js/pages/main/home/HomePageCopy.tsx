// import * as React from "react";
// import {
//   BackHandler,
//   NativeModules,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";
// import BasePage from "../../base/BasePage";
//
// import {connect} from 'react-redux'
// import IBasePageState from "../../base/IBasePageState";
// import IHomeProps from "./IHomeProps";
// import {Avatar, Button, ListItem} from "react-native-elements";
// import {requestHomeData} from "../../../redux/action/HomeAction";
// import {Actions} from "react-native-router-flux";
// import IReducerState from "../../../redux/inter/IReducerState";
// import IHomeBean from "../../../redux/inter/bean/IHomeBean";
// import Swiper from 'react-native-swiper'
// import UGSwiper from "../../../widget/swp/UGSwiper";
// import UGTheme from "../../../theme/UGTheme";
// import AppDefine from "../../../../../js/rn/公共类/AppDefine";
// import {requestUserInfo} from "../../../redux/action/Demo2Action";
// import {anyNull} from "../../../utils/Ext";
//
// /**
//  * Arc
//  *
//  * 主界面
//  *
//  */
// const {primaryBright} = UGTheme.getInstance().currentTheme();
//
// class HomePage extends BasePage<IHomeProps, IBasePageState> {
//
//
//   requestData() {
//   }
//
//   /**
//    * 绘制没有请求前的内容
//    */
//   _renderDefault(): React.ReactNode {
//     const {requestHomeData, reducerData, requestUserInfo, demo2Reducer} = this.props;
//     return (
//       <View style={_styles.container}>
//         <Button buttonStyle={_styles.button} title='请求home数据' onPress={() => {
//           requestHomeData({
//             type: 'test 3'
//           });
//         }}/>
//         <Button buttonStyle={_styles.button} title='请求demo2数据' onPress={() => {
//           requestUserInfo('home action');
//         }}/>
//         <Button buttonStyle={_styles.button} title='切到原生的存款' onPress={() => {
//           AppDefine.ocHelper.performSelectors(JSON.stringify({
//             type: 'OPEN_PAGE',
//             data: {
//               className: 'DepositActivity',
//               packageName: 'com.phoenix.lotterys.my.activity',
//               toActivity: true,
//               intentParams: {
//                 fromReact: true,
//                 page: 0,
//               },
//             }
//           }));
//         }}/>
//         <Text>{'主页=' + JSON.stringify(reducerData)}</Text>
//         <Text>{'demo2=' + JSON.stringify(demo2Reducer)}</Text>
//       </View>
//     );
//   }
//
//   /**
//    * 绘制滑屏
//    */
//   _renderSwiper(): React.ReactNode {
//     let data: IReducerState<IHomeBean> = this.props.reducerData;
//     return (
//       <View style={_styles.wrapper}>
//         <UGSwiper>
//           {
//             data.data.movies.map((movie) => {
//               return (
//                 <View style={[
//                   _styles.slide1,
//                   {backgroundColor: primaryBright}
//                 ]}>
//                   <Text style={_styles.text}>{`${movie.title}\n${movie.releaseYear}`}</Text>
//                 </View>
//               )
//             })
//           }
//         </UGSwiper>
//       </View>
//     );
//   }
//
//   /**
//    * 横向滑动的数据
//    */
//   _renderScrollH(): React.ReactNode {
//     let data: IReducerState<IHomeBean> = this.props.reducerData;
//     return (
//       <ScrollView contentContainerStyle={_styles.scrollViewH}
//                   horizontal={true}>
//         {
//           data.data.movies.map((movie, index) => (
//             <ListItem
//               key={index}
//               title={movie.title}
//               subtitle={movie.releaseYear}
//               leftAvatar={{source: {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}}
//               bottomDivider
//             />
//           ))
//         }
//       </ScrollView>
//     );
//   }
//
//   /**
//    * 绘制内容
//    */
//   _renderData(): React.ReactNode | null {
//     let data: IReducerState<IHomeBean> = this.props.reducerData;
//     if (anyNull(data?.data)) {
//       return null
//     }
//
//     const {requestHomeData, requestUserInfo} = this.props;
//     const {bRefreshing} = this.props.reducerData;
//
//     return (
//       <View style={_styles.container}>
//
//         <ScrollView
//         refreshControl={
//           <RefreshControl
//             refreshing={bRefreshing}
//             onRefresh={()=>{
//               requestHomeData({
//                 type: 'test 4'
//               });
//             }}
//           />
//         }
//         >
//           {
//             this._renderSwiper()
//           }
//           {
//             this._renderScrollH()
//           }
//
//           {/*竖线滑动的数据*/}
//           {
//             data.data.movies.map((movie, index) => (
//               <ListItem
//                 containerStyle={{borderRadius: 8, margin: 4}}
//                 key={index}
//                 title={movie.title}
//                 subtitle={movie.releaseYear}
//                 leftAvatar={{source: {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}}
//                 bottomDivider
//               />
//             ))
//           }
//         </ScrollView>
//
//       </View>
//     );
//   }
//
//   /**
//    * 绘制内容
//    */
//   renderContent(): React.ReactNode {
//     return (
//       this._renderData() ?? this._renderDefault()
//     );
//   }
//
//   // componentDidMount(): void {
//   //   super.componentDidMount();
//   //   BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid)
//   // }
//   //
//   // /**
//   //  * 返回关闭Android Root界面
//   //  */
//   // _onBackAndroid = () => {
//   //   BackHandler.exitApp();
//   //   return true;
//   // };
//   //
//   // componentWillUnmount(): void {
//   //   BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid)
//   // }
//
// }
//
// const _styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   scrollViewH: {
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   scrollViewV: {},
//   button: {
//     width: 140,
//     margin: 4,
//     marginTop: 40,
//   },
//   wrapper: {
//     aspectRatio: 16/9
//   },
//   slide1: {
//     flex: 1,
//     margin: 8,
//     borderRadius: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: 'bold'
//   }
// });
//
// /**
//  * 当前所使用到的 Action方法
//  */
// const _mapDispatchToProps = ({
//   requestHomeData: requestHomeData,
//   requestUserInfo: requestUserInfo
// });
//
// /**
//  * 将得到的reducer结果绑定到当前界面
//  *
//  * @param state
//  * @private
//  */
// const _mapStateToProps = (state) => {
//   return {
//     ...state,
//     reducerData: state.homeReducer
//   }
// };
//
// /**
//  * 进行第二层包装, 生成的新组件拥有 接受和发送 数据的能力
//  */
// export default connect(_mapStateToProps, _mapDispatchToProps)(HomePage)
