import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { chatbotQuestions, chatbotResponses } from '../schema';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(client);

async function main() {
    await client.connect();

    // turn 0
    const [menu] = await db.insert(chatbotQuestions).values({
        question: 'Welcome to our restaurant! What would you like to order?',
    }).returning();
    
    // turn 1
    const [pizza] = await db.insert(chatbotQuestions).values({
        question: 'What kind of crust would you prefer for your Pizza?',
    }).returning();
    const [pasta] = await db.insert(chatbotQuestions).values({
        question: 'What kind of sauce would you prefer for your Pasta?',
    }).returning();
    const [salad] = await db.insert(chatbotQuestions).values({
        question: 'What kind of dressing would you prefer for your Salad?',
    }).returning();
    
    //turn 2 cycle
    const [reorder] = await db.insert(chatbotQuestions).values({
        question: 'Your order has been placed. What would you like to do next?',
    }).returning();

    //turn 3
    const [payment] = await db.insert(chatbotQuestions).values({
        question: 'How would you like to pay?',
    }).returning();

    //turn 4
    const [final] = await db.insert(chatbotQuestions).values({
        question: 'Thank you for ordering! Your order has been placed.',
    }).returning();


    // Turn 0 responses
    await db.insert(chatbotResponses).values([
        {
            question_id: menu?.id,
            response: 'Pizza',
            next_question_id: pizza?.id,
        },
        {
            question_id: menu?.id,
            response: 'Pasta',
            next_question_id: pasta?.id,
        },
        {
            question_id: menu?.id,
            response: 'Salad',
            next_question_id: salad?.id,
        },
    ]);

    // Turn 1 pizza responses
    await db.insert(chatbotResponses).values([
        {
            question_id: pizza?.id,
            response: 'Cheese',
            next_question_id: reorder?.id,
        },
        {
            question_id: pizza?.id,
            response: 'Pepperoni',
            next_question_id: reorder?.id,
        },
    ]);

    // Turn 1 pasta responses
    await db.insert(chatbotResponses).values([
        {
            question_id: pasta?.id,
            response: 'Tomato',
            next_question_id: reorder?.id,
        },
        {
            question_id: pasta?.id,
            response: 'Spaghetti',
            next_question_id: reorder?.id,
        },
    ]);

    // Turn 1 salad responses
    await db.insert(chatbotResponses).values([
        {
            question_id: salad?.id,
            response: 'Vinaigrette',
            next_question_id: reorder?.id,
        },
        {
            question_id: salad?.id,
            response: 'Caesar',
            next_question_id: reorder?.id,
        },
    ]);

    // Turn 2 cycle responses
    await db.insert(chatbotResponses).values([
        {
            question_id: reorder?.id,
            response: 'Place another order',
            next_question_id: menu?.id,
        },
        {
            question_id: reorder?.id,
            response: 'Pay',
            next_question_id: payment?.id,
        },
    ]);

  // Turn 3 responses
    await db.insert(chatbotResponses).values([
        {
            question_id: payment?.id,
            response: 'Credit Card',
            next_question_id: null,
        },
        {
            question_id: payment?.id,
            response: 'Debit Card',
            next_question_id: null,
        },
        {
            question_id: payment?.id,
            response: 'Cash',
            next_question_id: null,
        },
    ]);

  // Q5 (supportIssue) is free-text, so no options needed
  await client.end();
}

main().catch((err) => {
  console.error(err);
  client.end();
});
