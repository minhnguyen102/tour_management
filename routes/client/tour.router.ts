import { Router, Request, Response } from "express";
const router: Router = Router();
import * as controllers from "../../controllers/client/tour.controllers"

router.get('/tours', controllers.tours)

export const tourRouter = router