# Week 11: Databases & Authentication - Project Completion Summary

## 🎯 Project Overview

This is the **CommunityHub API** - a full-featured REST API built with:
- **Express.js** - Modern web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing and security

## ✅ Deliverables Completed

### Lesson 21: MongoDB & Data Persistence

#### ✓ Task 21.1: MongoDB Setup
- Connected to MongoDB using Mongoose
- Environment configuration with `.env` file
- Connection pooling and error handling implemented
- **File:** `src/config/database.js`

#### ✓ Task 21.2: Mongoose Models
- **User Model** - Users with email and username (unique)
  - Password hashing with bcryptjs
  - comparePassword method for authentication
  - Timestamps (createdAt, updatedAt)
  - **File:** `src/models/User.js`

- **Post Model** - Blog posts with relationships
  - References to User (author)
  - Tags array for categorization
  - Like counter
  - Virtual populate for comments
  - Index on title and content for text search
  - Custom methods: `like()` and `findByAuthor()`
  - **File:** `src/models/Post.js`

- **Comment Model** - Comments on posts
  - References to User and Post
  - Timestamps
  - Content validation
  - **File:** `src/models/Comment.js`

#### ✓ Task 21.3: CRUD with Mongoose
- **Posts Controller** - Full CRUD operations
  - `getAllPosts()` - Query building, filtering, sorting, pagination
  - `getPostById()` - Single post retrieval with population
  - `createPost()` - Create with validation
  - `updatePost()` - Update with authorization checks
  - `deletePost()` - Delete with authorization
  - `likePost()` - Increment likes counter
  - **File:** `src/controllers/postsController.js`

- **Comments Controller** - Comment management
  - `getComments()` - List comments for a post
  - `createComment()` - Add comment with validation
  - `deleteComment()` - Delete with authorization
  - **File:** `src/controllers/commentsController.js`

#### ✓ Task 21.4: Relationships
- One-to-Many: Users → Posts → Comments
- Populate and virtual relationships configured
- Foreign key constraints enforced
- Cascade operations tested

#### ✓ Task 21.5: SQL Fundamentals (SQLite)
- Created SQLite practice database with users and posts tables
- Demonstrated:
  - ✅ CREATE TABLE statements
  - ✅ INSERT data operations
  - ✅ SELECT with WHERE clauses
  - ✅ Sorting and ordering (ORDER BY)
  - ✅ INNER JOIN between users and posts
  - ✅ LEFT JOIN for optional relationships
  - ✅ GROUP BY and aggregation functions
- **File:** `sql-practice.sql`
- **Analysis:** `SQL-vs-NoSQL-Analysis.md`

### Lesson 22: User Authentication with JWT

#### ✓ Task 22.1: User Model
- Password hashing with bcryptjs (10 salt rounds)
- Password validation on save
- comparePassword instance method
- select: false on password field (not returned by default)
- Role-based access control (user/admin)
- **File:** `src/models/User.js`

#### ✓ Task 22.2: Registration & Login
- **Register endpoint** - `POST /api/auth/register`
  - Validation of username, email, password
  - Duplicate checking
  - Automatic password hashing on save
  - JWT token generation
  - Returns user data + token

- **Login endpoint** - `POST /api/auth/login`
  - Email and password validation
  - Password comparison with hash
  - JWT token generation with 7-day expiration
  - Secure error messaging (no user enumeration)

- **Get Me endpoint** - `GET /api/auth/me`
  - Protected route requiring valid JWT
  - Returns authenticated user profile
  - **File:** `src/controllers/authController.js`

#### ✓ Task 22.3: Auth Middleware
- **protect middleware** - JWT verification
  - Extracts token from Authorization header
  - Validates JWT signature
  - Checks token expiration
  - Attaches user to request object
  - Error handling for invalid/expired tokens

- **optionalAuth middleware** - Optional authentication
  - Doesn't fail if no token provided
  - Attaches user if token is valid
  - Continues without user if no token

- **restrictTo middleware** - Role-based access
  - Checks user role against allowed roles
  - Returns 403 Forbidden if unauthorized
  - **File:** `src/middleware/auth.js`

