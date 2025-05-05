import { Request, Response } from "express"
import md5 from "md5";
import Role from "../../model/role.model";
import { generateRandomTokenAccount } from "../../helpers/generate"
import Account from "../../model/account.model";
import { systemConfig } from "../../config/system";

// [GET] /admin/accounts
export const index = async (req: Request, res: Response) => {
    //  Lấy ra danh sách tài khoản
    const accounts = await Account.findAll({
        raw : true,
        where : {
            deleted : false
        }
    })
    
    for (const account of accounts) {
        const role_id = account["role_id"];
        const role = await Role.findOne({
            raw : true,
            where : {
                id : role_id,
                deleted : false
            }
        })
        account["role_title"] = role["title"];
        console.log(account);
    }


    res.render("admin/pages/account/index.pug",{
        accounts : accounts
    })
}

// [GET] /admin/accounts/create
export const create = async (req: Request, res: Response) => {
    const roles = await Role.findAll({
        raw : true,
        where : {
            deleted : false
        }
    })
    res.render("admin/pages/account/create.pug",{
        roles : roles
    })
}

// [GET] /admin/accounts/create
export const createPost = async (req: Request, res: Response) => {
    req.body.password = md5(req.body.password);
    // sinh token
    const token = generateRandomTokenAccount(20);
    
    const dataAccount = {
        fullname : req.body.fullname,
        email : req.body.email,
        password : req.body.password,
        token : token,
        avatar : req.body.avatar,
        role_id : parseInt(req.body.role_id),
        status : req.body.status,
    }
    await Account.create(dataAccount);
    req.flash("success","Tạo tài khoản thành công");

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
}