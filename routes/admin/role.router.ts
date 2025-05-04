import { Router } from "express"
const router: Router = Router();
import * as controllers from "../../controllers/admin/role.controllers"

router.get('/', controllers.index)

router.get('/create', controllers.create)

router.post('/create', controllers.createPost)

router.get('/edit/:id', controllers.edit)

router.patch('/edit/:id', controllers.editPatch)

router.get('/detail/:id', controllers.detail)

router.delete('/delete/:id', controllers.deleted)

router.get('/permissions', controllers.permissions)

router.patch('/permissions', controllers.permissionsPatch)


export const roleRouter = router