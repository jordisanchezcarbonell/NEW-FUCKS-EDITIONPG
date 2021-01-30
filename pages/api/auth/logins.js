import connectDB from '../../../utils/connectBD'
import Users from '../../../models/userModel'
import valid from '../../../utils/utils'
import bcrypt from 'bcrypt'
import { createAccessToken,createRefreshToken } from '../../../utils/generateToken'

connectDB();


export default async (req, res) => {
    switch(req.method){
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body
        console.log(password)
        const user = await Users.findOne({ email })
        console.log(user)
        if(!user) return res.status(400).json({err: 'This email no  exists.'})

        const isMatch= await bcrypt.compare(password,user.password)
        console.log(isMatch)

        if(!isMatch) return res.status(400).json({err: 'Password incorrect'})
        const  acces_token = createAccessToken({id:user._id})
        console.log(acces_token)
        const  refresh_token = createRefreshToken({id:user._id})
        console.log(refresh_token)
        res.json({
            msg: "Login Success!",
            refresh_token,
            acces_token,
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                avatar:user.avatar,
                root:user.root
            }
        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}