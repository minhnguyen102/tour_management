import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
const app: Express = express()
dotenv.config()

const port: number | string = process.env.PORT || 3000


app.get('/', (req: Request, res: Response) => {
    res.send('Trang chủ')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})