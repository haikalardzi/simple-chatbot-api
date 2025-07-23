
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const chatbotQuestions = pgTable('questions', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const chatbotResponses = pgTable('chatbot_responses', {
  id: serial('id').primaryKey(),
  question_id: integer('question_id').references(() => chatbotQuestions.id),
  response: text('response').notNull(),
  next_question_id: integer('next_question_id').references(() => chatbotQuestions.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const chatSessions = pgTable('chat_sessions', {
  id: serial('id').primaryKey(),
  current_question_id: integer('current_question_id').references(() => chatbotQuestions.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const chatHistories = pgTable('chat_histories', {
  id: serial('id').primaryKey(),
  chat_session_id: integer('chat_session_id').references(() => chatSessions.id),
  question_id: integer('question_id').references(() => chatbotQuestions.id),
  option_id: integer('option_id').references(() => chatbotResponses.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});