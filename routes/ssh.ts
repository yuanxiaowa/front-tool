import getRouter from "./router";
import { list, findById, add } from '../models/ssh'

const router = getRouter('/api/ssh');

router.get('/info', async () => {
  var items = await list()
  return items.map(item => ({ id: item.id, host: item.host, username: item.username }));
})
router.get('/info/:id', (ctx) => {
  var id = Number(ctx.params.id);
  return findById(id)
})

router.post('/add', ctx => add(ctx.request.body))

export default router