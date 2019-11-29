"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
exports.sendRefreshToken = (res, token) => {
    const domain = constants_1.frontURL && '.' + constants_1.frontURL.replace(/(^\w+:|^)\/\//, '');
    console.log(domain);
    res.cookie("jid", token, {
        httpOnly: true,
    });
};
//# sourceMappingURL=sendRefreshToken.js.map