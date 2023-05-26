var reportService = require("../../services/report/reportService.js");
const { ClientError } = require("../../services/error/error.js");

var createReport = async (req, res) => {
  try {
    var report = await reportService.createReportService(req);
    res.status(200).json({ success: true, report });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

var deleteReport = async (req, res) => {
  try {
    var report = await reportService.deleteReportService(req.params.id);
    res.status(200).json({ success: true, report });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

var getDetailsReport = async (req, res) => {
  try {
    var report = await reportService.getDetailsReportService(req.params.id);
    res.status(200).json({ success: true, report });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

var getListReports = async (req, res) => {
  try {
    var reports = await reportService.getListReportsService();
    res.status(200).json({ success: true, reports });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

var editReport = async (req, res) => {
  try {
    var report = await reportService.editReportService(req);
    res.status(200).json({ success: true, report });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

var getReports = async (req, res) => {
  try {
    console.log(req.params);
    var reports = await reportService.getReportsService(req.params.userId);
    res.status(200).json({ success: true, reports });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};
module.exports = {
  createReport, deleteReport,
  getDetailsReport, getListReports,
  editReport, getReports
};
