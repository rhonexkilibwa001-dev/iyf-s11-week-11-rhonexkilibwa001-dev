const store = require('../data/store');

const getAllPosts = (req, res) => {
  const { author, sort, search, page = 1, limit = 10 } = req.query;
  let result = [...store.posts];

  // Filter by author
  if (author) {
    result = result.filter(p => p.author.toLowerCase().includes(author.toLowerCase()));
  }

  // Search in title
  if (search) {
    result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  }

  // Sorting
  if (sort === 'newest') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === 'popular') {
    result.sort((a, b) => b.likes - a.likes);
  }

  // Pagination
  const p = Math.max(1, parseInt(page));
  const l = Math.max(1, parseInt(limit));
  const start = (p - 1) * l;
  const paged = result.slice(start, start + l);

  res.json({ page: p, limit: l, total: result.length, data: paged });
};

const getPostById = (req, res) => {
  const id = parseInt(req.params.id);
  const post = store.posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
};

const createPost = (req, res) => {
  const { title, content, author } = req.body;

  const newPost = {
    id: store.nextPostId++,
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: []
  };

  store.posts.push(newPost);
  res.status(201).json(newPost);
};

const updatePost = (req, res) => {
  const id = parseInt(req.params.id);
  const index = store.posts.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Post not found' });

  const { title, content } = req.body;
  store.posts[index] = {
    ...store.posts[index],
    title: title || store.posts[index].title,
    content: content || store.posts[index].content,
    updatedAt: new Date().toISOString()
  };

  res.json(store.posts[index]);
};

const deletePost = (req, res) => {
  const id = parseInt(req.params.id);
  const index = store.posts.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Post not found' });

  store.posts.splice(index, 1);
  res.status(204).send();
};

const likePost = (req, res) => {
  const id = parseInt(req.params.id);
  const post = store.posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  post.likes++;
  res.json(post);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost
};
