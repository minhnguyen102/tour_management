import dotenv from "dotenv"
import express, { Express } from "express"
import bodyParser from "body-parser"
import methodOverride from "method-override"
import flash from "express-flash"
import session from "express-session"
import cookieParser from "cookie-parser"
const app: Express = express()
var path = require("path")
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

// flash
app.use(cookieParser('NKMTTL'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routerClient
RouterClient(app);
RouterAdmin(app)

// App local varialble
app.locals.moment = moment
app.locals.prefixAdmin = systemConfig.prefixAdmin

// tiny MCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End tiny MCE

// pug
app.set('views', './views')
app.set('view engine', 'pug')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})