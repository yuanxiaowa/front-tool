"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const router_1 = require("./router");
const router = router_1.default('/api/product');
router.get('/list', ctx => product_1.list());
router.get('/zip', ctx => product_1.zip(ctx.query.path));
// router.post('/dir/add', ctx => addListItem(ctx.request.body))
exports.default = router;
