# WriteSpace — Local React Blog with Role-Based Access

**Type**: web_app
**Audience**: B2C — Admin (site owner managing all content and user accounts) and user (registered user who can write, edit, and delete their own blog posts, and read all posts).

## Business Context
Build a fully holistic, single-page blog application using Vite, React, and Tailwind CSS that includes a public-facing landing page, role-based authentication, and complete content + user management. Two roles are supported — Admin and user — with all data persisted in localStorage. No backend, no encryption, no external auth library. Deployable as a static site on Vercel.

## Functional Requirements

### FR-001 — Public Landing Page [Pipeline-aligned]
The public face of the app accessible without login at route `/`. Includes a public navbar, full-viewport hero section with gradient background and CTAs, a features section with three cards, a latest posts preview (up to 3 most recent from localStorage), and a footer. All data is read from localStorage (writespace_posts). No backend calls.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Route `/` renders without requiring authentication
  - Public Navbar shows 'WriteSpace' logo on left, 'Login' and 'Get Started' buttons on right for guests
  - If already logged in, navbar shows avatar chip + display name + 'Go to Dashboard' button (Admin → /admin, user → /blogs)
  - Hero section has gradient background `from-indigo-600 via-violet-600 to-pink-500`, app name in large bold white text, tagline 'Your thoughts. Your space. Beautifully simple.'
  - Two CTA buttons: 'Start Reading' (authenticated → /blogs, guest → /login) and 'Get Started Free' (→ /register)
  - CSS-only floating card animation present (no JS animation libraries)
  - Features section: 3 cards in responsive row (1-col mobile, 3-col desktop) — 'Write Freely', 'Private & Local', 'Instant & Fast'
  - Latest Posts Preview: heading 'Latest from the Blog', up to 3 most recent posts from writespace_posts (title, excerpt, date), each card links to /blog/:id
  - Unauthenticated clicks on post cards redirect to /login
  - Empty state when no posts: 'No posts yet — check back soon!'
  - Footer: links Home, All Blogs, Login, Register; dark slate background with light text, copyright year

### FR-002 — Login Page with Hard-coded Admin & localStorage Auth [Pipeline-aligned]
Entry point for all unauthenticated users at route `/login`. Form with Username and Password fields. On submit, checks hard-coded admin credentials first (`admin`/`admin`), then searches writespace_users array in localStorage. On success, writes writespace_session to localStorage and redirects Admin to `/admin`, user to `/blogs`. On failure, shows inline error. Already-authenticated users are redirected to their home. Full-viewport gradient background with centered white card.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Route `/login` renders with Username (text) and Password (password) fields
  - 'Login' primary button submits the form
  - 'Register' text link below routes to `/register`
  - On submit: hard-coded admin check first — `username === 'admin' && password === 'admin'`
  - If not admin, searches writespace_users array in localStorage for matching username/password
  - On success: writes writespace_session to localStorage; Admin → /admin, user → /blogs
  - On failure: inline error 'Invalid username or password.' displayed
  - Already-authenticated users are redirected to their home (Admin → /admin, user → /blogs)
  - Full-viewport gradient background `from-indigo-600 via-violet-600 to-pink-500`, centered white card with shadow, app logo at top

### FR-003 — Registration Page with Self-Service Sign-Up [Pipeline-aligned]
Self-service sign-up at route `/register`. All self-registered accounts are always `user` role. Fields: Display Name, Username, Password, Confirm Password. Validates all fields required, password match, and username uniqueness (across writespace_users and hard-coded admin). On success, saves to writespace_users, writes session, redirects to `/blogs`. Link back to `/login`.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Route `/register` renders with fields: Display Name, Username, Password, Confirm Password
  - All fields required — inline validation shown if missing
  - Password and Confirm Password must match — inline error if not
  - Username must be unique across writespace_users and the hard-coded 'admin' — inline error if duplicate
  - On success: new user saved to writespace_users with UUID, role='user', createdAt timestamp
  - On success: writespace_session written, redirect to `/blogs`
  - Link back to `/login` present below form

