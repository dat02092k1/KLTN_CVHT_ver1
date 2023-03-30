import { defineStore } from "pinia";
import axios from "axios";
import { getAccessToken } from "../utils/config.js";
import { axiosIns } from "../api/axios.js";
import API_ENDPOINTS from "../api/api.js";

export const useScoreStore = defineStore({
  id: "score",
  state: () => ({
    courseDetails: [],
    successMsg: false,
    errorMsg: false,
  }),
  getters: {},
  actions: {
    async getCourses(studentId) {
      try {
        const config = getAccessToken();

        const courses = await axiosIns.get(
          `http://localhost:8000/api/student/get-course/${studentId}`,
          config
        );
          console.log(courses.data.courses);
        return courses.data.courses;
      } catch (error) {
        console.log(error);
      }
    },
    async addCourses(courseDetails) {
      try {
        const config = getAccessToken();

        const course = await axiosIns.post(
          "http://localhost:8000/api/student/add-course",
          courseDetails,
          config
        );

        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);

        return course;
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async editCourse(courseId, courseDetails) {
      try {
        const config = getAccessToken();

        const course = await axiosIns.put(
          `http://localhost:8000/api/student/edit-course/${courseId}`,
          courseDetails,
          config
        );

        console.log(course);
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
        return course;
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
    async getCourseDetails(courseId) {
      try {
        const config = getAccessToken();

        const course = await axiosIns.get(
          `http://localhost:8000/api/student/course/${courseId}`,
          config
        );

        this.courseDetails = course.data.course;
        console.log(this.courseDetails);
        return course.data.course;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCourse(courseId, studentId) {
      try {
        const config = getAccessToken();

        const course = await axiosIns.delete(
          API_ENDPOINTS.deleteCourse + courseId + `?student=${studentId}`,
          config
        );

        console.log(course);
        this.successMsg = true;
        setTimeout(() => (this.successMsg = false), 3000);
        return course;
      } catch (error) {
        console.log(error);
        this.errorMsg = true;
        setTimeout(() => (this.errorMsg = false), 3000);
      }
    },
  },
});
