const jwt = require('jsonwebtoken');

const userToken = (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        return decoded;
    } catch (error) {
        // Handle token verification errors
        console.error('Token verification error:', error);
        throw new Error('Unauthorized');
    }
};

module.exports = userToken;








