const User = require('../model/user');
const status = require('../constants/status-code')

class UserController {

    static getAllUser = async (req, res, next) => {
        try {
            let users = await User.find();
            if (users.length < 1)
                throw "No users found"
            return res.status(status.SUCCESS).json({ users })
        } catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    static getUserById = async (req, res, next) => {
        try {
            const id = req.params.id;
            let user = await User.findById(id)
            if (!user)
                throw "User not found"
            return res.status(status.SUCCESS).json({ user })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    static addUser = async (req, res, next) => {
        try {
            const { name, email, phone, password } = req.body;
            let user = new User({
                name,
                email,
                phone,
                password
            });
            if (!user) {
                throw "Unable to add user"
            }
            await user.save();
            return res.status(status.CREATED).json({ user })
        } catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    static updateUser = async (req, res, next) => {
        let user
        try {
            const id = req.params.id;
            const { name, email, phone, password } = req.body;
            let validId = await User.findById(id)
            if (validId) {
                user = await User.findByIdAndUpdate(id, {
                    name,
                    email,
                    phone,
                    password
                })

                user = await user.save();
            }
            else throw "Unable to update by this ID"

            return res.status(status.SUCCESS).json({ user })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    static deleteUser = async (req, res, next) => {
        try {
            let user;
            const id = req.params.id;
            let validId = await User.findById(id)

            if (validId) {
                user = await User.findByIdAndRemove(id)
            }
            else throw "Unable to delete by this ID"

            return res.status(status.SUCCESS).json({ message: "Product Deleted Sucessfully" })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }
}

exports.default = UserController;
// module.exports = UserController;

// const getAllUser = async (req, res, next) => {
//     try {
//         let users = await User.find();
//         if(users.length < 1)
//         throw "No users found"
//         return res.status(200).json({ users })
//     } catch (err) {
//         console.log(err)
//         return res.status(404).json({error : err})
//     }
//     // if (!users) {
//     //     return res.status(404).json({ message: "No User found" });
//     // }   
// }

// const addUser = async (req, res, next) => {
//     const { name, email, phone, password } = req.body;
//     let user;

//     try {
//         user = new User({
//             name,
//             email,
//             phone,
//             password
//         });
//         await user.save();
//     } catch (err) {
//         console.log(err);
//     }

//     if (!user) {
//         return res.status(500).json({ message: "unable to add user" })
//     }
//     else {
//         return res.status(201).json({ user })
//     }
// }

// exports.getAllUser = getAllUser;
// exports.addUser = addUser;