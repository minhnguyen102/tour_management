import { Request, Response, NextFunction } from "express";

// Register
export const registerPost = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.fullname){
        req.flash('error', `Vui lòng nhập họ tên`);
        res.redirect(`/user/register`);
        return;
    }
    if(!req.body.email){
        req.flash('error', `Vui lòng nhập email`);
        res.redirect(`/user/register`);
        return;
    }

    if(!req.body.password){
        req.flash('error', `Vui lòng nhập mật khẩu`);
        res.redirect(`/user/register`);
        return;
    }
    if(!req.body.repassword){
        req.flash('error', `Vui lòng nhập xác nhận mật khẩu`);
        res.redirect(`/user/register`);
        return;
    }

    if(req.body.repassword != req.body.password){
        req.flash('error', `Mật khẩu nhập lại không chính xác`);
        res.redirect(`/user/register`);
        return;
    }
    next();
}
// End Register