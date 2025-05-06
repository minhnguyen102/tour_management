import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/toursCategory.controllers"
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware"
import multer from "multer";
const upload = multer();


router.get('/', controllers.index)

router.get('/create', controllers.create)

router.post('/create', 
    upload.single("image"),
    uploadCloud.uploadSingle,
    controllers.createPost)

router.get('/edit/:id', controllers.edit)

router.patch('/edit/:id', 
    upload.single("image"),
    uploadCloud.uploadSingle,
    controllers.editPatch)

router.get('/detail/:id', controllers.detail)

router.patch("/change-status/:id/:status", controllers.changeStatus)

router.delete('/delete/:id', controllers.deleted)

export const tourCategoryRouter = router