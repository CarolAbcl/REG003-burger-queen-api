// module.exports = {
//   getUsers: (req, resp, next) => {
//   },
// };

const mongoose = require ('mongoose');
const User = require ('../models/user');
const service = require ('../services/index');

const signUp = (req, res) => {
  const user = new User ({
    email: req.body.email
  })
  user.sace ((err) => {
    if (err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
    return res.status(200).send({token:service.createToken(user)})
  })

}

const signIn = (req, res) => {
  user.find({ email:req.body.email}), (err, user) => {
    if (err) return res.status(500).send({message: err})
    if (!user) return res.status(404).send({message: 'no existe el usuario'})

    res.user = user
    res.status(200).send({message: 'Te has logeado correctamente',
    token:service.createToken(user)
  })
   
  }
}

module.exports = {
  signUp,
  signIn
}
