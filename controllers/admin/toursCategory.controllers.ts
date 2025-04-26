import { Request, Response } from "express"
import Category from "../../model/category.model"
import { filterStatusHelper } from "../../helpers/filterStatus"
import { PaginationHelper } from "../../helpers/pagination"
import { SearchHelper } from "../../helpers/search"

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
            status : "active",
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
    // req.flash("success", "Thay đổi trạng thái sản phẩm thành công")
    res.redirect('/admin/tours-category');
}