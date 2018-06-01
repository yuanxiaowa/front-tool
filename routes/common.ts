import { exec } from 'child_process'
import * as Path from 'path'
import * as glob from 'glob'
import getRouter from './router';
import { createReadStream, createWriteStream, stat, remove, unlink } from 'fs-extra';

const router = getRouter('/api', false)

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

router.delete('/file', async ctx => {
  var path = ctx.query.path
  var data: any = {
    code: 0
  }
  try {
    await remove(path)
  } catch (e) {
    data.code = 1
    data.msg = e.message
  }
  ctx.body = data
})

router.get('/file/list', ctx => {
  var pattern = ctx.query.pattern
  var nodir = ctx.query.nodir
  var path = ctx.query.path
  return new Promise((resolve, reject) => {
    if (pattern) {
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
    } else {
      let globInstance = new glob.Glob(path + '/*', {
        stat: true
      }, (err, matches) => {
        var code = err ? 1 : 0;
        ctx.body = {
          code
        }
        if (err) {
          return reject(err)
        }
        ctx.body.data = matches.map(path => {
          var stat = globInstance.statCache[path]
          return {
            name: Path.basename(path),
            path,
            dir: stat.isDirectory(),
            ctime: stat.ctimeMs,
            mtime: stat.mtimeMs
          }
        })
        resolve()
      })
    }
  })
})

router.put('/file/upload', ctx => {
  var path = ctx.query.path
  return new Promise((resolve, reject) => {
    ctx.req.pipe(createWriteStream(path)).on('finish', () => {
      ctx.body = {
        code: 0,
        data: path
      }
      resolve()
    }).on('error', reject)
  })
})

export default router