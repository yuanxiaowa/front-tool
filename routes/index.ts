import svnRouter from './svn'
import shellRouter from './ssh'
import commonRouter from './common'
import devserverRouter from './devserver'
import projectRouter from './project'

var routers = [commonRouter, svnRouter, shellRouter, devserverRouter, projectRouter]
export default function (koa: any) {
  routers.forEach(router => {
    koa.use(router.routes())
  })
}