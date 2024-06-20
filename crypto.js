const crypto = require('crypto');

// Generate a secure JWT secret
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

console.log(generateJWTSecret());