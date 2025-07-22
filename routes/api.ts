import express from "express";
import { getChat, makeSession, putChat } from "../controllers/chat";

const router = express.Router();

router.get("/chatbot/", makeSession);
router.get("/chatbot/:id/", getChat);
router.put("/chatbot/:id/", putChat);

export default router;