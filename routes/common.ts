import * as Router from 'koa-router'
import { exec } from 'child_process'
import * as Path from 'path'
import { createReadStream, createWriteStream, writeFile } from 'fs';
import * as glob from 'glob'

var router = new Router({
  prefix: '/api'
});

// 浏览文件或文件夹
router.get('/explore', ctx => new Promise((resolve, reject) => {
  exec(`explorer "${ctx.query.path.replace(/\//g, '\\')}"`, err => {
    var code = err ? 1 : 0;
    ctx.body = {
      code
    }
    resolve();
  })
}))

router.get('/file', ctx => {
  var path = ctx.query.path;
  var type = Path.extname(path).substring(1)
  ctx.type = type
  ctx.status = 200
  // ctx.set('cache-control', 'no-store,no-cache')
  return new Promise((resolve, reject) => {
    createReadStream(path).pipe(ctx.res).on('finish', resolve).on('error', reject)
  })
})

router.get('/files', ctx => {
  var pattern = ctx.query.pattern
  var nodir = ctx.query.nodir
  return new Promise((resolve, reject) => {
    glob(pattern, { nodir }, (err, data) => {
      var code = err ? 1 : 0;
      ctx.body = {
        code,
        data
      }
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
})

router.put('/upload', ctx => {
  var path = ctx.query.path
  if (ctx.request.type === 'application/json') {
    return new Promise((resolve, reject) => {
      writeFile(path, JSON.stringify(ctx.request.body), (err) => {
        ctx.body = {
          code: err ? 1 : 0
        }
        resolve()
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
  return new Promise((resolve, reject) => {
    ctx.req.pipe(createWriteStream(path)).on('finish', () => {
      ctx.body = {
        code: 0
      }
      resolve()
    }).on('error', reject)
  })
})

export default router