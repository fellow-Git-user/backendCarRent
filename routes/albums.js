const express = require('express')
// const authMiddleware = require('../middlewares/authMiddleware')
const { deleteAlbum, updateAlbum, createAlbum, getAlbumByID, getAlbum } = require('../controllers/albumController')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router() 

router.get('/', authMiddleware, rolesMiddleware(ROLES.ADMIN), getAlbum)
router.get('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), getAlbumByID)
router.post('/create', authMiddleware, rolesMiddleware(ROLES.ADMIN), createAlbum)
router.put('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), updateAlbum)
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), deleteAlbum)



module.exports = router
