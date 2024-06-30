const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require("uuid")

const User = require('../models/userModel')
const HttpError = require('../models/errorModel')


// **************************** Sign Up new user *********************
//POST : api/users/signup
//UNPROTECTED
const signupUser = async (req,res,next) => {
    try {
        const {name,email,password,checkPassword} = req.body;
        if(!name || !email ||!password) {
            return next(new HttpError('Fill in all fields.',422))
        }
        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({email: newEmail})
        if(emailExists) {
            return next(new HttpError("Email already exists.",422))   
        }
        if((password.trim()).length<6) {
            return next(new HttpError("Password should be at least 6 characters.",422))
        }

        if(password != checkPassword) {
            return next(new HttpError("Passwords do not match",422))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = await User.create({name, email: newEmail, password: hashedPassword})
        res.status(201).json(`New user ${newUser.email} sign up.`)
    } catch (error) {
        return next(new HttpError("User sign up failded.",422)) //giriş doğru değil
    }
}








// **************************** Login user *********************
//POST : api/users/login
//UNPROTECTED
const loginUser = async (req,res,next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return next(new HttpError("Fill in all fields.",422))
        }
        const newEmail = email.toLowerCase()

        const user = await User.findOne({email: newEmail})
        if(!user) { //bu emailde kullanıcı var mı
            return next(new HttpError("This email is invalid.",422))
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword) {
            return next(new HttpError("invalid credentials.",422))
        }

        const {_id: id, name} = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"})
    
        res.status(200).json({token, id, name})
    } catch (error) {
        return next(new HttpError("The login is incorrect, please check your information.",422))
    }
}












// **************************** User Profile *********************
//POST : api/users/:id
//PROTECTED
const getUser = async (req,res,next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password')
        if(!user) {
            return next(new HttpError("User not found.",404))
        }
        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError(error))
    }
}












// **************************** Change user avatar *********************
//POST : api/users/change-avatar
//PROTECTED
const changeAvatar = async (req,res,next) => {
    try {
        if(!req.files.avatar) {
            return next(new HttpError("Please choose an image.",422))
        }

        // kullanıcıyı bulma
        const user = await User.findById(req.user.id)
        // olan resmi silme
        if(user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if(err) {
                    return next(new HttpError(err))
                }
            })
        }

        const {avatar} = req.files;
        //dosya boyutu kontrolü
        if(avatar.size > 2000000) {
            return next(new HttpError("Profile picture too big. Should be less than 2mb"),422)
        }

        let fileName;
        fileName = avatar.name
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if(err) {
                return next(new HttpError(err))
            }
            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, {avatar: newFilename}, {new: true})
            if(!updatedAvatar) {
                return next(new HttpError("Avatar couldn't be changed.",422))
            }
            res.status(200).json(updatedAvatar)
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}









// **************************** Edit User Details *********************
//POST : api/users/edit-user
//PROTECTED
const editUser = async (req,res,next) => {
    try {
        const {name, email, currentPassword, newPassword, confirmNewPassword} = req.body;
        if(!name || !email || !currentPassword || !newPassword) {
            return next(new HttpError('Fill in all fields.',422))
        }
        //kullanıcıyı database den alma
        const user = await User.findById(req.user.id);
        if(!user) {
            return next(new HttpError('User not found.',403))
        }

        // emailin varolduğunu sorgulama
        const emailExist = await User.findOne({email})
        //mail mailsiz değişiklik yapma
        if(emailExist && (emailExist._id != req.user.id)) {
            return next(new HttpError("Email already exist.",422))
        }
        // günceldeki şifreyi database ile karşılaştırma?
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
        if(!validateUserPassword) {
            return next(new HttpError("Invalid current password",422))
        }

        // yeni şifreyi karşılaştırma
        if(newPassword != confirmNewPassword) {
            return next(new HttpError("New passwords do not match",422))
        }

        // yeni şifreyi has lemek
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt);

        // yeni info
        const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: hash}, {new: true})
        res.status(200).json(newInfo)

    } catch (error) {
        return next(new HttpError(error))
    }
}










module.exports = {signupUser,loginUser,editUser,changeAvatar,getUser}