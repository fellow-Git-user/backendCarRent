const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const process = require('process')

const register = async (req, res) => {
    const { name, email, password, surname, image, phone, 
            address, role } = req.body

    const { street, flatNumber, city, country } = address || {}      

    if(!name || !email || !password || !surname || !image
         || !phone || !street || !flatNumber || !city || !country ) {
        return res.status(400).send({ message: 'All fields are required' })
    }

    const existingUser = await User.findOne({ email: email })

    if(existingUser) {
        return res.status(400).send({ message: 'Email already exists' })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            surname,
            image,
            phone,
            address: {
                street,
                flatNumber,
                city,
                country
            },
            role
        });

        await newUser.save()

        const user = await User.findOne({ email: email })

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                surname: user.surname,
                image: user.image,
                phone: user.phone,
                street: user.address.street,
                flatNumber: user.address.flatNumber,
                city: user.address.city,
                country: user.address.country,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        res.status(201).send({ message: 'User successfully registered', token, user });
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
        const user = await User.findOne({ email: email })
        if(!user) {
            return res.status(400).send({ message: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' })
        }

        const token = jwt.sign(
            { 
                id: user._id,
                name: user.name,
                email: user.email, 
                password: user.password,
                surname: user.surname,
                image: user.image,
                phone: user.phone,
                street: user.address.street,
                flatNumber: user.address.flatNumber,
                city: user.address.city,
                country: user.address.country,
                role: user.role
            
            },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        )
        
        

        res.send({ message: 'User successfully logged in', token })
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateUser = async (req, res) => {
    const { name, email, password, surname, image, phone, address } = req.body
    const { street, flatNumber, city, country } = address || {}
    const { id } = req.user
    
    if(!name) {
        return res.status(400).send({ message: 'name field is required' })
    }

    try {

        let updateData = {
            name,
            email,
            surname,
            image,
            phone,
            address
        }

        if (password) { 
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword; 
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const changedUserData = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )
        console.log("🚀 ~ updateUser ~ changedUserData:", changedUserData);

        if(!changedUserData) {
            return res.status(404).send({ message: 'No such user found associated by this id', id })
        }

        res.send({ message: 'User successfully updated', user: changedUserData })
    } catch (error) {
        res.status(500).send(error)
    }
}

const adminCreateUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()

        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

const adminGetUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    }catch (error) {
        res.status(500).send(error)
    }
}

const adminGetUserByID = async (req, res) => {
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

const adminUpdateUser = async (req, res) => {
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

const adminDeleteUser = async (req, res) => {
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
    adminCreateUser,
    adminGetUsers,
    adminGetUserByID,
    adminUpdateUser,
    adminDeleteUser,
    register,
    login,
    updateUser
    
    

}