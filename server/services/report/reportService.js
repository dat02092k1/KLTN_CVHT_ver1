const reportModel = require("../../models/reports/report.js");
const userModel = require("../../models/students/userModel.js");

const { cloudinary } = require("../../uploads/cloudinary.js");
const { ClientError } = require("../error/error.js");

var createReportService = async (req) => {
    const { title, content } = req.body;
    console.log(req.body); 
    const userId = req.params.userId;
    const files = req.files;
    console.log(req.files); 
  try {
    const user = await userModel.findById(userId);
    if (!user) throw new ClientError("User not found", 404);

    const report = new reportModel({ 
        userId: userId, 
        username: user.userId, 
        title, 
        content });

    if (files) {
        const fileUrls = [];

        // Upload each file to Cloudinary and store the secure_url and public_id
        for (const file of files) {

            if (file.mimetype !== 'application/pdf' && file.mimetype !== 'application/msword' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.mimetype !== 'application/zip') {
                throw new ClientError('Invalid file type', 400);
              }
            
            const fileExtension = require('mime-types').extension(file.mimetype);

            console.log('File extension:', fileExtension);

            const result = await cloudinary.uploader.upload(file.path, {
                folder: "Report files",
                resource_type: "raw",
                format: fileExtension,
              });
      
              console.log("Document uploaded successfully", result);
              fileUrls.push({
                url: result.secure_url,
                public_id: result.public_id,
              });
            }
            report.fileUrl = fileUrls;
        }
            
            await report.save();
            return report;
    }
    catch (error) {
    throw error;
  }
};

const deleteReportService = async (reportId) => {
  try {
    const report = await reportModel.findById(reportId);

    if (!report) {
      throw new ClientError("Report not found", 404);
    }

    // Delete files from Cloudinary if there are any
    if (report.fileUrl && report.fileUrl.length > 0) {
      for (const file of report.fileUrl) {
        try {
          console.log(file.public_id);
          await cloudinary.uploader.destroy(file.public_id, { resource_type: 'raw' });
          console.log(`Deleted file with public_id ${file.public_id} from Cloudinary`);
          }
          // await cloudinary.uploader.destroy(file.public_id, resource_type = 'raw');
          // console.log(`Deleted file with public_id ${file.public_id} from Cloudinary`);
        
        catch (error) {
          console.error(`Error deleting file with public_id ${file.public_id} from Cloudinary: ${error.message}`);
        }
      }
    }

    // Delete report from database
    await reportModel.findByIdAndDelete(reportId);

    return report;
  } catch (error) {
    throw error;
  }
}

const getDetailsReportService = async (reportId) => {
  try {
    const report = await reportModel.findById(reportId);

    if (!report) {
      throw new ClientError("Report not found", 404);
    }

    return report;
  } catch (error) {
    throw error;
  }
}

const getListReportsService = async () => {
  try {
    const reports = await reportModel.find().sort({ createdAt: -1 });  

    if (!reports) {
      throw new ClientError("Report not found", 404);
    }

    return reports;
  } catch (error) {
    throw error;
  }
}

const editReportService = async (req) => {
  try {
    const reportId = req.params.id;
    const reportDetails = req.body;

    const report = await reportModel.findById(reportId);
    if (!report) throw new ClientError("Report not found", 404);

    console.log(reportDetails);

    // if (report.fileUrl && report.fileUrl.length > 0) {
    //   const oldFilePublicIds = report.fileUrl.map(file => file.public_id);
    //   const newFilePublicIds = reportDetails.fileUrl ? reportDetails.fileUrl.map(file => file.public_id) : [];

    // const filesToDestroy = oldFilePublicIds.filter(publicId => !newFilePublicIds.includes(publicId));
     
    //   for (const publicId of filesToDestroy) {       
    //     try {
    //       const res = await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
    //       console.log(res);
    //     } catch (error) {
    //       console.error(`Error deleting file with public_id ${file.public_id} from Cloudinary: ${error.message}`);
    //     }
    //   }
    // }

    const updateReport = await reportModel.findByIdAndUpdate(reportId, reportDetails, { new: true });

    if (!updateReport) {
      throw new Error(`cant update report`, 404);
    }
    return updateReport;
  } catch (error) {
    throw error;
  }
}

const getReportsService = async (userId) => {
  try {
    if (!userId) throw new ClientError(`User not found`, 404); 

    const reports = await reportModel.find({ userId: userId}).sort({ updatedAt: -1 });

    if (!reports) {
      throw new ClientError("Report not found", 404);
    }

    return reports;
  } catch (error) {
    throw error;
  }
}
module.exports = {
    createReportService, deleteReportService,
    getDetailsReportService, getListReportsService,
    editReportService, getReportsService
};
