import { Request, Response } from "express"
import Tour from "../../model/tour.model"
import Tour_Category from "../../model/tour-category.model"
import { filterStatusHelper } from "../../helpers/filterStatus"
import { SearchHelper } from "../../helpers/search"
import { PaginationHelper } from "../../helpers/pagination"
import { Op, QueryTypes } from "sequelize"
import Category from "../../model/category.model"
import { generateTourCode } from "../../helpers/generate"
import { systemConfig } from "../../config/system"
import sequelize from "../../config/database"

// [GET] //admin/tour
export const index = async (req: Request, res: Response) => {
    let where: any = {
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
    if(objectSearch["keywordRegex"]){
        // console.log(objectSearch["regex"])
        where = {
            [Op.or]: [
                { slug: { [Op.regexp]: objectSearch["slugRegex"] } },
                { title: { [Op.regexp]: objectSearch["keywordRegex"] } }
            ]
        }
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
        if(images){
            tour["image"] = images[0];
        }
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
    // req.flash("success", "Thay đổi trạng thái tour thành công")
    req.flash("success", "Thay đổi trạng thái tour thành công")
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
            req.flash("success", `Cập nhật thành công trạng thái ${ids.length} tour`);
            break;
        case "inactive":
            await Tour.update({
                status : "inactive"
            },{where :{
                id: {[Op.in] : ids}
            }})
            req.flash("success", `Cập nhật thành công trạng thái ${ids.length} tour`);
            break;
        case "delete-all":
            await Tour.update({
                deleted : true
            },{where :{
                id: {[Op.in] : ids}
            }})
            req.flash("success", `Xóa thành công ${ids.length} tour`);
            break;
    
        default:
            break;
    }

    res.redirect('/admin/tours');
    // res.redirect('back'); phải tìm cách fix theo hướng này
}

// [GET] /admin/tours/create
export const create = async (req: Request, res: Response) => {
    const categories = await Category.findAll({
        raw : true,
        where : {
            status : "active",
            deleted : false
        }
    })
    res.render("admin/pages/tour/create.pug",{
        categories : categories
    })
}

// [POST] /admin/tours/create
export const createPost = async (req: Request, res: Response) => {
    const totalTours = await Tour.count();
    const tourCode = generateTourCode(totalTours + 1);

    const dataTour = {
        title : req.body.title,
        code : tourCode,
        images : JSON.stringify(req.body.images),
        price : parseInt(req.body.price),
        discount : parseInt(req.body.discount),
        stock : parseInt(req.body.stock),
        timeStart : req.body.timeStart,
        status : req.body.status,
        information : req.body.information,
        schedule : req.body.schedule
    }

    const tour = await Tour.create(dataTour);
    const tour_id = tour["id"] 

    const dataTourCategory = {
        tour_id : tour_id,
        category_id : req.body.category_id
    }
    await Tour_Category.create(dataTourCategory)

    // res.send("Create")
    res.redirect(`${systemConfig.prefixAdmin}/tours`)
    
}

// [GET] /admin/tours/edit/:id
export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;
    const tour = await Tour.findOne({
        raw : true,
        where : {
            id : id
        }
    })
    // console.log(tour)
    const images = JSON.parse(tour["images"]);
    tour['image'] = images[0];

    const timeStart = tour["timeStart"];
    const formatTimeStart = new Date(timeStart).toISOString().slice(0,16)
    tour['formatTimeStart'] = formatTimeStart

    // Phần danh mục. => lấy ra tất cả danh mục + lấy ra danh mục cha => so sánh
    // Lấy ra danh mục cha
    const sql = `
        SELECT ct.* 
            from ((categories ct
                JOIN tour_categories tc on ct.id = tc.category_id)
                JOIN tours t on t.id = tc.tour_id)
            WHERE t.id = ${id}
    `
    const inforCategory = await sequelize.query(sql,{
        type : QueryTypes.SELECT
    })

    // Lấy ra tất cả danh mục
    const categories = await Category.findAll({
        raw : true, 
        where : {
            deleted : false,
            status : "active"
        }
    })


    res.render("admin/pages/tour/edit.pug",{
        tour : tour,
        inforCategory : inforCategory,
        categories : categories
    })
}

// [PATCH] /admin/tours/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    console.log(req.body);
    const id = req.params.id;

    await Tour.update({
        title : req.body.title,
        code : req.body.code,
        price : parseInt(req.body.price),
        discount : parseInt(req.body.discount),
        stock: parseInt(req.body.stock),
        information : req.body.information,
        schedule : req.body.schedule,
        timeStart : new Date(req.body.timeStart),
        status : req.body.status
    },{
        where : {
            id : id
        }
    })
    req.flash("success", "Cập nhật thông tin tour thành công")
    res.redirect(`/admin/tours/edit/${id}`)
}

// [GET] /admin/tours/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const tour = await Tour.findOne({
        raw : true,
        where : {
            id : id
        }
    })
    console.log(tour);

    const images = JSON.parse(tour["images"]);
    tour['image'] = images[0];

    const timeStart = tour["timeStart"];
    const formatTimeStart = new Date(timeStart).toISOString().slice(0,16)
    tour['formatTimeStart'] = formatTimeStart

    // Phần danh mục. => lấy ra tất cả danh mục + lấy ra danh mục cha => so sánh
    // Lấy ra danh mục cha
    const sql = `
        SELECT ct.* 
            from ((categories ct
                JOIN tour_categories tc on ct.id = tc.category_id)
                JOIN tours t on t.id = tc.tour_id)
            WHERE t.id = ${id}
    `
    const inforCategory = await sequelize.query(sql,{
        type : QueryTypes.SELECT
    })

    // Lấy ra tất cả danh mục
    const categories = await Category.findAll({
        raw : true, 
        where : {
            deleted : false,
            status : "active"
        }
    })

    res.render("admin/pages/tour/detail.pug",{
        tour : tour,
        inforCategory : inforCategory,
        categories : categories
    })
}

// [DELETE] /admin/tours/delete/:id
export const deleted = async (req: Request, res: Response) => {
    const idItem = req.params.id;
    await Tour.update({
        deleted : true
    },{
        where : {
            id : idItem
        }
    })
    req.flash("success", "Xóa tour thành công")
    res.redirect('/admin/tours');
}


