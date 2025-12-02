import express from "express";
import upload from "../middleware/cloudinaryUpload";
import { PropertyController } from "../controller/siteDetailController";

const router = express.Router();
const controller = new PropertyController();

router.post("/create", upload.array("images", 10), controller.create.bind(controller));
router.post("/getAll", controller.getAll.bind(controller));
router.post("/getById", controller.getById.bind(controller));
router.post("/update", upload.array("images", 10), controller.update.bind(controller));
router.post("/delete", controller.delete.bind(controller));

export default router;
