const store = require('../data/store');

const getAllUsers = (req, res) => {
  res.json(store.users);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = store.users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

const createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: store.nextUserId++,
    name,
    email,
    createdAt: new Date().toISOString()
  };
  store.users.push(newUser);
  res.status(201).json(newUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser
};
