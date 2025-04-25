import { Request, Response } from "express"
import Category from "../../model/category.model"

export const index = async (req: Request, res: Response) => {
    const categories = await Category.findAll({
        raw : true,
        where : {
            deleted : false
        }
    })

    console.log(categories)
    res.render("admin/pages/category/index.pug",{
        categories : categories
    })
}