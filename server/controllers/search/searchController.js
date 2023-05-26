var searchService = require('../../services/search/searchService.js');     

var getStudentController = async (req, res) => { 
    try {
            
        var search = await searchService.getSearchStudentService(req, res);
        res.status(200).json({ success: true, search });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "get info failed" });
    }
}

module.exports = { getStudentController } ;         

