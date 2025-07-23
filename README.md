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

## Tech Stack

| Components | Tech Used |
| ---------- | --------- |
| Runtime | [Bun](https://bun.com/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Framework | [Express](https://expressjs.com/) |
| ORM | [Drizzle](https://orm.drizzle.team/) |
