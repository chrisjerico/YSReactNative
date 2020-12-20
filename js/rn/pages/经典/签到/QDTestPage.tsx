import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet,RefreshControl } from 'react-native';
import AppDefine from '../../../public/define/AppDefine';

export default class QDTestPage extends Component {
 
    state = {
        list: [],
        refreshing: false
    };
 
    componentDidMount(){
        // 初始化数据
        let list = [];
        for(var i = 0; i < 7; i++) {
            list.push({key: 'key'+(i+1)});
        }
        this.setState({list: list});
    }
 
    // 渲染列表项
    _renderItem = ({index, item}) => {
        console.log(index);
        return (
            <View key={item.key} style={styles.itemViewStyle}>
                <Text style={styles.itemTextStyle}>{item.key}</Text>
            </View>
        );
    }
 
    // 分割线
    _renderSeparator = () => {
        return (
            class Separator extends Component {
                render(){
                    return (
                        <View style={styles.separatorStyle} />
                    );
                }
            }
        );
    }
 
    _renderListEmptyComp = () => {
        return (
            <View>
                 <Text>没有数据时显示本段文字</Text>
            </View>
        );
    }
 
    // 底部加载
    _onEndReached = () => {
        this.setState({refreshing: true});
        // 关于更新state里数组的两种方式
        //setState({ 'arrary': [...this.state.array, newItem]}).
        //setState({ 'array' : [...this.state.array].concat(newList|newItem)}).
        let newList = [];
        for(var i = 0; i < 3; i++) {
            newList.push({key: '(new)key'+ Math.floor(Math.random() * 10000)});
        }
 
        setTimeout(()=>{
            this.setState({list: [...this.state.list].concat(newList), refreshing: false});
        },2000);
    }
 
    // 顶部加载
    _onRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(()=>{
            this.setState({refreshing: false});
            // this.myFlatList.scrollToEnd(); // 滚动到底部
            // this.myFlatList.scrollToIndex({animated: true, index:10}); // 将位于索引值为index的元素滚动到可视区域首行位置
            // this.myFlatList.flashScrollIndicators(); // 短暂地显示滚动指示器
        },2000);    
    }
 
    render() {
        console.log(this.state.list);
        return (
            <View style={{flex:1}}>
                <View style={styles.headerViewStyle}>
                    <Text style={styles.headerTextStyle}>我的APP</Text>
                </View>
                <FlatList
                    style={styles.scrollViewStyle}
                    ref={(view) => { this.myFlatList = view; }}
                    data={this.state.list} // 数据源
                    renderItem={this._renderItem} // 从数据源中挨个取出数据并渲染到列表中
                    showsVerticalScrollIndicator={false} // 当此属性为true的时候，显示一个垂直方向的滚动条，默认为: true
                    showsHorizontalScrollIndicator={false} // 当此属性为true的时候，显示一个水平方向的滚动条，默认为: true
                    // ItemSeparatorComponent = {this._renderSeparator()} // 行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后
                    ListEmptyComponent = {this._renderListEmptyComp()} // 列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element
                    // onEndReachedThreshold={0.01} // 决定当距离内容最底部还有多远时触发onEndReached回调，范围0~1，如0.01表示触底时触发
                    // onEndReached={this._onEndReached} // 在列表底部往下滑时触发该函数。表示当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
                    numColumns = {4}
                    // refreshControl={
                    //     <RefreshControl
                    //         // refreshing={this.state.refreshing} // 在等待加载新数据时将此属性设为 true，列表就会显示出一个正在加载的符号
                    //         // onRefresh={this._onRefresh.bind(this)} // 在列表顶部往下滑时触发该函数。如果设置了此选项，则会在列表头部添加一个标准的RefreshControl控件，以便实现“下拉刷新”的功能
                    //         // tintColor="#ffffff" // 指定刷新指示器的背景色(iOS)
                    //         // title="加载中..." // 指定刷新指示器下显示的文字(iOS)
                    //         // titleColor="#000000" // 指定刷新指示器下显示的文字的颜色(iOS)
                    //         // colors={['#ff0000', '#00ff00', '#0000ff']} // 刷新指示器在刷新期间的过渡颜色(Android)
                    //         // progressBackgroundColor="#ffffff" // 指定刷新指示器的背景色(Android)
                    //     />
                    // }
                />
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    scrollViewStyle: {
        flex: 1, 
        marginLeft:10, 
        marginRight: 10, 
        marginBottom: 10
    },
    headerViewStyle: {
        height: 50,
        backgroundColor: '#f4511e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextStyle: {
        fontSize: 20,
        color: '#FFFFFF'
    },
    itemViewStyle: {
        height: 185,
        width: (AppDefine.width - 50)/4,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 5,
        marginLeft: 4,
        marginRight: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTextStyle: {
        color: 'red',
        fontSize: 20
    },
    separatorStyle: {
        borderColor: '#A4A4A4',
        borderBottomWidth: 2,
        marginTop: 5
    }
});
 
