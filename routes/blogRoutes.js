const express = require('express');
const router = express.Router(); //it creates a new instance of Router object, which will control the requests around '/blogs' path. Basically, it's like a mini version of `app` variable, which we used in app.js file, and now, as we want to make separate files, that's just not to create another `app` variable (maybe we can't create the second instance of `app`)
const blogController = require('../controllers/blogController');

router.get("/", blogController.blog_index)
router.post('/', blogController.blog_create_post)
router.get('/create', blogController.blog_create_get)
router.get('/:id', blogController.blog_details)   
router.delete('/:id', blogController.blog_delete)

module.exports = router;