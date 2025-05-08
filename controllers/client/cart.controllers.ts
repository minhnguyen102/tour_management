import { Request, Response } from "express"
import Tour from "../../model/tour.model";

// [GET] /cart
export const index = (req: Request, res: Response) => {
    res.render("client/pages/cart/index.pug",{
        pageTitle : "Trang giỏ hàng",
    })
}

// [POST] /tours/list-tour
export const listTour = async (req: Request, res: Response) => {
    const tours = req.body;
    console.log(req.body)
    for (const tour of tours) {
        const inforTour = await Tour.findOne({
            raw : true,
            where : {
                id : tour.tourId,
                deleted : false,
                status : "active"
            }
        })
        tour["inforTour"] = inforTour;
        tour["image"] = JSON.parse(inforTour["images"])[0];
        tour["newPrice"] = inforTour["price"] * (1 - inforTour["discount"] / 100)
        tour["totalPrice"] = tour["newPrice"] * tour.quantity;
    }
    
    // console.log(tours);

    res.json({
        tours : tours
    })
}