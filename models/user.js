const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email: { type: String, unique:true, lowercase: true},
  password: { type:String, select:false},
  roles:{type:Boolean},
  sigupDate: {type:Date, default: Date.now()}
})

UserSchema.pre('save', (next) => {
 let user = this
 if (!user.isModified('password')) return next() 
  bcrypt.genSalt(10, (err, salt) =>{
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) =>{
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
});

UserSchema.methods.comparePassword = async (password, dbPassword) =>{
  try {
    const match = await bcrypt.compare(password, dbPassword);
    if (!match) {
      throw new Error('Authentication error');
    }
    return match;
  } catch (error) {
    throw new Error('Wrong password.');
  }
};

module.exports = mongoose.model('User', UserSchema);