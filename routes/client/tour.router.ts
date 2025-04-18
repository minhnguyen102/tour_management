import { Router, Request, Response } from "express";
const router: Router = Router();
import * as controllers from "../../controllers/client/tour.controllers"

router.get('/', controllers.tours)

router.get('/:slugCategory', controllers.category)


export const tourRouter = router