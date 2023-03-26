var announcementService = require('../../services/announcement/announcementService.js');     
const { ClientError } = require('../../services/error/error.js');

var createAnnouncementController = async (req, res) => { 
    try {    
        var announcement = await announcementService.createAnnouncementService(req);
        res.status(200).json({ success: true, announcement });
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

var getAnnouncementController = async (req, res) => { 
    try {    
        var announcement = await announcementService.getAnnouncementService(req);
        res.status(200).json({ success: true, announcement });
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

var deleteAnnouncementController = async (req, res) => { 
    try {    
        var message = await announcementService.deleteAnnouncementService(req.params.id);
        res.status(200).json({ success: true, message });
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

var editAnnouncementController = async (req, res) => { 
    try {    
        var announcement = await announcementService.editAnnouncementService(req.params.id, req.body);  
        res.status(200).json({ success: true, announcement });
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

var getSpecifiedController = async (req, res) => { 
    try {    
        var announcement = await announcementService.getSpecifiedService(req.params.id);  
        res.status(200).json({ success: true, announcement });
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
module.exports = { createAnnouncementController, getAnnouncementController, 
                    deleteAnnouncementController, editAnnouncementController,
                    getSpecifiedController  } ;  