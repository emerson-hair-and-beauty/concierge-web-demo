---
description: How to deploy the concierge-web-demo to Vercel
---

# Deploying to Vercel

To deploy your current changes for user testing, you have two primary options.

## Option 1: Vercel CLI (Quickest for manual deploy)

If you want to deploy exactly what is on your machine right now:

1.  **Install Vercel CLI** (if not already installed):
    ```powershell
    npm i -g vercel
    ```
2.  **Login**:
    ```powershell
    vercel login
    ```
3.  **Deploy**:
    Run this in the terminal:
    ```powershell
    cd web
    vercel
    ```
    - Follow the prompts to set up the project.
    - When asked "Which directory is your code located in?", ensure it points to the `web` folder.
4.  **Production Deploy**:
    To get a final production URL:
    ```powershell
    vercel --prod
    ```

## Option 2: GitHub Integration (Recommended for Continuous Testing)

This is the best way to handle user testing long-term:

1.  **Push your changes** to a GitHub repository.
2.  Go to [vercel.com](https://vercel.com) and click **"New Project"**.
3.  **Import** your repository.
4.  **Configure Project**:
    - **Root Directory**: Select the `web` folder.
    - **Environment Variables**: Add any variables from your `.env` file (like Firebase keys).
5.  Click **Deploy**.

> [!IMPORTANT]
> Since your project structure has the Next.js app inside a `web` subdirectory, make sure the **Root Directory** in Vercel is set to `web`.

## Environment Variables
Don't forget to add your Firebase configuration and any other sensitive keys in the Vercel Dashboard under **Project Settings > Environment Variables**.
