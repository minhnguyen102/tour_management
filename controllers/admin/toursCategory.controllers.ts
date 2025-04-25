import { Request, Response } from "express"
import Category from "../../model/category.model"
import { filterStatusHelper } from "../../helpers/filterStatus"

// [GET] //admin/tours-category
export const index = async (req: Request, res: Response) => {

    const where = {
        deleted : false
    }

    // filter-Status
    if(req.query.status){
        console.log(req.query.status)
        where["status"] = req.query.status;
    }
    const filterStatus = filterStatusHelper(req.query)
    // End filter-Status

    const categories = await Category.findAll({
        raw : true,
        where : where
    })

    res.render("admin/pages/category/index.pug",{
        categories : categories,
        filterStatus : filterStatus
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

    res.redirect('/admin/tours-category');
}