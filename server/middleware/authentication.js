const jwt = require("jsonwebtoken");

// verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.token;
   
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json("Invalid token");
      }

      req.user = user;
         
      next();
    });
  } else {
    return res.status(403).json("Access token not found");
  }
};

const roleAuthentication = (req, res, next) => {
  verifyToken(req, res, () => {
     
    if (req.user.id == req.params.id || req.user.role === "manager") {
      next();
    } else {
      res.status(403).json("You are not allowed to do this");
    }
  });
};

const onlyOwner = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.body.userId || req.user.username == req.params.username || req.user.id == req.query.userId || req.user.id == req.params.id || req.user.role === "consultant") {
      next();
    } else {
      res.status(403).json("You are not allowed to do this");
    }
  });
};

const studentIdAuthentication = (req, res, next) => {
    
  verifyToken(req, res, () => {
     console.log(req.params);
    if (req.user.id === req.params.studentId || req.user.id === req.body.student || req.user.id === req.params.id || req.user.role === "consultant" || req.user.role === "manager") {
      next();
    } else {
      res.status(403).json("You are not allowed to do this");
    }
  });
};

const roleAuthenticationGetUsername = (req, res, next) => {
  verifyToken(req, res, () => {
     
    if (
      req.user.username == req.params.username ||
      req.user.role === "consultant"
    ) {
      next();
    } else {
      res.status(403).json("You are not allowed to do this");
    }
  });
};

const isManagerAuth = (req, res, next) => {
  verifyToken(req, res, () => {
     
    if (req.user.role === "manager") {
      next();
    } else {
      res.status(403).json("You are not allowed to do this");
    }
  });
};

const isAdminAuthentication = (req, res, next) => {
  verifyToken(req, res, () => {
     
    if (req.user.role === "consultant" || req.user.role === "manager") {
      next();
    } else {
      res.status(403).json("You are not allowed to do this");
    }
  });
};

module.exports = {
  verifyToken,
  roleAuthentication,
  roleAuthenticationGetUsername,
  isAdminAuthentication,
  studentIdAuthentication,
  onlyOwner,
  isManagerAuth
};
