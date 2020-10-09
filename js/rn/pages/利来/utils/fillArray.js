"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillArray = void 0;
exports.fillArray = function (data, num) {
    if (data) {
        var count = data.length % num;
        for (var i = 0; i < count; i++) {
            data.push({});
        }
    }
    return data;
};