### FR-004 — Authenticated Navbar with Role-Based Links & Logout [Pipeline-aligned]
Persistent header on all authenticated pages (separate from public navbar). Left: 'WriteSpace' logo linking to `/`. Center/Right nav links by role: Admin sees All Blogs, Write, Users; user sees All Blogs, Write. Active link highlighted with indigo background rounded pill. Far right: circular avatar chip (role-based color) + display name + dropdown with Logout. Mobile: hamburger toggle using React state only. Logout clears writespace_session and redirects to `/`.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Left: 'WriteSpace' logo links to `/`
  - Admin nav links: All Blogs, Write, Users
  - User nav links: All Blogs, Write
  - Active link highlighted with indigo background, rounded pill style
  - Far right: circular avatar chip (role-based color) + display name + dropdown with Logout
  - Mobile: hamburger toggle using React state only (no library)
  - Logout: clears writespace_session from localStorage, redirects to `/`

### FR-005 — Avatar System with Role-Distinct Visuals [Pipeline-aligned]
Role-distinct visual avatars defined as static JSX. No image uploads. Admin: crown emoji on bg-violet-600. User: book emoji on bg-indigo-500. Appears in Navbar chip, User Management table, blog post author line. Component: src/components/Avatar.jsx exports getAvatar(role) returning JSX.
**Priority**: must_have | **Complexity**: low | **Source**: original_prd
**Acceptance Criteria**:
  - Admin avatar: crown emoji, bg-violet-600 background
  - User avatar: book emoji, bg-indigo-500 background
  - Avatar appears in: Navbar chip, User Management table, blog post author line
  - Component at src/components/Avatar.jsx exports getAvatar(role) returning JSX
  - No image uploads — purely static JSX

### FR-006 — Blog List Page with Ownership-Based Edit Controls [Pipeline-aligned]
Authenticated landing page at `/blogs` showing all posts. Responsive grid: 1 col mobile / 2 col tablet / 3 col desktop. Each card: title, excerpt (first 120 chars), createdAt (formatted MMM DD, YYYY), author name + avatar. Colorful top border accent cycling by post index (indigo, violet, pink, teal). Clicking card navigates to `/blog/:id`. Admin sees pencil Edit icon on every card. User sees pencil Edit icon only on own posts (authorId matches session userId). Empty state with Write CTA. Posts sorted newest first.
**Priority**: must_have | **Complexity**: high | **Source**: original_prd
**Acceptance Criteria**:
  - Route `/blogs` requires authentication; guests redirected to `/login`
  - Responsive grid: 1 col mobile, 2 col tablet (md:), 3 col desktop (lg:)
  - Each card: title, excerpt (first 120 chars), createdAt (MMM DD, YYYY), author name + avatar
  - Colorful top border accent cycling: index 0=indigo, 1=violet, 2=pink, 3=teal, repeats via index % 4
  - Clicking card navigates to `/blog/:id`
  - Admin sees pencil Edit icon button on every card
  - User sees pencil Edit icon button only on cards where authorId matches session userId
  - Empty state: 'No blogs yet. Be the first to write one!' with Write CTA button
  - Posts sorted newest first

