import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/tour.controllers"

router.get('/', controllers.index)

router.patch('/change-status/:id/:status', controllers.changeStatus)

router.patch('/change-multi/', controllers.changeMulti)

router.get('/create/', controllers.create)

router.delete('/delete/:id', controllers.deleted)

export const tourRouter = router