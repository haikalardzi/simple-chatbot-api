ALTER TABLE "chat_histories" DROP CONSTRAINT "chat_histories_option_id_questions_id_fk";
--> statement-breakpoint
ALTER TABLE "chat_histories" ADD CONSTRAINT "chat_histories_option_id_chatbot_responses_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."chatbot_responses"("id") ON DELETE no action ON UPDATE no action;