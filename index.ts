import dotenv from "dotenv"
import express, { Express } from "express"
const app: Express = express()
dotenv.config()
import RouterClient from "./routes/client/index.router"

const port: number | string = process.env.PORT || 3000



// routerClient
RouterClient(app);

// pug
app.set('views', './views')
app.set('view engine', 'pug')


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})