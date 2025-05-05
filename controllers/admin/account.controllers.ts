import { Request, Response } from "express"

export const index = (req: Request, res: Response) => {
    res.send("Ok")
    // res.render("admin/pages/dashboard/index.pug",{
    // })
}