import express from "express";
import { sendMessage } from "../controller/message.controller.js";
import { getMessage } from "../controller/message.controller.js";
import { ProtectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/:id', ProtectRoute, getMessage);
router.post('/send/:id', ProtectRoute, sendMessage);

export default router;