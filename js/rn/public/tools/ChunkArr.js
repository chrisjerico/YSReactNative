"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function chunkArray(myArray, chunk_size) {
    var results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }
    return results;
}
exports.chunkArray = chunkArray;
