var notice = require('../../services/notice/noticeService.js');     
const { ClientError } = require('../../services/error/error.js');

const createNoticeController = async (req, res) => { 
    try {    
        var result = await notice.createNoticeService(req);
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}
  
const deleteNoticeController = async (req, res) => { 
    try {    
        var msg = await notice.deleteNoticeService(req.params.id);
        res.status(200).json({ success: true, msg });
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

const editNoticeController = async (req, res) => { 
    try {    
        const msg = await notice.editNoticeService(req);
        res.status(200).json({ success: true, msg });
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

const getNoticeDetailsController = async (req, res) => { 
    try {    
        const msg = await notice.getNoticeDetailsService(req.params.id);
        res.status(200).json({ success: true, msg });
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

const getNoticeController = async (req, res) => { 
    try {    
        const result = await notice.getNoticeService(req);
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}
module.exports = { createNoticeController, deleteNoticeController,
                    editNoticeController, getNoticeController,
                    getNoticeDetailsController } ;  