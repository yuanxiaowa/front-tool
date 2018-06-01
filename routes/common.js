"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const Path = require("path");
const glob = require("glob");
const router_1 = require("./router");
const fs_extra_1 = require("fs-extra");
const router = router_1.default('/api', false);
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
        fs_extra_1.createReadStream(path).pipe(ctx.res).on('finish', resolve).on('error', reject);
    });
});
router.delete('/file', async (ctx) => {
    var path = ctx.query.path;
    var data = {
        code: 0
    };
    try {
        await fs_extra_1.remove(path);
    }
    catch (e) {
        data.code = 1;
        data.msg = e.message;
    }
    ctx.body = data;
});
router.get('/file/list', ctx => {
    var pattern = ctx.query.pattern;
    var nodir = ctx.query.nodir;
    var path = ctx.query.path;
    return new Promise((resolve, reject) => {
        if (pattern) {
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
        }
        else {
            let globInstance = new glob.Glob(path + '/*', {
                stat: true
            }, (err, matches) => {
                var code = err ? 1 : 0;
                ctx.body = {
                    code
                };
                if (err) {
                    return reject(err);
                }
                ctx.body.data = matches.map(path => {
                    var stat = globInstance.statCache[path];
                    return {
                        name: Path.basename(path),
                        path,
                        dir: stat.isDirectory(),
                        ctime: stat.ctimeMs,
                        mtime: stat.mtimeMs
                    };
                });
                resolve();
            });
        }
    });
});
router.put('/file/upload', ctx => {
    var path = ctx.query.path;
    return new Promise((resolve, reject) => {
        ctx.req.pipe(fs_extra_1.createWriteStream(path)).on('finish', () => {
            ctx.body = {
                code: 0,
                data: path
            };
            resolve();
        }).on('error', reject);
    });
});
exports.default = router;
