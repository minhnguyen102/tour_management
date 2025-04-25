import dotenv from "dotenv"
import express, { Express } from "express"
import bodyParser from "body-parser"
import methodOverride from "method-override"
const app: Express = express()
dotenv.config()
import RouterClient from "./routes/client/index.router"
import moment from "moment"
import RouterAdmin from "./routes/admin/index.router"
import { systemConfig } from "./config/system"

const port: number | string = process.env.PORT || 3000

// static file
app.use(express.static('public'))

// methodOverride : ghi đè 
app.use(methodOverride('_method'))

// body-parser
app.use(bodyParser.json())

// routerClient
RouterClient(app);
RouterAdmin(app)

// App local varialble
app.locals.moment = moment
app.locals.prefixAdmin = systemConfig.prefixAdmin


// pug
app.set('views', './views')
app.set('view engine', 'pug')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})