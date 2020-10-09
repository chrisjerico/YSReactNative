"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ANHelper_1 = require("./../define/ANHelper/ANHelper");
var react_native_1 = require("react-native");
var AppDefine_1 = require("../define/AppDefine");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var CmdDefine_1 = require("../define/ANHelper/hp/CmdDefine");
var CCSessionModel = /** @class */ (function () {
    function CCSessionModel() {
    }
    // 参数加密
    CCSessionModel.encryptParams = function (params) {
        if (!this.isEncrypt) {
            return new Promise(function (resolve) { return resolve(params); });
        }
        var temp = Object.assign({}, params);
        temp['checkSign'] = 1;
        console.log('开始加密');
        if (react_native_1.Platform.OS == 'ios') {
            return OCHelper_1.OCHelper.call('CMNetwork.encryptionCheckSign:', [temp]);
        }
        else {
            return ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.ENCRYPTION_PARAMS, { params: params });
        }
    };
    // 发起请求
    CCSessionModel.req = function (path, params, isPost) {
        if (params === void 0) { params = {}; }
        if (isPost === void 0) { isPost = false; }
        var url = AppDefine_1.default.host + "/wjapp/api.php?" + path;
        return this.request(url, params, isPost);
    };
    CCSessionModel.request = function (url, params, isPost) {
        var _this = this;
        if (params === void 0) { params = {}; }
        if (isPost === void 0) { isPost = false; }
        // 添加公共参数
        params = Object.assign({}, this.publicParams, params);
        // 参数加密
        var promise = this.encryptParams(params)
            .then(function (params) {
            if (typeof params == 'string') {
                params = JSON.parse(params);
            }
            if (react_native_1.Platform.OS == 'ios') {
                if (_this.isEncrypt) {
                    url += '&checkSign=1';
                }
            }
            // 若是GET请求则拼接参数到URL
            if (!isPost) {
                if (react_native_1.Platform.OS == 'ios') {
                    Object.keys(params).map(function (key) {
                        var value = params[key];
                        url += "&" + key + "=" + value;
                    });
                }
                else {
                    for (var paramsKey in params) {
                        url += "&" + paramsKey + "=" + params[paramsKey];
                    }
                }
                params = null;
            }
            console.log('url = ' + url);
            console.log('发起请求B');
            return fetch(url, {
                method: isPost ? 'POST' : 'GET',
                body: params ? JSON.stringify(params) : null,
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            })
                .then(function (response) {
                // 检查是否正常返回
                if (response.ok) {
                    // 返回的是一个promise对象, 值就是后端返回的数据, 调用then()可以接收
                    console.log('req succ!');
                    return response.json();
                }
                return Promise.reject(new Error('请求失败：' + response.statusText));
            })
                .then(function (responseObject) {
                if (responseObject.code != 0) {
                    return Promise.reject(new Error(responseObject.msg));
                }
                return Promise.resolve(responseObject.data);
            });
        })
            .catch(function (err) {
            console.log('请求失败， err = ');
            console.log(err);
            return Promise.reject(err);
        });
        return promise;
    };
    CCSessionModel.isEncrypt = true; // 参数是否加密
    CCSessionModel.publicParams = {
    // 公共参数
    // able: "123"
    };
    return CCSessionModel;
}());
exports.default = CCSessionModel;
