import { Request, Response } from "express"
import Account from "../../model/account.model"
import md5 from "md5"
import { Op } from "sequelize";
import { systemConfig } from "../../config/system";

// [GET] /admin/my-account
export const index = (req: Request, res: Response) => {
    res.render("admin/pages/my-account/index.pug",{
        pageTitle : "Trang thông tin cá nhân"
    })
}

// [GET] /admin/my-account/edit
export const edit = (req: Request, res: Response) => {
    res.render("admin/pages/my-account/edit.pug",{
        pageTitle : "Trang chỉnh sửa thông tin cá nhân"
    })
}


 // [POST] /admin/my-account/edit
export const editPatch = async (req: Request, res: Response) =>{
    const id = res.locals.account.id;
    const email = req.body.email;
    const password = req.body.password
    let where: any = {
        id : {[Op.ne] : id},
        email : email,
        deleted : false
    }
    const checkEmail = await Account.findOne({
        where : where
    })
    if(checkEmail){
        req.flash("error", "Email đã tồn tại");
    }else{
        if(!password){
            delete req.body.password;
        }else{
            req.body.password = md5(req.body.password);
        }
        await Account.update(req.body,{
            where : {
                id : id
            }
        })
        req.flash("success", "Cập nhật thông tin cá nhân thành công")
    }
    res.redirect(`${systemConfig.prefixAdmin}/my-account`);
}