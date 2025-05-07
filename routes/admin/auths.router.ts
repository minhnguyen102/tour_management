import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/auth.controllers"

router.get('/login', controllers.login)

router.post('/login', controllers.loginPost)

router.get('/logout', controllers.logout)

export const authRouter = router