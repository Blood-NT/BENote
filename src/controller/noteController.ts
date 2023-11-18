import { Request, Response } from "express";
import { createNoteService, deleteNoteService, getInfoNoteService, getNoteByUidService, setColorNote, setImportanceNote, updateShareNoteService, updateTitleNoteService } from "../service/noteService";

import { createContentService, getContentService } from "../service/contentService";
import { Contents } from "../interfaces/content.interface";

const createNote = async (req: Request, res: Response) => {
    console.log("check",req.body);
    try {
        console.log('join try');
        const { uid, title } = req.body;
        const newNote: any = {
            title: title,
            uid: uid,
        };
        const log = await createNoteService(newNote);

        const createNote = await createContentService(uid, log.nid, "<p>Nhập nội dung</p>");

        if (createNote === 200) {
            return res.status(200).json({ message: "Tạo note thành công" });
        }
        else {
            return res.status(200).json({ message: "Lỗi" });

        }
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({ message: "Lỗiii", error: e });
    }
}

const updateTitleNote = async (req: Request, res: Response) => {
    try {
        const { nid, title } = req.body;
        const log = await updateTitleNoteService(nid, title);
        if (log === 200) {
            return res.status(200).json({ message: "Cập nhật thành công" });
        }
        else if (log === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" });
        }

    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}
const openShareNote = async (req: Request, res: Response) => {
    try {
        const { nid } = req.body;
        const log = await updateShareNoteService(nid, 2);
        if (log === 200) {
            return res.status(200).json({ message: "Cập nhật thành công" });
        }
        else if (log === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" });
        }

    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}
const closeShareNote = async (req: Request, res: Response) => {
    try {
        const { nid } = req.body;
        const log = await updateShareNoteService(nid, 1);
        if (log === 200) {
            return res.status(200).json({ message: "Cập nhật thành công" });
        }
        else if (log === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" });
        }

    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}
const updateColorNote = async (req: Request, res: Response) => {
    try {
        const { nid, color } = req.body;
        const log = await setColorNote(nid, color);
        if (log === 200) {
            return res.status(200).json({ message: "Cập nhật thành công" });
        }
        else if (log === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" });
        }

    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}
const updateImportanceNote = async (req: Request, res: Response) => {
    try {
        const { nid } = req.body;
        const log = await setImportanceNote(nid);
        if (log === 200) {
            return res.status(200).json({ message: "Cập nhật thành công" });
        }
        else if (log === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" });
        }

    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}
const deleteNote = async (req: Request, res: Response) => {
    try {
        const { nid } = req.body;
        const log = await deleteNoteService(nid);
        if (log === 200) {
            return res.status(200).json({ message: "Xóa thành công" });
        }
        else if (log === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" });
        }

    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}
const getInfoNote = async (req: Request, res: Response) => {
    try {
        const { uid } = req.body;
        const log = await getInfoNoteService(uid);

        if (log === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" });
        }
        else {
            return res.status(200).json({ message: "Thành công", data: log });
        }

    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}
const getNoteById = async (req: Request, res: Response) => {
    try {
        const { uid } = req.body;
        const log = await getNoteByUidService(uid);
        if (log === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" });
        }
        else {
            return res.status(200).json({ message: "Thành công", data: log });
        }

    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}


const coppyNote = async (req: Request, res: Response) => {
    try {
        const { uid, nid } = req.body;
        const log = await getInfoNoteService(nid);
        if (log === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" });
        }
        else {
            const newNote: any = {
                title: log.title,
                uid: uid,
            };
            const log2 = await createNoteService(newNote);

            const getcontent = await getContentService(nid);
            if (getcontent === 404) {
                return res.status(200).json({ message: "Không tìm thấy note" });
            } else if (getcontent === null) {
                return res.status(200).json({ message: "Lỗi" });
            } else {
                const createNote = await createContentService(uid, log2.nid, getcontent.content);
                if (createNote === 200) {
                    return res.status(200).json({ message: "sao chép thành công" });
                } else {
                    return res.status(200).json({ message: "Lỗi" });
                }
            }
       
        }

    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}

export default {
    createNote,
    updateTitleNote,
    updateColorNote,
    updateImportanceNote,
    deleteNote,
    getInfoNote,
    getNoteById,
    openShareNote,
    closeShareNote,
    coppyNote
    
}