import { Request, Response } from "express"
import Tour from "../../model/tour.model"
import { filterStatusHelper } from "../../helpers/filterStatus"
import { SearchHelper } from "../../helpers/search"
import { PaginationHelper } from "../../helpers/pagination"
import { Op } from "sequelize"

// [GET] //admin/tour
export const index = async (req: Request, res: Response) => {
    let where = {
        deleted : false
    }

    // filterStatus
    if(req.query.status){
        where["status"] = req.query.status;
    }
    const filterStatus = filterStatusHelper(req.query)
    // End filterStatus

    // Search 
    const objectSearch = SearchHelper(req.query);
        if(objectSearch["regex"]){
            where["title"] = req.query.keyword;
        }
    
    // End Search 

    // Pagination
    const totalTour = await Tour.count({
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
        totalTour
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
        order.push(["price", "asc"])
    }
    
    // End Sort

    const tours = await Tour.findAll({
        raw : true,
        limit : objectPagination["limitItem"],
        offset : objectPagination["skip"],
        order : order,
        where : where
    })
    tours.forEach(tour => {
        const images = JSON.parse(tour["images"]);
        tour["image"] = images[0];
    })
    
    res.render("admin/pages/tour/index.pug",{
        tours : tours,
        filterStatus : filterStatus,
        keyword : objectSearch.keyword,
        objectPagination : objectPagination
    })
}

// [PATCH] /admin/tours/change-status/1/inactive
export const changeStatus = async (req: Request, res: Response) => {
    // console.log(req.method)
    const idItem = req.params.id;
    const newStatus = req.params.status;
    await Tour.update({
        status : newStatus
    },{
        where : {
            id : idItem
        }
    })
    // req.flash("success", "Thay đổi trạng thái sản phẩm thành công")
    req.flash("success", "Thay đổi trạng thái sản phẩm thành công")
    res.redirect('/admin/tours');
    // res.redirect("back")
}

// [PATCH] /admin/tours/change-multi
export const changeMulti = async (req: Request, res: Response) => {
    // console.log(req.method)
    const typeChange = req.body.type
    const ids = req.body.ids.split("-")
    switch (typeChange) {
        case "active":
            await Tour.update({
                status : "active"
            },{where :{
                id: {[Op.in] : ids}
            }})
            req.flash("success", `Cập nhật thành công trạng thái ${ids.length} sản phẩm`);
            break;
        case "inactive":
            await Tour.update({
                status : "inactive"
            },{where :{
                id: {[Op.in] : ids}
            }})
            req.flash("success", `Cập nhật thành công trạng thái ${ids.length} sản phẩm`);
            break;
        case "delete-all":
            console.log("Logic delete nhiều sản phẩm")
            req.flash("success", `Xóa thành công ${ids.length} sản phẩm`);
            break;
    
        default:
            break;
    }

    // req.flash("success", "Thay đổi trạng thái sản phẩm thành công")
    res.redirect('/admin/tours');
    // res.redirect('back'); phải tìm cách fix theo hướng này
}

// [GET] /admin/tours/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/tour/create.pug",{

    })
}
