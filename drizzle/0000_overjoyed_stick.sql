CREATE TABLE "chat_histories" (
	"id" serial PRIMARY KEY NOT NULL,
	"chat_session_id" integer,
	"question_id" integer,
	"option_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "chat_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "chatbot_responses" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_id" integer,
	"response" text NOT NULL,
	"next_question_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "chat_histories" ADD CONSTRAINT "chat_histories_chat_session_id_chat_sessions_id_fk" FOREIGN KEY ("chat_session_id") REFERENCES "public"."chat_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_histories" ADD CONSTRAINT "chat_histories_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_histories" ADD CONSTRAINT "chat_histories_option_id_questions_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chatbot_responses" ADD CONSTRAINT "chatbot_responses_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chatbot_responses" ADD CONSTRAINT "chatbot_responses_next_question_id_questions_id_fk" FOREIGN KEY ("next_question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;