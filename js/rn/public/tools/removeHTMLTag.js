"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeHTMLTag(data) {
    var regex = /(<([^>]+)>)/ig;
    return data.replace(regex, '');
}
exports.removeHTMLTag = removeHTMLTag;
//# sourceMappingURL=removeHTMLTag.js.map