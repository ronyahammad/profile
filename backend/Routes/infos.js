const express = require("express");
const router = express.Router();
const { createInfo, getInfos, getInfoById, updateInfo, deleteInfo,getInfoByTags } = require('../controllers/info');
const authAdmin = require('../Middleware/authAdmin');



router.route('/')
    .get(getInfos)             // Public access to get all Infos
    .post( authAdmin, createInfo);  // Admin access to create a new Info


router.route('/:id')
    .get(getInfoById)          // Public access to get a single Info by ID
    .put(authAdmin, updateInfo)    // Admin access to update Info by ID
    .delete(authAdmin, deleteInfo); // Admin access to delete Info by ID
router.route('/tags').post(getInfoByTags)

module.exports = router;