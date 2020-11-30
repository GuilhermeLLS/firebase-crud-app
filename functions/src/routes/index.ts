import Router from "express";
import { createItem, deleteItem, readItem, readItems, updateItem } from "../controllers/index";

const router = Router();

router.post("/api/create", createItem);
router.get("/api/read", readItems);
router.get("/api/read/:item_id", readItem);
router.put("/api/update/:item_id", updateItem);
router.delete("/api/delete/:item_id", deleteItem);

export default router;
