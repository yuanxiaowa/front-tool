import { getList, addListItem} from '../models/project';
import getRouter from './router';

const router = getRouter('/api/project');

router.get('/dir', ctx => getList())

router.post('/dir/add', ctx => addListItem(ctx.request.body))

export default router