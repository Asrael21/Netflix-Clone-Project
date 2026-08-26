# Project Setup

## Environment Variables

This project uses a TMDB (The Movie Database) API key, which is kept out of version control for security. Follow these steps to get set up after cloning the repo:

1. Copy the example environment file and rename it to `.env`:

   ```bash
   cp .envexample .env
   ```

2. Get a free TMDB API key:
   - Create an account at https://www.themoviedb.org/signup
   - Go to your account **Settings > API** (https://www.themoviedb.org/settings/api)
   - Request an API key (choose "Developer" if asked) and copy the **API Key (v3 auth)** value

3. Open the new `.env` file and replace the placeholder with your own key:

   ```env
   VITE_API_KEY=your_tmdb_api_key_here
   ```

4. Save the file. Do **not** commit `.env` — it should already be listed in `.gitignore`. Only `.envexample` (with placeholder values) belongs in version control.

That's it — the app will pick up your key from `.env` the next time you run it.