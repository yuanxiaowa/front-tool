"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("../models/project");
const router_1 = require("./router");
const router = router_1.default('/api/project');
router.get('/dir', ctx => project_1.getList());
router.post('/dir/add', ctx => project_1.addListItem(ctx.request.body));
exports.default = router;
