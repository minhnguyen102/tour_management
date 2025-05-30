import { Express } from "express"
import { homeRouter } from "./home.router"
import { tourRouter } from "./tour.router"
import { categoryRouter } from "./category.router"
import { cartRouter } from "./cart.router"
import { orderRouter } from "./order.router"

const RouterClient = (app: Express) => {

    app.use("/", homeRouter)
    app.use("/tours", tourRouter)
    app.use("/categories", categoryRouter)
    app.use("/cart", cartRouter)
    app.use("/order", orderRouter)
}

export default RouterClient