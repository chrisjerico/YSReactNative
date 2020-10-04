"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeHTMLTag = void 0;
function removeHTMLTag(data) {
    var regex = /(<([^>]+)>)/ig;
    return data.replace(regex, '');
}
exports.removeHTMLTag = removeHTMLTag;
