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
router.post("/closeshare", noteController.closeShareNote);
router.post("/delete", noteController.deleteNote);
router.post("/setImportance", noteController.updateImportanceNote);
router.post("/setColor", noteController.updateColorNote);
router.post("/getInfo", noteController.getInfoNote);
router.post("/getAll", noteController.getNoteById);
export default router;

