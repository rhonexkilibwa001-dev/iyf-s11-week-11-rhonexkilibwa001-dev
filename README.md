# CommunityHub API (Week 10)

This repository contains the scaffold for the CommunityHub API built with Node.js and Express as part of the IYF Week 10 assignment.

Features included:
- RESTful posts endpoints (CRUD + like)
- Users endpoints (create, list, get)
- Middleware: request logger, validation, error handler
- In-memory data store for easy local testing

Getting started
1. Install dependencies

   npm install

2. Copy .env.example to .env and adjust values if needed

   cp .env.example .env

3. Run locally

   npm run dev

API Endpoints
- GET  /api/health
- GET  /api/posts
- GET  /api/posts/:id
- POST /api/posts          (body: { title, content, author })
- PUT  /api/posts/:id      (body: { title, content })
- DELETE /api/posts/:id
- PATCH  /api/posts/:id/like

- GET  /api/users
- GET  /api/users/:id
- POST /api/users          (body: { name, email })

Notes
- This scaffold uses an in-memory store (src/data/store.js). Data will reset when the server restarts.
- For production, replace the store with a database and add proper authentication.