### FR-007 — Write / Edit Blog Page with Ownership Enforcement [Pipeline-aligned]
Form for creating or updating posts at routes `/write` and `/edit/:id`. All authenticated users (Admin and user) can create new posts. Editing is restricted by ownership: users can only edit their own posts, Admin can edit any post. Fields: Title (text input, full-width), Content (textarea, min height 256px). Create mode: generates UUID, sets createdAt + authorId + authorName from session, saves to writespace_posts, redirects to `/blog/:id`. Edit mode: pre-fills form, updates record in localStorage, redirects to `/blog/:id`. Ownership check: if user tries to edit another's post, redirect to `/blogs`. Validation: both fields required with inline errors. Character counter below Content. Cancel button (ghost style) routes back without saving.
**Priority**: must_have | **Complexity**: high | **Source**: original_prd
**Acceptance Criteria**:
  - Route `/write` available to ALL authenticated users; guests redirected to `/login`
  - Route `/edit/:id` available to Admin (any post) and user (own posts only)
  - Fields: Title (text input, full-width), Content (textarea, min height 256px, full-width)
  - Create mode: generates UUID via crypto.randomUUID(), sets createdAt + authorId + authorName from session, saves to writespace_posts, redirects to `/blog/:id`
  - Edit mode: pre-fills form from existing post; on save updates record in localStorage, redirects to `/blog/:id`
  - Ownership check in edit mode: if logged-in user is 'user' and authorId ≠ session userId, redirect to `/blogs`
  - Admin can edit any post regardless of authorId
  - Validation: both fields required; inline field-level error messages
  - Character counter below Content textarea
  - Cancel button (ghost style) routes back without saving

### FR-008 — Read Blog Page with Role-Based Edit/Delete Controls [Pipeline-aligned]
Full reading view for a single post at route `/blog/:id`. Displays: title (large heading), author avatar + display name (inline, small), createdAt date, full content (with whitespace-pre-wrap). Admin sees Edit and Delete buttons on ALL posts. User sees Edit and Delete buttons ONLY on own posts (authorId matches session userId); on others' posts, user sees only 'Back to All Posts' button. Delete uses window.confirm(), removes from writespace_posts, redirects to `/blogs`. Ownership check applies for delete. Invalid/missing ID shows 'Post not found' with back link.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Route `/blog/:id` requires authentication; guests redirected to `/login`
  - Displays: title (large heading), author avatar + display name (inline, small), createdAt date, full content with whitespace-pre-wrap
  - Admin sees Edit and Delete buttons on ALL posts (top-right of card)
  - User sees Edit and Delete buttons ONLY on own posts (authorId matches session userId)
  - User sees only 'Back to All Posts' button on other users' posts
  - Delete: window.confirm(...), removes from writespace_posts, redirects to `/blogs`
  - Ownership check for delete: user can only delete own posts
  - Invalid/missing ID: 'Post not found' message with back link

### FR-009 — Admin Dashboard with Stats & Quick Actions [Pipeline-aligned]
Admin-only overview page at route `/admin` shown immediately after admin login. Non-admins redirected to `/blogs`. Four colorful stat cards: Total Posts, Total Users, Total Admins, Total Users. Quick-action buttons: 'Write New Post' and 'Manage Users'. Recent Posts section: 5 most recent posts with inline Edit/Delete controls. Gradient banner header: from-violet-600 to-indigo-600.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Route `/admin` accessible only to Admin; non-admins redirected to `/blogs`
  - Four stat cards: Total Posts, Total Users, Total Admins, Total Users — computed from localStorage
  - Quick-action buttons: 'Write New Post' (→ /write) and 'Manage Users' (→ /users)
  - Recent Posts section: 5 most recent posts with inline Edit/Delete controls
  - Gradient banner header: `from-violet-600 to-indigo-600`

### FR-010 — User Management Panel — Admin Only [Pipeline-aligned]
Admin page at route `/users` to create and delete user accounts. Non-admins redirected to `/blogs`. Responsive table (desktop) / stacked cards (mobile) with columns: avatar, display name, username, role badge pill, created date, Delete button. Create User form at top: Display Name, Username, Password, Role (dropdown: Admin/user). All fields required; username must be unique. On save: add to writespace_users with UUID + timestamp. Delete: window.confirm() before removal. Hard-coded admin Delete button permanently disabled with tooltip 'Default admin cannot be deleted.' Currently logged-in user cannot delete their own account.
**Priority**: must_have | **Complexity**: high | **Source**: original_prd
**Acceptance Criteria**:
  - Route `/users` accessible only to Admin; non-admins redirected to `/blogs`
  - Responsive table (desktop) / stacked cards (mobile): avatar, display name, username, role badge pill, created date, Delete button
  - Create User form at top: Display Name, Username, Password, Role (dropdown: Admin/user)
  - All fields required; username must be unique across writespace_users and hard-coded admin
  - On save: add to writespace_users with UUID + timestamp
  - Delete: window.confirm(...) before removal from writespace_users
  - Hard-coded 'admin' Delete button: permanently disabled + tooltip 'Default admin cannot be deleted.'
  - Currently logged-in user cannot delete their own account

