import { list, zip } from '../models/product';
import getRouter from './router';

const router = getRouter('/api/product');

router.get('/list', ctx => list())
router.get('/zip', ctx => zip(ctx.query.path))

// router.post('/dir/add', ctx => addListItem(ctx.request.body))

export default router