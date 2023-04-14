const cron = require("node-cron");
const Task = require("../models/task/taskModel.js");
const email = require("./email.js");

const twoDaysFromNow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

async function cronJob() {
  const tasks = await Task.find({
    duration: { $lte: twoDaysFromNow },
  }).populate("assignedStudents.student");

  tasks.forEach((task) => {
    const uncompletedStudents = task.assignedStudents.filter(
      (student) => !student.isCompleted
    );

    for (const { student, studentId } of uncompletedStudents) {
      // Send emails in parallel using Promise.all
      const html = `<div>
      Nhắc nhớ: Bạn chưa hoàn thành nhiệm vụ được giao ${task.task}, hạn nộp là ngày ${task.duration.toDateString()})
 </div>`;
        const subject = "Nhiệm vụ sắp hết hạn";

        email(student.emailAddress, subject, html);
    }
  });
}

cron.schedule("0 9 * * *", cronJob, {
    scheduled: true,
    timezone: 'Asia/Ho_Chi_Minh'
});

module.exports = cronJob;