### FR-011 — Route Guards via ProtectedRoute Component [Pipeline-aligned]
A ProtectedRoute wrapper component handles guest-to-login redirection. A ProtectedRoute variant with role='admin' additionally checks for admin role and redirects non-admins to /blogs. Ownership checks for edit/delete are handled within WriteBlog and ReadBlog components themselves. All routes follow the access control matrix defined in the PRD.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - ProtectedRoute checks writespace_session in localStorage; redirects guests to /login
  - ProtectedRoute with role='admin' redirects non-admin users to /blogs
  - All 9 routes follow the access control matrix: / (public), /login (guest only if unauthenticated), /register (guest only if unauthenticated), /blogs (auth), /blog/:id (auth), /write (auth), /edit/:id (auth + ownership), /admin (admin only), /users (admin only)
  - Ownership checks for edit/delete handled within WriteBlog and ReadBlog components

### FR-012 — localStorage Persistence Layer [Pipeline-aligned]
All data stored in localStorage with three keys: writespace_posts (array of post objects), writespace_users (array of user objects), writespace_session (session object). Passwords are plain text — documented in code comments. Utility modules: storage.js exports getPosts(), savePosts(arr), getUsers(), saveUsers(arr) with try/catch fallback to []. auth.js exports getSession(), setSession(obj), clearSession(). All IDs generated via crypto.randomUUID().
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - writespace_posts: array of {id, title, content, createdAt, authorId, authorName}
  - writespace_users: array of {id, displayName, username, password, role, createdAt}
  - writespace_session: object {userId, username, displayName, role}
  - storage.js: getPosts() and getUsers() wrapped in try/catch with [] fallback
  - storage.js: savePosts(arr) and saveUsers(arr) persist to localStorage
  - auth.js: getSession() reads writespace_session, setSession(obj) writes it, clearSession() removes it
  - All IDs generated via crypto.randomUUID()
  - Passwords stored in plain text — documented in code comments

### FR-013 — Vercel Deployment with SPA Rewrite Rules [Pipeline-aligned]
Application deployable as a static site on Vercel. vercel.json contains ONLY rewrite rules for SPA routing: { rewrites: [{ source: '/(.*)', destination: '/index.html' }] }. No builds, buildCommand, outputDirectory, installCommand, or framework keys. Direct URL access works without 404s.
**Priority**: must_have | **Complexity**: low | **Source**: original_prd
**Acceptance Criteria**:
  - vercel.json exists in project root
  - vercel.json contains ONLY rewrites key: { rewrites: [{ source: '/(.*)', destination: '/index.html' }] }
  - No builds, buildCommand, outputDirectory, installCommand, or framework keys in vercel.json
  - Direct URL access to any route (e.g., /blogs, /admin) works without 404 on Vercel

## Non-Functional Requirements

### NFR-001 — performance
Near-instant route transitions via client-side React Router v6. No network calls — all data from localStorage.
**Target**: < 100ms perceived transition time

### NFR-002 — performance
Vite HMR during development for fast iteration.

### NFR-003 — reliability
All localStorage reads wrapped in try/catch with [] fallback to handle corrupted or unavailable storage gracefully.
**Target**: Zero unhandled exceptions from storage reads

### NFR-004 — reliability
Graceful empty state if localStorage is unavailable or corrupted — all views render appropriate empty/error states.
**Target**: All views render without crashing when localStorage is empty or corrupted