#### ✓ Task 22.4: User-Post Relationship
- Post author linked to User by reference
- Only post authors can edit/delete their posts
- Only comment authors can delete their comments
- Post population includes author details
- Authorization checks on all write operations
- **Files:** `src/controllers/postsController.js`, `src/controllers/commentsController.js`

## 📁 Project Structure

```
iyf-s11-week-11-rhonexkilibwa001-dev/
├── src/
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Auth logic (register, login, getMe)
│   │   ├── postsController.js       # Post CRUD operations
│   │   └── commentsController.js    # Comment management
│   ├── middleware/
│   │   └── auth.js                  # JWT verification & authorization
│   ├── models/
│   │   ├── User.js                  # User schema with bcrypt
│   │   ├── Post.js                  # Post schema with relationships
│   │   └── Comment.js               # Comment schema
│   ├── routes/
│   │   ├── auth.js                  # Auth endpoints
│   │   └── posts.js                 # Posts & comments endpoints
│   └── app.js                       # Express app configuration
├── server.js                        # Entry point
├── package.json                     # Dependencies
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore rules
├── README.md                        # Main documentation
├── SQL-vs-NoSQL-Analysis.md         # Database decision analysis
├── API-TESTING-GUIDE.md             # API testing examples
├── sql-practice.sql                 # SQL practice exercises
└── COMPLETION-SUMMARY.md            # This file
```

## 🚀 Quick Start

### Installation
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret
```

### Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:3000`

## 🔑 Key Features Implemented

### Authentication & Security
- ✅ User registration with email uniqueness
- ✅ Secure password hashing (bcryptjs)
- ✅ JWT token-based authentication
- ✅ Token expiration (7 days)
- ✅ Protected routes requiring authentication
- ✅ Role-based access control
- ✅ Authorization checks (author-only operations)

### Data Persistence
- ✅ MongoDB integration via Mongoose
- ✅ Schema validation with custom error messages
- ✅ Data relationships (1-to-many)
- ✅ Virtual population for related data
- ✅ Text search indexes
- ✅ Timestamps on all entities

### API Operations
- ✅ RESTful endpoint design
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Filtering and search capabilities
- ✅ Pagination support
- ✅ Sorting options (newest, oldest, popular)
- ✅ Proper HTTP status codes
- ✅ Comprehensive error handling

### Code Quality
- ✅ Modular architecture (controllers, models, routes)
- ✅ Middleware for cross-cutting concerns
- ✅ DRY principles applied
- ✅ Comprehensive error handling
- ✅ Input validation on all endpoints
- ✅ Proper separation of concerns

## 📚 API Endpoints Reference

### Authentication
```
POST   /api/auth/register      # Create new user account
POST   /api/auth/login         # Login and get JWT token
GET    /api/auth/me            # Get current user (protected)
```

### Posts
```
GET    /api/posts              # Get all posts (public, with filters)
GET    /api/posts/:id          # Get single post (public)
POST   /api/posts              # Create post (protected)
PUT    /api/posts/:id          # Update post (protected, author only)
DELETE /api/posts/:id          # Delete post (protected, author only)
POST   /api/posts/:id/like     # Like post (protected)
```

### Comments
```
GET    /api/posts/:postId/comments              # Get all comments (public)
POST   /api/posts/:postId/comments              # Create comment (protected)
DELETE /api/posts/:postId/comments/:commentId   # Delete comment (protected, author only)
```

## 🛡️ Security Features

1. **Password Security**
   - Hashed with bcryptjs (10 salt rounds)
   - Never stored in plain text
   - Not returned in API responses

2. **Authentication**
   - JWT tokens for stateless authentication
   - Tokens expire after 7 days
   - Verified on every protected request

3. **Authorization**
   - Only resource owners can modify their data
   - Admin role for future admin operations
   - Role-based middleware for restrictions

4. **Data Validation**
   - Required field validation
   - Email format validation
   - Username/email uniqueness
   - Content length restrictions

