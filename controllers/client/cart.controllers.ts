import { Request, Response } from "express"
import Tour from "../../model/tour.model";
import User from "../../model/user.model";
import Cart from "../../model/cart.model";

// [GET] /cart
export const index = (req: Request, res: Response) => {
    res.render("client/pages/cart/index.pug",{
        pageTitle : "Trang giỏ hàng",
    })
}

// [POST] /tours/list-tour
export const listTour = async (req: Request, res: Response) => {
    const tours = req.body;
    // console.log(req.body)
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
    // // lưu tour này vào trong products của carts;
    // const tokenUser = req.cookies.tokenUser;
    // const user = await User.findOne({
    //     raw : true,
    //     where : {
    //         tokenUser : tokenUser,
    //         deleted : false
    //     }
    // })

    // console.log(user);

    // const cart = await Cart.findOne({
    //     raw : true,
    //     where : {
    //         user_id : user["id"]
    //     }
    // })

    // // cart["products"] = JSON.stringify(tours);
    
    // await Cart.update({
    //     products : JSON.stringify(tours)
    // },{
    //     where : {
    //         id : cart["id"]
    //     }
    // })

    // console.log(cart);

    res.json({
        tours : tours,
        // products : JSON.parse(cart["products"])
    })
}