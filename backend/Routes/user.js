const express = require("express");
const router = express.Router();

const {auth}=require('../Middleware/auth')
const authAdmin = require('../Middleware/authAdmin')

const { updateController,
    readController,
    deleteUserController,
    getAllUsersController } = require('../controllers/user');


router.route('/user/detail').get(auth,readController);
router.route('/user/update').put(auth, updateController);

router.route('/user/delete/:id').delete(auth, authAdmin, deleteUserController);
router.route('/user/list').get(auth, authAdmin, getAllUsersController);

module.exports = router;