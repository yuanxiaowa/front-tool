import * as Router from 'koa-router'
import { wrapRouter } from '../utils'
import {
  getPaths,
  addPath,
  getStatus,
  addFiles,
  delFiles,
  update,
  commit,
  log,
  info,
  resolveFiles,
  merge,
  mergeinfo,
  getStructures
} from '../models/svn'

var router = new Router({
  prefix: '/api/svn'
})

wrapRouter(router)

router.get('/paths', getPaths)
  .post('/path', (ctx) => {
    var path = ctx.request.body.path;
    var name = ctx.request.body.name
    addPath(path, name);
    return getPaths();
  })
router.get('/status', (ctx) => {
  return getStatus(ctx.query.path);
});
router.post('/add', (ctx) => {
  var paths: string[] = ctx.request.body.paths;
  var path: string = ctx.request.body.path;
  return addFiles(path, paths);
});
router.post('/del', (ctx) => {
  var paths: string[] = ctx.request.body.paths;
  var path: string = ctx.request.body.path;
  return delFiles(path, paths);
})
router.post('/update', (ctx) => {
  var path: string = ctx.request.body.path;
  return update(path);
})
router.post('/commit', (ctx) => {
  var paths: string[] = ctx.request.body.paths;
  var path: string = ctx.request.body.path;
  var msg: string = ctx.request.body.msg;
  return commit(path, paths, msg);
})
router.get('/log', (ctx) => {
  var path: string = ctx.query.path;
  var rowsPerPage = +ctx.query.rowsPerPage || 10;
  var page = +ctx.query.page || 1
  return log(path).then(data => ({
    page,
    items: data.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    total: data.length
  }));
});
router.get('/info', (ctx) => {
  var path: string = ctx.query.path;
  return info(path);
})
router.post('/resolve', (ctx) => {
  var paths: string[] = ctx.request.body.paths;
  var path: string = ctx.request.body.path;
  return resolveFiles(path, paths);
})
router.post('/merge', (ctx) => {
  var { path, url, revisions } = ctx.request.body;
  return merge(path, url, revisions);
})
router.get('/mergeinfo', ctx => {
  var { path, url } = ctx.query;
  return mergeinfo(path, url)
})
router.get('/structure', (ctx) => {
  var path: string = ctx.query.path;
  var base: string = ctx.query.base;
  return getStructures(path, base);
})

export default router;