import { Router } from "express";
const router: Router = Router();
import * as controllers from "../../controllers/client/tour.controllers"


router.get('/:slugCategory', controllers.index)

router.get('/detail/:slugTour', controllers.detail)


export const tourRouter = router