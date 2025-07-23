import express from "express";
import { getChat, makeSession, putChat } from "../controllers/chat.controller";

const router = express.Router();

/**
 * @swagger
 * /api/chatbot:
 *   get:
 *     summary: Make Session
 *     responses:
 *       200:
 *         description: Make empty session and return session id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MakeSession'
 */
router.get("/chatbot/", makeSession);

/**
 * @swagger
 * /api/chatbot/{id}:
 *   get:
 *     summary: Get Chat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Return current chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetChat'
 */
router.get("/chatbot/:id/", getChat);

/**
 * @swagger
 * /api/chatbot/{id}:
 *   put:
 *     summary: Put Chat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     requestBody:
 *       required: true
 *       description: Send option id
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               option_id:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Return the next question
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NextQuestionResponse'
 *       404:
 *         description: Chat session not found or not selected a valid option
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelectOptionError'
 */
router.put("/chatbot/:id/", putChat);

export default router;