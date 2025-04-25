import { Request, Response } from "express"
import Category from "../../model/category.model"


// [GET] //admin/tours-category
export const index = async (req: Request, res: Response) => {
    const categories = await Category.findAll({
        raw : true,
        where : {
            deleted : false
        }
    })

    res.render("admin/pages/category/index.pug",{
        categories : categories
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