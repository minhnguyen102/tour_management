import { Request, Response } from "express"

export const order = (req: Request, res: Response) => {
    let data = req.body;
    res.json({
        code : 200,
        message : "Đặt hàng thành công"
    })
}