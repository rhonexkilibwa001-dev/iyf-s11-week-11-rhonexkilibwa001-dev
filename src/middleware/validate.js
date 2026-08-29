// Validation middleware for posts and users

const validatePost = (req, res, next) => {
  const { title, content, author } = req.body;
  const errors = [];
  if (!title || title.length < 3) errors.push('Title must be at least 3 characters');
  if (!content || content.length < 10) errors.push('Content must be at least 10 characters');
  if (!author) errors.push('Author is required');
  if (errors.length) return res.status(400).json({ errors });
  next();
};

// For partial updates allow missing fields but validate if present
const validatePostPartial = (req, res, next) => {
  const { title, content } = req.body;
  const errors = [];
  if (title && title.length < 3) errors.push('Title must be at least 3 characters');
  if (content && content.length < 10) errors.push('Content must be at least 10 characters');
  if (errors.length) return res.status(400).json({ errors });
  next();
};

const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  const errors = [];
  if (!name || name.length < 2) errors.push('Name must be at least 2 characters');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('A valid email is required');
  if (errors.length) return res.status(400).json({ errors });
  next();
};

module.exports = {
  validatePost,
  validatePostPartial,
  validateUser
};
