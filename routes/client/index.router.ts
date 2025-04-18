import { Express } from "express"
import { homeRouter } from "./home.router"
import { tourRouter } from "./tour.router"
import { categoryRouter } from "./category.router"

const RouterClient = (app: Express) => {
    
    app.use("/", homeRouter)
    app.use("/tours", tourRouter)
    app.use("/categories", categoryRouter)
}

export default RouterClient