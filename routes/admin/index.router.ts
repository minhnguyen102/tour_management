import { Express } from "express"
import { systemConfig } from "../../config/system"
import { dashboardRouter } from "./dashboard.router"
import { tourCategoryRouter } from "./tourCategory.router"
import { tourRouter } from "./tour.router"
import { uploadRouter } from "./upload.router"

const RouterAdmin = (app: Express) => {
    const PREFIX_ADMIN = systemConfig.prefixAdmin;

    app.use(`${PREFIX_ADMIN}/dashboard`, dashboardRouter)

    app.use(`${PREFIX_ADMIN}/tours-category`, tourCategoryRouter)

    app.use(`${PREFIX_ADMIN}/tours`, tourRouter)

    app.use(`${PREFIX_ADMIN}/upload`, uploadRouter)
    
}

export default RouterAdmin