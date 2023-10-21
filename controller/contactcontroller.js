const employeeContactList = require('../model/contactmodel');
const multer = require('multer');
const path = require('path');

// phone number validation
function validatePhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone); 
}

// Function to validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// empployee validation
function employeevalidation(contact) {
  const errors = [];

  if (!contact.salutation) {
    errors.push("salutation is required")
  }
  if (!contact.firstName) {
    errors.push("firstName is required")
  }
  if (!contact.secondName) {
    errors.push("secondName is required")
  }
  if (!contact.gender) {
    errors.push("gender is required")
  }

  if (!contact.phone) {
    errors.push("phone is required")
  } else if (!validatePhone(contact.phone)) {
    errors.push("invalid number formate")
  }

  if (!contact.mail) {
    errors.push("email is required")
  } else if (!validateEmail(contact.mail)) {
    errors.push("invalid mail formate")
  }
  return errors
}

//multer middleware

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }

})
const upload = multer({ storage: storage }).single('image')

//to get all the contacts
const getEmpCOntacts = async (req, res) => {
  try {
    const employeecontact = await employeeContactList.find();
    res.status(200).json(employeecontact);
  }
  catch (error) {
    res.status(500).json({ error: console.log(error) })
  }
}
//Post an employee contact
const postEmpCOntacts = async (req, res) => {
  try {
    upload(req, res, async function (err) {

      if (err instanceof multer.MulterError) {

        res.status(400).json({ error: "imagae upload error" })
      }
      else if (err) { 
        res.status(500).json({ error: "server error" })
      }

      else {
        const { salutation, firstName, secondName, phone, mail, gender } = req.body
        console.log(req.body);

        const newcontactlist = req.body;
        console.log(newcontactlist);
        const validationErrors = employeevalidation(newcontactlist);
        console.log(validationErrors);

        if (validationErrors.length > 0) {
          return res.status(400).json({ errors: validationErrors });
        }
        if (!req.file) {
          res.status(400).json({ error: 'Image file is required' });
          return;
        }
        const newContact = await employeeContactList.create({
          salutation, firstName, secondName, gender, phone, mail,image:req.file
        })
        res.status(201).json(newContact);

      }

    })
  }
    
    catch (error) {
  res.status(500).json({ error: console.log(error) })
}
}


module.exports = { getEmpCOntacts, postEmpCOntacts }
