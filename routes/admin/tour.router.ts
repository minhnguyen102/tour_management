import { Router, Request } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/tour.controllers"
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware"

import multer from "multer";
const upload = multer();

router.get('/', controllers.index)

router.patch('/change-status/:id/:status', controllers.changeStatus)

router.patch('/change-multi/', controllers.changeMulti)

router.get('/create/', controllers.create)

router.post(
    '/create/',
    upload.fields([{ 
        name: 'images', maxCount: 10
    }]),
    // (req: Request, res, next) => {
    //     console.log('FILES:', req["files"]); // ← kiểm tra ở đây
    //     next();
    // },
    uploadCloud.uploadFields,
    controllers.createPost)

router.get('/edit/:id', controllers.edit)

router.patch('/edit/:id',
    upload.fields([{ 
        name: 'images', maxCount: 10
    }]),
    // (req: Request, res, next) => {
    //     console.log('FILES:', req["files"]); // ← kiểm tra ở đây
    //     next();
    // },
    uploadCloud.uploadFields,
    controllers.editPatch)

router.delete('/delete/:id', controllers.deleted)

export const tourRouter = router