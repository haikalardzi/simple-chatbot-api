import type { NextFunction, Request, Response } from "express";
import { checkOption, createSession, getNextQuestion, getOptions, getQuestions, getQuestionsByAnswer, getSession, getUnusedSession, storeHistory } from "../services/chatSession";

export async function makeSession(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        let session = await getUnusedSession();
        if (session.length === 0) {
            session = await createSession();
        }
        res.status(200).json({
            message: {
                message: "Session created successfully with id: " + session[0]?.id,
                id: session[0]?.id
            },
            success: true,
        });
    } catch (error: unknown) {
      next(error);
    }
}

export async function getChat (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const chat_session_id = parseInt(req.params.id as string);
        const session = await getSession(chat_session_id);
        if (session.length === 0) {
            res.status(404).json({
                message: "Session not found",
                success: false,
            });
            return;
        }
        const question = await getQuestions();
        const option = await getOptions(question[0]?.id as number);
        res.status(200).json({
            message: {
                history: session,
                question: question[0]?.question,
                options: option
            },
            success: true,
        });        
    } catch (error: unknown) {
      next(error);
    }
}

export async function putChat (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const chat_session_id = parseInt(req.params.id as string);
        const option_id = parseInt(req.body.option_id as string);
        const prevQuestion = await getQuestionsByAnswer(option_id);
        const isValid = checkOption(prevQuestion[0]?.id as number, option_id);
        await storeHistory(chat_session_id, prevQuestion[0]?.id as number, option_id);
        const nextQuestion = await getNextQuestion(option_id as number);
        const options = await getOptions(nextQuestion[0]?.id as number);
        if (!nextQuestion[0]?.question) {
            res.status(200).json({
                message: {
                    message: "Order placed successfully",
                },
                success: true,
            });
            return;
        }
        res.status(200).json({
            message: {
                question: nextQuestion[0]?.question,
                options: options
            },
            success: true,
        });
    } catch (error: unknown) {
      next(error);
    }
}