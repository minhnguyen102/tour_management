import { Router } from "express"
import multer from "multer"
const router: Router = Router();

import * as controllers from "../../controllers/admin/upload.controllers"
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware"
const upload = multer();

router.post('/',
    upload.single("file"),
    uploadCloud.uploadSingle,
    controllers.index)

export const uploadRouter: Router = router