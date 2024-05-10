import jwt from "jsonwebtoken";
import generateTokeAndSetCookies from "../utils/generateToken.js";
import User from "../models/user.model.js";

export const ProtectRoute = async (req, res, next) => {

  let secretKey = 'ParleGst855821291213';

  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, secretKey);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Token Invalid" });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    req.user = user

    next();


  } catch (error) {
    console.log("Error in ProtectRoute: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}