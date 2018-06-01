import { create } from 'browser-sync'
import * as browserSync from 'browser-sync'
import { Sv, list, add, Opt, findByDir } from '../models/devserver'
import * as httpProxy from 'http-proxy'
import { IncomingMessage, ServerResponse } from 'http';
import getRouter from './router';

const router = getRouter('/api/devserver')

router.get('/list', async () => {
  var items = await list()
  return items.map((item: any) => ({
    name: item.name,
    dir: item.dir,
    port: item.port,
    running: !!item.instance,
    urls: item.urls,
    proxy: item.proxy
  }))
});

router.post('/add', ctx => {
  var data = ctx.request.body;
  if (data.proxy) {
    let lines: string[] = data.proxy.trim().split(/\r?\n/);
    data.proxy = lines.map(line => line.split(/\s+/)).filter(line => line.length >= 2)
  }
  return add(data)
})

var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  // @ts-ignore
  cookieDomainRewrite: ''
});
/**
 * 启动本地服务
 * @param item 服务配置
 */
function startServer(item: Opt): Promise<{ instance: browserSync.BrowserSyncInstance, urls: string[] }> {
  return new Promise((resolve, reject) => {
    var opt: browserSync.Options = {
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
          handle(req: IncomingMessage, res: ServerResponse) {
            proxy.web(req, res, {
              target
            });
          }
        }
      })
    }
    var instance = create('sv');
    instance.init(opt, function (err, bs) {
      if (err) {
        return reject(err)
      }
      resolve({
        instance,
        // @ts-ignore
        urls: bs.options._root.nodes[4].nodes[1].entry[1]._root.entries
      });
    });
  })
}

router.get('/start', async ctx => {
  var item = findByDir(ctx.query.dir)
  var { instance, urls } = await startServer(item);
  item.instance = instance;
  item.urls = urls;
})

router.get('/stop', ctx => {
  var baseDir = ctx.query.dir;
  var item = findByDir(ctx.query.dir)
  if (item.instance) {
    item.instance.exit();
    item.instance = undefined;
  }
})

export default router;