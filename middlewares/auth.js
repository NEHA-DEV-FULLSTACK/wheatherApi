const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const auth = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("authHeader",authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token",token);
    if (!token) {
        return res.status(401).send('token is required')
    }
    try {
        const decode = jwt.verify(token, SECRET);
        if (decode) {
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(401).send('invalid token')
    }
}

module.exports = { auth }