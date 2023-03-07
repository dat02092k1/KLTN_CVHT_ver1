const calculateGrade = (score) => {
    if (score >= 9) {
      return 'A+';
    } else if (score >= 8.5) {
      return 'A';
    } else if (score >= 8) {
      return 'B+';
    } else if (score >= 7) {
      return 'B';
    } else if (score >= 6.5) {
      return 'C+';
    } else if (score >= 5.5) {
      return 'C';
    } else if (score >= 5) {
      return 'D+';
    } else if (score >= 4) {
        return 'D'; 
    } else {
      return 'F';
    }
  }

  const convertGrade = (score) => {
    return Math.min(Math.max(Math.round((score - 1) * 0.3 + 1), 0), 4);
  } 
  

  module.exports = {
    calculateGrade, convertGrade  
}