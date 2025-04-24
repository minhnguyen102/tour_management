import { Request, Response } from "express"
import Order from "../../model/order.model";
import { generateOrderCode } from "../../helpers/generate"
import Tour from "../../model/tour.model";
import OrderItem from "../../model/order-item.model";

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
        message : "Đặt hàng thành công"
    })
}