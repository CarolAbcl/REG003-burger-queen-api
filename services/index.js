const jwt = require('jsonwebtoken');
const config = require ('../config');


const createToken = (user) =>{
  const payload = {
    sub: user._id,
  }

  return jwt.encode( payload, config.secret)

}

module.exports =  createToken