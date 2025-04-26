import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/toursCategory.controllers"

router.get('/', controllers.index)

router.get('/edit/:id', controllers.edit)

router.patch("/change-status/:id/:status", controllers.changeStatus)

export const tourCategoryRouter = router