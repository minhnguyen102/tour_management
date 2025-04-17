import { Express } from "express"
import { homeRouter } from "./home.router"
import { tourRouter } from "./tour.router"

const RouterClient = (app: Express) => {
    
    app.use("/", homeRouter)
    app.use("/", tourRouter)
}

export default RouterClient