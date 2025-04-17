import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import sequelize from "./config/database"
import Tour from "./model/tour.model"
const app: Express = express()
dotenv.config()

const port: number | string = process.env.PORT || 3000

sequelize;

// pug
app.set('views', './views')
app.set('view engine', 'pug')


app.get('/', (req: Request, res: Response) => {
    res.send('Trang chủ')
})

app.get('/tours', async (req: Request, res: Response) => {
    const tours = await Tour.findAll({
        raw : true
    });
    console.log(tours);

    res.render("client/pages/tours/index.pug",{
        tours : tours
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})