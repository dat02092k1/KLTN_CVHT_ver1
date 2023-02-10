const jwt = require("jsonwebtoken");

// verify token
const verifyToken = (req, res, next) => { 
    console.log('middleware')
    const token = req.headers.token;
    console.log(token);
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("Invalid token");
            }
            
            req.user = user;
            console.log(req.user);
            next();
        });
    }
    else {
        return res.status(401).json("Access token not found"); 
    }
}



module.exports = {
    verifyToken
  }