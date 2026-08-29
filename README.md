# CommunityHub API - Week 11

A full-featured API built with Express, MongoDB, and JWT authentication. This project demonstrates database persistence, user authentication, and RESTful API best practices.

## 📋 Features

- ✅ **MongoDB Integration** - Data persistence with Mongoose ODM
- ✅ **User Authentication** - JWT-based authentication with bcrypt password hashing
- ✅ **CRUD Operations** - Full Create, Read, Update, Delete for posts and comments
- ✅ **Authorization** - User-based authorization (only authors can edit/delete their posts)
- ✅ **Search & Filtering** - Filter posts by author, search by text, pagination
- ✅ **Relationships** - One-to-many relationships between users, posts, and comments

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (Atlas account or local installation)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd community-hub-api
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret:
```
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/community-hub?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

5. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Posts
- `GET /api/posts` - Get all posts (with filtering, search, pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (protected)
- `PUT /api/posts/:id` - Update post (protected, author only)
- `DELETE /api/posts/:id` - Delete post (protected, author only)
- `POST /api/posts/:id/like` - Like a post (protected)

### Comments
- `GET /api/posts/:postId/comments` - Get all comments for a post
- `POST /api/posts/:postId/comments` - Add comment to post (protected)
- `DELETE /api/posts/:postId/comments/:commentId` - Delete comment (protected, author only)

## 📖 Example Usage

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Create Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first post",
    "tags": ["nodejs", "mongodb"]
  }'
```

### Get Posts with Pagination
```bash
curl http://localhost:3000/api/posts?page=1&limit=10&sort=popular
```

## 🗄️ Database Models

### User Model
- `username` - Unique username (3-30 characters)
- `email` - Unique email address
- `password` - Hashed with bcryptjs
- `role` - 'user' or 'admin' (default: 'user')
- `timestamps` - createdAt, updatedAt

### Post Model
- `title` - Required (3-200 characters)
- `content` - Required (min 10 characters)
- `author` - Reference to User (required)
- `likes` - Number of likes (default: 0)
- `tags` - Array of strings
- `published` - Boolean (default: true)
- `comments` - Array of Comment references
- `timestamps` - createdAt, updatedAt

### Comment Model
- `content` - Required (max 500 characters)
- `author` - Reference to User
- `post` - Reference to Post (required)
- `timestamps` - createdAt, updatedAt

## 🔐 Authentication Flow

1. User registers with username, email, and password
2. Password is hashed using bcryptjs (10 salt rounds)
3. On login, password is compared with hash
4. JWT token is generated with user ID (expires in 7 days)
5. Protected routes require Bearer token in Authorization header
6. Token is verified on each request

## 🔍 Authorization

- Only post authors can edit or delete their posts
- Only comment authors can delete their comments
- Admin role can perform admin-only operations (extensible)

## 💾 SQL vs NoSQL Decision

**SQL (SQLite/PostgreSQL)** is ideal for structured data with well-defined schemas and relationships, strong consistency requirements, and complex queries with JOINs. **NoSQL (MongoDB)** is better for flexible schemas, rapid iteration, horizontal scalability, and document-oriented data like posts and comments. CommunityHub uses MongoDB because our entities (users, posts, comments) map naturally to documents, the schema evolves frequently, and we prioritize development speed over strict relational structure.

## 📁 Project Structure

```
src/
├── config/
│   └── database.js        # MongoDB connection
├── controllers/
│   ├── authController.js  # Auth logic
│   ├── postsController.js # Post CRUD
│   └── commentsController.js # Comment logic
├── middleware/
│   └── auth.js            # JWT verification
├── models/
│   ├── User.js            # User schema
│   ├── Post.js            # Post schema
│   └── Comment.js         # Comment schema
├── routes/
│   ├── auth.js            # Auth routes
│   └── posts.js           # Post & comment routes
└── app.js                 # Express app
server.js                  # Entry point
```

## 🛠️ Technologies

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 📝 SQL Exercise

### Task 21.5 - SQLite Setup

Created a posts table with SQL fundamentals:

```sql
CREATE TABLE posts (
  id      INTEGER PRIMARY KEY,
  author  TEXT NOT NULL,
  title   TEXT NOT NULL,
  likes   INTEGER DEFAULT 0
);
```

Demonstrated:
- ✅ Creating tables and inserting data
- ✅ SELECT queries with WHERE clauses
- ✅ Sorting and filtering
- ✅ INNER JOIN between tables

See `sql-practice.db` for examples.

## 🚦 Error Handling

- Validation errors (400) - Invalid input data
- Authentication errors (401) - Missing/invalid token
- Authorization errors (403) - Insufficient permissions
- Not found errors (404) - Resource doesn't exist
- Server errors (500) - Internal server error

## 🔄 Next Steps

- Add email verification
- Implement refresh tokens
- Add rate limiting
- Add post categories/communities
- Implement notifications
- Add image uploads

## 👤 Author

rhonexkilibwa001-dev

## 📄 License

ISC
