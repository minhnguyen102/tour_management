import { Router } from "express";
const router: Router = Router();
import * as controllers from "../../controllers/client/order.controllers"

router.post('/', controllers.order)

export const orderRouter = router