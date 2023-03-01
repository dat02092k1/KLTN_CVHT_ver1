<template>
  <div>
    <form @submit.prevent="submitForm">
      <label for="semester">Mã kỳ học:</label>
      <input id="semester" v-model="semester" type="text" />

      <label for="student-id">Mã sinh viên:</label>
      <input id="student-id" v-model="studentId" type="text" />

      <div v-for="(subject, index) in subjects" :key="index">
        <label>{{ `Môn học #${index + 1}` }}</label>

        <label for="subject-name">Tên môn học:</label>
        <input id="subject-name" v-model="subject.name" type="text" />

        <label for="subject-credit">Số tín chỉ:</label>
        <input id="subject-credit" v-model.number="subject.credits" type="number" />

        <label for="subject-score">Điểm:</label>
        <input id="subject-score" v-model.number="subject.score" type="number" />

        <button @click.prevent="removeSubject(index)">Xóa môn học</button>
      </div>

      <button @click.prevent="addSubject">Thêm môn học</button>

      <button type="submit">Lưu</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      semester: "",
      studentId: "",
      subjects: [{ name: "", credits: "", score: "" }],
    };
  },
  methods: {
    addSubject() {
      this.subjects.push({ name: "", credits: "", score: "" });
    },
    removeSubject(index) {
      this.subjects.splice(index, 1);
    },
    async submitForm() {
      const course = {
        semester: this.semester,
        studentId: this.studentId,
        subjects: this.subjects,
      };
      console.log(course); 
      try {
        const response = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(course),
        });
        const data = await response.json();
        console.log("Data saved successfully:", data);
        // Reset form after successful submission
        this.semester = "";
        this.studentId = "";
        this.subjects = [{ name: "", credits: "", score: "" }];
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
  },
};
</script>
