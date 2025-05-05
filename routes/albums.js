const express = require('express')
// const authMiddleware = require('../middlewares/authMiddleware')
const { deleteAlbum, updateAlbum, createAlbum, getAlbumByID, getAlbum } = require('../controllers/albumController')
const router = express.Router() 

router.get('/', getAlbum)
router.get('/:id', getAlbumByID)
router.post('/', createAlbum)
router.put('/:id', updateAlbum)
router.delete('/:id', deleteAlbum)



module.exports = router
