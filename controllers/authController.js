const User = require('../models/User');

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);

  let errors = {email: '', password: ''};

  if(err.code === 11000){
    errors.email = 'That email is already registred';
  }
  if(err.message.includes('User validation failed')){
    Object.values(err.errors).forEach(({properties}) =>{
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}
module.exports.signup_get = (req, res) =>{
  res.render('signup');
}

module.exports.login_get = (req, res) =>{
  res.render('login');
}

module.exports.signup_post = (req, res) =>{
  res.send('new signup');
}

module.exports.login_post = async (req, res) =>{
  const {email, password} = req.body;

  try{
    const user = await User.create({email, password});
    res.status(201).json(user);
  }catch(error){
    const errors = handleErrors(error);
    res.status(400).json({errors});
  }
}
