const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


var userModel = require('../../models/students/studentsModel');

var loginService = async (req, res, next) => {
    const { studentId, password } = req.body;

    try {
        var user = await userModel.findOne( {studentId});

        if (!user) return res.status(400).json({ message: 'Email or password is incorrect' });

        // check for password
        console.log(user.password);

        const isMatch = await bcrypt.compareSync(password, user.password);
        console.log(isMatch);
        if (!isMatch) 
        {
            return res.status(400).json({ message: 'Invalid credentials'});
        }
        
        // create token
        console.log(user);
        const acessToken = jwt.sign({ username: user.studentId}, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        
        return res.status(200).json({ acessToken });   
        
    } catch (error) {
        console.log(error);  
    }
}

module.exports = {
    loginService
}
