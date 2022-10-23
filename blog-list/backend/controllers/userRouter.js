const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs');
    response.json(users);
});

// Change blog lists of a user: Add new blog
userRouter.put('/', async (request, response) => {
    const userToChange = await User.findById(request.user.id).populate('blogs');
    const fieldToChange = {
        blogs: userToChange.blogs.concat(request.body.blogId),
    };
    // eslint-disable-next-line max-len
    const updatedUser = await User.findByIdAndUpdate(request.user.id, fieldToChange, { new: true });
    response.status(200).json(updatedUser);
});
// Change blog lists of a user: Delete a blog
userRouter.delete('/', async (request, response) => {
    const userToChange = await User.findById(request.user.id).populate('blogs');
    const newBlogList = userToChange.blogs.filter((b) => b.id !== request.body.blogId);
    const fieldToChange = {
        blogs: newBlogList,
    };
    // eslint-disable-next-line max-len
    const updatedUser = await User.findByIdAndUpdate(request.user.id, fieldToChange, { new: true });
    response.status(200).json(updatedUser);
});

module.exports = userRouter;
