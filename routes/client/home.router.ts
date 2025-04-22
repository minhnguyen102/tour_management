import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/client/home.controllers"

router.get('/', controllers.home)

export const homeRouter = router