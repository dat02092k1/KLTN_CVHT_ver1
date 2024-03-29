const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

var userModel = require('../../models/students/userModel');

var createAccessToken = (user) => {
    return jwt.sign({ id: user._id, username: user.userId, role: user.role}, process.env.JWT_SECRET, { expiresIn: '5000000' }); 
}

var createRefreshToken = (user) => {
    return jwt.sign({ id: user._id, username: user.userId, role: user.role}, process.env.JWT_REFRESH, { expiresIn: '30d' }); 
}

var generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, role: user.role}, process.env.JWT_SECRET, { expiresIn: '5000000' }); 
}

var generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, role: user.role}, process.env.JWT_REFRESH, { expiresIn: '30d' }); 
}

var loginService = async (req, res, next) => {
      
    const { userId, password } = req.body;
      
    console.log(req.body); 
    try {
        var user = await userModel.findOne( {userId});
          
        if (!user) return res.status(400).json({ message: 'Email or password is incorrect' });

        // check for password
        
        const isMatch = await bcrypt.compareSync(password, user.password);
        
        if (!isMatch) 
        {
            return res.status(400).json({ message: 'Invalid credentials'});
        }
        
        // create token
          
        const acessToken = createAccessToken(user);
         
        const refreshToken = createRefreshToken(user);
        refreshTokens.push(refreshToken);

        return res.status(200).json({ acessToken, refreshToken, user });   
        
    } catch (error) {
        return res.status(400).json({ msg: 'user not found' }); 
    }
}

var logoutService = async (req, res) => {
    try {
        res.clearCookie("refreshToken");
        return "Logged out successfully";
    } catch (error) {
        throw error;
    }
}

var refreshService = async (req, res) => {
    try {
        const {refreshToken} = req.body;
        console.log('refresh flag'); 
    console.log(refreshToken);
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    console.log(refreshTokens);
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid");
      }

    jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
        if (err) {
            console.log(err);
        }

        refreshTokens = refreshTokens.filter(token => token !== refreshToken);

         
        // create new accessToken, refreshToken and response to user
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
         
        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });  
    })
    } catch (error) {
        throw error;
    }
}
module.exports = {
    loginService, createAccessToken,
    createRefreshToken, 
    logoutService, refreshService
}
