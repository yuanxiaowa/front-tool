"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svn_1 = require("../models/svn");
const router_1 = require("./router");
const router = router_1.default('/api/svn');
router.get('/paths', svn_1.getPaths)
    .post('/path', (ctx) => {
    var path = ctx.request.body.path;
    var name = ctx.request.body.name;
    svn_1.addPath(path, name);
    return svn_1.getPaths();
});
router.get('/status', (ctx) => {
    return svn_1.getStatus(ctx.query.path);
});
router.post('/add', (ctx) => {
    var paths = ctx.request.body.paths;
    var path = ctx.request.body.path;
    return svn_1.addFiles(path, paths);
});
router.post('/del', (ctx) => {
    var paths = ctx.request.body.paths;
    var path = ctx.request.body.path;
    return svn_1.delFiles(path, paths);
});
router.post('/update', (ctx) => {
    var path = ctx.request.body.path;
    return svn_1.update(path);
});
router.post('/commit', (ctx) => {
    var paths = ctx.request.body.paths;
    var path = ctx.request.body.path;
    var msg = ctx.request.body.msg;
    return svn_1.commit(path, paths, msg);
});
router.get('/log', (ctx) => {
    var path = ctx.query.path;
    var rowsPerPage = +ctx.query.rowsPerPage || 10;
    var page = +ctx.query.page || 1;
    return svn_1.log(path).then(data => ({
        page,
        items: data.slice((page - 1) * rowsPerPage, page * rowsPerPage),
        total: data.length
    }));
});
router.get('/info', (ctx) => {
    var path = ctx.query.path;
    return svn_1.info(path);
});
router.post('/resolve', (ctx) => {
    var paths = ctx.request.body.paths;
    var path = ctx.request.body.path;
    return svn_1.resolveFiles(path, paths);
});
router.post('/merge', (ctx) => {
    var { path, url, revisions } = ctx.request.body;
    return svn_1.merge(path, url, revisions);
});
router.get('/mergeinfo', ctx => {
    var { path, url } = ctx.query;
    return svn_1.mergeinfo(path, url);
});
router.get('/structure', (ctx) => {
    var path = ctx.query.path;
    var base = ctx.query.base;
    return svn_1.getStructures(path, base);
});
exports.default = router;
