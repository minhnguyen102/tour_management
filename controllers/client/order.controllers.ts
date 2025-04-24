import { Request, Response } from "express"
import Order from "../../model/order.model";
import { generateOrderCode } from "../../helpers/generate"

export const order = async (req: Request, res: Response) => {
    let data = req.body;
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
    res.json({
        code : 200,
        message : "Đặt hàng thành công"
    })
}