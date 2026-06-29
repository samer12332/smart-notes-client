# Smart Notes Workspace Client

A responsive React frontend for the **Smart Notes Workspace** full-stack project.

The app allows users to register, login, manage notes, search, filter, sort, paginate, switch between dark and light themes, and interact with a protected notes workspace.

---

## Features

- Register page
- Login page
- JWT authentication flow
- Protected routes
- Dashboard page
- Notes list page
- Create note page
- Edit note page
- Note details page
- Profile page
- Full notes CRUD
- Search notes
- Debounced search
- Filter by category
- Filter by status
- Sort notes
- Pagination
- Loading states
- Error states
- Empty states
- Delete confirmation
- Dark / light theme toggle
- Responsive UI

---

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Zod
- TanStack Query
- Redux Toolkit
- React Redux
- Axios
- Tailwind CSS

---

## Project Structure

```txt
src/
├── api/
│   ├── authApi.ts
│   ├── axiosInstance.ts
│   └── notesApi.ts
├── app/
│   ├── hooks.ts
│   ├── queryClient.ts
│   └── store.ts
├── components/
│   ├── layout/
│   │   └── AppLayout.tsx
│   ├── notes/
│   │   └── NoteForm.tsx
│   └── ui/
│       └── ThemeToggle.tsx
├── features/
│   ├── auth/
│   │   ├── authSchemas.ts
│   │   ├── authSlice.ts
│   │   └── authTypes.ts
│   └── notes/
│       ├── noteSchemas.ts
│       └── noteTypes.ts
├── pages/
│   ├── CreateNotePage.tsx
│   ├── DashboardPage.tsx
│   ├── EditNotePage.tsx
│   ├── LoginPage.tsx
│   ├── NoteDetailsPage.tsx
│   ├── NotesListPage.tsx
│   ├── ProfilePage.tsx
│   └── RegisterPage.tsx
├── routes/
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
├── utils/
│   ├── getErrorMessage.ts
│   ├── parseTags.ts
│   └── theme.ts
├── App.tsx
├── index.css
└── main.tsx
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <frontend-repository-url>
cd smart-notes-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

You can also check `.env.example`.

### 4. Start the backend API

Make sure the backend server is running on:

```txt
http://localhost:5000
```

Backend repository:

```txt
smart-notes-api
```

### 5. Run the frontend app

```bash
npm run dev
```

The app should run on:

```txt
http://localhost:5173
```

---

## Scripts

### Run development server

```bash
npm run dev
```

### Build production version

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

---

## Environment Variables

| Variable       | Description          | Example                 |
| -------------- | -------------------- | ----------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

---

## App Routes

| Route             | Description       | Protected |
| ----------------- | ----------------- | --------- |
| `/register`       | Register new user | No        |
| `/login`          | Login user        | No        |
| `/dashboard`      | User dashboard    | Yes       |
| `/notes`          | Notes list        | Yes       |
| `/notes/create`   | Create note       | Yes       |
| `/notes/:id`      | Note details      | Yes       |
| `/notes/:id/edit` | Edit note         | Yes       |
| `/profile`        | User profile      | Yes       |

---

## Authentication Flow

1. User registers or logs in.
2. Backend returns user data and JWT token.
3. Token and user data are saved in `localStorage`.
4. Redux stores the current auth state.
5. Axios interceptor sends the token with protected requests.
6. Protected routes redirect unauthenticated users to `/login`.
7. Logout clears Redux state and `localStorage`.

---

## API Integration

The frontend communicates with the backend using Axios.

Base Axios instance:

```txt
src/api/axiosInstance.ts
```

Auth API:

```txt
src/api/authApi.ts
```

Notes API:

```txt
src/api/notesApi.ts
```

The API base URL is loaded from:

```env
VITE_API_URL=http://localhost:5000
```

---

## Notes Features

### Create Note

Users can create a note with:

- Title
- Content
- Category
- Tags
- Status
- Pinned state

### View Notes

The notes list supports:

- Search
- Debounced search
- Category filter
- Status filter
- Sorting
- Pagination
- Empty state
- Loading state
- Error state

### Edit Note

Users can update:

- Title
- Content
- Category
- Tags
- Status
- Pinned state

### Delete Note

Before deleting a note, the app shows a confirmation dialog.

---

## Note Statuses

```txt
draft
active
archived
```

---

## Sorting Options

```txt
createdAt
updatedAt
title
category
status
isPinned
```

---

## Forms and Validation

The project uses:

- React Hook Form
- Zod
- `@hookform/resolvers`

Validation files:

```txt
src/features/auth/authSchemas.ts
src/features/notes/noteSchemas.ts
```

---

## State Management

### Redux Toolkit

Used for authentication state:

```txt
src/features/auth/authSlice.ts
```

Stores:

- Current user
- JWT token

### TanStack Query

Used for server state:

- Fetching notes
- Fetching note details
- Creating notes
- Updating notes
- Deleting notes
- Cache invalidation

Query client file:

```txt
src/app/queryClient.ts
```

---

## Theme

The app supports dark and light mode.

Theme files:

```txt
src/utils/theme.ts
src/components/ui/ThemeToggle.tsx
```

The selected theme is saved in `localStorage`.

Tailwind dark mode support is configured in:

```txt
src/index.css
```

Using:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

---

## Responsive Design

The UI is responsive and works across:

- Mobile screens
- Tablets
- Desktop screens

Tailwind CSS utility classes are used for layout and styling.

---

## Main Pages

### Register Page

Allows a new user to create an account.

```txt
/register
```

### Login Page

Allows an existing user to login.

```txt
/login
```

### Dashboard Page

Displays a welcome message and workspace entry point.

```txt
/dashboard
```

### Notes List Page

Displays notes with search, filters, sorting, pagination, and delete action.

```txt
/notes
```

### Create Note Page

Allows users to create a new note.

```txt
/notes/create
```

### Note Details Page

Displays full note content and metadata.

```txt
/notes/:id
```

### Edit Note Page

Allows users to update an existing note.

```txt
/notes/:id/edit
```

### Profile Page

Displays current user information.

```txt
/profile
```

---

## Manual Testing Checklist

Before submission, test the following:

```txt
Register works
Login works
Logout works
Protected routes redirect to /login without token
Dashboard opens after login
Profile shows user data
Notes list loads
Create note works
View note works
Edit note works
Delete note asks for confirmation
Search works
Debounced search works
Filter by category works
Filter by status works
Sorting works
Pagination works
Dark mode works
Light mode works
Responsive design works
Production build succeeds
```

---

## Build Check

Run:

```bash
npm run build
npm run lint
```

Both commands should finish without errors.

---

## Submission Notes

This frontend is part of the **Smart Notes Workspace** full-stack project.

The full submission includes:

- Frontend GitHub repository
- Backend GitHub repository
- README files
- `.env.example`
- Postman collection
