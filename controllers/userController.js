const User = require('../models/userModel')

const createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()

        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    }catch (error) {
        res.status(500).send(error)
    }
}

const getUserByID = async (req, res) => {
    console.log(req.user) 
    try {
        const { id } = req.params
        const user = await User.findById(id)

        if(!user) {
            return res.status(404).send({ error: 'User was not found' })
        }

        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params

        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if(!updatedUser) {
            return res.status(404).send({ error: 'User was not found' })
        }

        res.send(updatedUser)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await User.findByIdAndDelete(id)

        if(!deletedUser) {
            return res.status(404).send({ error: 'User was not found' })
        }
        
        res.send(deletedUser)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserByID,
    updateUser,
    deleteUser

}