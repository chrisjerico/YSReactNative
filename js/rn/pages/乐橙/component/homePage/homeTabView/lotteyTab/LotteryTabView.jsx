"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotteryTabView = void 0;
var React = require("react");
var react_native_1 = require("react-native");
var HotLotteryView_1 = require("./HotLotteryView");
exports.LotteryTabView = function (_a) {
    var list = _a.list, onPress = _a.onPress;
    return (<react_native_1.View style={{ borderTopColor: '#c7c7c7', borderTopWidth: 1 }}>
      <react_native_1.View>
        <react_native_1.Image style={{ width: '100%', height: '100%', flex: 1, resizeMode: 'cover', position: 'absolute' }} source={{ uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/cpbg.png' }}/>
        <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, height: 88 }}>
          <react_native_1.TouchableWithoutFeedback onPress={function () { return onPress(list[0]); }}>
            <react_native_1.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <react_native_1.Image style={{
        flex: 1,
        height: 88,
        width: 150,
        resizeMode: 'stretch',
    }} source={{ uri: list[0].icon }}/>
              <react_native_1.View style={{ position: 'absolute', alignSelf: 'flex-start', left: 30 }}>
                <react_native_1.Text style={{
        fontSize: 17,
        color: '#ffffff',
        fontWeight: 'bold',
    }}>
                  {list[0].title}
                </react_native_1.Text>
                <react_native_1.Text style={{
        fontSize: 13,
        color: '#ffffff',
        marginTop: 22,
    }}>{list[0].subtitle}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.TouchableWithoutFeedback>
          {list.length > 1 ? (<react_native_1.TouchableWithoutFeedback onPress={function () { return onPress(list[1]); }}>
              <react_native_1.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <react_native_1.Image style={{
        flex: 1,
        height: 88,
        width: 150,
        resizeMode: 'stretch',
    }} source={{ uri: list[1].icon }}/>
                <react_native_1.View style={{ position: 'absolute', alignSelf: 'flex-start', left: 30 }}>
                  <react_native_1.Text style={{
        fontSize: 17,
        color: '#ffffff',
        fontWeight: 'bold',
    }}>{list[1].title}</react_native_1.Text>
                  <react_native_1.Text style={{
        fontSize: 13,
        color: '#ffffff',
        marginTop: 22,
    }}>{list[1].subtitle}</react_native_1.Text>
                </react_native_1.View>
              </react_native_1.View>
            </react_native_1.TouchableWithoutFeedback>) : <react_native_1.View style={{ flex: 1 }}/>}
        </react_native_1.View>
      </react_native_1.View>
      <HotLotteryView_1.HotLotteryView onPress={onPress} list={list.slice(3, list.length - 1)}/>
    </react_native_1.View>);
};
