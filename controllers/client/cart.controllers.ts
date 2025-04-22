import { Request, Response } from "express"

export const index = (req: Request, res: Response) => {
    res.render("client/pages/cart/index.pug",{
        pageTitle : "Trang giỏ hàng",
    })
}