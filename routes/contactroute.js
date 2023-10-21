const express = require('express');
const router = express.Router();
const{getEmpCOntacts,postEmpCOntacts}=require('../controller/contactcontroller')

router.get('/api/contacts',getEmpCOntacts);

router.post('/api/contacts',postEmpCOntacts)

// router.put('/api/contacts/:id',)

// router.delete('/api/contacts/:id',)


module.exports = router;