### NFR-005 — reliability
Direct URL access works on Vercel via vercel.json SPA rewrites — no 404s on page refresh or direct navigation.
**Target**: Zero 404 errors on any valid route when deployed to Vercel

### NFR-006 — maintainability
Shallow component tree with no over-engineering. Inline Tailwind utility classes only — no custom CSS beyond @tailwind directives in index.css. JavaScript JSX only — no TypeScript.
**Target**: No .ts/.tsx files, no custom CSS files beyond index.css, no state management libraries

### NFR-007 — security
Passwords stored in plain text in localStorage — documented in code comments. Route guards are client-side only. Acceptable for local MVP with no sensitive data. No real passwords should be stored.
**Target**: All password storage locations documented with plain-text warnings in code comments

### NFR-008 — usability
Fully responsive UI across mobile (< 640px), tablet (768px+), and desktop (1024px+) using Tailwind responsive breakpoints. Mobile: stacked layout, hamburger nav, single-col grid, table becomes stacked cards. Tablet: 2-col blog grid. Desktop: 3-col blog grid, max-w-6xl mx-auto containers.
**Target**: UI is usable and visually correct at 375px, 768px, and 1440px viewport widths

### NFR-009 — maintainability
All React components use .jsx extension. Only pure utility files with no JSX use .js extension. PascalCase for components, camelCase for utilities. [Auto-filled]
**Target**: Zero .ts/.tsx files; all JSX-containing files use .jsx extension

### NFR-010 — security
PII Inventory: The application stores usernames, display names, and plain-text passwords in localStorage. No encryption. This is documented as acceptable for MVP demo only. No real PII should be used. [Auto-filled]
**Target**: PII storage locations documented; no real PII used in testing

## Tech Stack
- **Frontend**: Vite + React 18+ with React Router DOM v6 and Tailwind CSS [Pipeline-aligned]
- **Database**: localStorage (browser) [Pipeline-aligned]
- **Infrastructure**: Vercel (static site deployment) [Pipeline-aligned]
- *Specified by user*: True

## In Scope
- Public landing page (no login required)
- Login and self-registration flows
- Role-aware redirects and route guards
- Avatar system (Admin vs User, role-distinct visuals)
- Authenticated blog list and full post reader
- Blog create for all authenticated users (Admin and user)
- Blog edit / delete with ownership rules (own posts for user, all posts for Admin)
- Admin dashboard with stats
- Admin user management (create / delete accounts)
- All data in localStorage (posts, users, session)
- Client-side routing via React Router v6
- Fully responsive Tailwind CSS UI
- vercel.json for SPA routing on Vercel

## Out of Scope
- Backend, REST API, or database
- Password hashing or encryption (plain text localStorage only)
- OAuth or third-party auth
- Rich text editor, image uploads
- Tags, categories, comments, likes
- Forgot password / email verification

## Assumptions
- localStorage is available in the user's browser
- Users will not store real/sensitive passwords in this MVP demo
- Vercel handles SPA routing correctly with the provided vercel.json rewrites
- Hard-coded admin/admin credential is acceptable for demo purposes
- No concurrent user access or data synchronization needed
- Browser supports crypto.randomUUID()

## Constraints
- No backend, REST API, or database
- No password hashing or encryption (plain text localStorage only)
- No OAuth or third-party auth
- No rich text editor or image uploads
- No tags, categories, comments, or likes
- No forgot password or email verification
- JavaScript JSX only — no TypeScript (.ts or .tsx files)
- Tailwind CSS exclusively — no custom CSS files beyond index.css
- useState + useEffect hooks only — no Redux, Zustand, Jotai, or Context API
- Exactly 1 epic with exactly 4 user stories
- Vercel deployment as static site
- crypto.randomUUID() for all generated IDs

## Additional Context
## Storage Schema

All data stored in `localStorage`. **No encryption. Plain text.**

