const express = require('express')
const { updateUser, register, login, adminGetUsers, adminGetUserByID, adminCreateUser, adminUpdateUser, adminDeleteUser } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router() 

router.post('/register', register)
router.post('/login', login)
router.put('/update', authMiddleware, updateUser)

router.get('/', adminGetUsers)
router.get('/:id', adminGetUserByID)
router.post('/', adminCreateUser)
router.put('/:id', adminUpdateUser)
router.delete('/:id', adminDeleteUser)

// authMiddleware, rolesMiddleware(ROLES.ADMIN),


module.exports = router
