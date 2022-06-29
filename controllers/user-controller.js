const User = require('../model/User');

const getAllUser = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (err) {
        console.log(err)
    }

    if (!users) {
        return res.status(404).json({ message: "No User found" });
    }
    return res.status(200).json({ users })
}

const addUser = async (req, res, next) => {
    const { name, email, phone, password } = req.body;
    let user;

    try {
        user = new User({
            name,
            email,
            phone,
            password
        });
        await user.save();
    } catch (err) {
        console.log(err);
    }

    if (!user) {
        return res.status(500).json({ message: "unable to add user" })
    }
    else {
        return res.status(201).json({ user })
    }
}

exports.getAllUser = getAllUser;
exports.addUser = addUser;