import type { NextFunction, Request, Response } from "express";
import { checkOption, createSession, getCurrentStateSession, getNextQuestion, getOptions, getQuestions, getQuestionsByAnswer, getSession, getUnusedSession, storeHistory, updateSession } from "../services/chat.service";

export async function makeSession(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        let session = await getUnusedSession();
        if (session.length === 0) {
            session = await createSession();
        }
        res.status(200).json({
            message: {
                message: "Session created successfully with id: " + session[0]?.session_id,
                id: session[0]?.session_id
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
        const state = await getCurrentStateSession(chat_session_id);
        if (session.length === 0) {
            res.status(404).json({
                message: "Session not found",
                success: false,
            });
            return;
        }
        const question = await getQuestions(state[0]?.current_question_id as number);
        const option = await getOptions(question[0]?.question_id as number);
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
        const state = await getCurrentStateSession(chat_session_id);
        const answer = await checkOption(state[0]?.current_question_id as number, option_id);
        if (answer.length === 0) {
            res.status(404).json({
                message: "Select only the options provided",
                success: false,
            });
            return;
        }
        await storeHistory(chat_session_id, state[0]?.current_question_id as number, option_id);
        await updateSession(chat_session_id, answer[0]?.next_question_id as number);
        const nextQuestion = await getNextQuestion(option_id as number);
        const options = await getOptions(nextQuestion[0]?.question_id as number);
        if (!nextQuestion[0]?.question) {
            await updateSession(chat_session_id, 1);
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