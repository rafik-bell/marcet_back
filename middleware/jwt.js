const jwt = require('jsonwebtoken');
require('dotenv').config();
  // Store this securely!
const generateToken = (user) => {
    return jwt.sign({ id: user.id_user, email: user.user_name }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
module.exports = { generateToken, verifyToken };