import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/client/cart.controllers"

router.get('/', controllers.index)

router.post('/list-tour', controllers.listTour)

export const cartRouter = router