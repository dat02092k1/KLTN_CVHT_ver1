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
    /**
     * ANNOUNCEMENT 
     */
    addAnnouncement: BASE_URL + 'announcement/add', 
    getAnnouncement: BASE_URL + 'announcement/get', 
    deleteAnnouncement: BASE_URL + 'announcement/delete/', // + announId  
    editAnnouncement: BASE_URL + 'announcement/put/', // + announcementId 
    /**
     * FORMS
     */
    addForm: BASE_URL + 'form/add',
    getForm: BASE_URL + 'form/get/', // + _class 
    deleteForm: BASE_URL + 'form/delete/', // + formId  
    editForm: BASE_URL + 'form/update/', // + formId    
    detailForm: BASE_URL + 'form/details/', // + formId   
    getUserForms:  BASE_URL + 'form/student/', // + studentId 
  };  
  
  export default API_ENDPOINTS;   