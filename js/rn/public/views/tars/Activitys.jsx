"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityComponent_1 = require("../../components/tars/ActivityComponent");
var PushHelper_1 = require("../../define/PushHelper");
var Scale_1 = require("../../tools/Scale");
var tars_1 = require("../../tools/tars");
var react_1 = require("react");
var Activitys = function (_a) {
    var refreshing = _a.refreshing, isTest = _a.isTest, redBagLogo = _a.redBagLogo, uid = _a.uid, redBag = _a.redBag, roulette = _a.roulette, floatAds = _a.floatAds;
    return (<>
      <ActivityComponent_1.default refreshing={refreshing} containerStyle={{ top: Scale_1.scale(250), right: 0 }} show={uid && redBagLogo && !isTest} logo={redBagLogo} onPress={function () {
        PushHelper_1.default.pushRedBag(redBag);
    }}/>
      <ActivityComponent_1.default refreshing={refreshing} containerStyle={{ top: Scale_1.scale(400), right: 0 }} enableFastImage={false} show={uid && roulette && !isTest} logo={'dzp_btn'} onPress={function () {
        PushHelper_1.default.pushWheel(roulette);
    }}/>
      {floatAds === null || floatAds === void 0 ? void 0 : floatAds.map(function (item, index) {
        var image = item.image, position = item.position, linkCategory = item.linkCategory, linkPosition = item.linkPosition;
        return (<ActivityComponent_1.default key={index} refreshing={refreshing} containerStyle={tars_1.getActivityPosition(position)} enableFastImage={true} show={uid && !isTest} logo={image} onPress={function () {
            PushHelper_1.default.pushCategory(linkCategory, linkPosition);
        }}/>);
    })}
    </>);
};
exports.default = Activitys;
