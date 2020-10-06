"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var RootNavigation_1 = require("../../navigation/RootNavigation");
var SetRnPageInfo_1 = require("../OCHelper/SetRnPageInfo");
var UGBridge_1 = require("./UGBridge");
var ANEventType;
(function (ANEventType) {
})(ANEventType = exports.ANEventType || (exports.ANEventType = {}));
var ANEvent = /** @class */ (function (_super) {
    __extends(ANEvent, _super);
    function ANEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ANEvent.setup = function () {
        var _this = this;
        _super.setup.call(this);
        // // 监听原生发过来的事件通知
        // this.emitter.addListener('UGEventEmitter', params => {
        //   // Toast('params='+ params);
        //   console.log(`params=${params}`);
        //   // let pms = JSON.parse(params);
        //   // Navigation.push(pms.sceneKey, { fromNative: true, type: ActionConst.REPLACE, ...pms?.props, });
        // });
        // 监听原生发过来的事件通知
        this.emitter.addListener('EventReminder', function (params) {
            console.log('rn收到oc通知：', params);
            _this.events
                .filter(function (v) {
                return v.type == params._EventName;
            })
                .forEach(function (v) {
                v.event(params.params);
            });
        });
        // 跳转到指定页面
        this.emitter.addListener('SelectVC', function (params) {
            console.log('跳转到rn页面：', JSON.stringify(params));
            if (params.vcName) {
                RootNavigation_1.navigate(params.vcName) || RootNavigation_1.navigate(SetRnPageInfo_1.RnPageModel.getPageName(params.vcName));
            }
        });
        // 移除页面
        this.emitter.addListener('RemoveVC', function (params) {
            console.log('退出页面', params.vcName);
            if (params.vcName == RootNavigation_1.getCurrentPage()) {
                RootNavigation_1.pop();
            }
        });
    };
    ANEvent.addEvent = function (type, event) {
        this.events.push({ type: type, event: event });
    };
    ANEvent.removeEvents = function (type) {
        this.events = this.events.filter(function (v) {
            return v.type != type;
        });
    };
    ANEvent.events = [];
    return ANEvent;
}(UGBridge_1.UGBridge));
exports.ANEvent = ANEvent;
//# sourceMappingURL=ANEvent.js.map