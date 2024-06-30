const {Router} = require('express')

const {signupUser,loginUser,editUser,changeAvatar,getUser} = require("../controllers/userControllers")
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()


router.post('/signup',signupUser)

router.post('/login',loginUser)

router.get('/:id',getUser)

router.post('/change-avatar',authMiddleware, changeAvatar)

router.patch('/edit-user', authMiddleware, editUser)


module.exports = router