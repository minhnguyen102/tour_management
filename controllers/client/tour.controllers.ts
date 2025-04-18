import { Request, Response } from "express";
import Tour from "../../model/tour.model";
import Category from "../../model/category.model";


// [GET] /tours
export const tours = async (req: Request, res: Response) => {
    const tours = await Tour.findAll({
        where : {
            deleted : false,
            status : "active"
        },
        raw : true
    });
    // console.log(tours);

    res.render("client/pages/tours/index.pug",{
        tours : tours,
        pageTitle : "Danh sách tour"
    })
}

// [GET] /tours/:slugCategory
export const category = async (req: Request, res: Response) => {
    const slugCategory = req.params.slugCategory;
    const categoryId = await Category.findOne({
        raw : true,
        where : {
            slug : slugCategory
        }
    })
    console.log(categoryId)
    res.send("Ok")
}