import { Request, Response } from "express"
import Order from "../../model/order.model";
import { generateOrderCode } from "../../helpers/generate"
import Tour from "../../model/tour.model";
import OrderItem from "../../model/order-item.model";
import { or, QueryTypes } from "sequelize";
import sequelize from "../../config/database";
import { Json } from "sequelize/types/utils";

// [POST] /order
export const order = async (req: Request, res: Response) => {
    let data = req.body;

    // Lưu thông tin vào bảng order
    const objectOrder = {
        code : "",
        fullName: data.inforUser.fullName,
        phone : data.inforUser.phone,
        note: data.inforUser.note,
        status : "initial"	
    }
    const order = await Order.create(objectOrder);
    const orderID = order.dataValues.id;
    const orderCode = generateOrderCode(orderID)
    await order.update({
        code : orderCode
    },{
        where : {
            id : orderID
        }
    })
    // Hết Lưu thông tin vào bảng order

    // Lưu thông tin bảo bảng orderItem
    for (const item of data.tour) {
        let orderItem = {
            orderId : orderID,
            tourId : item.tourId,
            quantity : item.quantity
        }
        const inforTour = await Tour.findOne({
            raw : true,
            where : {
                id : item.tourId,
                deleted : false,
                status : "active"
            }
        })
        orderItem["price"] = inforTour["price"];
        orderItem["discount"] = inforTour["discount"];
        orderItem["timeStart"] = inforTour["timeStart"];

        await OrderItem.create(orderItem);
    }
    // Hết Lưu thông tin bảo bảng orderItem

    res.json({
        code : 200,
        message : "Đặt hàng thành công",
        orderCode : orderCode
    })
}

// [GET] /order/success/:orderCode
export const success = async (req: Request, res: Response) => {
    const orderCode = req.params.orderCode;
    const sqlInforTour = `
        SELECT t.images, t.title, t.price, t.discount, ot.quantity 
        FROM orders o
        JOIN orders_item ot
        JOIN tours t 
        on o.id = ot.orderId and t.id = ot.tourId
        WHERE o.CODE = "${orderCode}"
    `
    const inforTour = await sequelize.query(sqlInforTour,
        {type : QueryTypes.SELECT}
    );
    

    for (const item of inforTour) {
        const images = JSON.parse(item["images"]);
        item["image"] = images[0]

        item["newPrice"] = item["price"] * (1 - item["discount"]/ 100); 
        item["totalPrice"] = item["newPrice"] * item["quantity"];
    }

    const inforUser = await Order.findOne({
        raw : true,
        where : {
            code : orderCode,
            deleted : false,
            status : "initial"
        }
    })
    const totalPrice = inforTour.reduce((sum, item) => sum + item["totalPrice"], 0)
    
    res.render("client/pages/order/success.pug",{
        pageTitle : "Đặt hàng thành công",
        inforUser: inforUser,
        inforTour: inforTour,
        totalPrice : totalPrice
    })
}