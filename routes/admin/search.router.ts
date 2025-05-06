import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/search.controllers"

router.get('/suggest', controllers.suggest)

router.get('/suggest-category', controllers.suggestCategory)

export const searchRouter = router