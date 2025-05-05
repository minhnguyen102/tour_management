import md5 from "md5";
import Role from "../../model/role.model";
import Account from "../../model/account.model";
import { Op } from "sequelize";
import { Request, Response } from "express"
import { systemConfig } from "../../config/system";
import { PaginationHelper } from "../../helpers/pagination"
import { filterStatusHelper } from "../../helpers/filterStatus"
import { generateRandomTokenAccount } from "../../helpers/generate"

// [GET] /admin/accounts
export const index = async (req: Request, res: Response) => {
    let where: any = {
        deleted : false
    }
    // filerStatus
    if(req.query.status){
        where["status"] = req.query.status;
    }
    const filterStatus = filterStatusHelper(req.query);
    console.log(filterStatus);
    // End filerStatus

    // Pagination
    const totalAccount = await Account.count({
        where : {
            deleted : false
        }
    })
    const objectPagination = PaginationHelper(
        {
            limitItem : 5,
            currentPage : 1
        },
        req.query,
        totalAccount
    )
    // End Pagination

    // Sort
    let order=[];
    const sortKey = req.query.sortKey
    const sortValue = req.query.sortValue;
    if(sortKey && sortValue){
        const objectOrder = [sortKey, sortValue];
        order.push(objectOrder);
    }else{
        order.push(["role_id", "desc"])
    }
    // End Sort

    //  Lấy ra danh sách tài khoản
    const accounts = await Account.findAll({
        raw : true,
        limit : objectPagination["limitItem"],
        offset : objectPagination["skip"],
        order : order,
        where : where
    })

    // xử lí tiêu đề
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
    }

    res.render("admin/pages/account/index.pug",{
        accounts : accounts,
        filterStatus : filterStatus,
        objectPagination : objectPagination
    })
}

// [PATCH] /admin/accounts/change-status/1/inactive
export const changeStatus = async (req: Request, res: Response) => {
    // console.log(req.method)
    const idItem = req.params.id;
    const newStatus = req.params.status;
    await Account.update({
        status : newStatus
    },{
        where : {
            id : idItem
        }
    })
    req.flash("success", "Thay đổi trạng thái tài khoản thành công")
    res.redirect('/admin/accounts');
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

// [GET] /admin/accounts/edit/:id
export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;

    const account = await Account.findOne({
        raw : true,
        where : {
            id : id,
            deleted : false
        }
    })
    const roles = await Role.findAll({
        raw : true,
        where : {
            deleted : false
        }
    })
    res.render("admin/pages/account/edit.pug",{
        account : account,
        roles : roles
    })
}

// [PATCH] /admin/accounts/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    const id = req.params.id;
    const checkEmail = await Account.findOne({
        where : {
            id : {[Op.ne] : id},
            deleted : false,
            email : req.body.email
        }
    }) // tránh trường hợp sửa email trùng với email của người khác 
    if(checkEmail){
        req.flash("error", "Tài khoản email đã tồn tại")
    }else{
        const dataUpdate = {
            fullname : req.body.fullname,
            email : req.body.email,
            role_id : parseInt(req.body.role_id),
            status : req.body.status,
        }
        if(req.body.password !== ""){
            req.body.password = md5(req.body.password);
            dataUpdate["password"] = req.body.password;
        }
        if(req.body.avatar){
            dataUpdate["avatar"] = req.body.avatar;
        }
        
        await Account.update(dataUpdate,{
            where : {
                id : id,
                deleted : false
            }
        })
        req.flash("success", "Cập nhật thông tin tài khoản thành công")
    }
    res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${id}`)
}

// [GET] /admin/accounts/detail/:id
export const detail = async (req: Request, res: Response) => { 
    const id = req.params.id;

    const account = await Account.findOne({
        raw : true,
        where : {
            id : id,
            deleted : false
        }
    })
    const role_id = account["role_id"];
    const role = await Role.findOne({
        raw : true,
        where : {
            id : role_id,
            deleted : false
        }
    })
    res.render("admin/pages/account/detail.pug",{
        account : account,
        role : role
    })
}

// [DELETE] /admin/accounts/detail/:id
export const deleted = async (req: Request, res: Response) => { 
    const id = req.params.id;
    await Account.update({
        deleted : true
    },{
        where : {
            id : id,
            deleted : false
        }
    })
    req.flash("success", "Xóa tài khoản thành công");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)
}