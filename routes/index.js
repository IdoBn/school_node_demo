var express = require('express');
var router = express.Router();
var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/posts/new', function(req, res) {
  res.render('posts/new', { title: 'new post' })
});

router.post('/posts', function(req, res) {
  Post.create({
    title: req.body.title,
    body: req.body.body
  }, function(err, post) {
    if (err) throw new Error(err);
    res.render('posts/show', {title: post.title, post: post});
  });
});

router.get('/posts/:id', function(req, res) {
  Post.findOne({_id: req.params.id}, function(err, post) {
    if (err) throw new Error(err);
    res.render('posts/show', {title: post.title, post: post});
  });
});

router.get('/posts', function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) throw new Error(err);
    res.render('posts/index', {title: 'posts', posts: posts});
  });
});

router.get('/posts/:id/edit', function(req, res) {
  Post.findOne({_id: req.params.id}, function(err, post) {
    if (err) throw new Error(err);
    res.render('posts/edit', {title: 'edit', post: post});
  });
});

router.put('/posts/:id', function(req, res) {
  Post.findOne({_id: req.params.id}, function(err, post) {
    if (err) throw new Error(err);
    post.title = req.body.title || post.title;
    post.body = req.body.body || post.body;
    post.save();
    res.render('posts/show', {title: post.title, post: post});
  });
});

router.delete('/posts/:id', function(req, res) {
  Post.findOne({_id: req.params.id}).remove(function(err) {
    if (err) throw new Error(err);
    Post.find({}, function(err, posts) {
      if (err) throw new Error(err);
      res.render('posts/index', { title: 'posts', posts: posts });
    });
  });
});

module.exports = router;
