"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChooseGameModal = void 0;
var react_native_1 = require("react-native");
var react_native_modal_1 = require("react-native-modal");
var React = require("react");
var react_1 = require("react");
var APIRouter_1 = require("../network/APIRouter");
var getGameList_1 = require("../utils/getGameList");
exports.ChooseGameModal = function (_a) {
    var showModal = _a.showModal, setShowModal = _a.setShowModal, setCurrentGame = _a.setCurrentGame;
    var _b = react_1.useState([]), games = _b[0], setGames = _b[1];
    var _c = react_1.useState(), chosen = _c[0], setChosen = _c[1];
    react_1.useEffect(function () {
        APIRouter_1.default.game_lotteryGames().then(function (_a) {
            var res = _a.data;
            var arr = [];
            res.data.map(function (item) {
                arr = arr.concat(item.list);
            });
            setGames(getGameList_1.getGameList(arr));
        });
    }, []);
    return (<react_native_modal_1.default hideModalContentWhileAnimating={false} hasBackdrop={false} swipeDirection={null} style={{ margin: 0, justifyContent: "center", alignItems: "center" }} isVisible={showModal}>
            <react_native_1.View style={{ width: react_native_1.Dimensions.get("screen").width - 24, borderRadius: 8 }}>
                <react_native_1.View style={{
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    }}>
                    <react_native_1.Text style={{ fontSize: 16, paddingVertical: 16 }}>选择彩种</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.FlatList style={{ height: 340, backgroundColor: "white", paddingVertical: 2, paddingHorizontal: 2 }} numColumns={3} keyExtractor={function (item, index) { return "games-" + index; }} data={games} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        return (<react_native_1.TouchableOpacity key={"games-items-" + index} style={{
            justifyContent: "center",
            backgroundColor: item === chosen ? "#387EF5" : "white",
            borderWidth: 1,
            borderColor: item === chosen ? "#387EF5" : "#ddd",
            borderRadius: 8,
            height: 40,
            width: 120,
            flex: 1,
            maxWidth: 120,
            marginHorizontal: 4,
            marginVertical: 4,
        }} onPress={function () { return setChosen(item); }}>
                            <react_native_1.Text style={{
            textAlign: "center",
            fontSize: 13,
            color: item === chosen ? "white" : "black"
        }}>{item.title}</react_native_1.Text>
                        </react_native_1.TouchableOpacity>);
    }}/>
                <react_native_1.View style={{
        flexDirection: "row",
        backgroundColor: "white",
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    }}>
                    <react_native_1.TouchableOpacity style={{
        flex: 1 / 2,
        justifyContent: "center",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        height: 40,
        marginRight: 4,
    }} onPress={function () { return setShowModal(false); }}>
                        <react_native_1.Text style={{ textAlign: "center" }}>取消</react_native_1.Text>
                    </react_native_1.TouchableOpacity>
                    <react_native_1.TouchableOpacity style={{
        marginLeft: 4,
        flex: 1 / 2,
        justifyContent: "center",
        borderColor: "#387EF5",
        borderWidth: 1,
        borderRadius: 8,
        height: 40,
        backgroundColor: "#387EF5",
    }} onPress={function () {
        setShowModal(false);
        chosen && setCurrentGame(chosen);
    }}>
                        <react_native_1.Text style={{ textAlign: "center", color: "white" }}>确定</react_native_1.Text>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>
            </react_native_1.View>
        </react_native_modal_1.default>);
};
