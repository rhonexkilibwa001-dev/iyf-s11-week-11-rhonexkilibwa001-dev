# Development Notes

## Setup Instructions

### 1. MongoDB Setup

**Option A: MongoDB Atlas (Cloud - Recommended)**
```bash
1. Go to mongodb.com/atlas
2. Create free account
3. Create new cluster (free tier)
4. Add database user (username/password)
5. Whitelist your IP (0.0.0.0/0 for development)
6. Copy connection string
7. Add to .env: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/community-hub
```

**Option B: Local MongoDB**
```bash
# Mac
brew install mongodb-community
brew services start mongodb-community

# Windows
# Download from mongodb.com and install

# Use local connection
MONGODB_URI=mongodb://localhost:27017/community-hub
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `dotenv` - Environment variables
- `cors` - Cross-origin requests
- `nodemon` (dev) - Auto-restart on file changes

### 3. Environment Configuration

```bash
# Copy template
cp .env.example .env

# Edit .env with your values
echo 'PORT=3000
MONGODB_URI=YOUR_MONGO_URI_HERE
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d' > .env
```

### 4. Start Development Server

```bash
npm run dev
```

Server runs on http://localhost:3000

## Project Architecture

### Folder Structure
```
src/
├── config/          # Configuration files
│   └── database.js  # MongoDB connection
├── controllers/     # Business logic
│   ├── authController.js
│   ├── postsController.js
│   └── commentsController.js
├── middleware/      # Express middleware
│   └── auth.js      # JWT verification
├── models/          # Mongoose schemas
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── routes/          # API routes
│   ├── auth.js
│   └── posts.js
└── app.js           # Express app setup
```

### Request Flow

```
Client Request
    ↓
Express Middleware (CORS, JSON parser)
    ↓
Route Handler (finds matching route)
    ↓
Auth Middleware (if protected route)
    ↓
Controller Function (business logic)
    ↓
Mongoose Model (database operations)
    ↓
Response sent to client
```

## Common Development Tasks

### Create New Endpoint

1. **Add controller method** in `src/controllers/*.js`:
```javascript
const myEndpoint = async (req, res, next) => {
    try {
        // Your logic
        res.json({ data: "result" });
    } catch (error) {
        next(error);
    }
};
```

2. **Add route** in `src/routes/*.js`:
```javascript
router.get('/endpoint', protect, myController.myEndpoint);
```

3. **Test with curl**:
```bash
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/api/endpoint
```

### Add Field to Model

1. **Update schema** in `src/models/*.js`:
```javascript
const schema = new mongoose.Schema({
    newField: {
        type: String,
        required: true,
        trim: true
    }
});
```

2. **Update controller** to handle new field
3. **No migration needed** - MongoDB accepts new fields automatically

### Debug Issues

```javascript
// Add logging in controller
console.log('Request body:', req.body);
console.log('User:', req.user);
console.log('Error:', error);

// Check MongoDB connection
MONGODB_URI=mongodb://localhost:27017/community-hub npm run dev

// Test endpoint
curl -X GET http://localhost:3000/api/health
```

## Common Errors & Solutions

### "Cannot connect to MongoDB"
- Check MONGODB_URI in .env
- Verify MongoDB is running
- Check IP whitelist on MongoDB Atlas
- Verify username/password

### "ValidationError: title is required"
- Client not sending required field
- Check request body format
- Use Content-Type: application/json header

### "Invalid token"
- Token not provided in Authorization header
- Token format must be: `Bearer TOKEN`
- Token may be expired (7 days)
- Check JWT_SECRET matches

### "Not authorized to update this post"
- Only post author can update
- Make sure you're logged in with author account
- Check post author_id matches user._id

## Testing Checklist

- [ ] Server starts without errors
- [ ] Health check endpoint responds: GET /api/health
- [ ] Can register new user: POST /api/auth/register
- [ ] Can login: POST /api/auth/login
- [ ] Can get user profile: GET /api/auth/me
- [ ] Can create post (with token): POST /api/posts
- [ ] Can read posts: GET /api/posts
- [ ] Can update own post: PUT /api/posts/:id
- [ ] Cannot update others' posts: GET 403
- [ ] Can delete own post: DELETE /api/posts/:id
- [ ] Can add comment: POST /api/posts/:id/comments
- [ ] Can like post: POST /api/posts/:id/like
- [ ] Pagination works: GET /api/posts?page=1&limit=5
- [ ] Search works: GET /api/posts?search=term
- [ ] Sorting works: GET /api/posts?sort=popular

## Performance Tips

1. **Use indexes** for frequently searched fields
```javascript
postSchema.index({ title: 'text', content: 'text' });
```

2. **Populate selectively** - only fetch needed fields
```javascript
.populate('author', 'username email') // Only username and email
```

3. **Implement pagination** - don't fetch all documents
```javascript
.skip((page - 1) * limit).limit(limit)
```

4. **Use lean()** for read-only queries
```javascript
Post.find().lean() // Returns plain objects, faster
```

5. **Monitor slow queries** in MongoDB Atlas

## Deployment Checklist

- [ ] Update JWT_SECRET to a strong random value
- [ ] Set production MONGODB_URI
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Set up rate limiting
- [ ] Configure CORS properly (not 0.0.0.0/0)
- [ ] Add request logging
- [ ] Set up error monitoring (Sentry)
- [ ] Database backups enabled
- [ ] SSL certificates configured
- [ ] Environment variables secured (no .env in git)

## Resources

- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [bcryptjs Docs](https://www.npmjs.com/package/bcryptjs)
- [MongoDB Docs](https://docs.mongodb.com/)
- [REST API Best Practices](https://restfulapi.net/)
