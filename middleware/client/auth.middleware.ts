import { Request, Response, NextFunction } from "express"
import User from "../../model/user.model"
import Cart from "../../model/cart.model";

export const inforUser = async (req: Request, res: Response, next: NextFunction) => {
    if(req.cookies.tokenUser){
        const user = await User.findOne({
            raw : true,
            where : {
                tokenUser : req.cookies.tokenUser,
                deleted : false
            }
        })
        console.log(user);

        const cart = await Cart.findOne({
            raw : true,
            where : {
                user_id : user["id"]
            }
        })
        cart["products"] = JSON.parse(cart["products"])
        // if(cart["products"].length > 0)
        //     console.log(cart["products"].length)
        console.log(cart);
        if(user){
            res.locals.user = user;
            res.cookie("cartID", cart["id"]);
            res.locals.cart = cart;
            if(cart["products"]){
                res.locals.totalCart = cart["products"].length
            }
        }else{
            // Nếu tồn tại nhưng lại bị f12 lên chỉnh sửa
        }
    }
    next();
}