// task
const BASE_URL = 'http://localhost:8000/api/';

const API_ENDPOINTS = {
    // TASKS MANAGEMENT
    getTasks: BASE_URL + 'student/get-task-all',
    deleteTask: BASE_URL + 'student/delete-task/', // + taskId   
    editTask: BASE_URL + 'student/edit-task/', // + taskId
    assignTask: BASE_URL + 'student/assign-task', //  them task moi  
    getDetailsTask: BASE_URL + '/student/task/get-task/', // + taskId 
    getTasksOfStudent: BASE_URL + '/student/task/get-tasks/', // + studentId
    updateStatus: BASE_URL + '/student/task/update-stauts/', // + taskId + studentId
  };  
  
  export default API_ENDPOINTS;   