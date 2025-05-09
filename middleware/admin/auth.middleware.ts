import { Request, Response, NextFunction } from "express"
import { systemConfig } from "../../config/system"
import Account from "../../model/account.model";
import Role from "../../model/role.model";


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

        if(account){ // tránh trường hợp f12 sửa token
            const role = await Role.findOne({
                raw : true,
                where : {
                    id : account["role_id"]
                }
            })
            role["permission"] = JSON.parse(role["permission"]);
            // console.log(role);
            // console.log(role["permission"].includes("tour-category_view"))
            res.locals.role = role;
            res.locals.account = account;
            // console.log(account)
            next(); 
        }else{
            res.clearCookie("token")
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }
    }
}