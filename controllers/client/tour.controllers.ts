import { Request, Response } from "express";
import Tour from "../../model/tour.model";
import Category from "../../model/category.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";
import { Json } from "sequelize/types/utils";


// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
    const slugCategory = req.params.slugCategory;
    const sql = `
    SELECT t.*, ROUND((1 - t.discount/100) * t.price, 0) as new_price
    FROM tours as t
    JOIN tour_categories as tc 
    JOIN categories as c
    ON t.id = tc.tour_id AND tc.category_id = c.id
    WHERE
        c.slug = "${slugCategory}" AND
        t.deleted = false AND
        t.status = "active" AND
        c.deleted = false AND
        c.status = "active"
    `
    const tours = await sequelize.query(
        sql,
        { type : QueryTypes.SELECT }
    )

    
    tours.forEach(tour => {
        if(tour["images"]){
            const images = JSON.parse(tour["images"]);
            tour["image"] = images[0]
        }

        tour["new_price"] =  parseFloat(tour["new_price"])
    })

    console.log(tours);

    res.render("client/pages/tours/index.pug",{
        tours: tours
    })
}