import { Router, Request, Response } from "express";
const router: Router = Router();
import * as controllers from "../../controllers/client/tour.controllers"


router.get('/:slugCategory', controllers.index)


export const tourRouter = router