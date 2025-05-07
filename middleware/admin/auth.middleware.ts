import { Request, Response, NextFunction } from "express"
import { systemConfig } from "../../config/system"
import Account from "../../model/account.model";


export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if(!token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }else{
        const account = await Account.findOne({
            raw : true,
            where : {
                token : token,
                deleted : false
            }
        })

        if(account){
            next(); // tránh trường hợp f12 sửa token
        }else{
            res.clearCookie("token")
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }
    }
}