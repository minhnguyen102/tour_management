import { Request, Response } from "express"
import Role from "../../model/role.model"
import { systemConfig } from "../../config/system"
import { Json } from "sequelize/types/utils"

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

// [GET] /admin/roles/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;    
    const role = await Role.findOne({
        raw : true,
        where : {
            id : id,
            deleted : false,
        }
    })
    res.render("admin/pages/role/detail.pug",{
        role : role
    })
}

// [DELETE] /admin/roles/delete/:id
export const deleted = async (req: Request, res: Response) => {
    const id = req.params.id;
    await Role.update({
        deleted : true
    },{
        where : {
            id : id
        }
    })
    req.flash("success", "Xóa quyền thành công")
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/permissions
export const permissions = async (req: Request, res: Response) => {
    const records = await Role.findAll({
        raw : true,
        where : {
            deleted : false
        }
    })
    res.render("admin/pages/role/permissions.pug",{
        records : records
    })
}

// [PATCH] /admin/roles/permissions
export const permissionsPatch = async (req: Request, res: Response) => {
    const data_permissions = JSON.parse(req.body.permissions);
    for (const item of data_permissions) {
        await Role.update({
            permission : JSON.stringify(item.permissions)
        },{
            where : {
                id : item.id
            }
        })
    }
    req.flash("success", "Cập nhật quyền thành công")
    res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`)
}