# Simple Chatbot API

## Install bun

First install Bun.js, There's two ways to install bun

Using NPM

```bash
npm install -g bun
```

Using curl

```bash
curl -fsSL https://bun.sh/install | bash
```

After bun installation then install the API dependencies

To install dependencies:

```bash
bun install
```

## Migrate Base Data

DBMS used is [PostgreSQL](https://www.postgresql.org/download/)

```bash
https://www.postgresql.org/download/
```

Go to ```.env.example``` file and make the ```.env```  file. Adjust all the environment variable according to your environment or you can just copy the value that already in the ```env.example``` if your device environment is the same.

then run this for seeding the DB.

```bash
bun run db/scripts/create-db.ts
bun run db/scripts/migrate.ts
bun run db/scripts/seed.ts
```

After all set then

## Run Server

```bash
bun run dev
```

This project was created using `bun init` in bun v1.2.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Data storage method

The API uses a relational data model with PostgreSQL to manage chatbot sessions and decision flow. The schema is for maintaining question-response relationships, session tracking, and history logging.

### Tables Overview

- ```questions```
Stores all possible chatbot questions. Acts as the core reference for flow control.

    | Column   | Type    | Description                  |
    | -------- | ------- | ---------------------------- |
    | id       | integer | Primary Key                  |
    | question | text    | The chatbot question content |

- ```chatbot_responses```
Maps each question to its possible responses. Each response links to the next question using ```next_question_id```, allowing dynamic branching logic.

    | Column             | Type    | Description                              |
    | ------------------ | ------- | ---------------------------------------- |
    | id                 | integer | Primary Key                              |
    | question\_id       | integer | Foreign Key → `questions.id`             |
    | response           | text    | Response text shown to the user          |
    | next\_question\_id | integer | Foreign Key → `questions.id` (next step) |

- ```chat_sessions```
Tracks the current state of an individual chat session. Stores the current active question on each session.

    | Column                | Type    | Description                                |
    | --------------------- | ------- | ------------------------------------------ |
    | id                    | integer | Primary Key                                |
    | current\_question\_id | integer | Foreign Key → `questions.id` (active node) |

- ```chat_histories```
Logs every interaction in a session, including the question shown and the option selected.

    | Column            | Type    | Description                          |
    | ----------------- | ------- | ------------------------------------ |
    | id                | integer | Primary Key                          |
    | chat\_session\_id | integer | Foreign Key → `chat_sessions.id`     |
    | question\_id      | integer | Foreign Key → `questions.id`         |
    | option\_id        | integer | Foreign Key → `chatbot_responses.id` |

## How To Test

You can go to ```/docs``` endpoint to use swagger to test the API

```bash
http://localhost:8000/docs
```

## Tech Stack

| Components | Tech Used |
| ---------- | --------- |
| Runtime | [Bun](https://bun.com/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Framework | [Express](https://expressjs.com/) |
| ORM | [Drizzle](https://orm.drizzle.team/) |
| API Docs | [Swagger](https://swagger.io/) |
