# Implementation Tasks

<!-- nexus-tasks-version: 1 -->

## T01 — Scaffold: dependencies, config files, entry points, global styles

```nexus-task
{
  "task_id": "T01",
  "title": "Scaffold: dependencies, config files, entry points, global styles",
  "status": "done",
  "depends_on": [],
  "target_files": [
    "package.json",
    "vite.config.js",
    "postcss.config.js",
    "tailwind.config.js",
    "vercel.json",
    "index.html",
    "src/index.css",
    "src/main.jsx",
    "src/App.jsx"
  ],
  "estimated_complexity": 4,
  "assigned_worker_type": "execution",
  "completion_summary": "Scaffolded the WriteSpace SPA foundation: (1) package.json \u2014 removed TypeScript, added React 18 + React Router v6 + PropTypes deps and @vitejs/plugin-react; build script is now \"vite build\". (2) index.html \u2014 proper #root mount point, module script to /src/main.jsx, favicon link, meta description. (3) src/index.css \u2014 Tailwind v4 entry with @import \"tailwindcss\", Google Fonts for Fraunces/Inter Tight/JetBrains Mono, and a complete @theme block with all 22 design tokens (colors, fonts, radii). (4) src/App.jsx \u2014 root component with useState/useEffect reading getSession(), conditional PublicNavbar \u2026"
}
```

**Description:** Add app-specific dependencies (react-router-dom, prop-types) to the existing Vite-scaffolded package.json. Create all config files (vite.config.js, postcss.config.js, tailwind.config.js, vercel.json) and entry files (index.html, src/main.jsx, src/App.jsx, src/index.css). Define Tailwind @theme tokens and font imports in index.css. Set up BrowserRouter and all 9 routes in App.jsx with conditional PublicNavbar/Navbar rendering and ProtectedRoute wrappers.

