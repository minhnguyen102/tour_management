import { Request, Response } from "express";
// import Tour from "../../model/tour.model";
import Category from "../../model/category.model";

// [GET] /categories
export const index = async (req: Request, res: Response) => {

    const categories = await Category.findAll({
        raw : true,
        where : {
            deleted : false,
            status : "active"
        }
    })
    
    res.render("client/pages/categories/index.pug",{
        categories : categories,
        pageTitle : "Danh sách tour"
    })
}