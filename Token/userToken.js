const jwt = require('jsonwebtoken');

const userToken = (req, res) => {

    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    return decoded;

};

module.exports = userToken;