**Acceptance:**
- [x] package.json includes react, react-dom, react-router-dom, prop-types as dependencies and @vitejs/plugin-react, tailwindcss, postcss, autoprefixer as devDependencies
- [x] vite.config.js registers @vitejs/plugin-react and tailwindcss() plugin
- [x] postcss.config.js registers tailwindcss and autoprefixer plugins
- [x] tailwind.config.js has content paths for ./index.html and ./src/**/*.{js,jsx}
- [x] vercel.json contains SPA rewrite rule: { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
- [x] index.html has <div id="root"></div> and <script type="module" src="/src/main.jsx"></script>
- [x] src/index.css starts with @import "tailwindcss" and defines @theme block with design tokens (colors, fonts, radius)
- [x] src/main.jsx imports BrowserRouter and renders <App /> inside it, mounted to #root
- [x] src/App.jsx defines all 9 routes: /, /login, /register, /blogs, /blog/:id, /write, /edit/:id, /admin, /users with ProtectedRoute wrappers for authenticated routes
- [x] App.jsx conditionally renders PublicNavbar when no session, Navbar when session exists

**Completion notes:** Scaffolded the WriteSpace SPA foundation: (1) package.json — removed TypeScript, added React 18 + React Router v6 + PropTypes deps and @vitejs/plugin-react; build script is now "vite build". (2) index.html — proper #root mount point, module script to /src/main.jsx, favicon link, meta description. (3) src/index.css — Tailwind v4 entry with @import "tailwindcss", Google Fonts for Fraunces/Inter Tight/JetBrains Mono, and a complete @theme block with all 22 design tokens (colors, fonts, radii). (4) src/App.jsx — root component with useState/useEffect reading getSession(), conditional PublicNavbar …

---

## T02 — Utility modules: storage.js and auth.js

```nexus-task
{
  "task_id": "T02",
  "title": "Utility modules: storage.js and auth.js",
  "status": "done",
  "depends_on": [
    "T01"
  ],
  "target_files": [
    "src/utils/storage.js",
    "src/utils/auth.js"
  ],
  "estimated_complexity": 2,
  "assigned_worker_type": "execution",
  "completion_summary": "Created storage.js (getPosts/savePosts/getUsers/saveUsers with try/catch fallback) and auth.js (getSession/setSession/clearSession)."
}
```

**Description:** Create the two utility modules that all components depend on. storage.js exports getPosts, savePosts, getUsers, saveUsers with try/catch localStorage wrappers. auth.js exports getSession, setSession, clearSession for writespace_session management.

**Acceptance:**
- [x] storage.js getPosts() reads writespace_posts from localStorage, returns parsed array or [] on error/missing
- [x] storage.js savePosts(arr) writes JSON.stringify(arr) to writespace_posts
- [x] storage.js getUsers() reads writespace_users from localStorage, returns parsed array or [] on error/missing
- [x] storage.js saveUsers(arr) writes JSON.stringify(arr) to writespace_users
- [x] auth.js getSession() reads writespace_session, returns parsed object or null
- [x] auth.js setSession(obj) writes JSON.stringify(obj) to writespace_session
- [x] auth.js clearSession() removes writespace_session from localStorage

**Completion notes:** Created storage.js (getPosts/savePosts/getUsers/saveUsers with try/catch fallback) and auth.js (getSession/setSession/clearSession).

---

## T03 — Shared components: Avatar, PublicNavbar, Navbar, ProtectedRoute, BlogCard, StatCard

```nexus-task
{
  "task_id": "T03",
  "title": "Shared components: Avatar, PublicNavbar, Navbar, ProtectedRoute, BlogCard, StatCard",
  "status": "done",
  "depends_on": [
    "T02"
  ],
  "target_files": [
    "src/components/Avatar.jsx",
    "src/components/PublicNavbar.jsx",
    "src/components/Navbar.jsx",
    "src/components/ProtectedRoute.jsx",
    "src/components/BlogCard.jsx",
    "src/components/StatCard.jsx"
  ],
  "estimated_complexity": 5,
  "assigned_worker_type": "execution",
  "completion_summary": "Created all 6 shared components: Avatar, PublicNavbar, Navbar, ProtectedRoute, BlogCard, StatCard."
}
```

**Description:** Build all 6 shared/reusable components. Avatar.jsx exports getAvatar(role) returning role-distinct emoji spans. PublicNavbar.jsx shows guest links or authenticated avatar chip. Navbar.jsx shows role-based nav links, avatar chip with logout dropdown, mobile hamburger. ProtectedRoute.jsx guards routes by auth and optional admin role. BlogCard.jsx renders post card with colored accent border, excerpt, author avatar, conditional edit icon. StatCard.jsx renders dashboard stat tile.

**Acceptance:**
- [x] Avatar.jsx getAvatar('admin') returns <span> with crown emoji and bg-violet-600 classes
- [x] Avatar.jsx getAvatar('user') returns <span> with book emoji and bg-indigo-500 classes
- [x] PublicNavbar.jsx shows 'WriteSpace' logo on left, 'Login' and 'Get Started' buttons for guests
- [x] PublicNavbar.jsx shows avatar chip + display name + 'Go to Dashboard' when session exists (Admin→/admin, user→/blogs)
- [x] Navbar.jsx shows logo linking to /, role-based links (Admin: All Blogs, Write, Users; user: All Blogs, Write)
- [x] Navbar.jsx active link has indigo background rounded pill style
- [x] Navbar.jsx far right has avatar chip + display name + dropdown with Logout that clears session and redirects to /
- [x] Navbar.jsx mobile hamburger toggle uses React state only
- [x] ProtectedRoute.jsx redirects to /login when no session, redirects to /blogs when role='admin' prop set but session.role !== 'admin'
- [x] ProtectedRoute.jsx renders <Outlet /> when checks pass
- [x] BlogCard.jsx displays title, excerpt (first 120 chars), formatted date (MMM DD, YYYY), author name + avatar
- [x] BlogCard.jsx has colorful top border accent cycling by index % 4 (indigo, violet, pink, teal)
- [x] BlogCard.jsx shows pencil Edit icon for Admin on every card, for user only when authorId === session.userId
- [x] StatCard.jsx renders numeric value + label with colored icon background

**Completion notes:** Created all 6 shared components: Avatar, PublicNavbar, Navbar, ProtectedRoute, BlogCard, StatCard.

---

## T04 — Public pages: LandingPage, LoginPage, RegisterPage

```nexus-task
{
  "task_id": "T04",
  "title": "Public pages: LandingPage, LoginPage, RegisterPage",
  "status": "done",
  "depends_on": [
    "T03"
  ],
  "target_files": [
    "src/pages/LandingPage.jsx",
    "src/pages/LoginPage.jsx",
    "src/pages/RegisterPage.jsx"
  ],
  "estimated_complexity": 5,
  "assigned_worker_type": "execution",
  "completion_summary": "Created LandingPage (hero, features, latest posts, footer), LoginPage (admin check + localStorage auth), RegisterPage (validation + signup)."
}
```

**Description:** Build the 3 public-facing pages. LandingPage.jsx at / with hero section (gradient background, CTAs, floating card animation), features section (3 cards), latest posts preview (up to 3 from localStorage), and footer. LoginPage.jsx at /login with username/password form, hard-coded admin check, localStorage user search, session write, role-based redirect. RegisterPage.jsx at /register with Display Name/Username/Password/Confirm Password form, validation, uniqueness check, user save, session write, redirect.

**Acceptance:**
- [x] LandingPage.jsx hero has gradient from-indigo-600 via-violet-600 to-pink-500, app name in large bold white text, tagline
- [x] LandingPage.jsx 'Start Reading' CTA goes to /blogs if authenticated else /login; 'Get Started Free' goes to /register
- [x] LandingPage.jsx has CSS-only floating card animation (no JS animation libraries)
- [x] LandingPage.jsx features section has 3 cards: 'Write Freely', 'Private & Local', 'Instant & Fast' in responsive row
- [x] LandingPage.jsx latest posts preview shows up to 3 most recent posts from writespace_posts with title, excerpt, date
- [x] LandingPage.jsx unauthenticated clicks on post cards redirect to /login
- [x] LandingPage.jsx empty state shows 'No posts yet — check back soon!'
- [x] LandingPage.jsx footer has links Home, All Blogs, Login, Register; dark slate background, copyright year
- [x] LoginPage.jsx has full-viewport gradient background, centered white card with shadow, app logo at top
- [x] LoginPage.jsx checks hard-coded admin (admin/admin) first, then searches writespace_users
- [x] LoginPage.jsx on success writes writespace_session, redirects Admin→/admin, user→/blogs
- [x] LoginPage.jsx on failure shows inline error 'Invalid username or password.'
- [x] LoginPage.jsx already-authenticated users redirected to role home
- [x] RegisterPage.jsx validates all fields required, password match, username uniqueness (across writespace_users and 'admin')
- [x] RegisterPage.jsx on success saves user to writespace_users with UUID, role='user', createdAt; writes session; redirects to /blogs

**Completion notes:** Created LandingPage (hero, features, latest posts, footer), LoginPage (admin check + localStorage auth), RegisterPage (validation + signup).

---

## T05 — Blog feature area: Home (blog list), ReadBlog, WriteBlog

```nexus-task
{
  "task_id": "T05",
  "title": "Blog feature area: Home (blog list), ReadBlog, WriteBlog",
  "status": "done",
  "depends_on": [
    "T03"
  ],
  "target_files": [
    "src/pages/Home.jsx",
    "src/pages/ReadBlog.jsx",
    "src/pages/WriteBlog.jsx"
  ],
  "estimated_complexity": 5,
  "assigned_worker_type": "execution",
  "completion_summary": "Created Home (blog grid), ReadBlog (full post + role-based edit/delete), WriteBlog (create/edit with ownership enforcement)."
}
```

**Description:** Build the 3 blog-related pages. Home.jsx at /blogs shows responsive grid of BlogCards sorted newest-first with empty state. ReadBlog.jsx at /blog/:id shows full post with role-based Edit/Delete buttons and ownership enforcement. WriteBlog.jsx at /write and /edit/:id handles create and edit with title/content validation, character counter, ownership enforcement on edit, UUID generation via crypto.randomUUID().

**Acceptance:**
- [x] Home.jsx requires authentication; guests redirected to /login
- [x] Home.jsx responsive grid: 1 col mobile, 2 col tablet (md:), 3 col desktop (lg:)
- [x] Home.jsx posts sorted newest first
- [x] Home.jsx empty state shows 'No blogs yet. Be the first to write one!' with Write CTA linking to /write
- [x] ReadBlog.jsx displays full post: title, author name + avatar, formatted date, full content
- [x] ReadBlog.jsx Admin sees Edit and Delete buttons on every post
- [x] ReadBlog.jsx user sees Edit and Delete only when authorId === session.userId
- [x] ReadBlog.jsx Delete uses window.confirm() and removes post from writespace_posts, redirects to /blogs
- [x] WriteBlog.jsx at /write creates new post with crypto.randomUUID(), authorId from session, createdAt timestamp
- [x] WriteBlog.jsx at /edit/:id loads existing post; user redirected to /blogs if authorId !== session.userId (Admin bypasses)
- [x] WriteBlog.jsx title required (non-empty), content required (non-empty), character counter for content
- [x] WriteBlog.jsx on save redirects to /blog/:id for the saved post

**Completion notes:** Created Home (blog grid), ReadBlog (full post + role-based edit/delete), WriteBlog (create/edit with ownership enforcement).

---

## T06 — Admin feature area: AdminDashboard and UserManagement

```nexus-task
{
  "task_id": "T06",
  "title": "Admin feature area: AdminDashboard and UserManagement",
  "status": "done",
  "depends_on": [
    "T03"
  ],
  "target_files": [
    "src/pages/AdminDashboard.jsx",
    "src/pages/UserManagement.jsx"
  ],
  "estimated_complexity": 4,
  "assigned_worker_type": "execution",
  "completion_summary": "Created AdminDashboard (stats, quick actions, recent posts) and UserManagement (create/delete users, responsive table/cards)."
}
```

**Description:** Build the 2 admin-exclusive pages. AdminDashboard.jsx at /admin shows gradient banner, 4 StatCards (Total Posts, Total Users, Total Admins, Total Users), quick-action buttons, and 5 most recent posts with inline Edit/Delete. UserManagement.jsx at /users shows Create User form (Display Name, Username, Password, Role dropdown) and responsive user table/cards with Delete, hard-coded admin row protection, and self-deletion prevention.

**Acceptance:**
- [x] AdminDashboard.jsx requires admin role; non-admin redirected to /blogs
- [x] AdminDashboard.jsx has gradient banner with admin welcome message
- [x] AdminDashboard.jsx shows 4 StatCards: Total Posts, Total Users, Total Admins, Total Users with computed values from localStorage
- [x] AdminDashboard.jsx has quick-action buttons: Write New Post, Manage Users
- [x] AdminDashboard.jsx shows 5 most recent posts with inline Edit and Delete buttons
- [x] UserManagement.jsx requires admin role; non-admin redirected to /blogs
- [x] UserManagement.jsx Create User form has Display Name, Username, Password, Role (admin/user) dropdown
- [x] UserManagement.jsx validates all fields required and username uniqueness
- [x] UserManagement.jsx responsive user table (desktop) / cards (mobile) with avatar, display name, username, role badge, Delete button
- [x] UserManagement.jsx hard-coded admin row has permanently disabled Delete button with tooltip
- [x] UserManagement.jsx prevents self-deletion (session userId cannot delete own account)

**Completion notes:** Created AdminDashboard (stats, quick actions, recent posts) and UserManagement (create/delete users, responsive table/cards).

---

## T07 — Deployment and documentation: .gitignore, .env.example, README.md, favicon

```nexus-task
{
  "task_id": "T07",
  "title": "Deployment and documentation: .gitignore, .env.example, README.md, favicon",
  "status": "done",
  "depends_on": [
    "T01"
  ],
  "target_files": [
    ".gitignore",
    ".env.example",
    "README.md",
    "public/favicon.svg"
  ],
  "estimated_complexity": 1,
  "assigned_worker_type": "execution",
  "completion_summary": "Created .gitignore, .env.example, README.md with full docs, and favicon.svg."
}
```

**Description:** Create deployment and documentation files. .gitignore with standard patterns. .env.example with any environment variables. README.md with project overview, setup instructions, localStorage schema, role documentation, and Private license. Include a simple favicon and meta tags in index.html.

**Acceptance:**
- [x] .gitignore includes node_modules/, dist/, build/, .env, __pycache__/, .pytest_cache/, coverage/, .DS_Store
- [x] .env.example exists with any environment variables the app reads, with comments
- [x] README.md includes project name, description, tech stack, setup instructions (npm install, npm run dev, npm run build), localStorage schema, role documentation, and '## License\nThis project is private and proprietary.'
- [x] public/favicon.svg is a simple SVG favicon
- [x] index.html includes favicon link and minimal meta tags (charset, viewport, description)

**Completion notes:** Created .gitignore, .env.example, README.md with full docs, and favicon.svg.

---
