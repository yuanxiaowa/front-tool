"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const utils_1 = require("../utils");
const project_1 = require("../models/project");
var router = new Router({
    prefix: '/api/project'
});
utils_1.wrapRouter(router);
router.get('/dir', ctx => project_1.getList());
router.post('/dir/add', ctx => project_1.addListItem(ctx.request.body));
exports.default = router;