### `writespace_posts` — Array
```json
[
  {
    "id": "uuid-string",
    "title": "Post Title",
    "content": "Full post text...",
    "createdAt": "2026-03-04T12:00:00.000Z",
    "authorId": "uuid-or-hardcoded-admin",
    "authorName": "Admin"
  }
]
```

### `writespace_users` — Array
```json
[
  {
    "id": "uuid-string",
    "displayName": "Jane Doe",
    "username": "janedoe",
    "password": "plaintextpassword",
    "role": "user",
    "createdAt": "2026-03-04T12:00:00.000Z"
  }
]
```
Note: Passwords are plain text. Do not use real passwords. This is an MVP demo.

### `writespace_session` — Object
```json
{
  "userId": "uuid-or-admin",
  "username": "admin",
  "displayName": "Admin",
  "role": "admin"
}
```

---

## Route Map & Access Control

| Route | Component | Admin | user | Guest |
|---|---|---|---|---|
| `/` | `LandingPage` | Yes (dashboard CTA) | Yes (dashboard CTA) | Yes |
| `/login` | `LoginPage` | Redirect to `/admin` | Redirect to `/blogs` | Yes |
| `/register` | `RegisterPage` | Redirect to `/admin` | Redirect to `/blogs` | Yes |
| `/blogs` | `Home` | Yes | Yes | Redirect to `/login` |
| `/blog/:id` | `ReadBlog` | Yes | Yes | Redirect to `/login` |
| `/write` | `WriteBlog` | Yes | Yes | Redirect to `/login` |
| `/edit/:id` | `WriteBlog` | Yes (any post) | Yes (own posts only) | Redirect to `/login` |
| `/admin` | `AdminDashboard` | Yes | Redirect to `/blogs` | Redirect to `/login` |
| `/users` | `UserManagement` | Yes | Redirect to `/blogs` | Redirect to `/login` |

A `<ProtectedRoute />` wrapper handles guest-to-login redirection. A `<ProtectedRoute role="admin" />` variant additionally checks for admin role and redirects non-admins to `/blogs`. Ownership checks for edit/delete are handled within the `WriteBlog` and `ReadBlog` components themselves.

---

## Project Structure

```
writespace/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── PublicNavbar.jsx
    │   ├── Navbar.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── BlogCard.jsx
    │   ├── StatCard.jsx
    │   ├── UserRow.jsx
    │   └── Avatar.jsx
    ├── pages/
    │   ├── LandingPage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── Home.jsx
    │   ├── ReadBlog.jsx
    │   ├── WriteBlog.jsx
    │   ├── AdminDashboard.jsx
    │   └── UserManagement.jsx
    └── utils/
        ├── storage.js
        └── auth.js
```

### File Responsibilities

**`main.jsx`:** React entry point. Imports React, ReactDOM, BrowserRouter, App, and index.css. Calls `ReactDOM.createRoot(document.getElementById('root')).render(...)` to mount the app. Wraps `<App />` in `<BrowserRouter>`. Do NOT import App.css — only import `index.css`.

**`App.jsx`:** Root component. Defines all `<Route>` entries using React Router v6 `<Routes>`. Wraps protected routes in `<ProtectedRoute>`. Conditionally renders `<PublicNavbar>` or `<Navbar>` based on session state from `auth.js`.

**`index.css`:** Contains ONLY the three `@tailwind` directives (base, components, utilities). No custom CSS.

**`PublicNavbar.jsx`:** Guest navigation bar. Shows "WriteSpace" logo on left, "Login" and "Get Started" buttons on right. If logged in, shows avatar chip + "Go to Dashboard" button instead.

**`Navbar.jsx`:** Authenticated navigation bar. Shows "WriteSpace" logo, role-based nav links (Admin: All Blogs, Write, Users; user: All Blogs, Write), avatar chip with display name and logout dropdown. Mobile hamburger toggle using React state.

**`ProtectedRoute.jsx`:** Route guard component. Checks `writespace_session` in localStorage. Redirects guests to `/login`. If `role` prop is `"admin"` and user is user, redirects to `/blogs`.

