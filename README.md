This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
It's using prisma ORM and postgres database, but it could work with mysql, or MSSQL with a single change.

## Getting Started
First make sure you got postgres running:

`docker-compose -f file_with_code_from_below.yml up -d`
```
version: '3.9'

services:
  postgres:
    image: postgres:latest
    container_name: postgres-docker
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: postgres
    volumes:
      - Z:\\Projects\\docker\\postgres\\database_files:/var/lib/postgresql/data
```

Then run prisma commands that create table in database and connect them to prisma code in config. 
```
npx prisma generate
npx prisma db push
```


That's it, it do be working with any of these:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

![image](https://github.com/simonasbuj/chill_notes_app/assets/22977894/55ae03f3-ea45-466a-bcb3-850a2b6a691c)
