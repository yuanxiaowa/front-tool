"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const Koa = require("koa");
// @ts-ignore
const koaBody = require("koa-body");
const send = require("koa-send");
const routes_1 = require("./routes");
const sockets_1 = require("./sockets");
const koa = new Koa();
const server = http.createServer(koa.callback());
koa.use((ctx, next) => {
    if (ctx.path === '/') {
        return send(ctx, './public/index.html');
    }
    else if (/^\/(static|product)\//.test(ctx.path)) {
        return send(ctx, ctx.path, {
            root: './public',
            gzip: true,
            immutable: true
        });
    }
    return next();
});
koa.use(koaBody());
routes_1.default(koa);
sockets_1.default(server);
console.log('开始启动服务...');
server.listen(3000, () => {
    console.log('服务已启动，运行在端口', 3000);
});
