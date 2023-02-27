const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

var userModel = require('../../models/students/studentsModel');

var createAccessToken = (user) => {
    return jwt.sign({ id: user._id, username: user.studentId, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' }); 
}

var createRefreshToken = (user) => {
    return jwt.sign({ id: user._id, username: user.studentId, role: user.role}, process.env.JWT_REFRESH, { expiresIn: '500d' }); 
}

var loginService = async (req, res, next) => {
     
    const { studentId, password } = req.body;
     
    try {
        var user = await userModel.findOne( {studentId});

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
        
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: '/',
            samesite: "strict"
        })

        console.log('flag');
        console.log(refreshToken);

        return res.status(200).json({ acessToken, user });   
        
    } catch (error) {
        console.log(error);  
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

module.exports = {
    loginService, createAccessToken,
    createRefreshToken, refreshTokenService
}
