const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

var userModel = require('../../models/students/studentsModel');

var createAccessToken = (user) => {
    console.log(user);
    return jwt.sign({ id: user._id, username: user.studentId, role: user.role}, process.env.JWT_SECRET, { expiresIn: '300000' }); 
}

var createRefreshToken = (user) => {
    return jwt.sign({ id: user._id, username: user.studentId, role: user.role}, process.env.JWT_REFRESH, { expiresIn: '30d' }); 
}

var generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, role: user.role}, process.env.JWT_SECRET, { expiresIn: '300000' }); 
}

var generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, role: user.role}, process.env.JWT_REFRESH, { expiresIn: '30d' }); 
}

var loginService = async (req, res, next) => {
      
    const { studentId, password } = req.body;
     console.log(req.body);

    try {
        var user = await userModel.findOne( {studentId});
        console.log(user);
        if (!user) return res.status(400).json({ message: 'Email or password is incorrect' });

        // check for password
         

        const isMatch = await bcrypt.compareSync(password, user.password);
        
        console.log(isMatch);
        if (!isMatch) 
        {
            return res.status(400).json({ message: 'Invalid credentials'});
        }
        
        // create token
         console.log(isMatch);
        const acessToken = createAccessToken(user);
        console.log(acessToken);
        const refreshToken = createRefreshToken(user);
        refreshTokens.push(refreshToken);
        
        console.log(refreshToken);

         

        return res.status(200).json({ acessToken, refreshToken, user });   
        
    } catch (error) {
        return res.status(400).json({ msg: 'user not found' }); 
    }
}

var refreshTokenService = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid");
      }

    jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
        if (err) {
            console.log(err);
        }

        refreshTokens = refreshTokens.filter(token => token !== refreshToken);

        console.log(user);
        // create new accessToken, refreshToken and response to user
        const newAccessToken = createAccessToken(user);
        const newRefreshToken = createRefreshToken(user);

        refreshTokens.push(newRefreshToken);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: '/',
            samesite: "strict"
        });

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });  
    })

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
    
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid");
      }

    jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
        if (err) {
            console.log(err);
        }

        refreshTokens = refreshTokens.filter(token => token !== refreshToken);

        console.log(user);
        // create new accessToken, refreshToken and response to user
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        console.log(newAccessToken);
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
    createRefreshToken, refreshTokenService, 
    logoutService, refreshService
}
