import { Express } from "express"
import { systemConfig } from "../../config/system"
import { dashboardRouter } from "./dashboard.router"
import { tourCategoryRouter } from "./tourCategory.router"
import { tourRouter } from "./tour.router"
import { uploadRouter } from "./upload.router"
import { searchRouter } from "./search.router"
import { roleRouter } from "./role.router"
import { accountRouter } from "./account.router"
import { authRouter } from "./auths.router"
import { requireAuth } from "../../middleware/admin/auth.middleware"

const RouterAdmin = (app: Express) => {
    const PREFIX_ADMIN = systemConfig.prefixAdmin;

    app.use(`${PREFIX_ADMIN}/dashboard`, requireAuth, dashboardRouter)

    app.use(`${PREFIX_ADMIN}/tours-category`, requireAuth, tourCategoryRouter)

    app.use(`${PREFIX_ADMIN}/tours`, requireAuth, tourRouter)

    app.use(`${PREFIX_ADMIN}/upload`, requireAuth, uploadRouter)

    app.use(`${PREFIX_ADMIN}/search`, requireAuth, searchRouter)

    app.use(`${PREFIX_ADMIN}/roles`, requireAuth, roleRouter)

    app.use(`${PREFIX_ADMIN}/accounts`, requireAuth, accountRouter)

    app.use(`${PREFIX_ADMIN}/auth`, authRouter)
    
}

export default RouterAdmin