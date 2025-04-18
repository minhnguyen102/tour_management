import { Router } from "express";
const router: Router = Router();
import * as controllers from "../../controllers/client/category.controllers"

router.get('/', controllers.index)

export const categoryRouter = router