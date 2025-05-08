import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/client/user.controllers"
import * as userValidate from "../../validate/client/user.validate"

router.get('/register', controllers.register)

router.post('/register',
    userValidate.registerPost,
    controllers.registerPost)

router.get('/login', controllers.login)

router.post('/login',
    userValidate.loginPost,
    controllers.loginPost)

export const userRouter = router