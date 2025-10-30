# Next IMDb Clone

A movie database web application built with Next.js, Tailwind CSS, and MongoDB. Browse trending, top-rated, and genre-based movies, search for titles, and manage your favourites.

## Features
- Browse trending and top-rated movies
- Search movies by title
- View movie details
- Add/remove favourites (requires sign-in)
- Dark mode toggle
- Responsive design

## Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS
- MongoDB (Mongoose)
- The Movie Database (TMDb) API

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd next-imdb-*
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your TMDb API key:
     ```env
     API_KEY=your_tmdb_api_key
     MONGODB_URI=your_mongodb_connection_string
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `src/app/` — Main app pages and API routes
- `src/components/` — Reusable UI components
- `src/lib/` — Database models and actions
- `public/` — Static assets

## Contributing
Pull requests are welcome! For major changes, please open an issue first.

## License
MIT

---

> Powered by Next.js, Tailwind CSS, and TMDb API