**`BlogCard.jsx`:** Reusable post card component. Shows title, excerpt (first 120 chars), date, author avatar. Colorful top border cycling by index. Shows edit icon if current user is Admin (on all cards) or if current user is the post author (on their own cards).

**`StatCard.jsx`:** Reusable admin dashboard stat tile. Displays a number + label with colorful icon background.

**`UserRow.jsx`:** User table row (desktop) or stacked card (mobile). Shows avatar, display name, username, role badge, created date, delete button.

**`Avatar.jsx`:** Avatar helper. Exports: `getAvatar(role)` returning a styled JSX `<span>` with emoji + role color Tailwind classes.

**`LandingPage.jsx`:** Public landing page. Hero section with gradient background, tagline, CTA buttons. Features section with 3 cards. Latest posts preview (up to 3 from localStorage). Footer.

**`LoginPage.jsx`:** Login form on gradient background. Checks hard-coded admin first, then localStorage users. Writes session on success. Error message on failure.

**`RegisterPage.jsx`:** Registration form. Creates user account. Validates all fields, checks username uniqueness. Writes to localStorage and session.

**`Home.jsx`:** Authenticated blog list at `/blogs`. Responsive grid of BlogCard components. Empty state for no posts.

**`ReadBlog.jsx`:** Full post reader at `/blog/:id`. Shows title, author, date, full content. Admin sees edit/delete on all posts. user sees edit/delete only on their own posts (where `authorId` matches session `userId`); on others' posts, user sees only back link.

**`WriteBlog.jsx`:** Blog create (`/write`) and edit (`/edit/:id`) form. Available to all authenticated users. In edit mode, enforces ownership: user can only edit their own posts (checks `authorId` vs session `userId`); Admin can edit any post. Title + content fields with validation. Character counter. Cancel button.

**`AdminDashboard.jsx`:** Admin overview at `/admin`. Gradient header banner. Four stat cards. Quick action buttons. Recent 5 posts with edit/delete.

**`UserManagement.jsx`:** Admin user management at `/users`. Create user form at top. User table/cards below. Delete with confirmation. Hard-coded admin cannot be deleted.

**`storage.js`:** localStorage helpers. Exports: `getPosts()`, `savePosts(arr)`, `getUsers()`, `saveUsers(arr)`. All reads wrapped in `try/catch` with fallback to `[]`.

**`auth.js`:** Session helpers. Exports: `getSession()`, `setSession(obj)`, `clearSession()`. Reads/writes `writespace_session` in localStorage.

---

## UI / Design System (Tailwind CSS)

### Color Palette

| Token | Tailwind Class | Usage |
|---|---|---|
| Indigo 600 | `bg-indigo-600` / `text-indigo-600` | Primary brand, buttons, links |
| Violet 600 | `bg-violet-600` / `text-violet-600` | Admin accent, admin avatar |
| Pink 500 | `bg-pink-500` | Card accents, gradient stops |
| Teal 500 | `bg-teal-500` | Card accents, stat cards |
| Slate 50 | `bg-slate-50` | App body background |
| White | `bg-white` | Content cards |
| Slate 800 | `text-slate-800` | Body text |
| Slate 500 | `text-slate-500` | Dates, metadata |
| Red 600 | `text-red-600 bg-red-50` | Destructive actions |

### Gradients
- Auth pages (Login / Register): `bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-500`
- Landing hero: same gradient
- Admin Dashboard header: `bg-gradient-to-r from-violet-600 to-indigo-600`
- Navbar: `bg-white shadow-sm border-b border-slate-100`

### Button System

| Type | Tailwind Classes |
|---|---|
| Primary (Save) | `bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none transition-all` |
| Secondary (Edit) | `bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none` |
| Destructive (Delete) | `bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg font-medium hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none` |
| Ghost (Cancel) | `text-slate-500 px-4 py-2 rounded-lg font-medium hover:bg-slate-100 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:outline-none` |

### Role Badge Pills

