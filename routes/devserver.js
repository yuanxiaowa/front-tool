"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_sync_1 = require("browser-sync");
const Router = require("koa-router");
const utils_1 = require("../utils");
const devserver_1 = require("../models/devserver");
const httpProxy = require("http-proxy");
var router = new Router({
    prefix: '/api/devserver'
});
class Opt extends devserver_1.Sv {
}
utils_1.wrapRouter(router);
var items;
devserver_1.getItems().then(_items => {
    items = _items;
});
router.get('/list', () => items.map(item => ({
    name: item.name,
    dir: item.dir,
    port: item.port,
    running: !!item.instance,
    urls: item.urls,
    proxy: item.proxy
})));
router.post('/add', ctx => {
    var data = ctx.request.body;
    if (data.proxy) {
        let lines = data.proxy.trim().split(/\r?\n/);
        data.proxy = lines.map(line => line.split(/\s+/)).filter(line => line.length >= 2);
    }
    items.push(data);
    return devserver_1.saveItems(items.map(item => ({
        name: item.name,
        dir: item.dir,
        port: item.port,
        open: item.open,
        proxy: item.proxy
    })));
});
var proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    // @ts-ignore
    cookieDomainRewrite: ''
});
/**
 * 启动本地服务
 * @param item 服务配置
 */
function startServer(item) {
    return new Promise((resolve, reject) => {
        var opt = {
            server: {
                baseDir: item.dir,
                directory: true
            },
            reloadDebounce: 500,
            files: item.dir + '/**/*',
            port: item.port,
            open: item.open
        };
        if (item.proxy) {
            opt.middleware = item.proxy.map(([prefix, target]) => {
                if (!prefix.startsWith('/')) {
                    prefix = '/' + prefix;
                }
                if (!target.endsWith('/')) {
                    target += prefix;
                }
                return {
                    route: prefix,
                    handle(req, res) {
                        proxy.web(req, res, {
                            target
                        });
                    }
                };
            });
        }
        var instance = browser_sync_1.create('sv');
        instance.init(opt, function (err, bs) {
            if (err) {
                return reject(err);
            }
            resolve({
                instance,
                // @ts-ignore
                urls: bs.options._root.nodes[4].nodes[1].entry[1]._root.entries
            });
        });
    });
}
router.get('/start', async (ctx) => {
    var baseDir = ctx.query.dir;
    var item = items.find(item => item.dir === baseDir);
    var { instance, urls } = await startServer(item);
    item.instance = instance;
    item.urls = urls;
});
router.get('/stop', ctx => {
    var baseDir = ctx.query.dir;
    var item = items.find(item => item.dir === baseDir);
    if (item.instance) {
        item.instance.exit();
        item.instance = undefined;
    }
});
exports.default = router;
