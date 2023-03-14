import { defineStore } from "pinia";
 import axios from "axios";
 import { getAccessToken } from '../utils/config.js'
 import { axiosIns } from "../api/axios.js";

export const useScoreStore = defineStore({
  id: "score",
  state: () => ({
     courseDetails: []
  }),
  getters: {
  },
  actions: {
    async getCourses(studentId) {
        try {
            const config = getAccessToken();
             
            const courses = await axiosIns.get(`http://localhost:8000/api/student/get-course/${studentId}`, config); 

            return courses.data.courses;      
        } catch (error) {
            console.log(error);         
        }
    },
    async addCourses(courseDetails) {
      try {
        const config = getAccessToken();
         
        const course = await axiosIns.post("http://localhost:8000/api/student/add-course", courseDetails, config); 

        return course;     
    } catch (error) {
        console.log(error);         
    }
    },
    async editCourse(courseId, courseDetails) {
      try {
        const config = getAccessToken();
         
        const course = await axiosIns.put(`http://localhost:8000/api/student/edit-course/${courseId}`, courseDetails, config); 

        console.log(course);  
        return course;   
      } catch (error) {
        console.log(error);
      }
    },
    async getCourseDetails(courseId) {
      try {
        const config = getAccessToken();

        const course = await axiosIns.get(`http://localhost:8000/api/student/course/${courseId}`, config); 

        this.courseDetails = course.data.course;
        console.log(this.courseDetails);
        return course.data.course;
      } catch (error) {
        console.log(error);
      }
    }
  },
});