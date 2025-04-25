import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/toursCategory.controllers"

router.get('/', controllers.index)

export const tourCategoryRouter = router