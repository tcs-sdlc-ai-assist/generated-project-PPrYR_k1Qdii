# WriteSpace

A fully client-side, single-page blog application with role-based access control. Built with Vite, React 18, React Router v6, and Tailwind CSS. All data is persisted in the browser's localStorage — no backend, no database, no API.

## Features

- **Public Landing Page** — Hero section, feature cards, and latest posts preview
- **Authentication** — Self-service registration and login with hard-coded admin account
- **Role-Based Access** — Admin (full control) and user (own posts only)
- **Blog CRUD** — Create, read, edit, and delete blog posts with ownership enforcement
- **Admin Dashboard** — Platform statistics and quick actions
- **User Management** — Admin-only panel to create and delete user accounts
- **Fully Responsive** — Works on mobile, tablet, and desktop

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite |
| UI | React 18 |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS v4 |
| Persistence | localStorage (browser) |
| Deployment | Vercel (static) |

## Getting Started

### Prerequisites

- Node.js 18+ or Bun

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

Output goes to `dist/`.

### Preview Production Build

```bash
npm run preview
```

## Default Admin Account

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin` |

This account is hard-coded and cannot be deleted through the UI.

## localStorage Schema

### `writespace_posts` — Array of post objects

```json
[
  {
    "id": "uuid",
    "title": "Post Title",
    "content": "Full post text...",
    "createdAt": "2026-03-04T12:00:00.000Z",
    "authorId": "uuid-or-admin",
    "authorName": "Author Name"
  }
]
```

### `writespace_users` — Array of user objects

```json
[
  {
    "id": "uuid",
    "displayName": "Jane Doe",
    "username": "janedoe",
    "password": "plaintext",
    "role": "user",
    "createdAt": "2026-03-04T12:00:00.000Z"
  }
]
```

> **⚠️ Warning:** Passwords are stored in plain text. Do not use real passwords. This is an MVP demo.

### `writespace_session` — Current session object

```json
{
  "userId": "uuid-or-admin",
  "username": "admin",
  "displayName": "Admin",
  "role": "admin"
}
```

## Roles

| Role | Capabilities |
|------|-------------|
| **Admin** | Create/edit/delete any post, access dashboard, manage users |
| **User** | Create posts, edit/delete own posts, read all posts |

## Routes

| Route | Access |
|-------|--------|
| `/` | Public landing page |
| `/login` | Guest only |
| `/register` | Guest only |
| `/blogs` | Authenticated |
| `/blog/:id` | Authenticated |
| `/write` | Authenticated |
| `/edit/:id` | Authenticated (ownership enforced) |
| `/admin` | Admin only |
| `/users` | Admin only |

## Deployment

Deploy to Vercel as a static site. The `vercel.json` includes SPA rewrite rules so all routes work on direct access.

## License

This project is private and proprietary.
