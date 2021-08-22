# connpass-rss-feed

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![](./public/connpass_logo.png)

An RSS feed where you can subscribe to my event attendance log. The format supports XML, ATOM and JSON.

## Getting started

First, install dependencies and run the development server:

```bash
yarn

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```bash
npm install -g vercel

vercel login
```

### Setup environment variables

Please change pages in the following order and set environment variables.

`https://vercel.com/<YOUR TEAM>/<YOUR PROJECT>` > `Settings` > `Environment Variables`

- `NEXT_PUBLIC_VERCEL_URL`
- `CONNPASS_USER_NICKNAME`

### Pull `.env`

Create an `.env` file by pulling environment variables from vercel.

```bash
vercel env pull
```

### Deployment

You can deploy by using the Vercel CLI or by pushing a new commit to the main branch of your GitHub repository.

```bash
vercel
# or
git push
```
