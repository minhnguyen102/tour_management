import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/account.controllers"

import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware"
import multer from "multer";
const upload = multer();

router.get('/', controllers.index)

router.get('/create', controllers.create)

router.post('/create',
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controllers.createPost)

export const accountRouter = router