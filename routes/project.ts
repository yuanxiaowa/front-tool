import * as Path from 'path'
import * as Router from 'koa-router'
import { wrapRouter } from '../utils'
import { getList, addListItem} from '../models/project';
var router = new Router({
  prefix: '/api/project'
});
wrapRouter(router);

router.get('/dir', ctx => getList())

router.post('/dir/add', ctx => addListItem(ctx.request.body))

export default router