## 🧪 Testing

Comprehensive testing guide provided in `API-TESTING-GUIDE.md`

**Test with curl:**
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"user","email":"user@example.com","password":"pass123"}'

# Create post (use token from register)
curl -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Post","content":"Post content here"}'
```

## 📊 Database Models

### User
```javascript
{
  _id: ObjectId,
  username: String (unique, 3-30 chars),
  email: String (unique, validated),
  password: String (hashed, not returned),
  role: String (user|admin, default: user),
  createdAt: Date,
  updatedAt: Date
}
```

### Post
```javascript
{
  _id: ObjectId,
  title: String (3-200 chars, required),
  content: String (min 10 chars, required),
  author: ObjectId (references User),
  likes: Number (default: 0),
  tags: [String],
  published: Boolean (default: true),
  comments: [ObjectId] (references Comment),
  createdAt: Date,
  updatedAt: Date
}
```

### Comment
```javascript
{
  _id: ObjectId,
  content: String (required, max 500 chars),
  author: ObjectId (references User),
  post: ObjectId (references Post, required),
  createdAt: Date,
  updatedAt: Date
}
```

## 💡 Learning Outcomes

After completing this project, you understand:

### MongoDB & Mongoose
- Creating schemas with validation
- Working with relationships and references
- Using populate to join related data
- Text search with indexes
- Virtual fields and methods

### Authentication & Security
- Password hashing with bcryptjs
- JWT token generation and validation
- Authorization vs authentication
- Role-based access control
- Secure error handling

### RESTful API Design
- Proper HTTP methods and status codes
- Request/response patterns
- Error handling
- Pagination and filtering
- HATEOAS principles

### Node.js/Express Best Practices
- Middleware architecture
- MVC pattern (Models, Controllers, Routes)
- Error handling
- Environment configuration
- Async/await patterns

## 🔄 SQL vs NoSQL Decision

**CommunityHub uses MongoDB (NoSQL) because:**

1. **Document-Oriented** - Posts and comments naturally map to documents
2. **Flexible Schema** - Easy to add new fields without migrations
3. **Developer Experience** - JSON-like documents match JavaScript objects
4. **Scalability** - Horizontal scaling through sharding
5. **Development Speed** - No schema definition upfront

**MongoDB Trade-offs:**
- No JOINs (use population instead)
- Denormalization for query performance
- Eventual consistency (not ACID by default)

*See `SQL-vs-NoSQL-Analysis.md` for detailed comparison*

## 📝 SQL Practice

Included `sql-practice.sql` demonstrates:
- Table creation with constraints
- INSERT and SELECT operations
- WHERE clauses and filtering
- INNER JOIN for related data
- LEFT JOIN for optional relationships
- GROUP BY and aggregation
- ORDER BY for sorting

## 🚀 Next Steps / Future Enhancements

- [ ] Email verification for registrations
- [ ] Refresh token implementation
- [ ] Rate limiting on endpoints
- [ ] Post categories/communities
- [ ] User notifications system
- [ ] Image upload support
- [ ] Full-text search improvements
- [ ] Caching layer (Redis)
- [ ] API versioning
- [ ] Automated testing (Jest, Supertest)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Deployment (Heroku, AWS, DigitalOcean)

## 📄 Documentation Files

- **README.md** - Main project documentation
- **COMPLETION-SUMMARY.md** - This file (what was implemented)
- **SQL-vs-NoSQL-Analysis.md** - Database technology decision
- **API-TESTING-GUIDE.md** - Testing all endpoints with examples
- **sql-practice.sql** - SQL fundamentals exercises

## 👤 Author

rhonexkilibwa001-dev

## 📄 License

ISC

## ✨ Summary

This project successfully implements a full-featured API with:
- ✅ Database persistence (MongoDB)
- ✅ User authentication (JWT)
- ✅ Authorization (role-based)
- ✅ CRUD operations
- ✅ Relationships and references
- ✅ Validation and error handling
- ✅ RESTful design principles
- ✅ Production-ready code structure

**All Week 11 deliverables completed!** 🎉
