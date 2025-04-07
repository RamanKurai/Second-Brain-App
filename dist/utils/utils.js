"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(len) {
    let options = "qwertyuiopasdfghjklzxcvbnm123456789";
    let length = options.length;
    let ans = "";
    for (let i = 0; i < length; i++) {
        ans += options[Math.floor((Math.random() * length))];
    }
    return ans;
}
