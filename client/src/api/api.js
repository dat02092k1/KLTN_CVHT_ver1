// task
const BASE_URL = 'http://localhost:8000/api/';

const API_ENDPOINTS = {
    // AUTH
    changePassword: BASE_URL + 'user/change-password/', // + studentId
    forgetPassword: BASE_URL + 'user/forget-password', 
    resetPassword: BASE_URL + 'user/reset-password', 
    // TASKS MANAGEMENT
    getTasks: BASE_URL + 'student/get-task-all',
    deleteTask: BASE_URL + 'student/delete-task/', // + taskId   
    editTask: BASE_URL + 'student/edit-task/', // + taskId
    assignTask: BASE_URL + 'student/assign-task', //  them task moi  
    getDetailsTask: BASE_URL + 'student/task/get-task/', // + taskId 
    getTasksOfStudent: BASE_URL + 'student/task/get-tasks/', // + studentId
    updateStatus: BASE_URL + 'student/task/update-stauts/', // + taskId + studentId
    getTasksPerPage: BASE_URL + 'student/get/tasks-page/', // + userId + query page 
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
    /**
     * Course
     */
    deleteCourse: BASE_URL + 'student/delete-course/', // + courseId + qery: student = studentId
    addCourse: BASE_URL + 'student/add-course', 
    getCourse: BASE_URL + 'student/get-course/', // + studentId       
    getCourseDetails: BASE_URL + 'student/course/', // + courseId   
    editCourse: BASE_URL + 'student/edit-course/', // + courseId        
    /**
     * REPORTS
     */
    createReport: BASE_URL + 'report/create/', // + userId 
    getListReports: BASE_URL + 'report/list', // 
    getDetailsReport: BASE_URL + 'report/details/', // + reportId
    editReport: BASE_URL + 'report/edit/', // + reportId
    deleteReport: BASE_URL + 'report/delete/', // + reportId
    getReportsOfUser: BASE_URL + 'reports/', // + userId
    /**
     * USERS
     */
    getStudentsOfClass: BASE_URL + 'student/getAll/', // + class
    createStudent: BASE_URL + 'student/create',
    editStudent: BASE_URL + 'student/update/', // + studentId 
    getDetailsStudent: BASE_URL + 'student/details/', // + studentId 
    deleteStudent: BASE_URL + 'student/remove/', // + studentId
    getStudentStatus: BASE_URL + 'student/status/', // + class
    importManyStudents: BASE_URL + 'student/import-excel',
    /**
     * FORUM
     */
    getListPostByClass: BASE_URL + 'post/list/', // + class
    createPost: BASE_URL + 'post/create',
    editPost: BASE_URL + 'post/edit/', // + postId 
    deletePost: BASE_URL + 'post/delete/', // + postId 
    addComment: BASE_URL + 'post/comment/create', // + postId
    getCommentAndPost: BASE_URL + 'comment/post/', // + postId
    deleteComment: BASE_URL + 'post/comment/delete/', // + commentId 
    editComment: BASE_URL + 'post/comment/edit/', // + username + commentId
    getCommentDetails: BASE_URL + 'post/comment/view/', // + commentId
    /**
     * CHAT
     */
    handleConversation: BASE_URL + 'conversation/handle',
    getMessage: BASE_URL + 'message/', // + conversationId
    createMessage: BASE_URL + 'message/create',
    getMessageLimit: BASE_URL + 'message-limit/', // + conversationId 
    loadMessage: BASE_URL + 'message-load', // query.conversationId && query.page 
    /**
     * UPLOAD
     */
    uploadImg: BASE_URL + 'upload', // upload image 
    uploadDocs: BASE_URL + 'upload-doc', // upload single file 
    uploadMultiDocs: BASE_URL + 'upload-docs', // upload multiple files 
  };  
  
  export default API_ENDPOINTS;   