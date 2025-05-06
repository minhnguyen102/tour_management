import { Request, Response } from "express"
import { SearchHelper } from "../../helpers/search"
import { Op } from "sequelize"
import Tour from "../../model/tour.model"
import Category from "../../model/category.model"

// [GET] /admin/search/suggest
export const suggest = async (req: Request, res: Response) => {
    let where: any = {
        deleted : false,
    }

    const objectSearch = SearchHelper(req.query);
    if(objectSearch["keywordRegex"]){
        // console.log(objectSearch["regex"])
        where = {
            [Op.or]: [
                { slug: { [Op.regexp]: objectSearch["slugRegex"] } },
                { title: { [Op.regexp]: objectSearch["keywordRegex"] } }
            ]
        }
    }

    const tours = await Tour.findAll({
        raw : true,
        where : where
    })

    tours.forEach(tour => {
        const images = JSON.parse(tour["images"]);
        if(images){
            tour["image"] = images[0];
        }
    })

    res.json({
        code : 200,
        message : "Success",
        tours : tours
    })
}

// [GET] /admin/search/suggest
export const suggestCategory = async (req: Request, res: Response) => {
    let where: any = {
        deleted : false,
    }

    const objectSearch = SearchHelper(req.query);
    if(objectSearch["keywordRegex"]){
        // console.log(objectSearch["regex"])
        where = {
            [Op.or]: [
                { slug: { [Op.regexp]: objectSearch["slugRegex"] } },
                { title: { [Op.regexp]: objectSearch["keywordRegex"] } }
            ]
        }
    }

    const categories = await Category.findAll({
        raw : true,
        where : where
    })

    res.json({
        code : 200,
        message : "Success",
        categories : categories
    })
}