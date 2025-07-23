# Simple Chatbot API

First install Bun.js

## Install bun

Using NPM

```bash
npm install -g bun
```

Using curl

```bash
curl -fsSL https://bun.sh/install | bash
```

To install dependencies:

```bash
bun install
```

## Migrate Base Database

First of all, go to ```.env.example``` file and make the ```.env```  file. Adjust all the environment variable according to your environment or you can just copy the value that already in the ```env.example``` if your device environment is the same.

then run this

```bash
bun run db/scripts/create-db.ts
bun run db/scripts/migrate.ts
bun run db/scripts/seed.ts
```

After all set then

## Run Server

To run:

```bash
bun run dev
```

This project was created using `bun init` in bun v1.2.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
