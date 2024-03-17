# AI Mood Journal

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

AI Mood Journal is a Next.js application designed to help users track their daily experiences and emotions through journal entries. Leveraging the power of OpenAI's natural language processing capabilities, the application provides users with insights into their mood, sentiment, summary, subject, color, and even offers the ability to ask questions about past journal entries.

## Features

- **Journal Entries**: Users can write about their daily experiences and emotions.
- **OpenAI Integration**: Utilizes OpenAI API to analyze journal entries and provide insights such as mood, sentiment, summary, subject, and color.
- **Question Answering**: Users can ask questions about their journal entries, and the AI will provide answers based on the content.
- **Sentiment History**: Displays a history of sentiment over time, allowing users to track their emotional trends.
- **Graphical Representation**: Implemented using Recharts, providing users with visual representations of their emotional data.
- **Authentication**: Utilizes Clerk for third-party authentication, ensuring secure user access.

## Installation

To set up the AI Mood Journal locally, follow these steps:

1. Clone the repository: `git clone git@github.com:DohnalMichal/ai-mood-journal.git`
2. Navigate to the project directory: `cd ai-mood-journal`
3. Install dependencies: `npm install`

### Setup Clerk

1. Install [Clerk](https://clerk.com/)
2. Add Clerk secrets to `.env.local`:
   ```makefile
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXX
   CLERK_SECRET_KEY=sk_test_XXXXXX
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/journal
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/new-user
   ```

### PlanetScale Serverless SQL Database

1. Add [PlanetScale Database](https://planetscale.com/)
2. Install [pscale CLI](https://github.com/planetscale/cli#installation)
3. Use the CLI to connect to the DB: `pscale auth login`
4. Create a dev database branch: `pscale branch create mood dev`
5. Start the connection: `pscale connect ai-mood-journal dev --port 3309`

### Prisma ORM

1. Install Prisma Client: `npm i @prisma/client`
2. Install Prisma as dev dependency: `npm i prisma --save-dev`
3. Initialize Prisma: `npx prisma init`

### OpenAI API Account setup

1. Create an [OpenAI](https://openai.com/) API account and obtain an API Key.
2. Copy/paste the API Key into `.env.local` using the variable `OPENAI_API_KEY`.

## Usage

Once the setup is complete, you can run the application locally:

```bash
npm run dev
```

This command will start the development server. Open your browser and navigate to `http://localhost:3000` to access the AI Mood Journal application.

## Technologies Used

- **Next.js**: React framework for server-rendered applications.
- **OpenAI**: API for natural language processing tasks.
- **Clerk**: Third-party authentication provider.
- **Prisma**: ORM for database interactions.
- **Recharts**: Charting library for graphical representations.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Credits

This project follows the concepts and techniques taught in the [Frontend Masters](https://frontendmasters.com/) course by [Scott Moss](https://frontendmasters.com/teachers/scott-moss/), with some additional improvements.
