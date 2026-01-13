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

## Handling the `stable-version` Branch

Since you want a dedicated testing URL for the `stable-version` branch while keeping `main` as your production site:

### 1. The Automatic Way (Preview URLs)
Vercel automatically creates a unique URL for every branch.
- Push your branch: `git push origin stable-version`
- Go to the Vercel Dashboard for your project.
- You will see a new "Preview Deployment" for that branch.
- The URL will look like `concierge-web-demo-git-stable-version-yourname.vercel.app`. This URL will update every time you push to that branch.

### 2. The Permanent Way (Custom Testing Domain)
If you want a cleaner, permanent URL like `testing.yourdomain.com` or `concierge-test.vercel.app`:
1. Go to **Project Settings > Domains**.
2. Add a new domain/subdomain (e.g., `test.yourdomain.com`).
3. **Important**: You must leave the environment as **Preview**. Vercel only allows branch-specific domains for Preview environments (Production is reserved for your main branch).
4. Select **"Git Branch"** and enter `stable-version`.
5. Now, that specific URL will *always* point to the latest code on your `stable-version` branch.

> [!TIP]
> This is perfect for user testing because you can give out one "Testing Link" that never changes, even as you continue to push updates to the `stable-version` branch!

> [!IMPORTANT]
> Since your project structure has the Next.js app inside a `web` subdirectory, make sure the **Root Directory** in Vercel is set to `web`.

## Environment Variables
Don't forget to add your Firebase configuration and any other sensitive keys in the Vercel Dashboard under **Project Settings > Environment Variables**. Ensure they are checked for "Preview" and "Development" environments as well.
## Troubleshooting: "Authentication Required"

By default, Vercel protects all Preview deployments with a login screen (Vercel Authentication) so only your team can see them. To allow your testers to access the `stable-version` URL without logging in:

1.  Go to **Settings > Deployment Protection**.
2.  Find **"Vercel Authentication"**.
3.  Switch it to **Disabled** (or configure a password protection if you prefer).
4.  Click **Save**.

Now anyone with the link can view the testing site.
