import { Express } from "express"
import { systemConfig } from "../../config/system"
import { dashboardRouter } from "./dashboard.router"
import { tourCategoryRouter } from "./tourCategory.router"

const RouterAdmin = (app: Express) => {
    const PREFIX_ADMIN = systemConfig.prefixAdmin;

    app.use(`${PREFIX_ADMIN}/dashboard`, dashboardRouter)

    app.use(`${PREFIX_ADMIN}/tours-category`, tourCategoryRouter)
    
}

export default RouterAdmin