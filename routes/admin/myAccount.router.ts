import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/myAccount.controllers"
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware"
import multer from "multer";
const upload = multer();


router.get('/', controllers.index)

router.get('/edit', controllers.edit)

router.patch(
    "/edit",
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controllers.editPatch)

export const myAccountRouter = router