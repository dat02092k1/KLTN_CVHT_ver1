var scoreService = require('../../services/score/scoreService.js');     

var getScoreController = async (req, res) => {
    try {
        var score = await scoreService.getScoreService(req.params.id);

        res.status(200).json({ success: true, score });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "get score failed" });
    }
}

module.exports = {
    getScoreController
}