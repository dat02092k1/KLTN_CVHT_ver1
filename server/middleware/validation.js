const xlsx = require("xlsx");
// xlsx.SSF.format("yyyy-MM-dd", new Date(), { forceGMT: true });

var schema = require("../models/students/validate.js");

 
 
const formatBirthdate = (date) => {
  return new Date(1900, 0, date);
}

const validateFieldsMiddleware = (req, res, next) => {
  const workbook = xlsx.readFile(req.file.path);
  // , { cellDates: true }
   
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  console.log("flag");

  const validationErrors = [];

  for (const item of data) {
    item.birthdate = formatBirthdate(item.birthdate)
    console.log('birthdate')
    console.log((item.birthdate));
    console.log(isNaN(new Date(item.birthdate).getTime()));
    if (isNaN(new Date(item.birthdate).getTime())) {
      validationErrors.push('invalid birthdate');
    }
    // var date = new Date(1900, 0, item.birthdate)
    // console.log(date);
//     const [day, month, year] = item.birthdate.split('/');           
// const birthdate = new Date(year, month - 1, day);
// console.log(birthdate);
    
    const { error } = schema.schema.validate(item);

    if (error) {
      validationErrors.push(`Row ${data.indexOf(item) + 2}: ${error.message}`);
    }
  }

   

  if (validationErrors.length > 0) {
    return res.status(400).json({
      message: "Validation errors",
      errors: validationErrors,
    });
  }

  req.data = data;
  next();
};

module.exports = { validateFieldsMiddleware };

  // const birthdate = item.birthdate instanceof Date ? item.birthdate.toISOString().split('T')[0] : item.birthdate;
     
     
//     const date = new Date("13/11/2002");
// date.setUTCHours(0, 0, 0, 0);
// const formattedDate = date.toISOString().split("T")[0];
// console.log(formattedDate); // "2002-12-11"