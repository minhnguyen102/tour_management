import Category from "../../model/category.model"
import { Request, Response } from "express"
import { SearchHelper } from "../../helpers/search"
import { PaginationHelper } from "../../helpers/pagination"
import { filterStatusHelper } from "../../helpers/filterStatus"
import { systemConfig } from "../../config/system"

// [GET] //admin/tours-category
export const index = async (req: Request, res: Response) => {
    const where = {
        deleted : false
    }

    // filter-Status
    if(req.query.status){
        where["status"] = req.query.status;
    }
    const filterStatus = filterStatusHelper(req.query)
    // End filter-Status

    // Search
    const objectSearch = SearchHelper(req.query);
    if(objectSearch["regex"]){
        where["title"] = req.query.keyword;
    }
    
    // End Search

    // Pagination
    const totalCategory = await Category.count({
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
        totalCategory
    )
    // End Pagination

    const categories = await Category.findAll({
        raw : true,
        limit : objectPagination["limitItem"],
        offset : objectPagination["skip"],
        where : where
    })

    res.render("admin/pages/category/index.pug",{
        categories : categories,
        filterStatus : filterStatus,
        objectPagination : objectPagination,
        keyword : objectSearch.keyword
    })
}

// [GET] //admin/tours-category/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/category/create.pug")
}

// [POST] //admin/tours-category/create
export const createPost = async (req: Request, res: Response) => {
    // console.log(req.body);
    
    const dataCategory = {
        title : req.body.title,
        description : req.body.description,
        status : req.body.status,
        image : req.body.image
    }
    
    await Category.create(dataCategory);
    req.flash("success", "Tạo mới danh mục tour thành công")
    res.redirect(`${systemConfig.prefixAdmin}/tours-category`)
}

// [PATCH] /admin/tours-category/change-status/1/inactive
export const changeStatus = async (req: Request, res: Response) => {
    // console.log(req.method)
    const idItem = req.params.id;
    const newStatus = req.params.status;
    await Category.update({
        status : newStatus
    },{
        where : {
            id : idItem
        }
    })
    req.flash("success", "Thay đổi trạng thái sản phẩm thành công")
    res.redirect('/admin/tours-category');
}

// [GET] //admin/tours-category/edit/:id
export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await Category.findOne({
        raw : true,
        where : {
            id : id,
            deleted : false,
        }
    })
    res.render("admin/pages/category/edit.pug",{
        data : data
    })
}

// [GET] //admin/tours-category/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    const id = req.params.id;
    
    await Category.update(req.body,{
        where : {
            id : id
        }
    })
    req.flash("success", "Cập nhật thông tin danh mục thành công")
    res.redirect(`${systemConfig.prefixAdmin}/tours-category/edit/${id}`)
}

// [GET] //admin/tours-category/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await Category.findOne({
        raw : true,
        where : {
            id : id,
            deleted : false,
            status : "active"
        }
    })

    res.render("admin/pages/category/detail.pug",{
        data : data
    })
}

// [DELETE] //admin/tours-category/delete/:id
export const deleted = async (req: Request, res: Response) => {
    const id =  req.params.id;
    await Category.update({
        deleted : true
    },{
        where : {
            id : id,
            deleted : false
        }
    })
    req.flash("success", "Xóa thành công");
    res.redirect(`${systemConfig.prefixAdmin}/tours-category`)
}