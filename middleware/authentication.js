import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../model/user'
import * as status from '../constants/status-code'

dotenv.config();

const isAuthenticateUser = async (req, res, next) => {
    const { userToken } = req.cookies;
    console.log("req cookies", req.cookies)
    console.log("userToken", userToken)
    try {
        if (!userToken)
            throw "You don't have access to this page, please login"
        const decodedData = jwt.verify(userToken, process.env.SECRET_KEY);

        if (req.params.id && decodedData.id !== req.params.id)
            throw "You don't have access to other user"
        req.User = await User.findById(decodedData.id)
        console.log("verified")
        next()
    }
    catch (err) {
        return res.status(status.UNAUTHORIZED).json({ error: err })
    }
}

const isAuthenticateAdmin = async (req, res, next) => {
    const { adminToken } = req.cookies
    try{
        if (!adminToken) 
        throw "You dont have access to this page , please login as admin"
        const decodedData = jwt.verify(adminToken, process.env.SECRET_KEY)
        req.user = await Admin.findById(decodedData.id)
        console.log("verified")
        next()
    }
    catch(err){
      return res.status(401).json({errorMessage : err})
    }
}

export default {isAuthenticateUser, isAuthenticateAdmin};
// export default () => {
//     return {isAuthenticateUser, isAuthenticateAdmin}
// }