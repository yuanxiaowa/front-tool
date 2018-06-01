"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svn_1 = require("./svn");
const ssh_1 = require("./ssh");
const common_1 = require("./common");
const devserver_1 = require("./devserver");
const project_1 = require("./project");
const product_1 = require("./product");
var routers = [common_1.default, svn_1.default, ssh_1.default, devserver_1.default, project_1.default, product_1.default];
function default_1(koa) {
    routers.forEach(router => {
        koa.use(router.routes());
    });
}
exports.default = default_1;
