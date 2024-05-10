import express from "express"
import { ProtectRoute } from "../middleware/protectRoute.js";
import { getUserForSidebar } from "../controller/user.controller.js";


const router = express.Router();

router.get("/", ProtectRoute, getUserForSidebar)

export default router;