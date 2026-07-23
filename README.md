# Personal Website

A simple, responsive personal homepage built with Next.js, TypeScript, and Tailwind CSS.

## Customize it

Open `app/page.tsx` to update Simanto's introduction, interests, learning goals, and placeholder links. The page styles are in `app/globals.css`.

## Run locally

1. Install [Node.js](https://nodejs.org/) version 22 or newer.
2. Open a terminal in this folder.
3. Install the project packages with `npm install`.
4. Start the site with `npm run dev`.
5. Open the local address shown in the terminal (usually `http://localhost:3000`).

## Folder structure

```text
app/
  layout.tsx    Page metadata, fonts, and shared layout
  page.tsx      Homepage content
  globals.css   Colors, typography, layout, and mobile styles
  dashboard/    Interview dashboard page and styles
lib/
  interviews.ts Secure server connection and data normalization
public/         Static files such as icons and images
```

Configuration files in the project root set up Next.js, TypeScript, Tailwind CSS, and linting.

## Environment variables for the next step

When the interview server is connected later, use these server-only names in `.env.local`:

```bash
FASTAPI_BASE_URL=
SURVEY_API_KEY=
STUDENT_INTERVIEWER_EMAIL=
STUDENT_NAME=
```

Never rename `SURVEY_API_KEY` to start with `NEXT_PUBLIC_`; that would expose the secret to the browser.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Sign in at [vercel.com](https://vercel.com/) and choose **Add New → Project**.
3. Import the GitHub repository.
4. Keep Vercel's detected project settings and select **Deploy**.

Vercel will provide a live URL and redeploy the site whenever you push changes to the connected branch.
