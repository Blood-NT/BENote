import { Save } from "../interfaces/save.interface"
import { saveModel } from "../models/save.model"

const createSaveNoteService = async (hid: string, gid: string, nid: number) => {
    try {
        const data: any = {
            hid: hid,
            gid: gid,
            nid: nid,
            status: true
        }
        const check: Save[] | null = await saveModel.findAll({ where: { hid: hid, gid: gid, nid: nid } });
        if (check.length > 0) {
            const update = await saveModel.update({ status: true }, { where: { hid: hid, gid: gid, nid: nid } });
            if (update) {
                return 200;
            }
            else {
                return 404;
            }
        }
        else {
            const save = await saveModel.create(data);
            if (save) {
                return 200;
            }
            else {
                return 404;
            }
        }
    }
    catch (e) {
        console.log("????", e);
        return 500;
    }

}
const deleteSaveNoteService = async (hid: string, gid: string, nid: number) => {
    try {
        const check: Save | null = await saveModel.findOne({ where: { hid: hid, gid: gid, nid: nid } });
        if (check) {
            await saveModel.update({status:false},{ where: { hid: hid, gid: gid, nid: nid } });
            return 200;
        }
        else {
            return 404;
        }
    }
    catch (e) {
        console.log("????", e);
        return 500;
    }
}
const getSaveNoteService = async (gid: string, nid: string) => {
    try {
        const check: Save | null = await saveModel.findOne({ where: { nid: nid, gid: gid, status:true } });
        if (check) {
            return check;
        }
        else {
            return 404;
        }
    }
    catch (e) {
        console.log("????", e);
        return 500;
    }
}

const deleteAllNoteService = async (hid:string,nid: string) => {
    try {
        // chuyển tất cả các note có nid về status 0
        const check = await saveModel.update({ status: false }, { where: { nid: nid ,hid:hid} });
        if (check) {
            return 200;
        }
        else {
            return 404;
        }

    }
    catch (e) {
        console.log("????", e);
        return 500;
    }
}

const getAllSaveNoteService = async (gid: string) => {
    try {
        const check: Save[] | null = await saveModel.findAll({ where: { gid: gid, status:true } });
        if (check) {
            return check;
        }
        else {
            return 404;
        }
    }
    catch (e) {
        console.log("????", e);
        return 500;
    }
}


export {
    createSaveNoteService,
    deleteSaveNoteService,
    getSaveNoteService,
    deleteAllNoteService,
    getAllSaveNoteService
}
