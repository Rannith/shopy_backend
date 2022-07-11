const sendToken = (user, statusCode, res, message) => {
    const token = user.generateJsonWebToken();
    console.log("token : ",token)
    const options = {
        expires: new Date(
            Date.now() + 60 * 60 * 1000
        ),
        httpOnly: true
    };

    return res.status(statusCode).cookie("token", token, options).json({
        success: message,
        user,
        token,
    })
}

export default sendToken;