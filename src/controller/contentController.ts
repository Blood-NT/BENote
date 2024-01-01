import { Request, Response } from "express";
import { createContentService, getContentService } from "../service/contentService";
import { create } from "domain";


const getContentData = async (req: Request, res: Response) => {
    try {
        const { nid } = req.body;
        const content = await getContentService(nid);
        if (content === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" });
        }
        else {
            return res.status(200).json({ message: "Lấy dữ liệu thành công", data: content });
        }
    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}
const createContent = async (req: Request, res: Response) => {
    console.log("create content data",req.body);
    try {
        const { nid, uid, content } = req.body;
        const log = await createContentService(uid,nid, content);
        if (log === 200) {
            return res.status(200).json({ message: "Tạo thành công", statusCode: 200 });
        }
        else if (log === 404) {
            return res.status(200).json({ message: "Không tìm thấy note//" });
        }
    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
    
}


export default {

    getContentData,
    createContent

}