import { Request, Response } from "express"
import Account from "../../model/account.model";
import md5 from "md5"
import { systemConfig } from "../../config/system";


// [GET] /admin/auths/login
export const login = (req: Request, res: Response) => {
    res.render("admin/pages/auth/login.pug",{
    })
}

// [POST] /admin/auths/login
export const loginPost = async (req: Request, res: Response) => {
    let where : any = {
        email : req.body.email,
        deleted : false
    }
    const account = await Account.findOne({
        raw: true,
        where : where
    })

    if(!account){
        req.flash("error", "Email không tồn tại");
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return;
    }
    if(account["password"] !== md5(req.body.password)){
        req.flash("error", "Sai mật khẩu");
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return;
    }
    if(account["status"] == "inactive"){
        req.flash("error", "Tài khoản đã bị khóa");
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return;
    }

    // console.log(account);
    res.cookie("token", account["token"],{
        maxAge : 24 * 60 * 60 * 1000 // đơn vị là milisecond <=> 5s
    });
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}

// [GET] /admin/auth/logout
export const logout = (req: Request, res: Response) => { 
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}
