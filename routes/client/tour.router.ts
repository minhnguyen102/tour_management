import { Router, Request, Response } from "express";
import Tour from "../../model/tour.model"
const router: Router = Router();

router.get('/tours', async (req: Request, res: Response) => {
    const tours = await Tour.findAll({
        raw : true
    });
    console.log(tours);

    res.render("client/pages/tours/index.pug",{
        tours : tours
    })
})

export const tourRouter = router