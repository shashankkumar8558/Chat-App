import path from "path"
import { mongooseConnection } from "./DB/MongoDB.js";
import authRouter from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js"
import userRoute from "./routes/user.route.js"
import express from "express";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

const __dirname = path.resolve();

app.use(express.json()); //To parse the incoming requests with JSON payloads from (req.body)
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRoute);
app.use('/api/users', userRoute);

app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

server.listen(5000, () => {
  mongooseConnection();
  console.log('Server is Runnung on the Port 5000');
})