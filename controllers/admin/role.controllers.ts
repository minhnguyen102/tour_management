import { Request, Response } from "express"
import Role from "../../model/role.model"
import { systemConfig } from "../../config/system"

// [GET] /admin/roles
export const index = async (req: Request, res: Response) => {
    const records = await Role.findAll({
        raw : true,
        where : {
            deleted : false
        }
    })
    res.render("admin/pages/role/index.pug",{
        records : records
    })
}

// [GET] /admin/roles
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/role/create.pug")
}

// [POST] /admin/roles
export const createPost = async (req: Request, res: Response) => {
    const title = req.body.title;
    const description= req.body.description;

    const dataRole = {
        title : title,
        description : description
    }
    
    const role = await Role.create(dataRole);

    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/edit/:id
export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;    
    const role = await Role.findOne({
        raw : true,
        where : {
            id : id,
            deleted : false,
        }
    })
    res.render("admin/pages/role/edit.pug",{
        role : role
    })
}

// [PATCH] /admin/roles/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    const id = req.params.id;

    const title = req.body.title;
    const description = req.body.description;

    await Role.update({
        title : title,
        description : description
    },{
        where : {
            id : id
        }
    })
    req.flash("success", "Cập nhật thông tin thành công")
    res.redirect(`${systemConfig.prefixAdmin}/roles/edit/${id}`);
}