import { db } from "../db/client";
import { and, eq, isNull } from "drizzle-orm";
import { chatbotQuestions, chatbotResponses, chatHistories, chatSessions } from "../db/schema";

export function createSession () {
    return db.insert(chatSessions).values({}).returning({session_id: chatSessions.id});
}

export function getCurrentStateSession(id: number) {
    return db.select({current_question_id: chatSessions.current_question_id})
        .from(chatSessions)
        .where(eq(chatSessions.id, id));
}

export function deleteSession (id: number) {
    return db.delete(chatSessions).where(eq(chatSessions.id, id)).returning();
}

export function updateSession (id: number, current_question_id: number) {
    return db.update(chatSessions).set({current_question_id: current_question_id}).where(eq(chatSessions.id, id)).returning();
}

export function getSession (id: number) {
    return db.select({ question: chatbotQuestions.question, response: chatbotResponses.response })
        .from(chatSessions)
        .leftJoin(chatHistories, 
            eq(chatHistories.chat_session_id, chatSessions.id))
        .leftJoin(chatbotQuestions, 
            eq(chatbotQuestions.id, chatHistories.question_id))
        .leftJoin(chatbotResponses, 
            eq(chatbotResponses.id, chatHistories.option_id))
        .where(
            eq(chatSessions.id, id))
        .orderBy(chatHistories.id);
}

export function getUnusedSession () {
    return db.select({session_id: chatSessions.id})
        .from(chatSessions)
        .leftJoin(chatHistories, 
            eq(chatHistories.chat_session_id, chatSessions.id))
        .where(isNull(chatHistories.id));
}

export function getQuestions (question_id: number = 1) {
    return db.select({question_id: chatbotQuestions.id, question: chatbotQuestions.question})
        .from(chatbotQuestions)
        .where(eq(chatbotQuestions.id, question_id));
}

export function getNextQuestion (option_id: number) {
    return db.select({question_id: chatbotQuestions.id, question: chatbotQuestions.question})
        .from(chatbotResponses).leftJoin(chatbotQuestions, 
            eq(chatbotQuestions.id, chatbotResponses.next_question_id))
        .where(eq(chatbotResponses.id, option_id));
}

export function getQuestionsByAnswer (option_id: number) {
    return db.select({question_id: chatbotQuestions.id, question: chatbotQuestions.question})
        .from(chatbotResponses).leftJoin(chatbotQuestions, 
            eq(chatbotQuestions.id, chatbotResponses.question_id))
        .where(eq(chatbotResponses.id, option_id));
}


export function getOptions (question_id: number) {
    return db.select({option_id: chatbotResponses.id, response: chatbotResponses.response, next_question_id: chatbotResponses.next_question_id})
        .from(chatbotResponses)
        .where(eq(chatbotResponses.question_id, question_id));
}

export function checkOption(question_id: number, option_id: number) {
    return db.select({option_id: chatbotResponses.id, response: chatbotResponses.response, next_question_id: chatbotResponses.next_question_id})
        .from(chatbotResponses)        
        .where(
            and(
                eq(chatbotResponses.question_id, question_id),
                eq(chatbotResponses.id, option_id)
            )
        );
}

export function storeHistory (chat_session_id: number, question_id: number, option_id: number) {
    return db.insert(chatHistories).values({chat_session_id, question_id, option_id}).returning();
}