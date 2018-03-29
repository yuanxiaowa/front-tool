"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const utils_1 = require("../utils");
var router = new Router({
    prefix: '/api/ssh'
});
var infos = [{
        id: 1,
        username: 'root',
        password: 'eco@13',
        port: 22,
        host: '10.10.11.13'
    }];
utils_1.wrapRouter(router);
router.get('/info', () => {
    return infos.map(item => ({ id: item.id, host: item.host, username: item.username }));
});
router.get('/info/:id', (ctx) => {
    var id = Number(ctx.params.id);
    return infos.find(item => item.id === id);
});
function getId() {
    return infos.reduce((state, item) => Math.max(item.id, state), 0);
}
router.post('/add', ctx => {
    var id = getId() + 1;
    infos.push(ctx.request.body.info);
});
exports.default = router;
