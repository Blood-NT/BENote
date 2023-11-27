import { Request, Response } from "express";
import { createNoteService, deleteNoteService, getInfoNoteService, getNoteByCodeService, getNoteByUidService, setColorNote, setImportanceNote, updateShareNoteService, updateTitleNoteService } from "../service/noteService";

import { createContentService, getContentService } from "../service/contentService";
import { Contents } from "../interfaces/content.interface";
import { createSaveNoteService, deleteAllNoteService, deleteSaveNoteService, getSaveNoteService } from "../service/saveService";

const createNote = async (req: Request, res: Response) => {
    console.log("check", req.body);
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
        const { uid,nid,type } = req.body;
        const log = await updateShareNoteService(uid,nid,type);
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
        const { uid, nid } = req.body;
        const log = await setImportanceNote( nid,uid);
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
    console.log("delete");
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
        const { nid } = req.body;
        const log = await getInfoNoteService(nid);

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
const copyNote = async (req: Request, res: Response) => {
    try {
        const { uid, nid } = req.body;
        const log = await getInfoNoteService(nid);
        if (log === 404) {
            return res.status(200).json({ message: "Không tìm thấy note1" });
        }
        else {
            const newNote: any = {
                title: log.title,
                uid: uid,
            };
            const log2 = await createNoteService(newNote);
            const getcontent = await getContentService(nid);
            if (getcontent === 404) {
                return res.status(200).json({ message: "Không tìm thấy note2" });
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
const getNoteByCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.body;
        const log = await getNoteByCodeService(code);
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

//save
const saveNote = async (req: Request, res: Response) => {
    try {
        const { hid, gid, nid } = req.body;
        const getNote = await getSaveNoteService(gid, nid);
        console.log("1");
        if (getNote === 404) {
            console.log("2");
            const log = await createSaveNoteService(hid, gid, nid);
            console.log("data",hid, gid, nid);
            if (log === 200) {
                console.warn("3");
                return res.status(200).json({ message: "Lưu thành công" });
            }
            else if (log === 404) {
                console.log("4");
                return res.status(200).json({ message: "Không tìm thấy note" });
            }
        }
        else {
            console.log("5");
            return res.status(200).json({ message: "hmmm looix " });
        }

    }
    catch (e) {
        console.log("6",e);
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}
const unsaveNote = async (req: Request, res: Response) => {
    try {
        const { hid, gid, nid } = req.body;
        const getNote = await getSaveNoteService(gid, nid);
        if (getNote === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" });
        }
        else {
            const log = await deleteSaveNoteService(hid, gid, nid);
            if (log === 200) {
                return res.status(200).json({ message: "Xóa thành công" });
            }
            else if (log === 404) {
                return res.status(200).json({ message: "Không tìm thấy note" });
            }
        }
    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}

const getAllSaveNote = async (req: Request, res: Response) => {

    const { gid } = req.body;
    try {
        const getAllnote = await getNoteByUidService(gid);
        if (getAllnote === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" });
        }
        else {
            return res.status(200).json({ message: "Thành công", getAllnote });
        }
    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}
const deleteAllNote = async (req: Request, res: Response) => {
    try {
        const { uid,nid } = req.body;
        const log = await deleteAllNoteService(uid,nid);
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

const getDataSave = async (req: Request, res: Response) => {
    const { gid, nid } = req.body;
    try {
        const getSavenote = await getSaveNoteService(gid, nid);
        if (getSavenote === 404) {
            return res.status(200).json({ message: "Không tìm thấy note" , statusCode:404});
        }
        else {
            return res.status(200).json({ message: "Thành công", getSavenote });
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
    copyNote,
    getNoteByCode,

    //save
    saveNote,
    unsaveNote,
    getAllSaveNote,
    deleteAllNote,
    getDataSave,




}