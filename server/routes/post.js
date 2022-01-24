const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

const verifyToken = require('../middlewares/auth')


// @route GET api/posts
// @desc Get all posts
// @access Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({user: req.userId}).populate('user', ['username'])
    res.json({success: true, posts})
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: 'Internal server error'})
  }
})


// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => {
  const {title, description, url, status} = req.body

  if (!title)
    return res.status(400).json({success: false, message: 'Title is required'})
  
  try {
    const newPost = new Post({
      title,
      description,
      url: (url.startsWith('https://') ? url : `https://${url}`) || '',
      status: status || 'TO LEARN',
      user: req.userId
    })

    await newPost.save()

    res.json({success: true, message: 'Happy learning!', post: newPost})
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: 'Internal server error'})
  }
})


// @route PUT api/posts
// @desc Update a post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
  const {title, description, url, status} = req.body

  if (!title)
    return res.status(400).json({success: false, message: 'Title is required'})
  
  try {
    let updatedPost = {
      title,
      description: description || '',
      url: (url.startsWith('https://') ? url : `https://${url}`) || '',
      status: status || 'TO LEARN'
    }

    const updateCondition = {_id: req.params.id, user: req.userId}
    updatedPost = await Post.findOneAndUpdate(updateCondition, updatedPost)

    if (!updatedPost)
      return res.status(401).json({success: false, message: 'Post not found or user not authorised'})

    res.json({success: true, message: 'Update successfully', post: updatedPost})
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: 'Internal server error'})
  }
})


// @route DELETE api/posts
// @desc Delete a post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleteCondition = {_id: req.params.id, user: req.userId}
    const deletedPost = await Post.findOneAndDelete(deleteCondition)

    if (!deletedPost)
      return res.status(401).json({success: false, message: 'Post not found or user not authorised'})

    res.json({success: true, message: 'Delete successfully', post: deletedPost})
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: 'Internal server error'})
  }
})


module.exports = router
