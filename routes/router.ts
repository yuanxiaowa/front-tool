import * as Router from 'koa-router'
export default function getRouter(prefix: string, hasWrapper = true) {
  var router = new Router({
    prefix
  })
  if (hasWrapper) {
    wrapRouter(router)
  }
  return router
}

export async function wrapRouter(router: any) {
  router.all('*', async (ctx: any, next: Function) => {
    try {
      var data = await next();
      ctx.body = {
        code: 0,
        data
      }
    } catch (e) {
      ctx.body = {
        code: 1,
        msg: e.message
      }
    }
  })
}