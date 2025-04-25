import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/dashboard.controllers"

router.get('/', controllers.dashboard)

export const dashboardRouter = router