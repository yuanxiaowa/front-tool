"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const ssh_1 = require("../models/ssh");
const router = router_1.default('/api/ssh');
router.get('/info', async () => {
    var items = await ssh_1.list();
    return items.map(item => ({ id: item.id, host: item.host, username: item.username }));
});
router.get('/info/:id', (ctx) => {
    var id = Number(ctx.params.id);
    return ssh_1.findById(id);
});
router.post('/add', ctx => ssh_1.add(ctx.request.body));
exports.default = router;
