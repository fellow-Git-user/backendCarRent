

module.exports = function(...allowedRoles) {
console.log("🚀 ~ allowedRoles:", allowedRoles)

    return (req, res, next) => {

        if(!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).send({ message: 'Access denied' })
        }


        next()
    }
}