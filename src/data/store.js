// In-memory data store for demo purposes

const posts = [
  {
    id: 1,
    title: 'Getting Started with Node.js',
    content: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine...',
    author: 'John Doe',
    createdAt: '2026-01-15T10:00:00Z',
    likes: 10,
    comments: []
  },
  {
    id: 2,
    title: 'Express.js Fundamentals',
    content: 'Express is a fast and minimalist web framework for Node.js...',
    author: 'Jane Smith',
    createdAt: '2026-01-16T14:30:00Z',
    likes: 15,
    comments: []
  }
];

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: '2026-01-10T09:00:00Z' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: '2026-01-12T11:15:00Z' }
];

let nextPostId = 3;
let nextUserId = 3;

module.exports = { posts, users, nextPostId, nextUserId };
