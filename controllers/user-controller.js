
import User from '../model/user';
import * as status from '../constants/status-code'
import BaseController from './base-controller';
import bcrypt from 'bcrypt'
import sendToken from '../utils/jwt-token';

const baseController = new BaseController()

class UserController {

    registerUser = async (req, res) => {
        try {
            const { firstName, lastName, email, phone, password, role } = req.body;
            if (await User.findOne({ email: email })) {
                throw "This mail id has already been registered"
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            let roleId = await baseController.getRoleId(role, res);
            let user = new User({
                firstName,
                lastName,
                email,
                phone,
                password: hashedPassword,
                roleId
            });
            await user.save();
            const message = "User Registered Successfully"
            // sendToken(user, status.CREATED, res, message)
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    loginUser = async (req, res, next) => {
        try {
            const { email, password, role } = req.body;
            let roleId = await baseController.getRoleId(role, res);
            let user = await User.findOne({ email: email })

            if (!user)
                throw "No account exist with this mail id"
            if (user.roleId.toString() !== roleId)
                throw `This mail Id not in ${role}'s role`
            if (!(bcrypt.compareSync(password, user.password)))
                throw "Incorrect password, correct it"
            const message = "Successfully Logged in"
            sendToken(user, status.SUCCESS, res, message)
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    viewProfile = async (req, res, next) => {
        try {
            let user
            const id = req.params.id;

            if (id.length !== 24)  //
                throw "Invalid Object Id"
            user = await User.findById(id).populate({ path: 'roleId' })
            if (!user)
                throw "User not found"
            return res.status(status.SUCCESS).json({ user })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    updateProfile = async (req, res, next) => {
        try {
            let user
            let id = req.params.id;
            const { firstName, lastName, email, phone } = req.body;

            if (id.length !== 24)
                throw "Invalid object Id"
            user = await User.findById(id)

            if (user === null)
                throw "Unable to update this profile"

            user = await User.findByIdAndUpdate(id, {
                firstName,
                lastName,
                email,
                phone
            })
            await user.save()
            return res.status(status.SUCCESS).json({ message: "User update successfully" })
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    deleteProfile = async (req, res, next) => {
        try {
            let user
            let id = req.params.id

            if (id.length !== 24)
                throw "Invalid object Id"
            user = await User.findByIdAndDelete(id)

            if (user === null)
                throw "Id not found, Unable to delete"

            return res.status(status.SUCCESS).json({ message: "User deleted sucessfully" })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    getAllUser = async (req, res, next) => {
        try {
            let users = await User.find();
            if (users.length < 1)
                throw "No users found"
            return res.status(status.SUCCESS).json({ users })
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }
}

export default UserController