const {Router} = require('express')

const {createPost,getPosts,getPost,getCatPosts,getUserPosts,editPost,deletePost, searchPosts } = require('../controllers/postControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()


router.post('/', authMiddleware, createPost)
router.get('/search', searchPosts);
router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/types/:type', getCatPosts)
router.get('/users/:id', getUserPosts) 
router.patch('/:id', authMiddleware, editPost) //düzenlemek paylaşmak için önce giriş yapmamız gerekiyor ondan ara yazılım
router.delete('/:id', authMiddleware, deletePost)




module.exports = router