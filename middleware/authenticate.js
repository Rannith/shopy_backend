import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../model/user'
import * as status from '../constants/status-code'

dotenv.config();

const isAuthenticateUser = async (req, res, next) => {
    const { token } = req.cookies;
    console.log("req cookies", req.cookies)
    console.log("token", token)
    try {
        if (!token)
            throw "You don't have access to this page, please login"
        const decodedData = jwt.verify(token, process.env.SECRET_KEY);

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

export default isAuthenticateUser;