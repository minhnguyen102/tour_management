import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/order.controllers"

router.get('/', controllers.index)

router.get('/detail/:orderId', controllers.detail)

router.post('/accept', controllers.acceptPost)

router.get('/accept', controllers.accept)


export const orderRouter = router