Admin: `bg-violet-100 text-violet-700 ring-1 ring-violet-300 rounded-full px-3 py-0.5 text-sm font-medium`

user: `bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300 rounded-full px-3 py-0.5 text-sm font-medium`

### Blog Card Accent Borders (deterministic by index)
- Index 0: `border-t-4 border-indigo-500`
- Index 1: `border-t-4 border-violet-500`
- Index 2: `border-t-4 border-pink-500`
- Index 3: `border-t-4 border-teal-500`
- Cycle repeats using `index % 4`.

### Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `< 640px` | Stacked layout, hamburger nav, single-col grid, table becomes stacked cards |
| `md: 768px+` | 2-col blog grid, side-by-side form buttons |
| `lg: 1024px+` | 3-col blog grid, `max-w-6xl mx-auto` containers |

---

## Technical Requirements

### Frontend
- **Framework / Build:** React 18+ with Vite and `@vitejs/plugin-react` plugin.
- **Language:** JavaScript JSX only. Do NOT use TypeScript. ALL files must end in `.jsx`. Do NOT create any `.ts` or `.tsx` files.
- **File Extensions (CRITICAL):** ALL React components MUST use `.jsx` extension — this includes pages, components, and any file that contains JSX syntax. Only pure utility/helper files with NO JSX may use `.js` extension.
- **File naming:** PascalCase for components (`Avatar.jsx`, `BlogCard.jsx`, `LandingPage.jsx`), camelCase for utilities (`storage.js`, `auth.js`).
- **Routing:** React Router DOM v6 (`react-router-dom`).
- **Styling:** Tailwind CSS exclusively via utility classes inline in JSX. Do NOT use custom CSS files beyond `index.css` (which only contains the `@tailwind` directives).
- **State:** `useState` + `useEffect` hooks only. No Redux, Zustand, Jotai, or Context API.
- **IDs:** `crypto.randomUUID()` for all generated IDs.
- **No backend. No API calls. No encryption. No external auth library.**

### Required npm Dependencies

dependencies:
- `react` (^18.2.0)
- `react-dom` (^18.2.0)
- `react-router-dom` (^6.20.0)

devDependencies:
- `@vitejs/plugin-react` (^4.2.0)
- `vite` (^5.0.0)
- `tailwindcss` (^3.4.0)
- `postcss` (^8.4.0)
- `autoprefixer` (^10.4.0)

### Entry Point — `src/main.jsx`
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

### Vite Config — `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### Tailwind Config — `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### PostCSS Config — `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Tailwind CSS Entry — `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Vercel Deployment — `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### HTML Entry — `index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WriteSpace</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## Epic & User Stories

### Epic: WriteSpace — Landing, Auth, Roles & Content Management

**Goal:** A fully holistic, role-aware blog app with a public landing page, complete authentication, blog CRUD for all authenticated users (with ownership-based access control), admin dashboard, and user management. No backend. No encryption. localStorage only.

**Constraints:** Exactly 1 epic. Exactly 4 user stories. Every route, component, and requirement maps to one story.

---

## Risks

- Using TypeScript instead of JavaScript — ALL files must be `.jsx`, NEVER `.ts` or `.tsx`.
- Forgetting to include `@vitejs/plugin-react` in `vite.config.js`.
- Forgetting to create `tailwind.config.js` with the correct `content` paths.
- Forgetting to create `postcss.config.js` with `tailwindcss` and `autoprefixer` plugins.
- Forgetting to create `src/index.css` with the three `@tailwind` directives.
- Adding extra keys (`builds`, `buildCommand`, `outputDirectory`, `installCommand`, `framework`) to `vercel.json` — use ONLY `rewrites`.
- Circular component imports.
- Forgetting to wrap `<App />` in `<BrowserRouter>` inside `main.jsx`.
- Forgetting to create `main.jsx` with `ReactDOM.createRoot(document.getElementById('root')).render(...)`.
- Using CSS files or CSS modules instead of Tailwind utility classes.