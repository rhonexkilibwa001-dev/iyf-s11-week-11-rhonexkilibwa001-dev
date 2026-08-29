const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Get comments for a post
const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate('author', 'username email')
            .sort({ createdAt: -1 });
        
        res.json(comments);
    } catch (error) {
        next(error);
    }
};

// Add comment to post
const createComment = async (req, res, next) => {
    try {
        const { content } = req.body;
        const postId = req.params.postId;
        
        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        const comment = new Comment({
            content,
            author: req.user._id,
            post: postId
        });
        
        await comment.save();
        await comment.populate('author', 'username email');
        
        res.status(201).json(comment);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ errors: messages });
        }
        next(error);
    }
};

// Delete comment
const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        
        // Check if user is author
        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to delete this comment' });
        }
        
        await Comment.findByIdAndDelete(req.params.commentId);
        
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = { getComments, createComment, deleteComment };
