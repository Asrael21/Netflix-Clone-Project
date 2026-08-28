# Netflix-Clone: Task Breakdown

Source: Master Task List (T-01–T-16). Each task below is broken into concrete, checkable subtasks.

## T-01 — Project Scaffolding & Dependencies (Group Work)

- [✔️] Run `npm create vite@latest` and select the React template
- [✔️] Install dependencies: `axios`, `react-router-dom`, `lucide-react`, `react-icons`, `swiper`
- [✔️] Run `npm install` and confirm no dependency errors
- [✔️] Start the dev server (`npm run dev`) and confirm it loads in the browser
- [✔️] Clean up the default Vite boilerplate (starter CSS, sample components)
- [✔️] Commit initial scaffold to git

## T-02 — Asset Organization & Static Data (Group Work)

- [✔️] Create `src/assets/image/` directory
- [✔️] Add logo asset (e.g. `logo.png`/`.svg`)
- [✔️] Add fallback/placeholder banner image
- [✔️] Open `src/Data/Data.js` and review its structure (fields, categories, shape of movie objects)
- [ ] Note any fields the UI components will need (id, title, image path, description, etc.)
- [ ] Confirm asset import paths resolve correctly in a test component

## T-03 — TMDB API Key & Environment Setup (Group Work)

- [ ] Create a TMDB account and request an API key (v3 auth)
- [✔️] Create `.env` in project root
- [✔️] Add `VITE_TMDB_API_KEY=<your_key>` to `.env`
- [✔️] Add `.env` to `.gitignore` (verify it's not already tracked)
- [✔️] Create `.env.example` with a placeholder key for other contributors
- [ ] Verify the key is readable via `import.meta.env.VITE_TMDB_API_KEY`

## T-04 — Axios Instance & Request Endpoints (Yonatan)

- [✔️] Create `src/Utility/MovieInstance.js`
- [ ] Configure a shared Axios instance with TMDB's base URL (`https://api.themoviedb.org/3`)
- [ ] Attach the API key (via params or headers, per TMDB auth method used)
- [✔️] Create `src/Utility/requestUrls.js`
- [ ] Define endpoint constants for each category (Trending, Netflix Originals, Top Rated, Action, Comedy, Horror, Romance, Documentaries, etc.)
- [ ] Test one endpoint manually (e.g. console.log a fetch response) to confirm the instance works

## T-05 — Global Theme & Base Styles (Yonatan)

- [ ] Add a CSS reset (margin/padding/box-sizing normalization) to `src/index.css`
- [ ] Set global dark theme: black/near-black background, white text
- [ ] Define base typography (font family, base sizes, line-height)
- [ ] Set global scrollbar styling if needed
- [ ] Define reusable CSS variables (colors, spacing) for consistency across modules
- [ ] Verify styles apply app-wide with no default browser styling bleeding through

## T-06 — App Layout Shell & Router (Mo)

- [ ] Wrap `<App />` with `<BrowserRouter>` in `main.jsx`
- [ ] Define top-level routes in `App.jsx` (Home, plus any additional pages)
- [ ] Assemble the main layout: Header, page content (Outlet/children), Footer
- [ ] Confirm routing renders correctly with no console errors
- [ ] Add a basic 404/fallback route if applicable

## T-07 — Header & Scroll-Aware Background (Ferdos)

- [ ] Build fixed/sticky header component
- [ ] Add Netflix logo (from T-02 assets)
- [ ] Add primary navigation links (Home, TV Shows, Movies, New & Popular, My List, etc.)
- [ ] Implement scroll listener (or `useEffect` + scroll event) to detect page scroll position
- [ ] Toggle header background class between transparent and solid dark based on scroll threshold
- [ ] Add smooth CSS transition for the background change
- [ ] Match layout/spacing to `Resources/Designs/1.HeaderWithoutDropDown.png`

## T-08 — Header Search, Notifications & Profile Dropdown (Ferdos)

- [ ] Build expandable search icon → input toggle (click to expand/collapse)
- [ ] Wire search input to local state (and optionally debounce for future search feature)
- [ ] Add notification bell icon with badge indicator
- [ ] Build profile avatar with dropdown menu (click to open/close, click-outside to close)
- [ ] Populate dropdown with menu items (Manage Profiles, Account, Sign Out, etc.)
- [ ] Match visuals to `Resources/Designs/2.HeaderWithSearchIconExpanded.png` and `3.HeaderWithDropDown.png`
- [ ] Verify keyboard/click-outside behavior doesn't break other header interactions

## T-09 — Responsive Footer Component(Mo)

- [ ] Build footer container with dark background matching theme
- [ ] Add row of social media icons (using `lucide-react`/`react-icons`)
- [ ] Build multi-column links grid (Company, Help Center, Legal, etc.)
- [ ] Add hover states for links and icons
- [ ] Add copyright/legal text line
- [ ] Add responsive column collapse for smaller screens
- [ ] Match layout to `Resources/Designs/6.Footer.png`

## T-10 — Banner Data Fetching & Random Selection (Sadik)

- [✔️] Create banner component with `useEffect` on mount
- [✔️] Call the Netflix Originals endpoint via the Axios instance (T-04)
- [✔️] Handle loading and error states for the fetch
- [✔️] Randomly select one item from the returned results array
- [✔️] Store the selected item in component state
- [✔️] Verify a new random item appears on each page reload

## T-11 — Banner UI & Gradient Overlay (Sadik)

- [✔️] Render backdrop image from the selected banner item (with fallback image from T-02 if missing)
- [✔️] Display title and truncate/clamp the description text
- [✔️] Add "Play" button
- [✔️] Add "My List" (add to list) button
- [✔️] Add bottom fade gradient overlay (CSS gradient over image)
- [✔️] Ensure text remains readable against varying backdrop images
- [✔️] Match layout to `Resources/Designs/4.BannerWithHeader.png`

## T-12 — Multi-Category Parallel Fetching(Mussa/Israal)

- [ ] Define the list of category/genre endpoints to fetch (from `requestUrls.js`)
- [ ] In `DisplayRow.jsx`, build an array of fetch promises for each category
- [ ] Use `Promise.all` to fetch all categories concurrently
- [ ] Store results in state, keyed by category name
- [ ] Handle loading state while fetches are in flight
- [ ] Handle partial/total failure gracefully (error boundary or fallback UI)

## T-13 — SlideShow Swiper Carousel(Mussa/Israal)

- [ ] Create a reusable `Carousel`/`SlideShow` component wrapping `swiper`
- [ ] Configure Swiper options (slides per view, spacing, breakpoints for responsiveness)
- [ ] Add custom navigation arrows (prev/next)
- [ ] Show arrows only on row hover (CSS opacity/visibility transition)
- [ ] Wire the carousel to accept a list of movies as props
- [ ] Test with multiple rows to confirm independent carousel state per row
- [ ] Match interaction/style to `Resources/Designs/5.Row.png`

## T-14 — MovieCard Component & Hover Preview (Mussa/Israal)

- [ ] Build base `MovieCard` component rendering poster thumbnail
- [ ] Add hover state that expands/scales the card
- [ ] Show preview details on hover (title, metadata)
- [ ] Add action buttons on hover: play, add to list, like, more info
- [ ] Display metadata tags (e.g. match %, age rating, duration/seasons)
- [ ] Display genre list/tags
- [ ] Handle image fallback for missing posters
- [ ] Match interaction/style to `Resources/Designs/5HoverEffectOnCard.png`

## T-15 — Responsive Layout & Mobile Navigation(Eyob)

- [ ] Audit header at tablet and mobile breakpoints; adjust spacing/typography
- [ ] Collapse or convert primary nav into a mobile-friendly pattern (hamburger/menu) if needed
- [ ] Audit banner at smaller viewports (text size, button stacking, image cropping)
- [ ] Audit movie rows/cards at smaller viewports (cards per view, touch scroll behavior)
- [ ] Adjust footer columns for mobile stacking
- [ ] Test across common breakpoints (mobile, tablet, small desktop)
- [ ] Verify no horizontal overflow/scroll issues on any viewport

## T-16 — CSS Modules Audit & Animation Polish (Eyob)

- [ ] Review all CSS Module files for consistent naming conventions (camelCase/kebab-case)
- [ ] Remove unused/duplicate class definitions
- [ ] Confirm styles are properly scoped (no global leakage/collisions)
- [ ] Standardize transition timing/easing values across components
- [ ] Polish hover/focus animations (cards, buttons, dropdowns, nav links)
- [ ] Verify smooth performance (no jank) on interactive animations
- [ ] Final visual pass comparing against all design references
