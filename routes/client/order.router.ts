import { Router } from "express";
const router: Router = Router();
import * as controllers from "../../controllers/client/order.controllers"

router.post('/', controllers.order)

router.get('/success/:orderCode', controllers.success)

export const orderRouter = router