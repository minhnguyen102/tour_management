import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/account.controllers"

import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware"
import multer from "multer";
const upload = multer();

router.get('/', controllers.index)

router.patch('/change-status/:id/:status', controllers.changeStatus)

router.get('/create', controllers.create)

router.post('/create',
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controllers.createPost)

router.get('/edit/:id', controllers.edit)

router.patch('/edit/:id',
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controllers.editPatch)

router.get('/detail/:id', controllers.detail)

router.delete('/delete/:id', controllers.deleted)

export const accountRouter = router