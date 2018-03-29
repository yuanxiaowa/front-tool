"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const child_process_1 = require("child_process");
const Path = require("path");
const fs_1 = require("fs");
const glob = require("glob");
var router = new Router({
    prefix: '/api'
});
// 浏览文件或文件夹
router.get('/explore', ctx => new Promise((resolve, reject) => {
    child_process_1.exec(`explorer "${ctx.query.path.replace(/\//g, '\\')}"`, err => {
        var code = err ? 1 : 0;
        ctx.body = {
            code
        };
        resolve();
    });
}));
router.get('/file', ctx => {
    var path = ctx.query.path;
    var type = Path.extname(path).substring(1);
    ctx.type = type;
    ctx.status = 200;
    // ctx.set('cache-control', 'no-store,no-cache')
    return new Promise((resolve, reject) => {
        fs_1.createReadStream(path).pipe(ctx.res).on('finish', resolve).on('error', reject);
    });
});
router.get('/files', ctx => {
    var pattern = ctx.query.pattern;
    var nodir = ctx.query.nodir;
    return new Promise((resolve, reject) => {
        glob(pattern, { nodir }, (err, data) => {
            var code = err ? 1 : 0;
            ctx.body = {
                code,
                data
            };
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
});
router.put('/upload', ctx => {
    var path = ctx.query.path;
    if (ctx.request.type === 'application/json') {
        return new Promise((resolve, reject) => {
            fs_1.writeFile(path, JSON.stringify(ctx.request.body), (err) => {
                ctx.body = {
                    code: err ? 1 : 0
                };
                resolve();
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    return new Promise((resolve, reject) => {
        ctx.req.pipe(fs_1.createWriteStream(path)).on('finish', () => {
            ctx.body = {
                code: 0
            };
            resolve();
        }).on('error', reject);
    });
});
exports.default = router;
