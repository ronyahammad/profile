const express = require("express");
const router = express.Router();

const {auth} =require('../Middleware/auth')
const authAdmin =require('../Middleware/authAdmin')

const {
    postCreate,
    postEdit,
    postByUser,
    postList,
    postFindById,
    postDetail,
    postDelete
  } = require("../controllers/post");


  router.route('/post/create').post(auth,postCreate);
  router.route('/post/:id').get(postDetail);
  router.route('/post/edit/:id').put(auth,authAdmin,postEdit);
  router.route('/post').get(auth,postByUser);
  router.route('/postlists').get(postList);
  router.route('/post/:id').get(postFindById);
  router.route('/post/delete/:id').delete(auth,authAdmin,postDelete);



module.exports = router;