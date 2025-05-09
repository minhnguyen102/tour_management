import { Request, Response } from "express"
import User from "../../model/user.model"
import md5 from "md5"
import { generateRandomTokenAccount } from "../../helpers/generate"
import Cart from "../../model/cart.model"

//[GET] /user/register
export const register = (req: Request, res: Response) => {
    res.render("client/pages/user/register.pug",{
        pageTitle : "Trang đăng kí",
    })
}

//[POST] /user/register
// Đăng kí đồng thời phải tạo luôn cho họ 1 cartID
export const registerPost = async (req: Request, res: Response) => {
    const exitEmail = await User.findOne({
        raw : true,
        where : {
            email : req.body.email,
            deleted : false
        }
    })

    if(exitEmail){
        req.flash("error", "Tài khoản email đã tồn tại. Vui lòng tạo tài khoản bằng email khác!")
        res.redirect("/user/register")
        return;
    }

    let objectUser: any = {
        fullname : req.body.fullname,
        email : req.body.email,
        password :  md5(req.body.password),
        tokenUser : generateRandomTokenAccount(20)
    }
    const user = await User.create(objectUser);

    const objectCart = {
        user_id : user["id"]
    }

    const cart = await Cart.create(objectCart);

    req.flash("success", "Tạo mới tài khoản thành công")
    res.redirect("/user/login")
}

//[GET] /user/login
export const login = (req: Request, res: Response) => {
    res.render("client/pages/user/login.pug",{
        pageTitle : "Trang đăng nhập",
    })
}

//[POST] /user/login
export const loginPost = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
        raw : true,
        where : {
            email : email,
            deleted : false
        }
    })

    if(!user){
        req.flash("error", "Email không tồn tại!");
        res.redirect("/user/login")
        return;
    }

    if(user["password"] != md5(password)){
        req.flash("error", "Sai mật khẩu!");
        res.redirect("/user/login")
        return;
    }

    res.cookie("tokenUser", user["tokenUser"])
    res.redirect("/categories")
}

//[GET] /user/logout
export const logout = (req: Request, res: Response) => {
    res.clearCookie("tokenUser");
    res.clearCookie("cartID");
    res.redirect(`/user/login`)
}