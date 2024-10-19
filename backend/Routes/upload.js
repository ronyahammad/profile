const router = require('express').Router()
const uploadImage = require('../Middleware/uploadImage')
//const uploadCtrl = require('../controllers/auth')
const {auth} = require('../Middleware/auth')

router.post('/upload_avatar', uploadImage, auth)

module.exports = router