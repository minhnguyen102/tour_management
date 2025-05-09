import { Request, Response } from "express"
import Order from "../../model/order.model"
import OrderItem from "../../model/order-item.model";
import Tour from "../../model/tour.model";
import { systemConfig } from "../../config/system";

// [GET] /admin/orders
export const index = async (req: Request, res: Response) => {
    const orders = await Order.findAll({
        raw : true,
        where : {
            deleted : false,
            accept : false
        }
    })
    // lấy tất cả orders_item có orderID = orderID => tính tổng tiền của order đó
    for (const order of orders) {
        const id = order["id"];
        const orders_item = await OrderItem.findAll({
            raw : true,
            where : {
                orderId : id
            }
        })
        const totalPrice = orders_item.reduce((sum, orderItem) => sum + ( ((1 - orderItem["discount"] /100 ) * orderItem["price"]) * orderItem["quantity"] ), 0)
        order["totalPrice"] = totalPrice;
    }
    
    // Đếm số đơn hàng đã được duyệt
    const countOrderAc = await Order.count({
        where : {
            accept : true,
            deleted : false
        }
    })
    res.render("admin/pages/order/index.pug",{
        pageTitle : "Trang quản lí đơn hàng",
        orders : orders,
        countOrderAc : countOrderAc
    })
}

// [GET] /admin/orders/detail/7
export const detail = async (req: Request, res: Response) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({
        raw : true,
        where : {
            id : orderId,
            deleted : false
        }
    })
    
    const ordersItem = await OrderItem.findAll({
        raw : true,
        where : {
            orderId : orderId
        }
    })
    
    // lấy ra thông tin tour cho từng orderItem
    for (const orderItem of ordersItem) {
        const tourId = orderItem["tourId"];
        const tour = await Tour.findOne({
            raw : true,
            where : {
                id : tourId,
                deleted : false
            }
        })
        
        // Xử lí ảnh 
        const images = JSON.parse(tour["images"]);
        tour["image"] = images[0];
        orderItem["infoTour"] = tour;

        // Xử lí giá sau discount
        orderItem["priceNew"] = (1 - orderItem["discount"] / 100) * orderItem["price"]

        // Xử lí totalPrice của orderitem
        orderItem["totalPrice"] = orderItem["priceNew"] * orderItem["quantity"]
    }

    // totalPrice của order
    const totalPrice = ordersItem.reduce((sum, orderItem) => sum + orderItem["priceNew"] * orderItem["quantity"], 0)
    order["totalPrice"] = totalPrice;

    order["ordersItem"] = ordersItem;

    res.render("admin/pages/order/detail.pug",{
        pageTitle : "Trang chi tiết đơn hàng",
        order : order,
        ordersItem : ordersItem
    })
}

// [POST] /admin/orders/accept
export const acceptPost = async (req: Request, res: Response) => {
    const orderId = req.body.orderId;
    await Order.update({
        accept : true
    },{
        where :{
            id : orderId,
            deleted : false,
            accept : false
        }
    })
    res.redirect(`${systemConfig.prefixAdmin}/orders`)
}

// [GET] /admin/orders/accept
export const accept = async (req: Request, res: Response) => {
    const ordersAccept = await Order.findAll({
        raw : true,
        where : {
            accept : true,
            deleted : false
        }
    })
    res.render("admin/pages/order/accept.pug",{
        pageTitle : "Đơn hàng đã xác nhận",
        ordersAccept : ordersAccept
    })
}