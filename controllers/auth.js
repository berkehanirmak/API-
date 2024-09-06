const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth= require("../models/auth.js");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body; // req.body den gelen verilerin sorun yaratmaması için limit özelliği index.js eklendi
    const user =await Auth.findOne({email})
    if(user) return res.status(400).json({msg: "Bu email adresi ile kayıtlı kullanıcı var."})
    
    if(password.length < 6) return res.status(400).json({msg: "Şifre en az 6 karakter olmalıdır."})

    const passwordHash = await bcrypt.hash(password, 10)  

    const newUser = await Auth.create({
      username, email, password: passwordHash
    })

    const userToken = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    })

    res.status(201).json({ status:"OK",newUser, userToken })

  } catch (error) {
    return res.status(400).json({msg: error.message})

  }
}
        
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Kullanıcı bulunamadı." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Şifre hatalı." });    

    const userToken = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.status(200).json({ status:"OK",user, userToken });
  } catch (error) {
    return res.status(400).json({msg: error.message})

  }
}

module.exports = {register,login}