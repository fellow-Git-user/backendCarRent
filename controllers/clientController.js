const Client = require("../models/clientModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const process = require('process')

const register = async (req, res) => {
    const { username, email, password } = req.body

    if(!username || !email || !password) {
        return res.status(400).send({ message: 'All fields are required' })
    }

    const existingClient = await Client.findOne({ email: email })

    if(existingClient) {
        return res.status(400).send({ message: 'Email already exists' })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newClient = new Client({
            username,
            email,
            password: hashedPassword
        })

        await newClient.save()

        res.send({ message: 'User created successfully' })
    } catch (error) {
        res.status(500).send(error)
    }
}


const login = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).send({ message: 'Email or password is invalid' })
    }

    try {
        const client = await Client.findOne({ email: email })
        if(!client) {
            return res.status(400).send({ message: 'Invalid email or password' })
        }

        console.log(client.password)
        console.log(password)

        const isMatch = await bcrypt.compare(password, client.password)
        if(!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' })
        }

        const token = jwt.sign(
            { 
                id: client._id,
                username: client.username,
                email: client.email,
                role: client.role
            
            },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        )
        
        console.log(token)

        res.send({ message: 'User successfully logged in', token })
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateUser = async (req, res) => {
    const { username } = req.body
    const { id } = req.user
    
    if(!username) {
        return res.status(400).send({ message: 'Username field is required' })
    }

    try {
        const changedUserData = await Client.findByIdAndUpdate(
            id,
            { username },
            { new: true }
        )

        if(!changedUserData) {
            return res.status(404).send({ message: 'Nu such user found associated by this id', id })
        }

        res.send({ message: 'User successfully updated', client: username })
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    register,
    login,
    updateUser

}