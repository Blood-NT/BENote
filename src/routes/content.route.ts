import express from "express";
import contentController from "../controller/contentController";

const router = express.Router();
router.post("/create", contentController.createContent);
router.post("/get", contentController.getContentData);

export default router;

