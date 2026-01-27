import express from "express";
import { PropertyController } from "../controller/siteDetailController";
import multer from "multer";

const router = express.Router();
const controller = new PropertyController();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/create", upload.array("images"), controller.create);
router.post("/getAll", controller.getAll.bind(controller));
router.post("/getById", controller.getById.bind(controller));
router.post("/update", upload.any(), controller.update.bind(controller));
router.post("/delete", controller.delete.bind(controller));
router.post("/bulk-upload", upload.array("images"), controller.bulkUpload.bind(controller));

export default router;
