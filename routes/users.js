const express = require('express')
const { updateUser, register, login, adminGetUsers, adminGetUserByID, adminCreateUser, adminUpdateUser, adminDeleteUser } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')
const router = express.Router() 

router.post('/register', register)
router.post('/login', login)
router.put('/update', authMiddleware, updateUser)

router.get('/', authMiddleware, rolesMiddleware(ROLES.ADMIN),  adminGetUsers)
router.get('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), adminGetUserByID)
router.post('/', authMiddleware, rolesMiddleware(ROLES.ADMIN), adminCreateUser)
router.put('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), adminUpdateUser)
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), adminDeleteUser)

// authMiddleware, rolesMiddleware(ROLES.ADMIN),


module.exports = router
