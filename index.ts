import * as http from 'http'
import * as Koa from 'koa'
// @ts-ignore
import * as koaBody from 'koa-body'
import * as send from 'koa-send'
import configRoutes from './routes'
import configSockets from './sockets'

const koa = new Koa();
const server = http.createServer(koa.callback())
koa.use((ctx, next) => {
  if (ctx.path === '/') {
    return send(ctx, './public/index.html')
  } else if (ctx.path.startsWith('/static/')) {
    return send(ctx, ctx.path, {
      root: './public'
    })
  }
  return next();
})
koa.use(koaBody())
configRoutes(koa);

configSockets(server)

console.log('开始启动服务...')
server.listen(3000, () => {
  console.log('服务已启动，运行在端口', 3000);
});