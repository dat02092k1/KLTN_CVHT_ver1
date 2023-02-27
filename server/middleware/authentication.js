const jwt = require("jsonwebtoken");

// verify token
const verifyToken = (req, res, next) => { 
     
    const token = req.headers.token;
     
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

const roleAuthentication = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.role === "manager") {
            next(); 
        }
        else {
            res.status(403).json("You are not allowed to do this")
        }
    })
}

const roleAuthenticationGetUsername = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.username == req.params.username || req.user.role === "manager") {
            next(); 
        }
        else {
            res.status(403).json("You are not allowed to do this")
        }
    })
}

const isAdminAuthentication = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "manager") {
            next(); 
        }
        else {
            res.status(403).json("You are not allowed to do this")
        }
    })
}

module.exports = {
    verifyToken, roleAuthentication, 
    roleAuthenticationGetUsername, isAdminAuthentication
  }