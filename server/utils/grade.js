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

  const convertGradeByRand4 = (score) => {
    if (score >= 9) {
      return 4;
    } else if (score >= 8.5) {
      return 3.7;
    } else if (score >= 8) {
      return 3.5;
    } else if (score >= 7) {
      return 3;
    } else if (score >= 6.5) {
      return 2.5;
    } else if (score >= 5.5) {
      return 2;
    } else if (score >= 5) {
      return 1.5;             
    } else if (score >= 4) {
        return 1; 
    } else {
      return 0;
    }
  } 

  const roundToTwoDecimalPlaces = (num) => {
    return num.toFixed(2);
}
  

  module.exports = {
    calculateGrade, convertGradeByRand4, roundToTwoDecimalPlaces
}