# API Testing Guide

This guide demonstrates how to test the CommunityHub API endpoints using curl or Postman.

## Setup

1. Start the server: `npm run dev`
2. Server runs on `http://localhost:3000`
3. All requests use JSON format

## Authentication Endpoints

### Register New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

### Get Current User (Protected)

```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Posts Endpoints

### Create Post (Protected)

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first post about Node.js and MongoDB",
    "tags": ["nodejs", "mongodb", "api"]
  }'
```

### Get All Posts (Public)

```bash
# Basic request
curl http://localhost:3000/api/posts

# With pagination
curl "http://localhost:3000/api/posts?page=1&limit=10"

# With sorting
curl "http://localhost:3000/api/posts?sort=popular"
curl "http://localhost:3000/api/posts?sort=oldest"

# With search
curl "http://localhost:3000/api/posts?search=mongodb"
```

### Get Single Post (Public)

```bash
curl http://localhost:3000/api/posts/507f1f77bcf86cd799439011
```

### Update Post (Protected)

```bash
curl -X PUT http://localhost:3000/api/posts/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content here",
    "tags": ["updated"]
  }'
```

### Delete Post (Protected)

```bash
curl -X DELETE http://localhost:3000/api/posts/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Like Post (Protected)

```bash
curl -X POST http://localhost:3000/api/posts/507f1f77bcf86cd799439011/like \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Comments Endpoints

### Get Comments for a Post (Public)

```bash
curl http://localhost:3000/api/posts/507f1f77bcf86cd799439011/comments
```

### Add Comment to Post (Protected)

```bash
curl -X POST http://localhost:3000/api/posts/507f1f77bcf86cd799439011/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "content": "Great post! Very informative and well written."
  }'
```

### Delete Comment (Protected)

```bash
curl -X DELETE http://localhost:3000/api/posts/507f1f77bcf86cd799439011/comments/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Error Responses

### 400 Bad Request
```json
{
  "errors": [
    "Title must be at least 3 characters",
    "Content must be at least 10 characters"
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Access denied. No token provided."
}
```

### 403 Forbidden
```json
{
  "error": "Not authorized to update this post"
}
```

### 404 Not Found
```json
{
  "error": "Post not found"
}
```

## Testing Workflow

1. **Register a new user** - Save the token from response
2. **Create a post** - Use the token in Authorization header
3. **Get all posts** - Verify your post appears
4. **Get single post** - Use the post ID returned
5. **Add comments** - Use your token to add comments
6. **Update your post** - Only the author can update
7. **Delete your post** - Clean up test data

## Environment Variables for Testing

Add to `.env.example` for consistent testing:
```
TEST_USERNAME=testuser
TEST_EMAIL=test@example.com
TEST_PASSWORD=testpass123
```
