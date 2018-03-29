import * as Router from 'koa-router'
import { wrapRouter } from '../utils'
var router = new Router({
  prefix: '/api/ssh'
});

interface Info {
  id: number,
  username: string
  password: string
  port: number
  host: string
}
var infos: Info[] = [{
  id: 1,
  username: 'root',
  password: 'eco@13',
  port: 22,
  host: '10.10.11.13'
}]

wrapRouter(router)
router.get('/info', () => {
  return infos.map(item => ({ id: item.id, host: item.host, username: item.username }));
})
router.get('/info/:id', (ctx) => {
  var id = Number(ctx.params.id);
  return infos.find(item => item.id === id);
})

function getId() {
  return infos.reduce((state, item) => Math.max(item.id, state), 0);
}

router.post('/add', ctx => {
  var id = getId() + 1;
  infos.push(ctx.request.body.info);
})

export default router