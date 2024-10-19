const express = require("express");
const router = express.Router();

//const { requireSignin,checkAuth, adminMiddleware } = require('../controllers/auth');
const {auth} =require('../Middleware/auth')
const { authAdmin} =require('../Middleware/authAdmin')
const {
    commentCreate,
    commentGet,
    commentDelete,
    commentEdit,
    addReply
  } = require("../controllers/comment");

  router.route('/savecomment/:id').post(auth,commentCreate);
  router.route('/replycomment/:id').post(auth,addReply);
  router.route('/getcomment/:id').get(commentGet);
  router.route('/deletecomment/:id').delete(auth,commentDelete);
  router.route('/editcomment/:id').put(auth,commentEdit);

  module.exports = router;