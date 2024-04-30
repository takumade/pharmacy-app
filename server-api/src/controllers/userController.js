const User = require("../models/userModel")


const userRegister = async (req, res) => {

    try{
        const {username, email, phone, password} = req.body


            let user = User.create({
                username,
                email,
                phoneNumber: phone,
                password
            })

            delete user.password

            res.send({
                success: true, 
                message: 'User Created',
                data: user
            })

        }catch(err){
            res.send({
                success: false,
                message: 'Could not create user',
                data: err
            })
        }

}

const userLogin = (req, res) => {

}



module.exports = {
    userRegister,
    userLogin
}