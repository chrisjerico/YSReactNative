"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OCEvent = exports.OCEventType = void 0;
var UGStore_1 = require("./../../../../redux/store/UGStore");
var OCCall_1 = require("./OCCall");
var Navigation_1 = require("../../../navigation/Navigation");
var RootNavigation_1 = require("../../../navigation/RootNavigation");
var UGSkinManagers_1 = require("../../../theme/UGSkinManagers");
var SetRnPageInfo_1 = require("../SetRnPageInfo");
var OCEventType;
(function (OCEventType) {
    OCEventType["UGNotificationGetSystemConfigComplete"] = "UGSystemConfigModel.currentConfig";
    OCEventType["UGNotificationWithSkinSuccess"] = "UGNotificationWithSkinSuccess";
    OCEventType["JspatchDownloadProgress"] = "jsp\u4E0B\u8F7D\u8FDB\u5EA6";
    OCEventType["JspatchUpdateComplete"] = "jsp\u66F4\u65B0\u7ED3\u679C";
    OCEventType["UGNotificationLoginComplete"] = "UGNotificationLoginComplete";
    OCEventType["UGNotificationUserLogout"] = "UGNotificationUserLogout";
    OCEventType["viewWillAppear"] = "viewWillAppear";
})(OCEventType = exports.OCEventType || (exports.OCEventType = {}));
var OCEvent = /** @class */ (function (_super) {
    __extends(OCEvent, _super);
    function OCEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OCEvent.setup = function () {
        var _this = this;
        _super.setup.call(this);
        // 监听原生发过来的事件通知
        this.emitter.addListener('EventReminder', function (params) {
            // console.log('OCEvent rn收到oc通知：', params);
            if (params._EventName == OCEventType.viewWillAppear && params.params == 'ReactNativeVC') {
                var currentPage = RootNavigation_1.getCurrentPage();
                var didFocus = UGStore_1.UGStore.getPageProps(currentPage).didFocus;
                didFocus && didFocus();
            }
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
            console.log('跳转到rn页面：', params.vcName);
            if (params.vcName) {
                RootNavigation_1.jumpTo(params.vcName) || RootNavigation_1.jumpTo(SetRnPageInfo_1.RnPageModel.getPageName(params.vcName));
            }
        });
        // 移除页面
        this.emitter.addListener('RemoveVC', function (params) {
            console.log('退出页面', params.vcName);
            if (params.vcName == RootNavigation_1.getCurrentPage()) {
                !RootNavigation_1.pop() && RootNavigation_1.jumpTo(Navigation_1.PageName.TransitionPage);
            }
        });
        this.addEvent(OCEventType.UGNotificationGetSystemConfigComplete, function (sysConf) {
            UGStore_1.UGStore.dispatch({ type: 'merge', sysConf: sysConf });
        });
        this.addEvent(OCEventType.UGNotificationWithSkinSuccess, function () {
            UGSkinManagers_1.default.updateOcSkin();
        });
    };
    OCEvent.addEvent = function (type, event) {
        this.events.push({ type: type, event: event });
    };
    OCEvent.removeEvents = function (type) {
        this.events = this.events.filter(function (v) {
            return v.type != type;
        });
    };
    OCEvent.events = [];
    return OCEvent;
}(OCCall_1.OCCall));
exports.OCEvent = OCEvent;
