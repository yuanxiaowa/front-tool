"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function wrapRouter(router) {
    router.all('*', async (ctx, next) => {
        try {
            var data = await next();
            ctx.body = {
                code: 0,
                data
            };
        }
        catch (e) {
            ctx.body = {
                code: 1,
                msg: e.message
            };
        }
    });
}
exports.wrapRouter = wrapRouter;
