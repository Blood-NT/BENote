import noteController from "../controller/noteController";
import express from "express";

const router = express.Router();
router.post("/", (req, res) => {
    console.log(req.body);
    res.send("Hello world");
});
router.post("/create", noteController.createNote);
router.post("/updateTitle", noteController.updateTitleNote);
router.post("/openshare", noteController.openShareNote);
router.post("/delete", noteController.deleteNote);
router.post("/setImportance", noteController.updateImportanceNote);
router.post("/setColor", noteController.updateColorNote);
router.post("/getInfo", noteController.getInfoNote);
router.post("/getAll", noteController.getNoteById);
router.post("/copy", noteController.copyNote);
router.post("/getcode-share", noteController.getNoteByCode);

// save note
router.post("/save", noteController.saveNote);
router.post("/unsave", noteController.saveNote);
router.post("/getsave", noteController.getAllSaveNote);
router.post("/deleteAll", noteController.deleteAllNote);
router.post("/getdatasave", noteController.getDataSave);
export default router;

