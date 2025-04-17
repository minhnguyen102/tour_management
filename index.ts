import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
const app: Express = express()
dotenv.config()

const port: number | string = process.env.PORT || 3000

// pug
app.set('views', './views')
app.set('view engine', 'pug')


app.get('/', (req: Request, res: Response) => {
    res.send('Trang chủ')
})

app.get('/tours', (req: Request, res: Response) => {
    res.render("client/pages/tours/index.pug")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})