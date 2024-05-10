import { mongooseConnection } from "../DB/MongoDB.js"
import express from "express";
import { SignUpUser, LoginUser, LogoutUser } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", SignUpUser);

router.post("/login", LoginUser);

router.post("/logout", LogoutUser);

export default router;