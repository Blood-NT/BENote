import { Note } from "../interfaces/note.interface";
import { noteModel } from "../models/note.model";


const createNoteService = async (note: Note) => {
    note.status = true;
    note.created = new Date();
    note.share = 1;
    note.importance = false;
    note.color = "white";
    
    const check = await noteModel.create(note);
    console.log(check);
    return check;
}
const updateTitleNoteService = async (nid: string, title: string) => {
    const check: Note | null = await noteModel.findOne({ where: { nid: nid } });
    if (check) {
        await noteModel.update({ title: title }, { where: { nid: nid } });
        return 200;
    }
    else {
        return 404; // không tìm thấy note
    }
}
const updateShareNoteService = async (nid: string, share: number) => {
    const check: Note | null = await noteModel.findOne({ where: { nid: nid } });
    if (check) {
        await noteModel.update({ share: share }, { where: { nid: nid } });
        return 200;
    }
    else {
        return 404; // không tìm thấy note
    }
}

const deleteNoteService = async (nid: string) => {
    const check: Note | null = await noteModel.findOne({ where: { nid: nid } });
    if (check) {
        
        await noteModel.update({status:false},{ where: { nid: nid } });

        return 200;
    }
    else {
        return 404; // không tìm thấy note
    }
}

const setImportanceNote = async (nid: string) => {
    const check: Note | null = await noteModel.findOne({ where: { nid: nid } });
    if (check) {
        await noteModel.update({ importance: !check.importance }, { where: { nid: nid } });
        return 200;
    }
    else {
        return 404; // không tìm thấy note
    }
}
const setColorNote = async (nid: string, color: string) => {
    const check: Note | null = await noteModel.findOne({ where: { nid: nid } });
    if (check) {
        await noteModel.update({ color: color }, { where: { nid: nid } });
        return 200;
    }
    else {
        return 404; // không tìm thấy note
    }
}

const getNoteByUidService = async (uid: string) => {
    const check: Note[] | null = await noteModel.findAll({ where: { uid: uid,status:true } });
    if (check) {
        console.log("test",check);
        return check;
    }
    else {
        return 404; // không tìm thấy note
    }
}
const getInfoNoteService = async (nid: string) => {
    const check: Note | null = await noteModel.findOne({ where: { nid: nid } });
    if (check) {
        return check;
    }
    else {
        return 404; // không tìm thấy note
    }
}


export {
    createNoteService,
    deleteNoteService,
    setImportanceNote,
    setColorNote,
    updateTitleNoteService,
    updateShareNoteService,
    getNoteByUidService,
    getInfoNoteService,
    
    
}
