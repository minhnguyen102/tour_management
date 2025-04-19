import dotenv from "dotenv"
import express, { Express } from "express"
const app: Express = express()
dotenv.config()
import RouterClient from "./routes/client/index.router"
import moment from "moment"

const port: number | string = process.env.PORT || 3000

// static file
app.use(express.static('public'))

// routerClient
RouterClient(app);

// App local varialble
app.locals.moment = moment

// pug
app.set('views', './views')
app.set('view engine', 'pug')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})