import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/tour.controllers"

router.get('/', controllers.index)

export const tourRouter = router