"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_editor_1 = require("@react-native-community/image-editor");
var react_1 = require("react");
/**
 *
 * @param {source} source spriteImage 連結
 * @param {rowNum} rowNum 有幾行圖片
 * @param {rowNum} rowNum 一行有幾張
 * @param {size} size {width ,height} 要裁切圖片的大小
 * @param {offset} offset {width ,height} 圖片的距離
 */
var useSpriteImage = function (_a) {
    var source = _a.source, _b = _a.rowNum, rowNum = _b === void 0 ? 0 : _b, _c = _a.columnNum, columnNum = _c === void 0 ? 0 : _c, size = _a.size, offset = _a.offset;
    var _d = react_1.useState([]), imageArray = _d[0], setImageArray = _d[1];
    react_1.useEffect(function () {
        if (source && rowNum && columnNum) {
            cutUpImage();
        }
    }, []);
    var cutUpImage = function () { return __awaiter(void 0, void 0, void 0, function () {
        var tempArray, imagePromise, _loop_1, i;
        return __generator(this, function (_a) {
            tempArray = [];
            imagePromise = [];
            _loop_1 = function (i) {
                var _loop_2 = function (j) {
                    imagePromise.push(image_editor_1.default.cropImage(source, {
                        offset: { x: i * offset.width, y: j * offset.height },
                        size: { width: size.width, height: size.height },
                        displaySize: size,
                        resizeMode: 'contain'
                    }).then(function (res) {
                        tempArray.splice(i + j, 0, res);
                    }));
                };
                for (var j = 0; j < columnNum; j++) {
                    _loop_2(j);
                }
            };
            for (i = 0; i < rowNum; i++) {
                _loop_1(i);
            }
            Promise.all(imagePromise)
                .then(function (res) {
                setImageArray(tempArray);
            });
            return [2 /*return*/];
        });
    }); };
    return { imageArray: imageArray };
};
exports.default = useSpriteImage;
