import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/client/user.controllers"
import * as userValidate from "../../validate/client/user.validate"

router.get('/register', controllers.register)

router.post('/register',
    userValidate.registerPost,
    controllers.registerPost)

export const userRouter = router