import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/account.controllers"

router.get('/', controllers.index)

export const accountRouter = router